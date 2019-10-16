import React, { useEffect, memo, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { lightGreen } from '@material-ui/core/colors';
import { SupervisedUserCircle } from '@material-ui/icons';
import I18n from '@kevinwang0316/i18n';

import DashboardNumCard from './DashboardNumCard';
import { fetchPublisherCount as fetchPublisherCountAction } from '../../store/PublisherCount/actions';
import { PublisherCount as PublisherCountType } from '../../store/PublisherCount/types';
import { AppState } from '../../store/ConfigureStore';

interface Props {
  publisherCount: PublisherCountType;
  fetchPublisherCount: () => void;
}

const useStyles = makeStyles({
  cardIcon: {
    fontSize: 36,
    color: lightGreen[500],
  },
});
let isFetching = false;

export const PublisherCountCard = (
  { publisherCount = null, fetchPublisherCount }: Props,
): ReactElement => {
  const classes = useStyles({});
  useEffect(() => {
    if (!publisherCount && !isFetching) {
      fetchPublisherCount();
      isFetching = true;
    }
  });

  return <DashboardNumCard displayNum={publisherCount} title={I18n.get('cardTitleWorkflowPublisher')} icon={<SupervisedUserCircle className={classes.cardIcon} />} />;
};

const mapStateToProps = (state: AppState) => ({ publisherCount: state.publisherCount });
const mapDispatchToProps = { fetchPublisherCount: fetchPublisherCountAction };
export default connect(mapStateToProps, mapDispatchToProps)((memo)(PublisherCountCard));
