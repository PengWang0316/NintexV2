interface Dictionary {
  [index: string]: {
    [index: string]: string;
  };
}

const dict: Dictionary = {
  'en-US': {
    login: 'login',
    logout: 'logout',
    dashboard: 'Dashboard',
    workflowManager: 'Workflow Manager',
    monitorCenter: 'Monitor Center',
    createTag: 'New tag',
    uploadFile: 'Upload Files',
    appName: 'Workflow Manager',
    close: 'Close',
    addAccountDialogTitle: 'Upload data',
    uploadWorkflowTitle: 'Workflows file',
    uploadInstanceTitle: 'Instances file',
    uploadActionTitle: 'Actions file',
    workflowsLable: 'Workflows CSV file',
    progressDialogTitle: 'Uploading the file',
    snackbarMessage: 'Upload success',
    homePageContent: 'This is the Home Page',
    testPageContent: 'This is the Test Page',
    uploadFileDialogContent: 'You can upload workflows, instances, and actions CSV files. Please use different file input to upload files.',
    cardTitleTotalWorkflows: 'Total Workflows',
    cardTitleWorkflowInstances: 'Workflow Instances',
    cardTitleWorkflowPublisher: 'Workflow Publisher',
    cardTitleWorkflowHealth: 'Workflow Health Score',
    topPublisherTitle: 'Top Five Publishers',
    toPublisherTotal: 'Total published',
    workflowUseChartTitle: 'Workflow Assigned Use',
    tbTitleName: 'Workflow Name',
    tbTitlePublishDate: 'Publish Date',
    tbTitleAuthorName: 'Author Name',
    tbTitleTag: 'Tags',
    tbTitleAction: 'Actions',
    addTagDialogTitle: 'Add A Tag',
    attachTagDialogContent: 'Please select one tag you want to add',
    addTagDialogContent: 'Create a new tag by type the content and select a background color',
    addTagDialogExist: 'Existed Tags list:',
    tagContentTitle: 'Tag Text',
    add: 'Add',
    actionRun: 'Run the workflow',
    actionStop: 'Stop the workflow',
    actionExport: 'Export the workflow',
    actionMove: 'Move the workflow',
    actionDelete: 'Delete the workflow',
    actionMonitor: 'Auto monitor',
    addTag: 'Add a new tag',
    keyManage: 'API keys',
    keyManageDialogTitle: 'Manage API keys',
    keyManageNWCContent: 'NWC API keys',
    keyManageOfficeContent: 'Office365 API keys',
    tenant: 'Tenant',
    apiKey: 'API Key',
    endpoint: 'Office 365 Endpoint',
    cookie: 'Authorization Cookie',
    snackbarNoKeyMessage: 'No API key is found for this tenant',
    monitorListTitle: 'Monitored Workflows',
  },
};

dict.en = dict['en-US'];
// dict['zh-HK'] = dict.zh;
// dict['zh-TW'] = dict.zh;
// dict['zh-CN'] = dict.zh;

export default dict;
