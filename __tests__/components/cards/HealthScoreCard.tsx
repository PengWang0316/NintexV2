import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { HealthScoreCard } from '../../../app/components/cards/HealthScoreCard';
import JssProviderWrapper from '../../libs/JssProviderWrapper';

describe('HealthScoreCard Component', () => {
  const defaultProps = {
    instanceStatus: {
      completedPercentage: '90',
      failedPercentage: '10',
      startedPercentage: '30',
      faultingPercentage: '0',
      runningPercentage: '0',
      terminatedPercentage: '0',
      cancelledPercentage: '0',
    },
    fetchInstanceStatus: jest.fn(),
  };

  test('HealthScoreCard snapshot without instanceStatus', () => expect(renderer.create(JssProviderWrapper(<HealthScoreCard {...{ ...defaultProps, instanceStatus: null }} />)).toJSON()).toMatchSnapshot());
  test('HealthScoreCard snapshot with instanceStatus', () => expect(renderer.create(JssProviderWrapper(<HealthScoreCard {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
});
