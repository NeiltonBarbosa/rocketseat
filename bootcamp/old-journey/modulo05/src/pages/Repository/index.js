import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import api from '../../services/api';

import {
  Loading,
  Owner,
  IssueList,
  IssueFilter,
  IssuePagination,
} from './styles';

import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    disabled: true,
    filterParams: {
      page: 0,
      state: 'open',
      perPage: 5,
    },
  };

  async componentDidMount() {
    const { filterParams } = this.state;
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filterParams.state,
          per_page: filterParams.perPage,
          page: filterParams.page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilter = async state => {
    const { repository, filterParams } = this.state;
    const issues = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state,
        per_page: filterParams.perPage,
      },
    });

    this.setState({ issues: issues.data, state });
  };

  handlePagination = async page => {
    const { repository, filterParams } = this.state;

    const issues = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: filterParams.state,
        per_page: filterParams.perPage,
        page,
      },
    });

    filterParams.page = page;

    this.setState({
      filterParams,
      disabled: page === 1,
      issues: issues.data,
    });
  };

  render() {
    const { repository, issues, loading, filterParams, disabled } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueFilter>
          <button type="button" onClick={() => this.handleFilter('open')}>
            Open
          </button>
          <button type="button" onClick={() => this.handleFilter('all')}>
            All
          </button>
          <button type="button" onClick={() => this.handleFilter('closed')}>
            Closed
          </button>
        </IssueFilter>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />

              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>

                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <IssuePagination>
          <button
            type="button"
            disabled={disabled}
            onClick={() => this.handlePagination(filterParams.page - 1)}
          >
            <FaAngleLeft color="#999" size={24} />
          </button>
          <button
            type="button"
            onClick={() => this.handlePagination(filterParams.page + 1)}
          >
            <FaAngleRight color="#999" size={24} />
          </button>
        </IssuePagination>
      </Container>
    );
  }
}
