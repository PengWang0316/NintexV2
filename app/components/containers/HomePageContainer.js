import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import I18n from '@kevinwang0316/i18n';
import PropTypes from 'prop-types';

import { currentAuthenticatedUser as currentAuthenticatedUserAction } from '../../actions/UserActions';

const HomePage = ({ user, currentAuthenticatedUser }) => {
  useEffect(() => {
    if (!user) currentAuthenticatedUser();
  });

  return <Typography color="textPrimary" variant="h6">{I18n.get('homePageContent')}</Typography>;
};

HomePage.propTypes = {
  user: PropTypes.object,
  currentAuthenticatedUser: PropTypes.func.isRequired,
};
HomePage.defaultProps = { user: null };

/* istanbul ignore next */
const mapStateToProps = state => ({ user: state.user });
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  currentAuthenticatedUser: user => dispatch(currentAuthenticatedUserAction(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
