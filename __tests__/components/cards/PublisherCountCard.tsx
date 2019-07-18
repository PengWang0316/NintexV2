import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { PublisherCountCard } from '../../../app/components/cards/PublisherCountCard';
import JssProviderWrapper from '../../libs/JssProviderWrapper';

describe('PublisherCountCard component', () => {
  const defaultProps = {
    publisherCount: null,
    fetchPublisherCount: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test('Test useEffect calls fetchPublisherCount', () => {
    render(<PublisherCountCard {...{ ...defaultProps }} />);
    expect(defaultProps.fetchPublisherCount).toHaveBeenCalledTimes(1);
  });

  test('Snapshot with publisherCount null', () => expect(renderer.create(JssProviderWrapper(<PublisherCountCard {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
  test('Snapshot with publisherCount 10', () => expect(renderer.create(JssProviderWrapper(<PublisherCountCard {...{ ...defaultProps, publisherCount: 10 }} />)).toJSON()).toMatchSnapshot());
});
