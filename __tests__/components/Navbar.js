import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { Navbar } from '../../app/components/Navbar';
import { SIGNIN_PAGE_URL, HOME_PAGE_URL } from '../../app/config';

jest.mock('@material-ui/core/AppBar', () => 'AppBar');
jest.mock('@material-ui/core/Toolbar', () => 'Toolbar');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Hidden', () => 'Hidden');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/Menu', () => 'Menu');
jest.mock('@material-ui/core/MenuItem', () => 'MenuItem');
jest.mock('@material-ui/core/Avatar', () => 'Avatar');
jest.mock('@material-ui/icons/Menu', () => 'MenuIcon');
jest.mock('react-router-dom', () => ({ Link: 'Link', withRouter: jest.fn() }));
jest.mock('@kevinwang0316/i18n', () => ({ get: key => key }));
jest.mock('aws-amplify', () => ({
  Auth: {
    currentAuthenticatedUser: jest.fn().mockReturnValue(Promise.resolve({ id: 'userId' })),
  },
}));

describe('Navbar', () => {
  const defaultProps = {
    classes: {
      link: 'link', appbar: 'appbar', menuLink: 'menuLink', flex1: 'flex1', avatar: 'avatar',
    },
    logout: jest.fn(),
    currentAuthenticatedUser: jest.fn(),
    user: null,
    history: { push: jest.fn() },
  };
  const getShallowComponent = (props = defaultProps) => shallow(<Navbar {...props} />);

  beforeEach(() => {
    defaultProps.logout.mockClear();
    defaultProps.history.push.mockClear();
    defaultProps.currentAuthenticatedUser.mockClear();
  });

  test('Initial state and componentDidMount', () => {
    const component = getShallowComponent();
    expect(component.state('anchorEl')).toBe(null);
    expect(defaultProps.currentAuthenticatedUser).toHaveBeenCalledTimes(1);
  });

  test('handleMenuIconClick', () => {
    const component = getShallowComponent();
    component.instance().handleMenuIconClick({ currentTarget: 'currentTarget' });
    expect(component.state('anchorEl')).toEqual('currentTarget');
    component.instance().handleMenuIconClick({ currentTarget: 'currentTarget' });
    expect(component.state('anchorEl')).toBe(null);
  });

  test('handleLoginButtonClick', () => {
    const component = getShallowComponent();
    component.instance().handleLoginButtonClick();

    expect(defaultProps.logout).not.toHaveBeenCalled();
    expect(defaultProps.history.push).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(SIGNIN_PAGE_URL);

    component.setProps({ user: { nickname: 'name' } });
    component.instance().handleLoginButtonClick();
    expect(defaultProps.logout).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).toHaveBeenCalledTimes(2);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(HOME_PAGE_URL);
  });

  test('NavBar snapshot without user', () => expect(renderer.create(<Navbar {...defaultProps} />).toJSON()).toMatchSnapshot());

  test('NavBar snapshot with user', () => expect(renderer.create(<Navbar {...{ ...defaultProps, user: { nickname: 'nickname' } }} />).toJSON()).toMatchSnapshot());
});
