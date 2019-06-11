import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Chip, TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import I18n from '@kevinwang0316/i18n';

import { addTag as addTagAction } from '../actions/TagActions';

const useStyles = makeStyles({
  flexDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  secondContentText: { marginTop: 30 },
  btnDiv: { textAlign: 'right' },
});

export const KeyManageDialog = ({
  open, handleClose,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      keepMounted
      maxWidth="md"
      onClose={handleClose}
    >
      <DialogTitle>{I18n.get('keyManageDialogTitle')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {I18n.get('keyManageDialogContent')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {I18n.get('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
KeyManageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
// KeyManageDialog.defaultProps = { tags: null };
// const mapStateToProps = state => ({
//   tags: state.tags,
// });
// const mapDispatchToProps = dispatch => ({
//   addTag: (content, color) => dispatch(addTagAction(content, color)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(KeyManageDialog);
export default KeyManageDialog;
