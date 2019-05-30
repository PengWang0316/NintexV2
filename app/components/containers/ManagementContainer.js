import React, { useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { amplifyAuthSignOption } from '../../config';
import { currentAuthenticatedUser as currentAuthenticatedUserAction } from '../../actions/UserActions';
import WorkflowTable from '../WorkflowTable';

const useStyles = makeStyles({
  rootDiv: {
    width: '95%',
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 0 0 85px',
  },
});

const ManagementContainer = ({ user, currentAuthenticatedUser }) => {
  const classes = useStyles();
  useEffect(() => {
    if (!user) currentAuthenticatedUser();
  });
  return (
    <div className={classes.rootDiv}>
      <WorkflowTable />
    </div>
  );
};

ManagementContainer.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  currentAuthenticatedUser: PropTypes.func.isRequired,
};
ManagementContainer.defaultProps = { user: null };

/* istanbul ignore next */
const mapStateToProps = state => ({ user: state.user });
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  currentAuthenticatedUser: user => dispatch(currentAuthenticatedUserAction(user)),
});

export default withAuthenticator(
  connect(mapStateToProps, mapDispatchToProps)(ManagementContainer),
  amplifyAuthSignOption,
);
