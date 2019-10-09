import React from 'react';
import renderer from 'react-test-renderer';
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
    const component = shallow(<AddTagDialog {...{ ...defaultProps }} />);
    let circlePicker = component.find('CirclePicker');
    expect(circlePicker.length).toBe(1);
    expect(circlePicker.props().color).toBe('#f44336');

    circlePicker.simulate('changeComplete', { hex: 'new color' });
    circlePicker = component.find('CirclePicker');
    expect(circlePicker.props().color).toBe('new color');
  });

  test('handleInputChange', () => {
    const component = shallow(<AddTagDialog {...{ ...defaultProps }} />);
    let textField = component.find('TextField');
    expect(textField.props().value).toBe('');
    textField.simulate('change', { target: { value: 'newValue' } });

    textField = component.find('TextField');
    expect(textField.props().value).toBe('newValue');
  });

  test('handleAddBtnClick', () => {
    const component = shallow(<AddTagDialog {...{ ...defaultProps }} />);
    component.find('CirclePicker').simulate('changeComplete', { hex: '#111111' });
    component.find('TextField').simulate('change', { target: { value: 'tagText' } });
    component.find('Button').at(0).simulate('click');

    expect(defaultProps.addTag).toHaveBeenCalledTimes(1);
    expect(defaultProps.addTag).toHaveBeenLastCalledWith('tagText', '#111111');
    expect(component.find('CirclePicker').props().color).toBe('#f44336');
    expect(component.find('TextField').props().value).toBe('');
  });

  test('Snapshot with tags', () => expect(renderer.create(JssProviderWrapper(<AddTagDialog {...{ ...defaultProps }} />)).toJSON()).toMatchSnapshot());
  test('Snapshot without tags', () => expect(renderer.create(JssProviderWrapper(<AddTagDialog {...{ ...defaultProps, tags: null }} />)).toJSON()).toMatchSnapshot());
});
