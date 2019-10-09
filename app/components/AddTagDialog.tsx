import React, {
  useState, memo, ReactElement, ChangeEvent,
} from 'react';
import { connect } from 'react-redux';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Chip, TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import I18n from '@kevinwang0316/i18n';
import { CirclePicker } from 'react-color';

import { addTag as addTagAction } from '../store/Tags/actions';
import { TagsType } from '../store/Tags/types';
import { AppState } from '../store/ConfigureStore';

interface Props {
  open: boolean;
  tags: TagsType | null;
  addTag: (content: string, color: string) => void;
  handleClose: (event: React.MouseEvent) => void;
}

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

const DEFAULT_COLOT = '#f44336';
const COLOR_REGEXP = /^#[\d\w]{6}$/;

export const AddTagDialog = ({
  open, handleClose, tags = null, addTag,
}: Props): ReactElement => {
  const classes = useStyles({});
  const [tagColor, setTagColor] = useState(DEFAULT_COLOT);
  const [tagText, setTagText] = useState('');

  const handleChangeComplete = color => setTagColor(color.hex);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setTagText(event.target.value);

  const handleAddBtnClick = () => {
    // Do a validation here and also do it in the backend again
    if (tagText && tagText !== '' && tagColor.match(COLOR_REGEXP)) {
      addTag(tagText, tagColor);
      setTagText('');
      setTagColor(DEFAULT_COLOT);
    }
  };

  return (
    <Dialog
      open={open}
      keepMounted
      maxWidth="md"
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{I18n.get('addTagDialogTitle')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {I18n.get('addTagDialogExist')}
        </DialogContentText>
        {tags && (
          <div>
            {Object.keys(tags).map(tag => (
              <Chip
                label={`${tags[tag][0]}`}
                key={`${tags[tag][0]}${tags[tag][1]}`}
                clickable
                style={{ backgroundColor: `${tags[tag][1]}`, margin: '0 10px 5px 0', color: 'white' }}
              />
            ))}
          </div>
        )}
        <DialogContentText className={classes.secondContentText}>
          {I18n.get('addTagDialogContent')}
        </DialogContentText>
        <div className={classes.flexDiv}>
          <div>
            <div>
              <TextField
                label={I18n.get('tagContentTitle')}
                value={tagText}
              // className={classes.textField}
                margin="normal"
                onChange={handleInputChange}
              />
            </div>
            <div className={classes.btnDiv}>
              <Button size="small" variant="outlined" onClick={handleAddBtnClick} color="secondary">
                {I18n.get('add')}
              </Button>
            </div>

          </div>
          <div><CirclePicker onChangeComplete={handleChangeComplete} color={tagColor} /></div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {I18n.get('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state: AppState) => ({
  tags: state.tags,
});
const mapDispatchToProps = dispatch => ({
  addTag: (content: string, color: string) => dispatch(addTagAction(content, color)),
});
export default connect(mapStateToProps, mapDispatchToProps)(memo(AddTagDialog));
