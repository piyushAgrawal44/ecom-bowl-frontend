import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RangeSlider from '../../Common/RangeSlider';
import actions from '../../../actions';
import { connect } from 'react-redux';
import SelectOption from '../../Common/SelectOption';

const priceMarks = {
  1: { label: <p className='fw-normal text-black'>$1</p> },
  5000: { label: <p className='fw-normal text-black'>$5000</p> }
};

const rateMarks = {
  0: {
    label: (
      <span>
        <span className='mr-1'>5</span>
        <i className='fa fa-star fa-1x' style={{ display: 'contents' }} aria-hidden='true'></i>
      </span>
    )
  },
  20: {
    label: (
      <span>
        <span className='mr-1'>4</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  40: {
    label: (
      <span>
        <span className='mr-1'>3</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  60: {
    label: (
      <span>
        <span className='mr-1'>2</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  80: {
    label: (
      <span>
        <span className='mr-1'>1</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  100: { label: <span>Any</span> }
};

const rating = (v) => {
  switch (v) {
    case 100:
      return 0;
    case 80:
      return 1;
    case 60:
      return 2;
    case 40:
      return 3;
    case 20:
      return 4;
    default:
      return 5;
  }
};

class ProductFilter extends Component {
  componentDidMount() {
    console.log(this.props, 'this.props')
    this.props.fetchStoreCategories();
  }

  render() {
    const { filterProducts, categories } = this.props;

    return (
      <div className='product-filter'>
        <Card className='mb-4'>
          <CardHeader tag='h3'>Price</CardHeader>
          <CardBody>
            <div className='mx-2 mb-3'>
              <RangeSlider
                marks={priceMarks}
                defaultValue={[1, 2500]}
                max={5000}
                onChange={(v) => {
                  filterProducts('price', v);
                }}
              />
            </div>
          </CardBody>
        </Card>
        <Card className='mb-4'>
          <CardHeader tag='h3'>Rating</CardHeader>
          <CardBody>
            <div className='mx-2 mb-4'>
              <RangeSlider
                type='slider'
                marks={rateMarks}
                step={20}
                defaultValue={[100]}
                onChange={(v) => {
                  filterProducts('rating', rating(v));
                }}
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader tag='h3'>Category</CardHeader>
          <CardBody>
            <div className='mx-2 mb-4'>
              <SelectOption
                label={'Select Category'}
                options={categories}
                handleSelectChange={option => {
                  filterProducts('category', option?option.value:null);
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.storeCategories.map((category)=>{
      return {
        label: category.name,
        value: category.slug
      }
    })
  };
};

export default connect(mapStateToProps, actions)(ProductFilter);
