import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  padding: 0 20px;
  flex: 1;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 90px;
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

export const UnsubscriptionButton = styled(Button)`
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
