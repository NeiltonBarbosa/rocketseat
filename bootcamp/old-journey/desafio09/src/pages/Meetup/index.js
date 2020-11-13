import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { parse, format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, Content, FileInput } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Meetup(props) {
  const { match } = props;

  const [meetup, setMeetup] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    async function loadMeetup() {
      if (match.params.id) {
        const response = await api.get(`/meetups/${match.params.id}`);
        const data = {
          ...response.data,
          date: format(parseISO(response.data.date), 'dd/MM/yyyy HH:mm', {
            locale: pt,
          }),
          file_id: response.data.file.id,
        };

        setMeetup(data);
        setPreview(data.file.url);
      }
    }

    loadMeetup();
  }, [match.params.id]);

  async function handleSubmit(data) {
    const meet = {
      ...data,
      date: parse(data.date, 'dd/MM/yyyy HH:mm', new Date()),
    };

    if (meetup) {
      await api.put(`/meetups/${meetup.id}`, meet);
      toast.success('Meetup salvo com sucesso!');
    } else {
      await api.post('/meetups', meet);
      toast.success('Meetup cadastrado com sucesso!');
    }

    history.push('/dashboard');
  }

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('/files', data);

    const { id, url } = response.data;

    setPreview(url);
    setMeetup({ ...meetup, file_id: id });
  }

  return (
    <Container>
      <Content>
        <Form initialData={meetup || null} onSubmit={handleSubmit}>
          <FileInput htmlFor="file">
            <img src={preview} alt="" />

            <span>Selecione imagem</span>

            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleChange}
            />

            <Input name="file_id" />
          </FileInput>

          <Input name="title" placeholder="Título do Meetup" />
          <Input name="description" placeholder="Descrição completa" />
          <Input name="date" placeholder="Data do Meetup" />
          <Input name="location" placeholder="Localização" />

          <div>
            <button type="submit">
              <MdAddCircleOutline size={24} color="#fff" />
              Salva meetup
            </button>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }),
};

Meetup.defaultProps = {
  match: null,
};
