import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
// import { render } from '@testing-library/react';

import { App } from '../../app/components/App';

jest.mock('react-router-dom', () => ({
  BrowserRouter: 'Router',
  Route: 'Route',
  Switch: 'Switch',
}));
jest.mock('aws-amplify', () => ({ configure: jest.fn() }));
jest.mock('../../app/components/Navbar', () => 'Navbar');
jest.mock('../../app/components/MenuDrawer', () => 'MenuDrawer');

window.clearInterval = jest.fn();
window.setInterval = jest.fn().mockImplementation((fn) => {
  fn();
  return {};
});

describe('Test App component', () => {
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementation(fn => fn());
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
  });

  const mockedMonitorList = {
    isFetched: false,
    data: {
      workflowId: {
        tenant: 'tenantA', instances: { instanceId: { startTime: 'startTime', endTime: 'endTime', status: 'status' } }, key: 'key', hasFailure: false,
      },
    },
  };
  it('should not call clearInterval', () => {
    shallow(<App monitorList={{ isFetched: false, data: {} }} checkInstanceStatus={jest.fn()} />);
    expect(window.clearInterval).not.toHaveBeenCalled();
  });

  it('should call clearInterval', () => {
    shallow(<App monitorList={mockedMonitorList} checkInstanceStatus={jest.fn()} />);
    expect(window.clearInterval).not.toHaveBeenCalled();

    shallow(<App monitorList={{ isFetched: false, data: {} }} checkInstanceStatus={jest.fn()} />);
    expect(window.clearInterval).toHaveBeenCalledTimes(1);
    expect(window.clearInterval).toHaveBeenLastCalledWith({});
  });

  it('should only call setInterval and call clearInterval after update', () => {
    const mockCkeckInstanceStatus = jest.fn();
    const component = shallow(<App
      monitorList={mockedMonitorList}
      checkInstanceStatus={mockCkeckInstanceStatus}
    />);
    expect(window.clearInterval).not.toHaveBeenCalled();
    expect(window.setInterval).toHaveBeenCalledTimes(1);
    expect(mockCkeckInstanceStatus).toHaveBeenCalledTimes(1);
    expect(mockCkeckInstanceStatus).toHaveBeenLastCalledWith(mockedMonitorList.data);

    component.setProps({});
    expect(window.clearInterval).toHaveBeenCalledTimes(1);
    expect(window.setInterval).toHaveBeenCalledTimes(2);
  });

  it('should have the same snapshot', () => expect(renderer.create(<App monitorList={mockedMonitorList} checkInstanceStatus={jest.fn()} />).toJSON()).toMatchSnapshot());
});
