import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '@kevinwang0316/i18n';
import { ReactTabulator } from 'react-tabulator';

import '../styles/tabulator_bootstrap4.min.module.css';
import { fetchWorkflowsByUser as fetchWorkflowsByUserAction } from '../actions/WorkflowActions';

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
    title: I18n.get('tbTitleTag'), field: 'tags', align: 'left', headerSort: false,
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
};

export const WorkflowTable = ({ workflows, fetchWorkflowsByUser }) => {
  useEffect(() => {
    if (!workflows.isFetched) fetchWorkflowsByUser();
  });
  return (
    <ReactTabulator
      data={workflows.data}
      columns={columns}
      tooltips
      layout="fitColumns"
      options={tableOptions}
    />
  );
};
WorkflowTable.propTypes = {
  workflows: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchWorkflowsByUser: PropTypes.func.isRequired,
};
const mapStateToProps = ({ workflows }) => ({ workflows });
const mapDispatchToProps = { fetchWorkflowsByUser: fetchWorkflowsByUserAction };
export default connect(mapStateToProps, mapDispatchToProps)(WorkflowTable);
