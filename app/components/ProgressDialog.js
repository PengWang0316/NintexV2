import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import I18n from '@kevinwang0316/i18n';

const styles = {
  progressDiv: {
    minHeight: 100,
    margin: '30px 50px 0 50px',
    minWidth: 250,
  },
};

export const ProgressDialog = ({ open, classes }) => (
  <Dialog open={open}>
    <DialogTitle>{I18n.get('progressDialogTitle')}</DialogTitle>
    <div className={classes.progressDiv}>
      <LinearProgress />
    </div>
  </Dialog>
);
ProgressDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(ProgressDialog);
