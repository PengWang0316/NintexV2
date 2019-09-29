import React, { memo, ReactElement } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import I18n from '@kevinwang0316/i18n';

interface Props { open: boolean }

const useStyles = makeStyles({
  progressDiv: {
    minHeight: 100,
    margin: '30px 50px 0 50px',
    minWidth: 250,
  },
});

export const ProgressDialog = ({ open }: Props): ReactElement => {
  const classes = useStyles({});
  return (
    <Dialog open={open}>
      <DialogTitle>{I18n.get('progressDialogTitle')}</DialogTitle>
      <div className={classes.progressDiv}>
        <LinearProgress />
      </div>
    </Dialog>
  );
};

export default memo(ProgressDialog);
