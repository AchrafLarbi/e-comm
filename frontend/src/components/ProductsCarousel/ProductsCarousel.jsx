import React, { useEffect } from 'react'
import Loader from '../Loader';
import Message from '../Message';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Image, Container } from 'react-bootstrap';
import { topRatedProductsAction } from '../../actions/productActions';
import { Link } from 'react-router-dom';

function ProductsCarousel() {
    const dispatch = useDispatch();
    // top rated products
    const products_Top = useSelector((state) => state.topRatedProducts);
    const { loading: loadingTop, products: productsTop, error: errorTop } = products_Top;

    useEffect(() => {
        // make action to update products state
        dispatch(topRatedProductsAction());
    }, [dispatch]);

    return (
        <Container className="my-3">
            {loadingTop ? <Loader /> : errorTop ? <Message variant='danger'>{errorTop}</Message> : productsTop && productsTop.length === 0 ? null :
                (
                    <Carousel 
                        pause='hover' 
                        className='bg-dark rounded carousel-container'
                        style={{ maxWidth: '800px', margin: '0 auto' }}
                    >
                        {productsTop && productsTop.map((product) => (
                            <Carousel.Item key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    <Image 
                                        src={`${process.env.REACT_APP_MEDIA_URL}${product.image}`}  
                                        alt={product.name} 
                                        fluid 
                                        style={{ 
                                            width: '100%', 
                                            height: '400px', 
                                            objectFit: 'contain',
                                            backgroundColor: '#343a40' 
                                        }} 
                                    />
                                    <Carousel.Caption 
                                        style={{ 
                                            borderRadius: '5px', 
                                            padding: '10px',
                                            backgroundColor: 'rgba(0,0,0,0.6)',
                                            bottom: '0',
                                            left: '0',
                                            right: '0'
                                        }}
                                    >
                                        <h5 className="text-white" style={{ fontWeight: '600', marginBottom: '5px' }}>{product.name}</h5>
                                        <p className="mb-5" style={{ fontWeight: '600', color: '#ffc107', margin: '0' }}>${product.price}</p>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}
        </Container>
    )
}

export default ProductsCarousel