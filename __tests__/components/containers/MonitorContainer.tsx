import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { MonitorContainer } from '../../../app/components/containers/MonitorContainer';
import JssProviderWrapper from '../../libs/JssProviderWrapper';

jest.mock('../../../app/components/MonitorList', () => () => <>MonitorList</>);

describe('MonitorContainer component', () => {
  const defaultProps = {
    user: null,
    workflows: {
      isFetched: false,
      data: {
        anc: {
          workflowId: 'string',
          workflowName: 'string',
          publishDate: 'string',
          publisher: 'string',
          tags: null,
        },
      },
    },
    currentAuthenticatedUser: jest.fn(),
    fetchWorkflowsByUser: jest.fn(),
  };
  beforeEach(() => jest.clearAllMocks());

  // test('');

  test('Snapshot', () => expect(renderer.create(JssProviderWrapper(<MonitorContainer {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
});
