import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, CardContent,
  DialogTitle, Chip, TextField, Typography, Card,
} from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import I18n from '@kevinwang0316/i18n';

import {
  fetchNwcKey as fetchNwcKeyAction,
  addNwcKey as addNwcKeyAction,
  deleteNwcKey as deleteNwcKeyAction,
  fetchOfficeKey as fetchOfficeKeyAction,
  addOfficeKey as addOfficeKeyAction,
  deleteOfficeKey as deleteOfficeKeyAction,
} from '../actions/ApiKeyActions';
import getChipAttribute from '../libs/GetChipAttribute';

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

export const KeyManageDialog = ({
  open, handleClose, nwcKeys, officeKeys, fetchNwcKey, addNwcKey, deleteNwcKey,
  fetchOfficeKey, addOfficeKey, deleteOfficeKey,
}) => {
  const classes = useStyles();
  const [nwcTenant, setNwcTenant] = useState('');
  const [nwcKey, setNwcKey] = useState('');
  const [officeEndpoint, setOfficeEndpoint] = useState('');
  const [officeKey, setOfficeKey] = useState('');
  const [officeCookie, setOfficeCookie] = useState('');

  useEffect(() => {
    if (!nwcKeys.isFetch) fetchNwcKey();
    if (!officeKeys.isFetch) fetchOfficeKey();
  });

  const handleNwcTenantChange = event => setNwcTenant(event.target.value);
  const handleNwcKeyChange = event => setNwcKey(event.target.value);
  const handleOfficeKeyChange = event => setOfficeKey(event.target.value);
  const handleOfficeEndpointChange = event => setOfficeEndpoint(event.target.value);
  const handleOfficeCookieChange = event => setOfficeCookie(event.target.value);

  const handleNwcAdd = () => {
    if (nwcKey && nwcKey !== '' && nwcTenant && nwcTenant !== '') {
      addNwcKey(nwcTenant, nwcKey);
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

  const handleNwcDelete = event => deleteNwcKey(getChipAttribute(event, 'tenant'), getChipAttribute(event, 'name'));

  const handleOfficeDelete = event => deleteOfficeKey(
    getChipAttribute(event, 'endpoint'),
    getChipAttribute(event, 'name'),
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
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {I18n.get('keyManageNWCContent')}
            </Typography>
            <div>
              {nwcKeys.data && Object.keys(nwcKeys.data).map(key => (
                <Chip
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
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {I18n.get('keyManageOfficeContent')}
            </Typography>
            <div>
              {officeKeys.data && Object.keys(officeKeys.data).map(key => (
                <Chip
                  label={key}
                  key={key}
                  className={classes.nwcTag}
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
KeyManageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchNwcKey: PropTypes.func.isRequired,
  addNwcKey: PropTypes.func.isRequired,
  deleteNwcKey: PropTypes.func.isRequired,
  fetchOfficeKey: PropTypes.func.isRequired,
  addOfficeKey: PropTypes.func.isRequired,
  deleteOfficeKey: PropTypes.func.isRequired,
  nwcKeys: PropTypes.objectOf(PropTypes.any),
  officeKeys: PropTypes.objectOf(PropTypes.any),
};
KeyManageDialog.defaultProps = { nwcKeys: null, officeKeys: null };
const mapStateToProps = state => ({
  nwcKeys: state.nwcKeys,
  officeKeys: state.officeKeys,
});
const mapDispatchToProps = dispatch => ({
  fetchNwcKey: () => dispatch(fetchNwcKeyAction()),
  addNwcKey: (tenant, key) => dispatch(addNwcKeyAction(tenant, key)),
  deleteNwcKey: (tenant, id) => dispatch(deleteNwcKeyAction(tenant, id)),
  fetchOfficeKey: () => dispatch(fetchOfficeKeyAction()),
  addOfficeKey: (endpoint, key, cookie) => dispatch(addOfficeKeyAction(endpoint, key, cookie)),
  deleteOfficeKey: (endpoint, id) => dispatch(deleteOfficeKeyAction(endpoint, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(KeyManageDialog);
