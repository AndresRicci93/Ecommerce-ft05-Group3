import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ProductCard from "./ProductCard";
import Filter from './Filter';
import SideComponent from './SideComponent';
import Pagination from './Pagination';
import axios from 'axios';
import './Catalogo.css';
import { connect } from 'react-redux';

/*----------Redux------------*/
import {
  getAllProducts,
  setProductsLoading,
} from "../actions/catalogoActions";

import {getProductsFromCart} from '../actions/order';

function Catalogo({
  getAllProducts,
  setProductsLoading,
  products,
  loading,
  reload,
  getProductsFromCart,
  cartProducts,
  cart,
  products2,
  products3,
  user
}) {

  /*------------------Pagination---------------------*/

  const [currentPage, setCurrentPage] = useState(1); 
  const [elementsPerPage] = useState(9);

  const indexOfLastProduct = currentPage * elementsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - elementsPerPage;

  const [currentProducts, setCurrentProducts] = useState (products.slice(indexOfFirstProduct, indexOfLastProduct))

  const paginate = (pageNumber) => setCurrentPage(pageNumber); 
  /*------------------Pagination---------------------*/
  const [state, setState] = useState({
        reload: reload,
        cartProducts: []
    })
    

    useEffect(()=>{
      if(products2){
        setCurrentProducts(products2.slice(indexOfFirstProduct, indexOfLastProduct))
      } 
      else if(products3){
        setCurrentProducts(products3.slice(indexOfFirstProduct, indexOfLastProduct))
      } 
      setCurrentProducts(products.slice(indexOfFirstProduct, indexOfLastProduct));
      
    },[products, products2, products3])

  useEffect(() =>{
    if(user){
      getProductsFromCart(user.id);
    }
    
  },[currentPage, user, cart ]) 

  console.log("el cart state",  cart)

  useEffect(() => {   
    
    setTimeout(() => {
      getAllProducts();
      
    }, 500);
  
    setState({
      reload: !reload
    })
    
  }, [reload, state.reload, cartProducts,  ]);

  


   
  return (
    <div fluid className="catalogo d-flex" style={{width: '100%'}}>
      <div className="sidebar-component-catalogo" style={{width: '400px'}}>
        <SideComponent /> 
      </div>
      <Container className="margin-right-catalogo">
        <div className="d-flex flex-wrap">
          {loading ? (
            <div
              className="spinner-border spinner-catalogo"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) :   currentProducts.length > 0 ? (

            currentProducts.map((ele, index) => (
                       
              <div key={index} className="column-productcard flex-wrap">
                <ProductCard
                  id={ele.id} 
                  name={ele.name}
                  description={ele.description.slice(0, 50) + "..."}
                  price={ele.price}
                  stock={ele.stock}
                  images={ele.images[0]}
                  cartProducts={cartProducts}
                  current={currentPage}
                  currentProducts={currentProducts}
                /> 
              </div>

            ))
          ) : (
            <div>
              <h1 className="no-products">NO PRODUCTS TO DISPLAY</h1>
            </div>
          )} 
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Pagination elementsPerPage={elementsPerPage} totalElements={products.length} paginate={paginate}/>
        </div>
      </Container >      
    </div>
  );
} 

const mapStateToProps = (state) => {
  return {
    loading: state.catalogo.loading,
    reload: state.productReducer.reload,
    cartProducts: state.orderReducer.cartProducts,
    products: state.catalogo.allProducts,
    products2: state.catalogo.allProducts2,
    products3: state.catalogo.allProducts3,
    user: state.userReducer.user,
    cart: state.orderReducer.cart 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setProductsLoading: () => dispatch(setProductsLoading()),
    getAllProducts: () => dispatch(getAllProducts()),
    getProductsFromCart: (idUser) => dispatch(getProductsFromCart(idUser)),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Catalogo);
