import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import ReactWordcloud from 'react-wordcloud';
import { makeStyles } from '@material-ui/core/styles';

import { fetchActionNameCount as fetchActionNameCountAction } from '../store/ActionNameCount/actions';
import { ActionnameCount } from '../store/ActionNameCount/types';
import { AppState } from '../store/ConfigureStore';

interface Props {
  actionNameCount: ActionnameCount;
  fetchActionNameCount: Function;
}

const useStyles = makeStyles(() => ({
  rootDiv: {
    width: '100%',
    height: 400,
  },
}));

let isFetching = false;

export const WorkflowActionUseWordCloud = ({ actionNameCount, fetchActionNameCount }: Props) => {
  useEffect(() => {
    if (!actionNameCount.isFetched && !isFetching) {
      fetchActionNameCount();
      isFetching = true;
    }
  });

  const classes = useStyles({});
  return (
    <div className={classes.rootDiv} data-testid="WorkflowActionUseWordCloud">
      <ReactWordcloud
        words={actionNameCount.data}
        maxWords={60}
        options={{
          rotations: 0,
          fontFamily: 'impact',
          fontSizes: [5, 40],
          fontStyle: 'normal',
          fontWeight: 'normal',
          padding: 1,
          // layout: 'scale',
          // rotationAngles: [0, 90],
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  actionNameCount: state.actionNameCount,
});
const mapDispatchToProps = {
  fetchActionNameCount: fetchActionNameCountAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(WorkflowActionUseWordCloud));
