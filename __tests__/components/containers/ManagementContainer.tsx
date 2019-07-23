import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { ManagementContainer } from '../../../app/components/containers/ManagementContainer';
import JssProviderWrapper from '../../libs/JssProviderWrapper';

jest.mock('../../../app/components/WorkflowTable', () => () => <>WorkflowTable</>);

describe('ManagementContainer component', () => {
  const defaultProps = {
    user: null,
    currentAuthenticatedUser: jest.fn(),
  };
  beforeEach(() => jest.clearAllMocks());

  test('useEffect calls currentAuthenticatedUser', () => {
    render(<ManagementContainer {...{ ...defaultProps }} />);
    expect(defaultProps.currentAuthenticatedUser).toHaveBeenCalledTimes(1);
  });

  test('Snapshot without user', () => expect(renderer.create(JssProviderWrapper(<ManagementContainer {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
  test('Snapshot with user', () => expect(renderer.create(JssProviderWrapper(<ManagementContainer {...{ ...defaultProps, user: { nickname: 'name' } }} />)).toJSON()).toMatchSnapshot());
});
