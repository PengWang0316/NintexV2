import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { InstanceCountCard } from '../../../app/components/cards/InstanceCountCard';
import JssProviderWrapper from '../../libs/JssProviderWrapper';

describe('InstanceCountCard Component', () => {
  const defaultProps = {
    instanceCount: null,
    fetchInstanceCount: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test('useEffect call fetchInstanceCount', () => {
    render(<InstanceCountCard {...{ ...defaultProps }} />);
    expect(defaultProps.fetchInstanceCount).toHaveBeenCalledTimes(1);
  });

  test('Snapshot with null instanceCount', () => expect(renderer.create(JssProviderWrapper(<InstanceCountCard {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
  test('Snapshot with the instanceCount', () => expect(renderer.create(JssProviderWrapper(<InstanceCountCard {...{ ...defaultProps, instanceCount: 10 }} />)).toJSON()).toMatchSnapshot());
});
