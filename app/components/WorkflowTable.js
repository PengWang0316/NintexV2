import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '@kevinwang0316/i18n';
import { ReactTabulator, reactFormatter } from 'react-tabulator';
import Tags from './Tags';

import '../styles/tabulator_bootstrap4.min.module.css';
import LoadingAnimation from './SharedComponents/LoadingAnimation';
import {
  fetchWorkflowsByUser as fetchWorkflowsByUserAction,
  removeTagFromWorkflow as removeTagFromWorkflowAction,
} from '../actions/WorkflowActions';

const columns = [
  {
    title: I18n.get('tbTitleName'), field: 'workflowName', align: 'left', sorter: 'string',
  },
  {
    title: I18n.get('tbTitlePublishDate'),
    field: 'publishDate',
    align: 'left',
    sorter: 'date',
    formatter: 'datetime',
    formatterParams: {
      outputFormat: 'YYYY-MM-DD',
    },
    sorterParams: {
      format: 'YYYY-MM-DD',
      alignEmptyValues: 'top',
    },
  },
  {
    title: I18n.get('tbTitleName'), field: 'publisher', align: 'left', sorter: 'string',
  },
  {
    title: I18n.get('tbTitleTag'),
    field: 'tags',
    align: 'left',
    headerSort: false,
    variableHeight: true,
    // formatter: reactFormatter(<Tags tags={tags} />),
  },
  {
    title: I18n.get('tbTitleAction'), align: 'left', sorter: 'string',
  },
  {
    titel: '',
    field: 'workflowId',
    visible: false,
  },
  {
    titel: '',
    field: 'locationPath',
    visible: false,
  },
];

const tableOptions = {
  pagination: 'local',
  paginationSize: 15,
  height: '100%',
  // resizableRows: true,
};

export const WorkflowTable = ({
  workflows, fetchWorkflowsByUser, tags, removeTagFromWorkflow,
}) => {
  useEffect(() => {
    if (!workflows.isFetched) fetchWorkflowsByUser();
  });

  // After tags load from Redux, set it as the formatter
  if (tags) columns[3].formatter = reactFormatter(<Tags tags={tags} handleRemoveTag={removeTagFromWorkflow} />);

  return (
    <Fragment>
      {!tags && <LoadingAnimation />}
      {tags && (
      <ReactTabulator
        data={Object.values(workflows.data)}
        columns={columns}
        tooltips
        layout="fitColumns"
        options={tableOptions}
      />
      )}
    </Fragment>
  );
};
WorkflowTable.propTypes = {
  workflows: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchWorkflowsByUser: PropTypes.func.isRequired,
  tags: PropTypes.objectOf(PropTypes.array),
  removeTagFromWorkflow: PropTypes.func.isRequired,
};
WorkflowTable.defaultProps = { tags: null };
const mapStateToProps = ({ workflows, tags }) => ({ workflows, tags });
const mapDispatchToProps = dispatch => ({
  fetchWorkflowsByUser: () => dispatch(fetchWorkflowsByUserAction()),
  removeTagFromWorkflow: (workflowId, tagIds) => dispatch(removeTagFromWorkflowAction(workflowId, tagIds)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WorkflowTable);
