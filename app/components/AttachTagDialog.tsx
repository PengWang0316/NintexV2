import React, { memo, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Chip,
} from '@material-ui/core';
import { ChipProps } from '@material-ui/core/Chip';
import I18n from '@kevinwang0316/i18n';

import { updateTagFromWorkflow as updateTagFromWorkflowAction } from '../store/Workflows/actions';
import { TagsType } from '../store/Tags/types';
import { Workflows } from '../store/Workflows/types';
import { AppState } from '../store/ConfigureStore';

// Use a customized interface to add name prop to the Chip
interface CustomizedChipType extends ChipProps {
  name: string;
}

// Defind a new wrapper for the Chip component
const CustomizedChip: React.ElementType = (props: CustomizedChipType) => <Chip {...props} />;


interface Props {
  isOpen: boolean;
  tags: TagsType;
  workflowId: string;
  workflows: Workflows;
  handleClose: (event: React.MouseEvent) => void;
  updateTagFromWorkflow: (workflowId: string, tagIds: string) => void;
}

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

export const AttachTagDialog = ({
  isOpen, handleClose, tags = null, workflowId = null, workflows = null, updateTagFromWorkflow,
}: Props) => {
  const existedTagIds = useMemo(() => (Object.keys(workflows.data).length !== 0 && workflowId && workflows.data[workflowId].tags ? workflows.data[workflowId].tags.split(',') : []), [workflows.data]);
  const handleTagClick = useCallback((event: React.MouseEvent) => {
    const target: HTMLElement = event.target as HTMLElement;
    updateTagFromWorkflow(
      workflowId,
      `${workflows.data[workflowId].tags ? `${workflows.data[workflowId].tags},` : ''}${target.tagName === 'span' ? (target.parentNode.parentNode as HTMLElement).getAttribute('name') : (target.parentNode as HTMLElement).getAttribute('name')}`,
    );
  }, [workflows.data]);

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition as React.ComponentType}
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
              <CustomizedChip
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
const mapStateToProps = (state: AppState) => ({
  tags: state.tags,
  workflows: state.workflows,
});
const mapDispatchToProps = dispatch => ({
  updateTagFromWorkflow: (
    workflowId: string, tagIds: string,
  ) => dispatch(updateTagFromWorkflowAction(workflowId, tagIds)),
});
export default connect(mapStateToProps, mapDispatchToProps)(memo(AttachTagDialog));
