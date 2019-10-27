import React, {
  useState, Fragment, memo, useCallback, ReactElement,
} from 'react';
import {
  Button, Input, Dialog, DialogActions, DialogContent, Typography,
  DialogTitle, DialogContentText,
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles';
import I18n from '@kevinwang0316/i18n';

import CustomizedSnackbar from './CustomizedSnackbar';
import ProgressDialog from './ProgressDialog';
import { uploadWorkflows } from '../actions/WorkflowActions';
import { uploadInstances } from '../actions/InstanceActions';
import { uploadActions } from '../actions/ActionActions';

interface Props {
  open: boolean;
  handleClose: (event: React.MouseEvent) => void;
}

const useStyles = makeStyles({
  uploadTitle: { marginTop: 15 },
  inputDiv: { display: 'flex' },
  uploadBtn: { marginLeft: 15 },
  successBg: { backgroundColor: green[600] },
});

export const FileUploadDialog = ({ open = false, handleClose }: Props): ReactElement => {
  const classes = useStyles({});
  const [isOpenProgressDialog, setIsOpenProgressDialog] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [workflows, setWorkflows] = useState();
  const [instances, setInstances] = useState();
  const [actions, setActions] = useState();

  const handleWorkflowsChange = useCallback(({ target }) => setWorkflows(target), []);
  const handleInstancesChange = useCallback(({ target }) => setInstances(target), []);
  const handleActionsChange = useCallback(({ target }) => setActions(target), []);

  const handleSnakbarClose = useCallback(() => setIsOpenSnackbar(false), []);

  const handleWorkflowsParse = (text) => {
    uploadWorkflows(text);
    setIsOpenProgressDialog(false);
    setIsOpenSnackbar(true);
  };

  /* handle click workflows upload button */
  const handleWorkflowsUpload = () => {
    if (workflows) {
      setIsOpenProgressDialog(true);
      const reader = new FileReader();
      reader.onloadend = () => handleWorkflowsParse(reader.result);
      reader.readAsText(workflows.files[0]);
      workflows.value = null;
      setWorkflows(null);
    }
  };

  const handleInstancesParse = (text) => {
    uploadInstances(text);
    setIsOpenProgressDialog(false);
    setIsOpenSnackbar(true);
  };

  /* handle click workflows upload button */
  const handleInstancesUpload = () => {
    if (instances) {
      setIsOpenProgressDialog(true);
      const reader = new FileReader();
      reader.onloadend = () => handleInstancesParse(reader.result);
      reader.readAsText(instances.files[0]);
      instances.value = null;
      setInstances(null);
    }
  };

  const handleActionsParse = (text) => {
    uploadActions(text);
    setIsOpenProgressDialog(false);
    setIsOpenSnackbar(true);
  };

  /* handle click workflows upload button */
  const handleActionsUpload = () => {
    if (actions) {
      setIsOpenProgressDialog(true);
      const reader = new FileReader();
      reader.onloadend = () => handleActionsParse(reader.result);
      reader.readAsText(actions.files[0]);
      actions.value = null;
      setActions(null);
    }
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{I18n.get('addAccountDialogTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{I18n.get('uploadFileDialogContent')}</DialogContentText>
          <Typography color="inherit" variant="body1" className={classes.uploadTitle}>{I18n.get('uploadWorkflowTitle')}</Typography>
          <div className={classes.inputDiv}>
            <Input
              id="workflows"
              type="file"
              fullWidth
              onChange={handleWorkflowsChange}
              inputProps={{ accept: '.csv' }}
            />
            <Button size="small" className={classes.uploadBtn} color="primary" onClick={handleWorkflowsUpload} data-testid="uploadBtn">Upload</Button>
          </div>
          <Typography color="inherit" variant="body1" className={classes.uploadTitle}>{I18n.get('uploadInstanceTitle')}</Typography>
          <div className={classes.inputDiv}>
            <Input
              id="instances"
              type="file"
              fullWidth
              onChange={handleInstancesChange}
              inputProps={{ accept: '.csv' }}
            />
            <Button size="small" className={classes.uploadBtn} color="primary" onClick={handleInstancesUpload}>Upload</Button>
          </div>
          <Typography color="inherit" variant="body1" className={classes.uploadTitle}>{I18n.get('uploadActionTitle')}</Typography>
          <div className={classes.inputDiv}>
            <Input
              id="actions"
              type="file"
              fullWidth
              onChange={handleActionsChange}
              inputProps={{ accept: '.csv' }}
            />
            <Button size="small" className={classes.uploadBtn} color="primary" onClick={handleActionsUpload}>Upload</Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {I18n.get('close')}
          </Button>
        </DialogActions>
      </Dialog>
      <ProgressDialog open={isOpenProgressDialog} />
      <CustomizedSnackbar
        open={isOpenSnackbar}
        handleClose={handleSnakbarClose}
        backgroundColor={green[600]}
        content={I18n.get('snackbarMessage')}
      />
    </Fragment>
  );
};
/* istanbul ignore next */
// const mapDispatchToProps = { addAccount: addAccountAction };
// export default connect(null, mapDispatchToProps)(AddAccountDialog);
export default memo(FileUploadDialog);
