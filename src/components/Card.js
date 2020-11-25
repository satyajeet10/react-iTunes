import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';

export default class CardProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, category } = this.props;

    return (
      <Card style={{ width: '18rem' }}>
        <Card.Header>{this.props?.['im:name']?.label}</Card.Header>
        <Image className='m-2' src={`${this.props?.['im:image']?.[0]?.label}`} fluid roundedCircle />
        <Card.Body>
          <Card.Title>{title?.label}</Card.Title>
          <Card.Text>Category: {category?.attributes?.label}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className='text-muted'>{this.props?.['im:releaseDate']?.attributes?.label}</small>
        </Card.Footer>
      </Card>
    );
  }
}

CardProfile.propTypes = {
  title: PropTypes.object,
  'im:name': PropTypes.object,
  'im:name.label': PropTypes.string,
  author: PropTypes.object,
  'im:releaseDate': PropTypes.object,
  'im:image': PropTypes.array,
  searchData: PropTypes.string,
  rights: PropTypes.object,
  'rights.label': PropTypes.string,
  category: PropTypes.object,
  attributes: PropTypes.object,
  label: PropTypes.string
};
