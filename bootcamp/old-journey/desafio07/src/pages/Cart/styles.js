import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 0px 20px 20px;
  padding: 10px;

  background: #fff;

  border-radius: 4px;
`;

export const CartList = styled.FlatList``;

export const CartItem = styled.View`
  margin-bottom: 20px;
`;

export const CartItemDetails = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const CartItemProductImage = styled.Image`
  width: 80px;
  height: 80px;
`;

export const CartItemProductDetails = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const CartItemProductDescription = styled.Text`
  font-size: 14px;

  color: #333;
`;

export const CartItemProductPrice = styled.Text`
  margin-top: 5px;

  font-size: 16px;
  font-weight: bold;

  color: #000;
`;

export const TrashButton = styled.TouchableOpacity``;

export const CartItemAmount = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px;
  height: 40px;

  background: #eee;

  border-radius: 4px;
`;

export const CartItemAmountAction = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CartItemAmountAdd = styled.TouchableOpacity``;
export const CartItemAmountRemove = styled.TouchableOpacity``;

export const CartItemAmountInput = styled.TextInput`
  width: 51px;
  height: 26px;
  padding: 5px;
  margin: 0 5px;

  font-size: 14px;

  background: #fff;
  border: 1px solid #ddd;
  color: #666;

  border-radius: 4px;
`;

export const CartItemTotal = styled.Text`
  flex: 1;

  font-size: 16px;
  font-weight: bold;

  text-align: right;

  color: #000;
`;

export const CartFooter = styled.View`
  justify-content: center;
`;

export const CartFooterContent = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const CartTotalText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #999;
`;

export const CartTotalPrice = styled.Text`
  font-size: 30px;
  font-weight: bold;

  color: #000;
`;

export const CartButton = styled.Button`
  font-weight: bold !important;
`;

export const EmptyContainer = styled.View`
  justify-content: space-between;
  align-items: center;
`;

export const EmptyText = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
`;
