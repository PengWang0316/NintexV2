import React, { useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { amplifyAuthSignOption } from '../../config';
import MonitorList from '../MonitorList';
import { currentAuthenticatedUser as currentAuthenticatedUserAction } from '../../actions/UserActions';
import { fetchWorkflowsByUser as fetchWorkflowsByUserAction } from '../../actions/WorkflowActions';

const useStyles = makeStyles({
  rootDiv: {
    width: '95%',
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 0 0 85px',
  },
});

let isFetching;

const MonitorContainer = ({
  user, currentAuthenticatedUser, workflows, fetchWorkflowsByUser,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (!user) currentAuthenticatedUser();
    if (!isFetching && !workflows.isFetched) {
      fetchWorkflowsByUser();
      isFetching = true;
    }
  });
  return (
    <div className={classes.rootDiv}>
      <MonitorList />
    </div>
  );
};

MonitorContainer.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  workflows: PropTypes.objectOf(PropTypes.any).isRequired,
  currentAuthenticatedUser: PropTypes.func.isRequired,
  fetchWorkflowsByUser: PropTypes.func.isRequired,
};
MonitorContainer.defaultProps = { user: null };

/* istanbul ignore next */
const mapStateToProps = state => ({ ...state });
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  currentAuthenticatedUser: user => dispatch(currentAuthenticatedUserAction(user)),
  fetchWorkflowsByUser: () => dispatch(fetchWorkflowsByUserAction()),
});

export default withAuthenticator(
  connect(mapStateToProps, mapDispatchToProps)(MonitorContainer),
  amplifyAuthSignOption,
);
