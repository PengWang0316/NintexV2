interface BaseWorkflowDate {
  workflowId: string;
  workflowName: string;
  publishDate: string;
  publisher: string;
  tag: string | null;
}

interface OfficeWorkflow extends BaseWorkflowDate {
  locationPath: string;
}

interface NwcWorkflow extends BaseWorkflowDate {
  isActive: number;
  tenant: string;
  isMonitored: number;
}

export interface Workflows {
  isFetched: boolean;
  data: {
    [workflowId: string]: OfficeWorkflow | NwcWorkflow;
  };
}
