import { connect } from 'react-redux';
import ProductList from './productList';
import { fail, loadCart, loadProducts, request, success } from '../../constants/actionTypes';

const mapStateToProps = store => ({
  products: store.products,
  loading: store.loading[loadProducts] || store.loading[loadCart],
  error: store.errors[loadProducts] || store.errors[loadCart],
});

const mapDispatchToProps = dispatch => ({
  async loadData() {
    try {
      dispatch({
        type: `${loadProducts}_${request}`,
        payload: { message: 'Products are loading' },
      });
      dispatch({
        type: `${loadCart}_${request}`,
        payload: { message: 'cart are loading' },
      });
      const res = await Promise.all([
        fetch('http://localhost:3004/products'),
        fetch('http://localhost:3004/carts'),
      ]);
      const json = await Promise.all(res.map(x => x.json()));
      dispatch({ type: `${loadProducts}_${success}`, payload: json[0] });
      dispatch({ type: `${loadCart}_${success}`, payload: json[1] });
    } catch (error) {
      dispatch({
        type: `${loadProducts}_${fail}`,
        payload: { message: 'unable to fetch products' },
      });
      dispatch({
        type: `${loadCart}_${fail}`,
        payload: { message: 'unable to fetch cart' },
      });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
