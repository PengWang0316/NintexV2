interface BaseWorkflowDate {
  workflowId: string;
  workflowName: string;
  publishDate: string;
  publisher: string;
  tag: string | null;
}

interface OfficeWorkflows extends BaseWorkflowDate {
  locationPath: string;
}

interface NwcWorkflows extends BaseWorkflowDate {
  isActive: number;
  tenant: string;
  isMonitored: number;
}

export interface Workflows {
  isFetched: boolean;
  data: {
    [workflowId: string]: OfficeWorkflows | NwcWorkflows;
  };
}
