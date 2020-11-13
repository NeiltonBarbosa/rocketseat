import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import { Container, Content, Meetup } from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function Detail(props) {
  const [meetup, setMeetup] = useState({ file: {} });
  const { match } = props;
  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`/meetups/${match.params.id}`);

      const meet = {
        ...response.data,
        dateFormatted: format(
          parseISO(response.data.date),
          "d 'de' MMMM', às' HH'h'",
          {
            locale: pt,
          }
        ),
      };

      setMeetup(meet);
    }

    loadMeetup();
  }, [match.params.id]);

  async function handleCancel() {
    await api.delete(`/meetups/${meetup.id}`);
    toast.success('Meetup cancelado com sucesso!');

    history.push('/dashboard');
  }

  return (
    <Container>
      <Content>
        <header>
          <h1>{meetup.title}</h1>

          {!meetup.past && (
            <div>
              <Link to={`/meetups/${meetup.id}`}>
                <MdEdit color="#FFF" size={20} />
                Editar
              </Link>
              <button type="button" onClick={handleCancel}>
                <MdDeleteForever color="#fff" size={20} />
                Cancelar
              </button>
            </div>
          )}
        </header>

        <Meetup>
          <img src={meetup.file.url} alt="" />

          <p>{meetup.description}</p>

          <div>
            <span>{meetup.dateFormatted}</span>
            <span>{meetup.location}</span>
          </div>
        </Meetup>
      </Content>
    </Container>
  );
}

Detail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }),
};

Detail.defaultProps = {
  match: null,
};
