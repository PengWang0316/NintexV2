import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { FileUploadDialog } from '../../app/components/FileUploadDialog';

describe('Test FileUploadDialog component', () => {
  const defaultProps = {
    open: false,
    handleClose: jest.fn(),
  };

  test('Snapshot test', () => expect(renderer.create(<FileUploadDialog {...defaultProps} />).toJSON()).toMatchSnapshot());
});
