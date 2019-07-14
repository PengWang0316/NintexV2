import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Check as CheckIcon } from '@material-ui/icons';

import { DashboardNumCard } from '../../../app/components/cards/DashboardNumCard';
import JssProviderWrapper from '../../libs/JssProviderWrapper';

// jest.mock('@material-ui/core/styles/makeStyles', () => jest.fn().mockReturnValue(jest.fn().mockReturnValue({ card: 'card', cardDiv: 'cardDiv', contentDiv: 'contentDiv' })));
// jest.mock('@material-ui/core/styles/withStyles', () => jest.fn().mockReturnValue({}));

describe('DashboardNumCard Component', () => {
  const defaultProps = {
    displayNum: 1,
    title: 'title',
    icon: <CheckIcon />,
    extraContent: <div>Extra Content Text</div>,
  };

  test('content without displayNum', () => {
    const { queryByText } = render(<DashboardNumCard {...{ ...defaultProps, displayNum: null, extraContent: null }} />);
    expect(queryByText('--')).not.toBeNull();
  });

  test('content with displayNum 10', () => {
    const { queryByText } = render(<DashboardNumCard {...{ ...defaultProps, displayNum: 10, extraContent: null }} />);
    expect(queryByText('--')).toBeNull();
    expect(queryByText('10')).not.toBeNull();
  });

  test('content with displayNum 10000', () => {
    const { queryByText } = render(<DashboardNumCard {...{ ...defaultProps, displayNum: 10000, extraContent: null }} />);
    expect(queryByText('--')).toBeNull();
    expect(queryByText('10,000')).not.toBeNull();
  });

  test('Snapshot without displayNum and extraContent', () => expect(renderer.create(JssProviderWrapper(<DashboardNumCard {...{ ...defaultProps, displayNum: null, extraContent: null }} />)).toJSON()).toMatchSnapshot());
  test('Snapshot with displayNum and extraContent', () => expect(renderer.create(JssProviderWrapper(<DashboardNumCard {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
});
