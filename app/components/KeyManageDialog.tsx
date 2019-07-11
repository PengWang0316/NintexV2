import React, {
  useState, useEffect, useCallback, memo,
} from 'react';
import { connect } from 'react-redux';
import {
  Button, Dialog, DialogActions, DialogContent, CardContent,
  DialogTitle, Chip, TextField, Typography, Card,
} from '@material-ui/core';
import { ChipProps } from '@material-ui/core/Chip';
import { blue, pink } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import I18n from '@kevinwang0316/i18n';

import {
  fetchNwcKey as fetchNwcKeyAction,
  addNwcKey as addNwcKeyAction,
  deleteNwcKey as deleteNwcKeyAction,
} from '../store/NWCKeys/actions';
import {
  fetchOfficeKey as fetchOfficeKeyAction,
  addOfficeKey as addOfficeKeyAction,
  deleteOfficeKey as deleteOfficeKeyAction,
} from '../store/OfficeKeys/actions';
import { addNwcWorkflows as addNwcWorkflowsAction } from '../store/Workflows/actions';
import getChipAttribute from '../libs/GetChipAttribute';
import { NWCKeysType } from '../store/NWCKeys/types';
import { OfficeKeysType } from '../store/OfficeKeys/types';
import { Workflows } from '../store/Workflows/types';
import { AppState } from '../store/ConfigureStore';

interface Props {
  open: boolean;
  handleClose: (event: React.MouseEvent) => void;
  nwcKeys: NWCKeysType;
  officeKeys: OfficeKeysType;
  fetchNwcKey: Function;
  addNwcKey: (tenant: string, key: string) => void;
  deleteNwcKey: (tenant: string, id: number) => void;
  fetchOfficeKey: Function;
  addOfficeKey: (endpoint: string, key: string, cookie: string) => void;
  deleteOfficeKey: (endpoint: string, id: number) => void;
  addNwcWorkflows: (tenant: string, key: string, existedWorkflows, isAutoFetching?: boolean) => void;
  workflows: Workflows;
}

interface CustermizedChipType extends ChipProps {
  name: number;
  tenant?: string;
  endpoint?: string;
}
const CustermizedChip = (props: CustermizedChipType) => <Chip {...props} />;

const useStyles = makeStyles({
  flexDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  secondContentText: { marginTop: 30 },
  btn: { verticalAlign: 'bottom' },
  card: {
    minWidth: 220,
    marginBottom: 20,
  },
  textField: { marginRight: 10 },
  nwcTag: { backgroundColor: blue[500], color: 'white', marginRight: 10 },
  officeTag: { backgroundColor: pink[500], color: 'white', marginRight: 10 },
});
let isFetchingNwcKey = false;
let isFetchingOfficeKey = false;

export const KeyManageDialog = ({
  open, handleClose, nwcKeys, officeKeys, fetchNwcKey, addNwcKey, deleteNwcKey,
  fetchOfficeKey, addOfficeKey, deleteOfficeKey, addNwcWorkflows, workflows,
}: Props) => {
  const classes = useStyles({});
  const [nwcTenant, setNwcTenant] = useState('');
  const [nwcKey, setNwcKey] = useState('');
  const [officeEndpoint, setOfficeEndpoint] = useState('');
  const [officeKey, setOfficeKey] = useState('');
  const [officeCookie, setOfficeCookie] = useState('');

  useEffect(() => {
    if (!nwcKeys.isFetch && !isFetchingNwcKey) {
      fetchNwcKey();
      isFetchingNwcKey = true;
    }
    if (!officeKeys.isFetch && !isFetchingOfficeKey) {
      fetchOfficeKey();
      isFetchingOfficeKey = true;
    }
  });

  const handleNwcTenantChange = useCallback(event => setNwcTenant(event.target.value), []);
  const handleNwcKeyChange = useCallback(event => setNwcKey(event.target.value), []);
  const handleOfficeKeyChange = useCallback(event => setOfficeKey(event.target.value), []);
  const handleOfficeEndpointChange = useCallback(event => setOfficeEndpoint(event.target.value), []);
  const handleOfficeCookieChange = useCallback(event => setOfficeCookie(event.target.value), []);

  const handleNwcAdd = () => {
    if (nwcKey && nwcKey !== '' && nwcTenant && nwcTenant !== '') {
      addNwcKey(nwcTenant, nwcKey);
      addNwcWorkflows(nwcTenant, nwcKey, workflows.data);
      setNwcKey('');
      setNwcTenant('');
    }
  };

  const handleOfficeAdd = () => {
    if (officeEndpoint && officeEndpoint !== '' && officeKey && officeKey !== '' && officeCookie && officeCookie !== '') {
      addOfficeKey(officeEndpoint, officeKey, officeCookie);
      setOfficeCookie('');
      setOfficeEndpoint('');
      setOfficeKey('');
    }
  };

  const handleNwcDelete = event => deleteNwcKey(getChipAttribute(event, 'tenant'), +getChipAttribute(event, 'name'));

  const handleOfficeDelete = event => deleteOfficeKey(
    getChipAttribute(event, 'endpoint'),
    +getChipAttribute(event, 'name'),
  );

  return (
    <Dialog
      open={open}
      keepMounted
      maxWidth="md"
      onClose={handleClose}
    >
      <DialogTitle>{I18n.get('keyManageDialogTitle')}</DialogTitle>
      <DialogContent>
        <Card className={classes.card}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {I18n.get('keyManageNWCContent')}
            </Typography>
            <div>
              {nwcKeys.data && Object.keys(nwcKeys.data).map(key => (
                <CustermizedChip
                  label={key}
                  key={key}
                  className={classes.nwcTag}
                  onDelete={handleNwcDelete}
                  name={nwcKeys.data[key][0]}
                  tenant={key}
                />
              ))}
            </div>
            <div>
              <TextField
                label={I18n.get('tenant')}
                value={nwcTenant}
                margin="normal"
                onChange={handleNwcTenantChange}
                className={classes.textField}
              />
              <TextField
                label={I18n.get('apiKey')}
                value={nwcKey}
                margin="normal"
                onChange={handleNwcKeyChange}
                className={classes.textField}
              />
              <Button size="small" color="secondary" onClick={handleNwcAdd} className={classes.btn}>
                {I18n.get('add')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {I18n.get('keyManageOfficeContent')}
            </Typography>
            <div>
              {officeKeys.data && Object.keys(officeKeys.data).map(key => (
                <CustermizedChip
                  label={key}
                  key={key}
                  className={classes.officeTag}
                  onDelete={handleOfficeDelete}
                  endpoint={key}
                  name={officeKeys.data[key][0]}
                />
              ))}
            </div>
            <div>
              <TextField
                label={I18n.get('endpoint')}
                value={officeEndpoint}
                margin="normal"
                onChange={handleOfficeEndpointChange}
                className={classes.textField}
              />
              <TextField
                label={I18n.get('apiKey')}
                value={officeKey}
                margin="normal"
                onChange={handleOfficeKeyChange}
                className={classes.textField}
              />
              <TextField
                label={I18n.get('cookie')}
                value={officeCookie}
                margin="normal"
                onChange={handleOfficeCookieChange}
                className={classes.textField}
              />
              <Button size="small" color="secondary" onClick={handleOfficeAdd} className={classes.btn}>
                {I18n.get('add')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {I18n.get('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const mapStateToProps = (state: AppState) => ({
  nwcKeys: state.nwcKeys,
  officeKeys: state.officeKeys,
  workflows: state.workflows,
});
const mapDispatchToProps = dispatch => ({
  fetchNwcKey: () => dispatch(fetchNwcKeyAction()),
  addNwcKey: (tenant: string, key: string) => dispatch(addNwcKeyAction(tenant, key)),
  deleteNwcKey: (tenant: string, id: number) => dispatch(deleteNwcKeyAction(tenant, id)),
  fetchOfficeKey: () => dispatch(fetchOfficeKeyAction()),
  addOfficeKey: (endpoint: string, key: string, cookie: string) => dispatch(addOfficeKeyAction(endpoint, key, cookie)),
  deleteOfficeKey: (endpoint: string, id: number) => dispatch(deleteOfficeKeyAction(endpoint, id)),
  addNwcWorkflows: (tenant: string, key: string, existedWorkflows: string) => dispatch(addNwcWorkflowsAction(tenant, key, existedWorkflows)),
});
export default connect(mapStateToProps, mapDispatchToProps)(memo(KeyManageDialog));
