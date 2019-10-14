import React from 'react';
import { shallow, mount } from 'enzyme';
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

window.clearInterval = jest.fn();
window.setInterval = jest.fn();

describe('Test App component', () => {
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(fn => fn());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
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

  it('should call setInterval and clearInterval', () => {
    shallow(<App monitorList={mockedMonitorList} checkInstanceStatus={jest.fn()} />);
    expect(window.clearInterval).not.toHaveBeenCalled();
    expect(window.setInterval).toHaveBeenCalledTimes(1);
  });
});
