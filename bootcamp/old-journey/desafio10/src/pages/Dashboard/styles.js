import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  padding: 0 20px;
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 80px;
`;

export const ButtonLeft = styled.TouchableOpacity``;

export const ButtonRight = styled.TouchableOpacity``;

export const Datee = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;

  margin: 0 10px;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 30px;
`;

export const Meetup = styled.View`
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
`;

export const Image = styled.Image`
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Details = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;

  margin-bottom: 5px;
`;

export const TextDetails = styled.View`
  margin: 5px 0;
  flex-direction: row;
`;

export const Text = styled.Text`
  font-size: 13px;
  color: #999;
  margin-left: 5px;
`;

export const SubscriptionButton = styled(Button)`
  margin-top: 10px;
`;

export const ListEmpty = styled.View`
  align-items: center;
  justify-content: center;
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
