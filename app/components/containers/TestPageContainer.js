import React, { useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from '@kevinwang0316/i18n';

import { amplifyAuthSignOption } from '../../config';
import { currentAuthenticatedUser as currentAuthenticatedUserAction } from '../../actions/UserActions';

const TestPageContainer = ({ user, currentAuthenticatedUser }) => {
  useEffect(() => {
    if (!user) currentAuthenticatedUser();
  });
  return <Typography color="textPrimary" variant="h6">{I18n.get('testPageContent')}</Typography>;
};

TestPageContainer.propTypes = {
  user: PropTypes.object,
  currentAuthenticatedUser: PropTypes.func.isRequired,
};
TestPageContainer.defaultProps = { user: null };

/* istanbul ignore next */
const mapStateToProps = state => ({ user: state.user });
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  currentAuthenticatedUser: user => dispatch(currentAuthenticatedUserAction(user)),
});

export default withAuthenticator(
  connect(mapStateToProps, mapDispatchToProps)(TestPageContainer),
  amplifyAuthSignOption,
);
