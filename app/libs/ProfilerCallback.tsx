import chalk from 'chalk';

const onRenderCallback = (
  id: string, // the "id" prop of the Profiler tree that has just committed
  phase: string, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration: number, // time spent rendering the committed update
  baseDuration: number, // estimated time to render the entire subtree without memoization
  startTime: number, // when React began rendering this update
  commitTime: number, // when React committed this update
  interactions, // the Set of interactions belonging to this update
) => {
  console.log(chalk.white.bgBlueBright.bold(id));
  console.log(`${chalk.blue.bold('Phase')} : ${phase}`);
  console.log(`${chalk.blue.bold('ActualDuration')} : ${actualDuration}`);
  console.log(`${chalk.blue.bold('BaseDuration')} : ${baseDuration}`);
  console.log(`${chalk.blue.bold('StartTime')} : ${startTime}`);
  console.log(`${chalk.blue.bold('CommitTime')} : ${commitTime}`);
  console.log(`${chalk.blue.bold('Interactions')} : ${interactions}`);
};

export default onRenderCallback;
