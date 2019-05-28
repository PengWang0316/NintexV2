import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withAuthenticator } from 'aws-amplify-react';

import { amplifyAuthSignOption } from '../../config';
import WorkflowRunInstanceChart from '../WorkflowRunInstanceChart';
import WorkflowLocationChart from '../WorkflowLocationChart';
import WorkflowCountCard from '../cards/WorkflowCountCard';
import InstanceCountCard from '../cards/InstanceCountCard';
import PublisherCountCard from '../cards/PublisherCountCard';
import HealthScoreCard from '../cards/HealthScoreCard';
import TopPublishersList from '../TopPublishersList';
import WorkflowUseChart from '../WorkflowUseChart';
import WorkflowActionUseWordCloud from '../WorkflowActionUseWordCloud';
import { currentAuthenticatedUser as currentAuthenticatedUserAction } from '../../actions/UserActions';

const useStyles = makeStyles({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0 30px 0',
    flexWrap: 'wrap',
    '& > div': {
      marginBottom: 10,
    },
  },
  rootDiv: {
    paddingLeft: 50,
  },
});

const HomePage = ({ user, currentAuthenticatedUser }) => {
  useEffect(() => {
    if (!user) currentAuthenticatedUser();
  });
  const classes = useStyles();

  return (
    <div className={classes.rootDiv}>
      <div className={classes.cardContainer}>
        <div className={classes.cardContainer}>
          <WorkflowCountCard />
          <InstanceCountCard />
        </div>
        <div className={classes.cardContainer}>
          <PublisherCountCard />
          <HealthScoreCard />
        </div>
      </div>
      <Grid container>
        <Grid item md={6} sm={12} xs={12}><WorkflowRunInstanceChart /></Grid>
        <Grid item md={6} sm={12} xs={12}><WorkflowLocationChart /></Grid>
      </Grid>
      <Grid container alignContent="center" style={{ paddingLeft: 20 }}>
        <Grid item lg={4} md={5} sm={6} xs={12}><TopPublishersList /></Grid>
        <Grid item lg={4} md={7} sm={6} xs={12}><WorkflowUseChart /></Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}><WorkflowActionUseWordCloud /></Grid>
      </Grid>
    </div>

  );
};

HomePage.propTypes = {
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
  connect(mapStateToProps, mapDispatchToProps)(HomePage),
  amplifyAuthSignOption,
);
