import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { HealthScoreCard } from '../../../app/components/cards/HealthScoreCard';
import JssProviderWrapper from '../../libs/JssProviderWrapper';

describe('HealthScoreCard Component', () => {
  const defaultProps = {
    instanceStatus: null,
    fetchInstanceStatus: jest.fn(),
  };

  test('HealthScoreCard snapshot without instanceStatus', () => expect(renderer.create(JssProviderWrapper(<HealthScoreCard {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
});
