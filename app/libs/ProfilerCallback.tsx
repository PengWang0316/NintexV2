const onRenderCallback = (
  id: string, // the "id" prop of the Profiler tree that has just committed
  phase: string, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration: number, // time spent rendering the committed update
  baseDuration: number, // estimated time to render the entire subtree without memoization
  startTime: number, // when React began rendering this update
  commitTime: number, // when React committed this update
  interactions, // the Set of interactions belonging to this update
) => {
  console.log(`%c id: ${id} `, 'color: white; background-color: #36bfff; size: 18px; font-weight: bold;');
  console.log(`Phase : ${phase}`);
  console.log(`ActualDuration : ${actualDuration}`);
  console.log(`BaseDuration : ${baseDuration}`);
  console.log(`StartTime : ${startTime}`);
  console.log(`CommitTime : ${commitTime}`);
  console.log(`Interactions : ${interactions}`);
  console.log('');
};

export default onRenderCallback;
