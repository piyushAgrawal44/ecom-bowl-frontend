import React from "react";
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
import AddToWishList from '../AddToWishList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../../actions';

const FeaturedProductList = props => {
    const { products, authenticated, updateWishlist, isLoading } = props;

    const renderSkeleton = () => {
        const skeletonItems = Array.from({ length: 4 }); // Show 4 skeletons

        return skeletonItems.map((_, index) => (
            <Card key={index} style={{ width: '250px', margin: '10px', border: '1px solid #e0e0e0', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <div style={{ height: '200px', backgroundColor: '#ddd' }}></div>

                <CardBody>
                    <CardTitle tag="h5" style={{ width: '70%', height: '20px', backgroundColor: '#ccc', marginBottom: '10px' }}></CardTitle>
                    <CardText style={{ width: '50%', height: '15px', backgroundColor: '#e0e0e0', marginBottom: '8px' }}></CardText>
                    <CardText style={{ width: '90%', height: '12px', backgroundColor: '#e0e0e0', marginBottom: '8px' }}></CardText>
                    <CardText style={{ width: '60%', height: '15px', backgroundColor: '#ccc' }}></CardText>
                </CardBody>
            </Card>
        ));
    };

    return (
        <div className='brand-list'>
            <h3 className='text-uppercase'>Featured Products</h3>
            <hr />
            {
                isLoading ? (
                    <div className="product-list">
                        {renderSkeleton()}
                    </div>
                ) : (
                    <div className='product-list'>
                        {products.map((product, index) => (
                            <div key={index} className='mb-3 mb-md-0'>
                                <div className='product-container'>
                                    <div className='item-box'>
                                        <div className='add-wishlist-box'>
                                            <AddToWishList
                                                id={product._id}
                                                liked={product?.isLiked ?? false}
                                                enabled={authenticated}
                                                updateWishlist={updateWishlist}
                                                authenticated={authenticated}
                                            />
                                        </div>

                                        <div className='item-link'>
                                            <Link
                                                to={`/product/${product.slug}`}
                                                className='d-flex flex-column h-100'
                                            >
                                                <div className='item-image-container'>
                                                    <div className='item-image-box'>
                                                        <img
                                                            className='item-image'
                                                            src={`${product.imageUrl
                                                                ? product.imageUrl
                                                                : '/images/placeholder-image.png'
                                                                }`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='item-body'>
                                                    <div className='item-details p-3'>
                                                        <h1 className='item-name'>{product.name}</h1>
                                                        {product.brand && Object.keys(product.brand).length > 0 && (
                                                            <p className='by'>
                                                                By <span>{product.brand.name}</span>
                                                            </p>
                                                        )}
                                                        <p className='item-desc mb-0'>{product.description}</p>
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-row justify-content-between align-items-center px-4 mb-2 item-footer'>
                                                    <p className='price mb-0'>${product.price}</p>
                                                    {product.totalReviews > 0 && (
                                                        <p className='mb-0'>
                                                            <span className='fs-16 fw-normal mr-1'>
                                                                {parseFloat(product?.averageRating).toFixed(1)}
                                                            </span>
                                                            <span
                                                                className={`fa fa-star ${product.totalReviews !== 0 ? 'checked' : ''
                                                                    }`}
                                                                style={{ color: '#ffb302' }}
                                                            ></span>
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
            {
                (products.length === 0) && !isLoading && (
                    <div className='text-center'>
                        <h4 className='text-muted'>No featured products available</h4>
                    </div>
                )
            }


        </div>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: state.product.isLoading,
        authenticated: state.authentication.authenticated,

    };
};

export default connect(mapStateToProps, actions)(FeaturedProductList);
