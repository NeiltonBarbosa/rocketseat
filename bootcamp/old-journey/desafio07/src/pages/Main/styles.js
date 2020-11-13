import styled from 'styled-components/native';

import { darken } from 'polished';

export const Container = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
`;

export const ProductList = styled.FlatList.attrs({
  showsHorizontalScrollIndicator: false,
})`
  flex-direction: row;
`;

export const Product = styled.View`
  width: 220px;
  height: 340px;
  padding: 10px;
  border-radius: 4px;

  background: #fff;

  margin-left: 20px;
`;

export const ProductImage = styled.Image`
  height: 200px;
  width: 200px;
`;

export const ProductDescription = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 16px;
  color: #333;
`;

export const ProductPrice = styled.Text`
  font-size: 21px;
  color: #000;
`;

export const ProductButton = styled.TouchableOpacity`
  margin-top: 10px;
  background: #7159c1;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const ProductButtonIcon = styled.View`
  flex-direction: row;
  padding: 10px;
  align-items: center;

  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;

  background: ${darken(0.03, '#7159C1')};
`;

export const ProductButtonAmount = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-left: 5px;
`;

export const ProductButtonText = styled.Text`
  flex: 1;
  text-align: center;
  color: #fff;
  font-weight: bold;
`;
