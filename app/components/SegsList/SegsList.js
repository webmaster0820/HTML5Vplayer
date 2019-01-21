import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';

const SegsList = ({ loading, error, segs }) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <List item={['Something went wrong, please try again!']} />
    );
    return <List component={ErrorComponent} />;
  }

  if (segs !== false) {
    return <List items={segs} component={LoadingIndicator} />;
  }

  return null;
};

SegsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  segs: PropTypes.any
};

export default SegsList;
