import React from 'react';
import PropTypes from 'prop-types';
import { Close as CloseIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';
import green from '@material-ui/core/colors/green';
import {
  IconButton, Fade, Snackbar, SnackbarContent,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import I18n from '@kevinwang0316/i18n';

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
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

export const UploadSnackbar = ({ open, handleClose, classes }) => (
  <Snackbar
    open={open}
    onClose={handleClose}
    TransitionComponent={Fade}
    autoHideDuration={3000}
  >
    <SnackbarContent
      className={classes.success}
      message={(
        <span className={classes.message}>
          <CheckCircleIcon className={classes.iconVariant} />
          {I18n.get('snackbarMessage')}
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
UploadSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(UploadSnackbar);
