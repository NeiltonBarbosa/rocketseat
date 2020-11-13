import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import {
  Container,
  MeetupList,
  Meetup,
  Image,
  Details,
  Title,
  TextDetails,
  Text,
  UnsubscriptionButton,
  ListEmpty,
  EmptyText,
} from './styles';

import api from '~/services/api';

function Subscription({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);

  async function loadSubscriptions() {
    const response = await api.get('subscriptions');

    const data = response.data.map(subscription => ({
      ...subscription,
      meetup: {
        ...subscription.Meetup,
        date: format(
          parseISO(subscription.Meetup.date),
          "d 'de' MMMM', às' HH'h'",
          {
            locale: pt,
          },
        ),
      },
    }));

    setSubscriptions(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  async function handleUnsubscribe(id) {
    await api.delete(`/meetups/${id}/subscriptions`);

    Alert.alert('Sucesso!', 'Inscrição cancelada com sucesso!');

    setSubscriptions(
      subscriptions.filter(subscription => subscription.meetup.id !== id),
    );
  }

  return (
    <Background>
      <Container>
        <MeetupList
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          onEndReachedThreshold={0.3}
          renderItem={({ item }) => (
            <Meetup>
              <Image
                source={{ uri: item.meetup.file.url }}
                resizeMode="stretch"
              />

              <Details>
                <Title>{item.meetup.title}</Title>
                <TextDetails>
                  <Icon name="event" color="#999" size={16} />
                  <Text>{item.meetup.date}</Text>
                </TextDetails>
                <TextDetails>
                  <Icon name="location-on" color="#999" size={16} />
                  <Text>{item.meetup.location}</Text>
                </TextDetails>
                <TextDetails>
                  <Icon name="person" color="#999" size={16} />
                  <Text>Organizador: {item.meetup.user.name}</Text>
                </TextDetails>

                <UnsubscriptionButton
                  onPress={() => handleUnsubscribe(item.meetup.id)}
                >
                  Cancelar inscrição
                </UnsubscriptionButton>
              </Details>
            </Meetup>
          )}
          ListEmptyComponent={
            <ListEmpty>
              <EmptyText>Nenhuma inscrição</EmptyText>
            </ListEmpty>
          }
        />
      </Container>
    </Background>
  );
}

Subscription.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

const TabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={20} color={tintColor} />
);

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: TabBarIcon,
};

export default withNavigationFocus(Subscription);
