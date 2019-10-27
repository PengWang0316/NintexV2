import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { FileUploadDialog } from '../../app/components/FileUploadDialog';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Input', () => 'Input');
jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/DialogTitle', () => 'DialogTitle');
jest.mock('@material-ui/core/DialogContentText', () => 'DialogContentText');
jest.mock('../../app/components/CustomizedSnackbar', () => 'CustomizedSnackbar');
jest.mock('../../app/components/ProgressDialog', () => 'ProgressDialog');
jest.mock('../../app/actions/WorkflowActions', () => ({ uploadWorkflows: jest.fn() }));
jest.mock('../../app/actions/InstanceActions', () => ({ uploadInstances: jest.fn() }));
jest.mock('../../app/actions/ActionActions', () => ({ uploadActions: jest.fn() }));
jest.mock('@kevinwang0316/i18n', () => ({ get: (str: string) => str }));

describe('Test FileUploadDialog component', () => {
  const defaultProps = {
    open: false,
    handleClose: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it('Should render correctly', () => {
    const component = shallow(<FileUploadDialog {...defaultProps} />);

    const Dialog = component.find('Dialog');
    expect(Dialog).not.toBeUndefined();
    expect(Dialog.prop('open')).toBe(defaultProps.open);
    expect(Dialog.prop('onClose')).toBe(defaultProps.handleClose);
    expect(Dialog.prop('aria-labelledby')).toBe('form-dialog-title');

    const DialogTitle = component.find('DialogTitle');
    expect(DialogTitle).not.toBeUndefined();
    expect(DialogTitle.prop('id')).toBe('form-dialog-title');
    expect(DialogTitle.text()).toBe('addAccountDialogTitle');

    expect(component.exists('DialogContent')).toBe(true);

    const DialogContentText = component.find('DialogContentText');
    expect(DialogContentText.text()).toBe('uploadFileDialogContent');
  });

  it('Should do nothing when workflows is undefined', () => {
    const component = shallow(<FileUploadDialog {...defaultProps} />);
    const uploadBtn = component.find('[data-testid="uploadBtn"]');
    expect(uploadBtn).not.toBeUndefined();
    expect(uploadBtn.text()).toBe('Upload');
    expect(component.find('ProgressDialog').prop('open')).toBe(false);
    uploadBtn.simulate('click');
    expect(component.find('ProgressDialog').prop('open')).toBe(false);
  });

  test('Snapshot test', () => expect(renderer.create(<FileUploadDialog {...defaultProps} />).toJSON()).toMatchSnapshot());
});
