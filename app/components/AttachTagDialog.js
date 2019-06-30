import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Chip,
} from '@material-ui/core';
import I18n from '@kevinwang0316/i18n';

import { updateTagFromWorkflow as updateTagFromWorkflowAction } from '../store/Workflows/actions';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

export const AttachTagDialog = ({
  isOpen, handleClose, tags, workflowId, workflows, updateTagFromWorkflow,
}) => {
  const existedTagIds = Object.keys(workflows.data).length !== 0 && workflowId && workflows.data[workflowId].tags ? workflows.data[workflowId].tags.split(',') : [];
  const handleTagClick = event => updateTagFromWorkflow(
    workflowId,
    `${workflows.data[workflowId].tags ? `${workflows.data[workflowId].tags},` : ''}${event.target.tagName === 'span' ? event.target.parentNode.parentNode.getAttribute('name') : event.target.parentNode.getAttribute('name')}`,
  );


  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="md"
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{I18n.get('addTagDialogTitle')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {I18n.get('attachTagDialogContent')}
        </DialogContentText>
        {tags && workflows && (
          <div>
            {Object.keys(tags).filter(tagId => !existedTagIds.includes(tagId)).map(tag => (
              <Chip
                label={`${tags[tag][0]}`}
                key={`${tags[tag][0]}${tags[tag][1]}`}
                name={`${tag}`}
                clickable
                onClick={handleTagClick}
                style={{ backgroundColor: `${tags[tag][1]}`, margin: '0 10px 5px 0', color: 'white' }}
              />
            ))}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {I18n.get('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
AttachTagDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  workflowId: PropTypes.string,
  workflows: PropTypes.objectOf(PropTypes.any),
  handleClose: PropTypes.func.isRequired,
  updateTagFromWorkflow: PropTypes.func.isRequired,
  tags: PropTypes.objectOf(PropTypes.array),
};
AttachTagDialog.defaultProps = { tags: null, workflowId: null, workflows: null };
const mapStateToProps = state => ({
  tags: state.tags,
  workflows: state.workflows,
});
const mapDispatchToProps = dispatch => ({
  updateTagFromWorkflow:
    (workflowId, tagIds) => dispatch(updateTagFromWorkflowAction(workflowId, tagIds)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AttachTagDialog);
