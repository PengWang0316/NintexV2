import React from 'react';
import PropTypes from 'prop-types';
import { Close as CloseIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';
import {
  IconButton, Fade, Snackbar, SnackbarContent,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

export const CustomizedSnackbar = ({
  open, handleClose, backgroundColor, content, duration, classes,
}) => (
  <Snackbar
    open={open}
    onClose={handleClose}
    TransitionComponent={Fade}
    autoHideDuration={duration}
  >
    <SnackbarContent
      style={{ backgroundColor }}
      message={(
        <span className={classes.message}>
          <CheckCircleIcon className={classes.iconVariant} />
          {content}
        </span>
      )}
      action={[
        <IconButton
          key="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />
  </Snackbar>
);
CustomizedSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  duration: PropTypes.number,
};
CustomizedSnackbar.defaultProps = { duration: 3000 };
export default withStyles(styles)(CustomizedSnackbar);
