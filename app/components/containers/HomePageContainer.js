import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withAuthenticator } from 'aws-amplify-react';

import { amplifyAuthSignOption } from '../../config';
import WorkflowRunInstanceChart from '../WorkflowRunInstanceChart';
import WorkflowLocationChart from '../WorkflowLocationChart';
import WorkflowCountCard from '../cards/WorkflowCountCard';
import InstanceCountCard from '../cards/InstanceCountCard';
import PublisherCountCard from '../cards/PublisherCountCard';
import HealthScoreCard from '../cards/HealthScoreCard';
import TopPublisherList from '../TopPublishersList';
import WorkflowActionUseWordCloud from '../WorkflowActionUseWordCloud';
import { currentAuthenticatedUser as currentAuthenticatedUserAction } from '../../actions/UserActions';

const styles = {
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  },
};

const HomePage = ({ user, currentAuthenticatedUser, classes }) => {
  useEffect(() => {
    if (!user) currentAuthenticatedUser();
  });

  return (
    <Fragment>
      <div className={classes.cardContainer}>
        <WorkflowCountCard />
        <InstanceCountCard />
        <PublisherCountCard />
        <HealthScoreCard />
      </div>
      <div className={classes.cardContainer}>
        <WorkflowRunInstanceChart />
        <WorkflowLocationChart />
      </div>
      <div className={classes.cardContainer}>
        <TopPublisherList />
        <WorkflowActionUseWordCloud />
      </div>
    </Fragment>

  );
};

HomePage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  currentAuthenticatedUser: PropTypes.func.isRequired,
};
HomePage.defaultProps = { user: null };

/* istanbul ignore next */
const mapStateToProps = state => ({ user: state.user });
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  currentAuthenticatedUser: user => dispatch(currentAuthenticatedUserAction(user)),
});
export default withAuthenticator(
  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HomePage)),
  amplifyAuthSignOption,
);
