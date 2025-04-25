/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';
import BrandList from '../../components/Store/BrandList';
import FeaturedProductList from '../../components/Store/FeaturedProductList';

class Homepage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStoreBrands();
    this.props.filterProducts();
  }
  render() {
    const { brands, products, isLoading } = this.props;
    return (
      <div className='homepage'>
        <Row className='flex-row'>
          <Col xs='12' lg='6' className='order-lg-2 mb-3 px-3 px-md-2'>
            <div className='home-carousel'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={false}
                slides={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <img key={index} src={item.imageUrl} />
                ))}
              </CarouselSlider>
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2 d-none d-md-block'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/banners/banner-2.jpg' className='mb-3' />
              <img src='/images/banners/banner-5.jpg' />
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/banners/banner-2.jpg' className='mb-3' />
              <img src='/images/banners/banner-6.jpg' />
            </div>
          </Col>
        </Row>
        <div className='mt-5'>
          <BrandList brands={brands} isLoading={isLoading} />
        </div>

        <div className='mt-5'>
          <FeaturedProductList products={products} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    brands: state.brand.storeBrands,
    isLoading: state.brand.isLoading,
    products: state.product.storeProducts,
  };
};

export default connect(mapStateToProps, actions)(Homepage);
