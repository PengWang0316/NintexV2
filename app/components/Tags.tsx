/* eslint-disable no-underscore-dangle */
import React, { useEffect, memo } from 'react';
import { Chip, IconButton, Tooltip } from '@material-ui/core';
import { ChipProps } from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import { blue } from '@material-ui/core/colors';
import I18n from '@kevinwang0316/i18n';

import getChipAttribute from '../libs/GetChipAttribute';
import { TagsType } from '../store/Tags/types';

interface CustomizedChipProps extends ChipProps {
  name: string;
}
const CustomizedChip: React.ElementType = (props: CustomizedChipProps) => <Chip {...props} />;

interface Props {
  cell: any;
  tags: TagsType;
  handleRemoveTag: (workflowId: string, tagIds: string | null) => void;
  handleAddTag: (workflowId: string) => void;
}

const useStyles = makeStyles({
  addBtn: {
    color: blue[300],
  },
});

// Since this component will be passed from the table formatter, it is not under the Redux's Provider.
// So, it can not use connect to connect to Reudx store. All props has to be pass from the parent component.
export const Tags = ({
  cell = null, tags = null, handleRemoveTag, handleAddTag,
}: Props) => {
  const classes = useStyles({});
  const tagIds = (cell && cell._cell.value) ? cell._cell.value.split(',') : null;

  const handleDelete = (event) => {
    const tagId = getChipAttribute(event, 'name');
    const { _cell: { row: { data: { workflowId } } } } = cell;
    // Create a new tags string and pass to the action
    const newTags = tagIds.filter(id => id !== tagId);
    handleRemoveTag(workflowId, newTags.length === 0 ? null : newTags.join(','));
  };

  const handleAddTagClick = () => handleAddTag(cell._cell.row.data.workflowId);

  // Update the row height after the tags data was loaded.
  useEffect(() => cell.getRow().normalizeHeight());

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {(tagIds && tags) && tagIds.map(tag => (
        <CustomizedChip
          label={`${tags[tag][0]}`}
          key={`${tags[tag][0]}${tags[tag][1]}`}
          name={`${tag}`}
          clickable
          onDelete={handleDelete}
          style={{ backgroundColor: `${tags[tag][1]}`, margin: '0 10px 5px 0', color: 'white' }}
        />
      ))}
      <Tooltip title={I18n.get('addTag')} placement="right-end"><IconButton className={classes.addBtn} onClick={handleAddTagClick} size="small"><AddCircle fontSize="inherit" /></IconButton></Tooltip>
    </div>
  );
};

export default memo(Tags);
