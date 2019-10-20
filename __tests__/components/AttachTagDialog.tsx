import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { AttachTagDialog } from '../../app/components/AttachTagDialog';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/DialogContentText', () => 'DialogContentText');
jest.mock('@material-ui/core/DialogTitle', () => 'DialogTitle');
jest.mock('@material-ui/core/Slide', () => 'Slide');
jest.mock('@material-ui/core/Chip', () => 'Chip');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@kevinwang0316/i18n', () => ({ get: jest.fn().mockImplementation(str => str) }));

describe('Test AttachTagDialog', () => {
  const defaultProps = {
    isOpen: false,
    tags: null,
    workflowId: 'workflowId',
    workflows: { isFetched: false, data: {} },
    handleClose: jest.fn(),
    updateTagFromWorkflow: jest.fn(),
  };

  const tags = {
    1: ['IT', '#e91e63'],
    2: ['Accounting', '#03a9f4'],
    3: ['Marketing', '#607d8b'],
    4: ['SDE', '#ff5722'],
  };

  const workflows = {
    isFetched: true,
    data: {
      '006D7B35-20A7-E811-BCE7-000D3A320C2B': {
        workflowId: '006D7B35-20A7-E811-BCE7-000D3A320C2B',
        workflowName: 'ISV Order Form - Prod',
        publishDate: '2018-11-27T00:00:00.000Z',
        publisher: 'Eric',
        locationPath: 'NWC / nintex-it (Eric Harris)',
        tags: '2,3,4',
      },
      '007600E3-69BB-E711-80C2-000D3A32028C': {
        workflowId: '007600E3-69BB-E711-80C2-000D3A32028C',
        workflowName: 'LazyApprovalTest',
        publishDate: '2017-10-27T00:00:00.000Z',
        publisher: 'NTXSupport Administrator',
        locationPath: 'SP2013-1 / Home / Demo',
        tags: '2,1',
      },
    },
  };

  beforeEach(() => jest.clearAllMocks());

  it('Should renderd correctly without CustomizedChip component', () => {
    const component = shallow(<AttachTagDialog {...defaultProps} />);

    expect(component.exists('Dialog')).toBe(true);

    const DialogTitle = component.find('DialogTitle');
    expect(DialogTitle.text()).toEqual('addTagDialogTitle');

    expect(component.exists('DialogContent')).toBe(true);

    const DialogContentText = component.find('DialogContentText');
    expect(DialogContentText.text()).toEqual('attachTagDialogContent');
    expect(DialogContentText.prop('id')).toEqual('alert-dialog-slide-description');

    expect(component.exists('DialogActions')).toBe(true);

    const Button = component.find('Button');
    expect(Button.prop('color')).toEqual('primary');
    expect(Button.text()).toEqual('close');

    expect(component.exists('CustomizedChip')).toBe(false);
  });

  it('Should have one CustomizedChip', () => {
    const props = {
      ...defaultProps, tags, workflows, workflowId: '006D7B35-20A7-E811-BCE7-000D3A320C2B',
    };
    // @ts-ignore
    const component = shallow(<AttachTagDialog {...props} />);

    const tagsComponent = component.find('CustomizedChip');
    expect(tagsComponent.length).toBe(1);
  });

  it('Should have two CustomizedChips', () => {
    const props = {
      ...defaultProps, tags, workflows, workflowId: '007600E3-69BB-E711-80C2-000D3A32028C',
    };
    // @ts-ignore
    const component = shallow(<AttachTagDialog {...props} />);

    const tagsComponent = component.find('CustomizedChip');
    expect(tagsComponent.length).toBe(2);
  });

  it('Should call updateTagFromWorkflow', () => {
    const props = {
      ...defaultProps, tags, workflows, workflowId: '006D7B35-20A7-E811-BCE7-000D3A320C2B',
    };
    // @ts-ignore
    const component = shallow(<AttachTagDialog {...props} />);

    const tagsComponent = component.find('CustomizedChip');
    tagsComponent.simulate('click', { target: { tagName: 'span', parentNode: { parentNode: { getAttribute: jest.fn() } } } });

    expect(defaultProps.updateTagFromWorkflow).toHaveBeenCalledTimes(1);
  });

  it('Should call handlClose', () => {
    const component = shallow(<AttachTagDialog {...defaultProps} />);
    component.find('Button').simulate('click');

    expect(defaultProps.handleClose).toHaveBeenCalledTimes(1);
  });

  test('Snapshot test for no CustomizedChip', () => expect(renderer.create(<AttachTagDialog {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot test for having two CustomizedChip', () => {
    // @ts-ignore
    expect(renderer.create(<AttachTagDialog {...{
      ...defaultProps, tags, workflows, workflowId: '007600E3-69BB-E711-80C2-000D3A32028C',
    }}
    />).toJSON()).toMatchSnapshot();
  });
});
