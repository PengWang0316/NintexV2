import React from 'react';
import { createGenerateClassName, jssPreset } from '@material-ui/styles';
import JssProvider from 'react-jss/lib/JssProvider';

/*
 * This JSS provider wrapper can help to create a consistent class name for JSS.
 * It can be used for snapshot testing.
 * The idea comes from Yuri Akimov's GitHub post.
 */

const generateClassName = (rule, styleSheet) => `${styleSheet.options.classNamePrefix}-${rule.key}`;

const JssProviderWrapper = (component: React.ReactElement): React.ReactElement => (
  <JssProvider generateClassName={generateClassName}>
    {component}
  </JssProvider>
);

export default JssProviderWrapper;
