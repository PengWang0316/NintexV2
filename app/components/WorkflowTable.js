import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { red } from '@material-ui/core/colors';
import I18n from '@kevinwang0316/i18n';
import { ReactTabulator, reactFormatter } from 'react-tabulator';

import Tags from './Tags';
import LoadingAnimation from './SharedComponents/LoadingAnimation';
import {
  fetchWorkflowsByUser as fetchWorkflowsByUserAction,
  updateTagFromWorkflow as updateTagFromWorkflowAction,
  runWorkflow as runWorkflowAction, stopWorkflow as stopWorkflowAction,
  switchMonitor as switchMonitorAction,
} from '../actions/WorkflowActions';
import AttachTagDialog from './AttachTagDialog';
import WorkflowActions from './WorkflowActions';
import { fetchTags as fetchTagsAction } from '../actions/TagActions';
import CustomizedSnackbar from './CustomizedSnackbar';


// import does not work well with the MiniCssExtractPlugin
require('../styles/tabulator_bootstrap4.css');

// TODO: Hide some columns to fit into different screen sizes
const columns = [
  {
    title: I18n.get('tbTitleName'), field: 'workflowName', align: 'left', sorter: 'string', widthGrow: 2, headerFilter: 'input',
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
    width: 150,
  },
  {
    title: I18n.get('tbTitleAuthorName'), field: 'publisher', align: 'left', sorter: 'string', widthGrow: 1, headerFilter: 'input',
  },
  {
    title: I18n.get('tbTitleTag'),
    field: 'tags',
    align: 'left',
    headerSort: false,
    variableHeight: true,
    widthGrow: 2,
    // formatter: reactFormatter(<Tags tags={tags} />),
  },
  {
    title: I18n.get('tbTitleAction'),
    field: 'isActive',
    align: 'right',
    headerSort: false,
    width: 148,
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
  {
    titel: '',
    field: 'isMonitored',
    visible: false,
  },
];

const tableOptions = {
  pagination: 'local',
  paginationSize: 15,
  height: '100%',
  initialSort: [{ column: 'publishDate', dir: 'desc' }],
  // resizableRows: true,
};
// Use to make sure the fetching is just called onece
let isFetching = false;
let isFetchingTags = false;

export const WorkflowTable = ({
  workflows, fetchWorkflowsByUser, tags, switchMonitor, fetchTags,
  updateTagFromWorkflow, nwcKeys, runWorkflow, stopWorkflow,
}) => {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

  useEffect(() => {
    if (!workflows.isFetched && !isFetching) {
      fetchWorkflowsByUser();
      isFetching = true;
    }
    if (!tags && !isFetchingTags) {
      fetchTags();
      isFetchingTags = true;
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [workflowId, setWorkflowId] = useState(null);

  const toggleTagDialog = () => setIsOpen(state => !state);
  const showTagDialog = (id) => {
    setWorkflowId(id);
    toggleTagDialog();
  };
  const handleSnakbarClose = () => setIsOpenSnackbar(false);

  const handleRunAction = (currentWorkflowId, tenant) => {
    if (!nwcKeys.data[tenant]) setIsOpenSnackbar(true);
    else runWorkflow(currentWorkflowId, nwcKeys.data[tenant][1]);
  };

  const handleStopAction = (currentWorkflowId, tenant) => {
    if (!nwcKeys.data[tenant]) setIsOpenSnackbar(true);
    else stopWorkflow(currentWorkflowId, nwcKeys.data[tenant][1]);
  };

  const handleExportAction = (currentWorkflowId, tenant) => {
    if (!nwcKeys.data[tenant]) setIsOpenSnackbar(true);
    // else stopWorkflow(currentWorkflowId, nwcKeys.data[tenant][1]);
  };

  const handleMoveAction = (currentWorkflowId, tenant) => {
    if (!nwcKeys.data[tenant]) setIsOpenSnackbar(true);
    // else stopWorkflow(currentWorkflowId, nwcKeys.data[tenant][1]);
  };

  const handleDeleteAction = (currentWorkflowId, tenant) => {
    if (!nwcKeys.data[tenant]) setIsOpenSnackbar(true);
    // else stopWorkflow(currentWorkflowId, nwcKeys.data[tenant][1]);
  };

  const handleMonitorAction = (currentWorkflowId, tenant, isMonitored) => {
    if (!nwcKeys.data[tenant]) setIsOpenSnackbar(true);
    else switchMonitor(currentWorkflowId, tenant, isMonitored, nwcKeys.data[tenant][1]);
  };

  columns[4].formatter = reactFormatter(
    <WorkflowActions
      handleRun={handleRunAction}
      handleStop={handleStopAction}
      handleExport={handleExportAction}
      handleMove={handleMoveAction}
      handleDelete={handleDeleteAction}
      handleMonitor={handleMonitorAction}
    />,
  );


  // After tags load from Redux, set formatters to some column
  if (tags) {
    columns[3].formatter = reactFormatter(
      <Tags tags={tags} handleRemoveTag={updateTagFromWorkflow} handleAddTag={showTagDialog} />,
    );
  }

  return (
    <Fragment>
      {(!tags || !nwcKeys.isFetch || !workflows.data) && <LoadingAnimation />}
      {tags && nwcKeys.isFetch && workflows.isFetched && (
        <ReactTabulator
          data={Object.values(workflows.data)}
          columns={columns}
          tooltips
          layout="fitColumns"
          options={tableOptions}
        />
      )}
      <AttachTagDialog isOpen={isOpen} handleClose={toggleTagDialog} workflowId={workflowId} />
      <CustomizedSnackbar
        open={isOpenSnackbar}
        handleClose={handleSnakbarClose}
        backgroundColor={red[600]}
        content={I18n.get('snackbarNoKeyMessage')}
      />
    </Fragment>
  );
};
WorkflowTable.propTypes = {
  workflows: PropTypes.objectOf(PropTypes.any).isRequired,
  nwcKeys: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchWorkflowsByUser: PropTypes.func.isRequired,
  tags: PropTypes.objectOf(PropTypes.array),
  updateTagFromWorkflow: PropTypes.func.isRequired,
  runWorkflow: PropTypes.func.isRequired,
  stopWorkflow: PropTypes.func.isRequired,
  switchMonitor: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired,
};
WorkflowTable.defaultProps = { tags: null };
const mapStateToProps = ({
  workflows, tags, nwcKeys,
}) => ({
  workflows, tags, nwcKeys,
});
const mapDispatchToProps = dispatch => ({
  fetchWorkflowsByUser: () => dispatch(fetchWorkflowsByUserAction()),
  fetchTags: () => dispatch(fetchTagsAction()),
  updateTagFromWorkflow:
    (workflowId, tagIds) => dispatch(updateTagFromWorkflowAction(workflowId, tagIds)),
  runWorkflow: (workflowId, key) => dispatch(runWorkflowAction(workflowId, key)),
  stopWorkflow: (workflowId, key) => dispatch(stopWorkflowAction(workflowId, key)),
  switchMonitor: (workflowId, tenant, isMonitored, key) => dispatch(switchMonitorAction(workflowId, tenant, isMonitored, key)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WorkflowTable);
