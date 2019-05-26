import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { lightGreen } from '@material-ui/core/colors';
import { SupervisedUserCircle } from '@material-ui/icons';
import I18n from '@kevinwang0316/i18n';

import DashboardNumCard from './DashboardNumCard';
import { fetchPublisherCount as fetchPublisherCountAction } from '../../actions/ActionActions';

const styles = {
  cardIcon: {
    fontSize: 36,
    color: lightGreen[500],
  },
};

export const PublisherCountCard = ({ classes, publisherCount, fetchPublisherCount }) => {
  useEffect(() => {
    if (!publisherCount) fetchPublisherCount();
  });

  return <DashboardNumCard displayNum={publisherCount} title={I18n.get('cardTitleWorkflowPublisher')} icon={<SupervisedUserCircle className={classes.cardIcon} />} />;
};

PublisherCountCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  publisherCount: PropTypes.number,
  fetchPublisherCount: PropTypes.func.isRequired,
};
PublisherCountCard.defaultProps = {
  publisherCount: null,
};
const mapStateToProps = state => ({ publisherCount: state.publisherCount });
const mapDispatchToProps = { fetchPublisherCount: fetchPublisherCountAction };
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PublisherCountCard));
