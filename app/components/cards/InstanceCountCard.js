import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { orange } from '@material-ui/core/colors';
import { GroupWork } from '@material-ui/icons';
import I18n from '@kevinwang0316/i18n';

import DashboardNumCard from './DashboardNumCard';
import { fetchInstanceCount as fetchInstanceCountAction } from '../../actions/InstanceActions';

const styles = {
  cardIcon: {
    fontSize: 36,
    color: orange[500],
  },
};

export const InstanceCountCard = ({ classes, instanceCount, fetchInstanceCount }) => {
  useEffect(() => {
    if (!instanceCount) fetchInstanceCount();
  });

  return <DashboardNumCard displayNum={instanceCount} title={I18n.get('cardTitleWorkflowInstances')} icon={<GroupWork className={classes.cardIcon} />} />;
};

InstanceCountCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  instanceCount: PropTypes.number,
  fetchInstanceCount: PropTypes.func.isRequired,
};
InstanceCountCard.defaultProps = {
  instanceCount: null,
};
const mapStateToProps = state => ({ instanceCount: state.instanceCount });
const mapDispatchToProps = { fetchInstanceCount: fetchInstanceCountAction };
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InstanceCountCard));
