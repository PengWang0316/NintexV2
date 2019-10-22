import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { CustomizedSnackbar } from '../../app/components/CustomizedSnackbar';

jest.mock('@material-ui/icons/Close', () => 'Close');
jest.mock('@material-ui/icons/CheckCircle', () => 'CheckCircle');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/Fade', () => 'Fade');
jest.mock('@material-ui/core/Snackbar', () => 'Snackbar');
jest.mock('@material-ui/core/SnackbarContent', () => 'SnackbarContent');

describe('Test CustomizedSnackbar component', () => {
  const defaultProps = {
    open: false,
    handleClose: jest.fn(),
    backgroundColor: 'backgroundColor',
    content: 'content',
    duration: 2,
  };

  beforeEach(() => jest.clearAllMocks());

  it('Should render correctly', () => {
    const component = shallow(<CustomizedSnackbar {...defaultProps} />);

    expect(component.exists('Snackbar')).toBe(true);
    const snackbarContent = component.find('SnackbarContent');
    expect(component.exists('SnackbarContent')).toBe(true);
    expect((snackbarContent.prop('message') as any).type).toBe('span');
    expect((snackbarContent.prop('message') as any).props.children[1]).toBe(defaultProps.content);
    expect((snackbarContent.prop('action')[0] as any).type).toBe('IconButton');
    expect((snackbarContent.prop('action')[0] as any).props.children.type).toBe('Close');
  });

  it('Should call the handleClose function', () => {
    const component = shallow(<CustomizedSnackbar {...defaultProps} />);
    (component.find('Snackbar').prop('onClose') as Function)();
    expect(defaultProps.handleClose).toHaveBeenCalledTimes(1);
  });

  test('Snapshot test', () => expect(renderer.create(<CustomizedSnackbar {...defaultProps} />).toJSON()).toMatchSnapshot());
});
