import React from 'react';
import { Col } from 'react-bootstrap';

function ProductListItem(props) {
  const { product: { title, price, imagePath} } = props;
  console.log(props);

  return (
    <Col md={4}>
      <img src={imagePath} width="80%" />
      <h4>{title}</h4>
      <p>{price}</p>
    </Col>
  );
}

export default ProductListItem;