import React, { Fragment, memo } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

interface Props {
  isLoading: boolean;
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
    padding: '0 30px',
  },
  div: {
    width: '100%',
  },
});

export const LoadingAnimation = ({ isLoading = true }: Props) => {
  const classes = useStyles({});
  return (
    <Fragment>
      {isLoading && (
        <div className={classes.root}>
          {/* The LinearProgress needs an additional div to wrap it
              in order to show the position correctly. */}
          <div className={classes.div}>
            <LinearProgress />
          </div>
        </div>
      )}
    </Fragment>
  );
};
/* istanbul ignore next */
const mapStateToProps = state => ({ isLoading: state.isLoading });
export default connect(mapStateToProps, null)(memo(LoadingAnimation));
