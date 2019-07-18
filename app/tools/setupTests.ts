// import 'raf/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import I18n from '@kevinwang0316/i18n';

import dict from '../Dict';


configure({ adapter: new Adapter() });
I18n.setDefaultLanguage('en');
I18n.setDictionary(dict);
