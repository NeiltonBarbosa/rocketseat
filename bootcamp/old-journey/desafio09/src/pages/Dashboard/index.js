import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdDone, MdSchedule } from 'react-icons/md';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Content, Meetup } from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/organizing');

      const data = response.data.map(meetup => ({
        ...meetup,
        dateFormatted: format(
          parseISO(meetup.date),
          "d 'de' MMMM', às' HH'h'",
          {
            locale: pt,
          }
        ),
      }));

      setMeetups(data);
    }

    loadMeetups();
  }, []);

  return (
    <Container>
      <Content>
        <header>
          <h1>Meus meetups</h1>

          <button type="button" onClick={() => history.push('/meetups/new')}>
            <MdAddCircleOutline color="#fff" size={20} />
            Novo meetup
          </button>
        </header>

        {meetups.length > 0 ? (
          <ul>
            {meetups.map(meetup => (
              <Meetup key={meetup.id}>
                <Link to={`/meetups/${meetup.id}/details`}>
                  <div>
                    {meetup.past ? (
                      <MdDone size={24} color="#36de36" />
                    ) : (
                      <MdSchedule size={24} color="#999" />
                    )}

                    <strong>{meetup.title}</strong>
                  </div>
                  <span>{meetup.dateFormatted}</span>
                </Link>
              </Meetup>
            ))}
          </ul>
        ) : (
          <span>Nenhum Meetup cadastrado.</span>
        )}
      </Content>
    </Container>
  );
}
