import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

import {
  Container,
  ProductList,
  Product,
  ProductImage,
  ProductDescription,
  ProductPrice,
  ProductButton,
  ProductButtonText,
  ProductButtonIcon,
  ProductButtonAmount,
} from './styles';

import api from '../../services/api';

class Main extends Component {
  state = {
    products: [],
  };

  static propTypes = {
    addToCartRequest: PropTypes.func.isRequired,
    amount: PropTypes.object.isRequired,
  };

  async componentDidMount() {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddToCart = id => {
    const { addToCartRequest } = this.props;
    addToCartRequest(id);
  };

  render() {
    const { amount } = this.props;
    const { products } = this.state;

    return (
      <Container>
        <ProductList
          horizontal
          data={products}
          keyExtractor={product => String(product.id)}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image }} />
              <ProductDescription>{item.title}</ProductDescription>
              <ProductPrice>{item.priceFormatted}</ProductPrice>
              <ProductButton onPress={() => this.handleAddToCart(item.id)}>
                <ProductButtonIcon>
                  <Icon name="add-shopping-cart" color="#FFF" size={16} />
                  <ProductButtonAmount>
                    {amount[item.id] || 0}
                  </ProductButtonAmount>
                </ProductButtonIcon>
                <ProductButtonText>ADICIONAR</ProductButtonText>
              </ProductButton>
            </Product>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
