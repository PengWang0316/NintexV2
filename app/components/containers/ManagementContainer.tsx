import React, { useEffect, memo, Profiler } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { amplifyAuthSignOption } from '../../config';
import { currentAuthenticatedUser as currentAuthenticatedUserAction } from '../../store/User/actions';
import WorkflowTable from '../WorkflowTable';
import { AppState } from '../../store/ConfigureStore';
import { UserType } from '../../store/User/types';
import onRenderCallback from '../../libs/ProfilerCallback';

interface Props {
  user: UserType | null;
  currentAuthenticatedUser: Function;
}

const useStyles = makeStyles({
  rootDiv: {
    width: '95%',
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 0 0 85px',
  },
});

export const ManagementContainer = ({ user = null, currentAuthenticatedUser }: Props) => {
  const classes = useStyles({});
  useEffect(() => {
    if (!user) currentAuthenticatedUser();
  });
  return (
    <div className={classes.rootDiv}>
      <Profiler id="WorkflowTable" onRender={onRenderCallback}>
        <WorkflowTable />
      </Profiler>
    </div>
  );
};

/* istanbul ignore next */
const mapStateToProps = (state: AppState) => ({ user: state.user });
/* istanbul ignore next */
const mapDispatchToProps = { currentAuthenticatedUser: currentAuthenticatedUserAction };

export default withAuthenticator(
  connect(mapStateToProps, mapDispatchToProps)(memo(ManagementContainer)),
  amplifyAuthSignOption,
);
