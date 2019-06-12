import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, CardContent,
  DialogTitle, Chip, TextField, Typography, Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import I18n from '@kevinwang0316/i18n';

const useStyles = makeStyles({
  flexDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  secondContentText: { marginTop: 30 },
  // btnDiv: { textAlign: 'right', alignItems: 'bottom' },
  btn: { verticalAlign: 'bottom' },
  card: {
    minWidth: 220,
    marginBottom: 20,
  },
  textField: { marginRight: 10 },
  // mr20: { marginRight: 20 },
  // '@media (max-width: 663px)': {
  //   card: {
  //     width: '100%',
  //   },
  //   mr20: { marginRight: 0 },
  // },
});

export const KeyManageDialog = ({
  open, handleClose, nwcKeys, officeKeys,
}) => {
  const classes = useStyles();
  const [nwcTenant, setNwcTenant] = useState('');
  const [nwcKey, setNwcKey] = useState('');
  const [officeEndpoint, setOfficeEndpoint] = useState();
  const [officeKey, setOfficeKey] = useState();
  const [officeCookie, setOfficeCookie] = useState();

  const handleNwcTenantChange = event => setNwcTenant(event.target.value);
  const handleNwcKeyChange = event => setNwcKey(event.target.value);
  const handleOfficeKeyChange = event => setOfficeKey(event.target.value);
  const handleOfficeEndpointChange = event => setOfficeEndpoint(event.target.value);
  const handleOfficeCookieChange = event => setOfficeCookie(event.target.value);

  const handleNwcAdd = () => {
    if (nwcKey && nwcKey !== '' && nwcTenant && nwcTenant !== '') {
      setNwcKey('');
      setNwcTenant('');
    }
  };

  const handleOfficeAdd = () => {
    if (officeEndpoint && officeEndpoint !== '' && officeKey && officeKey !== '' && officeCookie && officeCookie !== '') {
      setOfficeCookie('');
      setOfficeEndpoint('');
      setOfficeKey('');
    }
  };

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
              {nwcKeys && Object.keys(nwcKeys).map(key => (
                <Chip
                  label={key}
                  key={key}
                  clickable
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
              {officeKeys && Object.keys(officeKeys).map(key => (
                <Chip
                  label={key}
                  key={key}
                  clickable
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
  nwcKeys: PropTypes.objectOf(PropTypes.string),
  officeKeys: PropTypes.objectOf(PropTypes.string),
};
KeyManageDialog.defaultProps = { nwcKeys: null, officeKeys: null };
const mapStateToProps = state => ({
  nwcKeys: state.nwcKeys,
  officeKeys: state.officeKeys,
});
// const mapDispatchToProps = dispatch => ({
//   addTag: (content, color) => dispatch(addTagAction(content, color)),
// });
export default connect(mapStateToProps, null)(KeyManageDialog);
