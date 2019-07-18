import React from 'react';
import renderer from 'react-test-renderer';

import { InstanceCountCard } from '../../../app/components/cards/InstanceCountCard';
import JssProviderWrapper from '../../libs/JssProviderWrapper';

describe('InstanceCountCard Component', () => {
  const defaultProps = {
    instanceCount: null,
    fetchInstanceCount: jest.fn(),
  };
  test('Snapshot with null instanceCount', () => expect(renderer.create(JssProviderWrapper(<InstanceCountCard {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
  test('Snapshot with the instanceCount', () => expect(renderer.create(JssProviderWrapper(<InstanceCountCard {...{ ...defaultProps, instanceCount: 10 }} />)).toJSON()).toMatchSnapshot());
});
