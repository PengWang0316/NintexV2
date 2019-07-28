import React from 'react';
import renderer from 'react-test-renderer';

import { LoadingAnimation } from '../../../app/components/SharedComponents/LoadingAnimation';
import JssProviderWrapper from '../../libs/JssProviderWrapper';

describe('LoadingAnimation component', () => {
  const defaultProps = { isLoading: true };
  test('Snapshot with isLoading true', () => expect(renderer.create(JssProviderWrapper(<LoadingAnimation {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
  test('Snapshot with isLoading false', () => expect(renderer.create(JssProviderWrapper(<LoadingAnimation {...{ ...defaultProps, isLoading: false }} />)).toJSON()).toMatchSnapshot());
});
