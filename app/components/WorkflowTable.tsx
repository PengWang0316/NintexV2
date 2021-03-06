import React, {
  useEffect, useState, Fragment, useMemo, useCallback, memo, ReactElement,
} from 'react';
import { connect } from 'react-redux';
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
} from '../store/Workflows/actions';
import AttachTagDialog from './AttachTagDialog';
import WorkflowActions from './WorkflowActions';
import { fetchTags as fetchTagsAction } from '../store/Tags/actions';
import CustomizedSnackbar from './CustomizedSnackbar';
import {
  Workflows, SwitchMonitorActInterface, UpdateTagFromWorkflowInterface,
  RunWorkflowInterface, StopWorkflowInterface,
} from '../store/Workflows/types';
import { TagsType } from '../store/Tags/types';
import { NWCKeysType } from '../store/NWCKeys/types';
import { AppState } from '../store/ConfigureStore';

// import does not work well with the MiniCssExtractPlugin
require('../styles/tabulator_bootstrap4.css');

interface Props {
  workflows: Workflows;
  fetchWorkflowsByUser: Function;
  tags: TagsType;
  switchMonitor: SwitchMonitorActInterface;
  fetchTags: Function;
  updateTagFromWorkflow: UpdateTagFromWorkflowInterface;
  nwcKeys: NWCKeysType;
  runWorkflow: RunWorkflowInterface;
  stopWorkflow: StopWorkflowInterface;
}

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
  workflows, fetchWorkflowsByUser, tags = null, switchMonitor, fetchTags,
  updateTagFromWorkflow, nwcKeys, runWorkflow, stopWorkflow,
}: Props): ReactElement => {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const workflowData = useMemo(() => Object.values(workflows.data), [workflows.data]);
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
  const showTagDialog = useCallback((id) => {
    setWorkflowId(id);
    toggleTagDialog();
  }, []);
  const handleSnakbarClose = useCallback(() => setIsOpenSnackbar(false), []);

  const handleRunAction = useCallback((currentWorkflowId, tenant) => {
    if (!nwcKeys.data[tenant]) setIsOpenSnackbar(true);
    else runWorkflow(currentWorkflowId, nwcKeys.data[tenant][1]);
  }, [nwcKeys.data]);

  const handleStopAction = useCallback((currentWorkflowId, tenant) => {
    if (!nwcKeys.data[tenant]) setIsOpenSnackbar(true);
    else stopWorkflow(currentWorkflowId, nwcKeys.data[tenant][1]);
  }, [nwcKeys.data]);

  const handleExportAction = useCallback((currentWorkflowId, tenant) => {
    if (!nwcKeys.data[tenant]) setIsOpenSnackbar(true);
    // else stopWorkflow(currentWorkflowId, nwcKeys.data[tenant][1]);
  }, [nwcKeys.data]);

  const handleMoveAction = useCallback((currentWorkflowId, tenant) => {
    if (!nwcKeys.data[tenant]) setIsOpenSnackbar(true);
    // else stopWorkflow(currentWorkflowId, nwcKeys.data[tenant][1]);
  }, [nwcKeys.data]);

  const handleDeleteAction = useCallback((currentWorkflowId, tenant) => {
    if (!nwcKeys.data[tenant]) setIsOpenSnackbar(true);
    // else stopWorkflow(currentWorkflowId, nwcKeys.data[tenant][1]);
  }, [nwcKeys.data]);

  const handleMonitorAction = useCallback((currentWorkflowId, tenant, isMonitored) => {
    if (!nwcKeys.data[tenant]) setIsOpenSnackbar(true);
    else switchMonitor(currentWorkflowId, tenant, isMonitored, nwcKeys.data[tenant][1]);
  }, [nwcKeys.data]);

  columns[4].formatter = useMemo(() => reactFormatter(
    <WorkflowActions
      handleRun={handleRunAction}
      handleStop={handleStopAction}
      handleExport={handleExportAction}
      handleMove={handleMoveAction}
      handleDelete={handleDeleteAction}
      handleMonitor={handleMonitorAction}
    />,
  ), [nwcKeys.data]);

  columns[3].formatter = useMemo(() => reactFormatter(
    <Tags tags={tags} handleRemoveTag={updateTagFromWorkflow} handleAddTag={showTagDialog} />,
  ), [tags]);

  return (
    <Fragment>
      {(!tags || !nwcKeys.isFetch || !workflows.data) && <LoadingAnimation />}
      {tags && nwcKeys.isFetch && workflows.isFetched && (
        <ReactTabulator
          data={workflowData}
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

const mapStateToProps = ({
  workflows, tags, nwcKeys,
}: AppState) => ({
  workflows, tags, nwcKeys,
});
const mapDispatchToProps = (dispatch: Function) => ({
  fetchWorkflowsByUser: () => dispatch(fetchWorkflowsByUserAction()),
  fetchTags: () => dispatch(fetchTagsAction()),
  updateTagFromWorkflow: (
    workflowId: string, tagIds: null | string,
  ) => dispatch(updateTagFromWorkflowAction(workflowId, tagIds)),
  runWorkflow: (workflowId: string, key: string) => dispatch(runWorkflowAction(workflowId, key)),
  stopWorkflow: (workflowId: string, key: string) => dispatch(stopWorkflowAction(workflowId, key)),
  switchMonitor: (
    workflowId: string, tenant: string, isMonitored: number, key: string,
  ) => dispatch(switchMonitorAction(workflowId, tenant, isMonitored, key)),
});
export default connect(mapStateToProps, mapDispatchToProps)(memo(WorkflowTable));
