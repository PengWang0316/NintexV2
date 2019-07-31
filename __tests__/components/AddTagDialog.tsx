import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import { AddTagDialog } from '../../app/components/AddTagDialog';
import JssProviderWrapper from '../libs/JssProviderWrapper';

jest.mock('react-color', () => ({ CirclePicker: 'CirclePicker' }));
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/DialogContentText', () => 'DialogContentText');
jest.mock('@material-ui/core/DialogTitle', () => 'DialogTitle');
jest.mock('@material-ui/core/Chip', () => 'Chip');
jest.mock('@material-ui/core/TextField', () => 'TextField');

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

  test('handleChangeComplete', () => {
    // const component = renderer.create(<AddTagDialog {...{ ...defaultProps }} />);
    const component = shallow(<AddTagDialog {...{ ...defaultProps }} />);
    // console.log(component.root.find(renderer.create(CirclePicker).root));
    // expect(component.root.find(renderer.create(CirclePicker).root)).toBe(true);
    expect(component.find('CirclePicker').length).toBe(1);
    expect(component.find('CirclePicker').props().color).toBe('#f44336');

    // component.find('CirclePicker').props().onChangeComplete('new color');
    component.find('CirclePicker').simulate('changeComplete', { hex: 'new color' });
    expect(component.find('CirclePicker').props().color).toBe('new color');
  });

  test('Snapshot with tags', () => expect(renderer.create(JssProviderWrapper(<AddTagDialog {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
  test('Snapshot without tags', () => expect(renderer.create(JssProviderWrapper(<AddTagDialog {...{ ...defaultProps, tags: null }} />)).toJSON()).toMatchSnapshot());
});
