import React, { useEffect, memo, ReactElement } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { amplifyAuthSignOption } from '../../config';
import MonitorList from '../MonitorList';
import { currentAuthenticatedUser as currentAuthenticatedUserAction } from '../../store/User/actions';
import { fetchWorkflowsByUser as fetchWorkflowsByUserAction } from '../../store/Workflows/actions';
import { AppState } from '../../store/ConfigureStore';
import { UserType } from '../../store/User/types';
import { Workflows } from '../../store/Workflows/types';

interface Props {
  user: UserType | null;
  workflows: Workflows;
  currentAuthenticatedUser: Function;
  fetchWorkflowsByUser: Function;
}

const useStyles = makeStyles({
  rootDiv: {
    width: '95%',
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 0 0 85px',
  },
});

let isFetching = false;

export const MonitorContainer = ({
  user = null, currentAuthenticatedUser, workflows, fetchWorkflowsByUser,
}: Props): ReactElement => {
  const classes = useStyles({});
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

/* istanbul ignore next */
const mapStateToProps = (state: AppState) => ({ ...state });
/* istanbul ignore next */
const mapDispatchToProps = {
  currentAuthenticatedUser: currentAuthenticatedUserAction,
  fetchWorkflowsByUser: fetchWorkflowsByUserAction,
};

export default withAuthenticator(
  connect(mapStateToProps, mapDispatchToProps)(memo(MonitorContainer)),
  amplifyAuthSignOption,
);
