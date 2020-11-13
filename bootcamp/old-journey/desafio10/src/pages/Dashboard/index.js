import React, { useState, useMemo, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { format, subDays, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import {
  Container,
  Header,
  ButtonLeft,
  ButtonRight,
  Datee,
  MeetupList,
  Meetup,
  Image,
  Details,
  Title,
  TextDetails,
  Text,
  SubscriptionButton,
  ListEmpty,
  EmptyText,
} from './styles';

import api from '~/services/api';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date],
  );

  async function loadMeetups() {
    setRefresh(true);
    const response = await api.get('meetups', {
      params: { date, page },
    });

    const data = response.data.map(meetup => ({
      ...meetup,
      date: format(parseISO(meetup.date), "d 'de' MMMM', às' HH'h'", {
        locale: pt,
      }),
    }));

    if (page === 1) {
      setMeetups(data);
    } else {
      setMeetups([...meetups, ...data]);
    }

    setRefresh(false);
  }

  useEffect(() => {
    loadMeetups();
  }, [date, page]); // eslint-disable-line

  function handlePrevDay() {
    setPage(1);
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setPage(1);
    setDate(addDays(date, 1));
  }

  async function loadMore() {
    setPage(page + 1);
  }

  async function onRefresh() {
    setPage(1);
  }

  async function handleSubscribe(id) {
    await api.post(`/meetups/${id}/subscriptions`);

    Alert.alert('Sucesso!', 'Inscrição realizada com sucesso!');

    setMeetups(meetups.filter(meetup => meetup.id !== id));
  }

  return (
    <Background>
      <Container>
        <Header>
          <ButtonLeft onPress={handlePrevDay}>
            <Icon name="chevron-left" size={32} color="#fff" />
          </ButtonLeft>

          <Datee>{dateFormatted}</Datee>

          <ButtonRight onPress={handleNextDay}>
            <Icon name="chevron-right" size={32} color="#fff" />
          </ButtonRight>
        </Header>

        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReachedThreshold={0.3}
          onEndReached={loadMore}
          onRefresh={onRefresh}
          refreshing={refresh}
          renderItem={({ item }) => (
            <Meetup>
              <Image source={{ uri: item.file.url }} resizeMode="stretch" />

              <Details>
                <Title>{item.title}</Title>
                <TextDetails>
                  <Icon name="event" color="#999" size={16} />
                  <Text>{item.date}</Text>
                </TextDetails>
                <TextDetails>
                  <Icon name="location-on" color="#999" size={16} />
                  <Text>{item.location}</Text>
                </TextDetails>
                <TextDetails>
                  <Icon name="person" color="#999" size={16} />
                  <Text>Organizador: {item.user.name}</Text>
                </TextDetails>

                <SubscriptionButton onPress={() => handleSubscribe(item.id)}>
                  Realizar inscrição
                </SubscriptionButton>
              </Details>
            </Meetup>
          )}
          ListEmptyComponent={
            <ListEmpty>
              <EmptyText>Nenhum Meetup encontrado</EmptyText>
            </ListEmpty>
          }
        />
      </Container>
    </Background>
  );
}

const TabBarIcon = ({ tintColor }) => (
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: TabBarIcon,
};
