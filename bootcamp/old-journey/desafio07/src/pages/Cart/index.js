import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  CartItem,
  CartItemDetails,
  CartItemProductImage,
  CartItemProductDetails,
  CartItemProductDescription,
  CartItemProductPrice,
  TrashButton,
  CartItemAmount,
  CartItemAmountAction,
  CartItemAmountAdd,
  CartItemAmountRemove,
  CartItemAmountInput,
  CartItemTotal,
  CartFooter,
  CartFooterContent,
  CartTotalText,
  CartTotalPrice,
  CartButton,
  EmptyContainer,
  EmptyText,
} from './styles';

import { formatPrice } from '../../util/format';

function Cart({ products, total, removeFromCart, updateAmountRequest }) {
  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  return (
    <Container>
      {products.length ? (
        <>
          {products.map(product => (
            <CartItem key={product.id}>
              <CartItemDetails>
                <CartItemProductImage source={{ uri: product.image }} />

                <CartItemProductDetails>
                  <CartItemProductDescription>
                    {product.title}
                  </CartItemProductDescription>
                  <CartItemProductPrice>
                    {product.priceFormatted}
                  </CartItemProductPrice>
                </CartItemProductDetails>

                <TrashButton onPress={() => removeFromCart(product.id)}>
                  <Icon name="delete-forever" color="#7159c1" size={24} />
                </TrashButton>
              </CartItemDetails>

              <CartItemAmount>
                <CartItemAmountAction>
                  <CartItemAmountRemove onPress={() => decrement(product)}>
                    <Icon
                      name="remove-circle-outline"
                      color="#7159c1"
                      size={20}
                    />
                  </CartItemAmountRemove>

                  <CartItemAmountInput value={String(product.amount)} />

                  <CartItemAmountAdd onPress={() => increment(product)}>
                    <Icon name="add-circle-outline" color="#7159c1" size={20} />
                  </CartItemAmountAdd>
                </CartItemAmountAction>
                <CartItemTotal>{product.subtotal}</CartItemTotal>
              </CartItemAmount>
            </CartItem>
          ))}

          <CartFooter>
            <CartFooterContent>
              <CartTotalText>TOTAL</CartTotalText>
              <CartTotalPrice>{total}</CartTotalPrice>
            </CartFooterContent>

            <CartButton title="FINALIZAR PEDIDO" color="#7159c1" />
          </CartFooter>
        </>
      ) : (
        <>
          <EmptyContainer>
            <Icon name="remove-shopping-cart" color="#eee" size={42} />
            <EmptyText>Seu carrinho está vazio.</EmptyText>
          </EmptyContainer>
        </>
      )}
    </Container>
  );
}

const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
    priceFormatted: formatPrice(product.price),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0),
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);

Cart.propTypes = {
  products: PropTypes.array.isRequired,
  total: PropTypes.string.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
};
