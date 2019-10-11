import React, { ReactElement } from 'react';
import { Close as CloseIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';
import {
  IconButton, Fade, Snackbar, SnackbarContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  open: boolean;
  handleClose: (event: React.MouseEvent) => void;
  backgroundColor: string;
  content: string;
  duration?: number;
}

const useStyles = makeStyles(theme => ({
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
}));

export const CustomizedSnackbar = ({
  open, handleClose, backgroundColor, content, duration = 3000,
}: Props): ReactElement => {
  const classes = useStyles({});
  return (
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
};

export default CustomizedSnackbar;
