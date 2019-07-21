import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { HomePage } from '../../../app/components/containers/HomePageContainer';
import JssProviderWrapper from '../../libs/JssProviderWrapper';

jest.mock('../../../app/components/WorkflowRunInstanceChart', () => () => <>WorkflowRunInstanceChart</>);
jest.mock('../../../app/components/WorkflowLocationChart', () => () => <>WorkflowRunInstanceChart</>);
jest.mock('../../../app/components/cards/WorkflowCountCard', () => () => <>WorkflowRunInstanceChart</>);
jest.mock('../../../app/components/cards/InstanceCountCard', () => () => <>WorkflowRunInstanceChart</>);
jest.mock('../../../app/components/cards/PublisherCountCard', () => () => <>WorkflowRunInstanceChart</>);
jest.mock('../../../app/components/cards/HealthScoreCard', () => () => <>WorkflowRunInstanceChart</>);
jest.mock('../../../app/components/TopPublishersList', () => () => <>WorkflowRunInstanceChart</>);
jest.mock('../../../app/components/WorkflowUseChart', () => () => <>WorkflowRunInstanceChart</>);
jest.mock('../../../app/components/WorkflowActionUseWordCloud', () => () => <>WorkflowRunInstanceChart</>);

describe('HomePageContainer componnet', () => {
  const defaultProps = {
    user: null,
    currentAuthenticatedUser: jest.fn(),
  };
  beforeEach(() => jest.clearAllMocks());

  test('Test the useEffect call the currentAuthenticatedUser fn', () => {
    render(<HomePage {...{ ...defaultProps }} />);
    expect(defaultProps.currentAuthenticatedUser).toHaveBeenCalledTimes(1);
  });

  test('Test the useEffect does not call the currentAuthenticatedUser fn', () => {
    render(<HomePage {...{ ...defaultProps, user: { nickname: 'name' } }} />);
    expect(defaultProps.currentAuthenticatedUser).not.toHaveBeenCalled();
  });

  test('Snapshot without user', () => expect(renderer.create(JssProviderWrapper(<HomePage {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
  test('Snapshot with user', () => expect(renderer.create(JssProviderWrapper(<HomePage {...{ ...defaultProps, user: { nickname: 'name' } }} />)).toJSON()).toMatchSnapshot());
});
