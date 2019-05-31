/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chip, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  addBtn: {
    color: blue[300],
  },
});

// Since this component will be passed from the table formatter, it is not under the Redux's Provider.
// So, it can not use connect to connect to Reudx store. All props has to be pass from the parent component.
export const Tags = ({
  cell, tags, handleRemoveTag, handleAddTag,
}) => {
  const classes = useStyles();
  const tagIds = (cell && cell._cell.value) ? cell._cell.value.split(',') : null;

  const handleDelete = (event) => {
    const divElement = event.target.tagName === 'path' ? event.target.parentNode.parentNode : event.target.parentNode;
    const tagId = divElement.getAttribute('name');
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
        <Chip
          label={`${tags[tag][0]}`}
          key={`${tags[tag][0]}${tags[tag][1]}`}
          name={`${tag}`}
          clickable
          onDelete={handleDelete}
          style={{ backgroundColor: `#${tags[tag][1]}`, margin: '0 10px 5px 0', color: 'white' }}
        />
      ))}
      <IconButton className={classes.addBtn} onClick={handleAddTagClick}><AddCircle fontSize="small" /></IconButton>
    </div>
  );
};
Tags.propTypes = {
  cell: PropTypes.objectOf(PropTypes.any),
  tags: PropTypes.objectOf(PropTypes.array).isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
};
Tags.defaultProps = {
  cell: null,
};
export default Tags;
