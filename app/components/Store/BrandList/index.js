import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';

const BrandList = props => {
  const { brands, isLoading } = props;

  // Skeleton loader
  const renderSkeleton = () => {
    const skeletonItems = Array.from({ length: 4 }); // Show 4 skeletons

    return skeletonItems.map((_, index) => (
      <Col xs='6' md='4' lg='3' key={index} className='mb-3 px-2'>
        <Card style={{ backgroundColor: '#f9f9f9', border: '1px solid #e0e0e0' }}>
          <CardBody>
            <CardTitle
              tag="h5"
              style={{
                width: '80%',
                height: '20px',
                backgroundColor: '#ccc',
                marginBottom: '10px'
              }}
            ></CardTitle>
            <CardText
              style={{
                width: '100%',
                height: '15px',
                backgroundColor: '#e0e0e0',
                marginBottom: '6px'
              }}
            ></CardText>
            <CardText
              style={{
                width: '60%',
                height: '15px',
                backgroundColor: '#ddd'
              }}
            ></CardText>
          </CardBody>
        </Card>
      </Col>
    ));
  };

  return (
    <div className='brand-list'>
      <h3 className='text-uppercase'>Shop By Brand</h3>
      <hr />
      <Row className='flex-sm-row'>
        {isLoading ? (
          renderSkeleton()
        ) : (
          brands.map((brand, index) => (
            <Col xs='6' md='4' lg='3' key={index} className='mb-3 px-2'>
              <Link
                to={`/shop/brand/${brand.slug}`}
                className='d-block brand-box'
              >
                <h5 className='brand-name'>{brand.name}</h5>
                <p className='brand-desc'>{brand.description}</p>
              </Link>
            </Col>
          ))
        )}

        {!isLoading && brands.length === 0 && (
          <Col xs='12' className='text-center'>
            <p>No brands available</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default BrandList;
