import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { WorkflowCountCard } from '../../../app/components/cards/WorkflowCountCard';
import JssProviderWrapper from '../../libs/JssProviderWrapper';

describe('WorkflowCountCard component', () => {
  const defaultProps = {
    workflowCount: null,
    fetchWorkflowCount: jest.fn(),
  };
  beforeEach(() => jest.clearAllMocks());

  test('useEffect with fetchWorkflowCount call', () => {
    render(<WorkflowCountCard {...{ ...defaultProps }} />);
    expect(defaultProps.fetchWorkflowCount).toHaveBeenCalledTimes(1);
  });

  test('Snapshot without workflowCount', () => expect(renderer.create(JssProviderWrapper(<WorkflowCountCard {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
  test('Snapshot with workflowCount', () => expect(renderer.create(JssProviderWrapper(<WorkflowCountCard {...{ ...defaultProps, workflowCount: 10 }} />)).toJSON()).toMatchSnapshot());
});
