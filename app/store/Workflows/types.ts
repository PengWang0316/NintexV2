export interface Workflow {
  workflowId: string;
  workflowName: string;
  publishDate: string;
  publisher: string;
  tag: string | null;
  locationPath?: string;
  isActive?: number;
  tenant?: string;
  isMonitored?: number;
}

// interface OfficeWorkflow extends BaseWorkflowDate {
//   locationPath: string;
// }

// interface NwcWorkflow extends BaseWorkflowDate {
//   isActive: number;
//   tenant: string;
//   isMonitored: number;
// }

// export type Workflow = OfficeWorkflow | NwcWorkflow;

export interface Workflows {
  isFetched: boolean;
  data: {
    [workflowId: string]: Workflow;
  };
}
