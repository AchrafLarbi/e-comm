import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productsListAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import SearchBox from "../components/SearchBox";
import Paginator from "../components/Paginator";
import ProductsCarousel from "../components/ProductsCarousel/ProductsCarousel";

function HomeScreen() {
  // get search keyword from the url
  const searchQuery = window.location ? window.location.search : "";
  var keyword = '';
  if (searchQuery) {
     keyword = searchQuery.split("keyword=")[1].split("&")[0] || "";
  }

  const dispatch = useDispatch();
  const products_List = useSelector((state) => state.productsList);
  const { loading, products, error, pages, page } = products_List;


  useEffect(() => {
    dispatch(productsListAction(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <Container className="py-4">
      <div className="mb-4">
        <SearchBox />
      </div>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products && products.length === 0 ? (
        <div className="text-center py-5">
          <Message variant="info">
            <h4>No Products Found</h4>
            <p className="mt-2">Try a different search term or browse our categories</p>
          </Message>
        </div>
      ) : (
        <div>
          {/* if keyword empty and null then show carousel */}
          {!searchQuery && (
            <>
              <div className="mb-4">
                <h2 className="text-primary mb-3">Top Rated Products</h2>
                <ProductsCarousel />
              </div>
            </>
          )}
          
          <div className="my-4">
            <h2 className={searchQuery ? "mb-4" : "mb-4"}>
              {searchQuery ? `Search Results${keyword ? ` for "${keyword}"` : ""}` : "Latest Products"}
            </h2>
            <Row>
              {products && 
               products.length > 0 && 
               products.map((productitem) => (
                <Col key={productitem.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                  <Product product={productitem} />
                </Col>
              ))}
            </Row>
          </div>
          
          <div className="d-flex justify-content-center mt-4">
            <Paginator pages={pages} page={page} keyword={keyword} />
          </div>
        </div>
      )}
    </Container>
  );
}

export default HomeScreen;
