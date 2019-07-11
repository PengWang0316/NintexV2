import React from 'react';
import renderer from 'react-test-renderer';
import { Check as CheckIcon } from '@material-ui/icons';

import { DashboardNumCard } from '../../../app/components/cards/DashboardNumCard';

describe('DashboardNumCard Component', () => {
  const defaultProps = {
    displayNum: 1,
    title: 'title',
    icon: CheckIcon,
    extraContent: CheckIcon,
  };



  test('Snapshot without displayNum and extraContent', () => expect(renderer.create(<DashboardNumCard {...{ ...defaultProps, displayNum: null, extraContent: null }} />).toJSON()).toMatchSnapshot());
  test('Snapshot with displayNum and extraContent', () => expect(renderer.create(<DashboardNumCard {...{ ...defaultProps }} />).toJSON()).toMatchSnapshot());
});
