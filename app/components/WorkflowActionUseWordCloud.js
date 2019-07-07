import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactWordcloud from 'react-wordcloud';
import { makeStyles } from '@material-ui/core/styles';

import { fetchActionNameCount as fetchActionNameCountAction } from '../store/ActionNameCount/actions';

const useStyles = makeStyles(() => ({
  rootDiv: {
    width: '100%',
    // maxWidth: 360,
    height: 400,
  },
}));

let isFetching;

export const WorkflowActionUseWordCloud = ({ actionNameCount, fetchActionNameCount }) => {
  useEffect(() => {
    if (!actionNameCount.isFetched && !isFetching) {
      fetchActionNameCount();
      isFetching = true;
    }
  });

  const classes = useStyles();
  return (
    <div className={classes.rootDiv}>
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
WorkflowActionUseWordCloud.propTypes = {
  fetchActionNameCount: PropTypes.func.isRequired,
  actionNameCount: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = state => ({
  actionNameCount: state.actionNameCount,
});
const mapDispatchToProps = {
  fetchActionNameCount: fetchActionNameCountAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(WorkflowActionUseWordCloud);
