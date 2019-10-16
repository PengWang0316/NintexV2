import React, { useEffect, memo, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { orange } from '@material-ui/core/colors';
import { GroupWork } from '@material-ui/icons';
import I18n from '@kevinwang0316/i18n';

import DashboardNumCard from './DashboardNumCard';
import { fetchInstanceCount as fetchInstanceCountAction } from '../../store/InstanceCount/actions';
import { InstanceCount as InstanceCountType } from '../../store/InstanceCount/types';
import { AppState } from '../../store/ConfigureStore';

interface Props {
  instanceCount: InstanceCountType;
  fetchInstanceCount: () => void;
}

const useStyles = makeStyles({
  cardIcon: {
    fontSize: 36,
    color: orange[500],
  },
});
let isFetching = false;

export const InstanceCountCard = (
  { instanceCount = null, fetchInstanceCount }: Props,
): ReactElement => {
  const classes = useStyles({});
  useEffect(() => {
    if (!instanceCount && !isFetching) {
      fetchInstanceCount();
      isFetching = true;
    }
  });

  return <DashboardNumCard displayNum={instanceCount} title={I18n.get('cardTitleWorkflowInstances')} icon={<GroupWork className={classes.cardIcon} />} />;
};

const mapStateToProps = (state: AppState) => ({ instanceCount: state.instanceCount });
const mapDispatchToProps = { fetchInstanceCount: fetchInstanceCountAction };
export default connect(mapStateToProps, mapDispatchToProps)(memo(InstanceCountCard));
