import React from 'react';
import renderer from 'react-test-renderer';

import { AddTagDialog } from '../../app/components/AddTagDialog';
import JssProviderWrapper from '../libs/JssProviderWrapper';

describe('AddTagDialog Component', () => {
  const defaultProps = {
    open: true,
    // tags: { 1: ['IT', 'color1'], 2: ['HR', 'color2'] },
    tags: {},
    addTag: jest.fn(),
    handleClose: jest.fn(),
  };
  defaultProps.tags[1] = ['IT', 'color1'];
  defaultProps.tags[2] = ['HR', 'color2'];
  test('Snapshot with tags', () => expect(renderer.create(JssProviderWrapper(<AddTagDialog {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
});
