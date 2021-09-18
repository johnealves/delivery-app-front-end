import React from 'react';
import { connect } from 'react-redux';

const NotFound = () => {
  return (<h1>Page not Found</h1>)
}

export default connect()(NotFound);