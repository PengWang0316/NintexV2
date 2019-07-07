import React, { useEffect, Fragement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  List, ListItem, ListSubheader, ListItemAvatar, Avatar, ListItemText, Typography, Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import I18n from '@kevinwang0316/i18n';

import { fetchTopPublishersCount as fetchTopPublishersCountAction } from '../store/TopPublishersCount/actions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    margin: '0 10',
  },
  listItem: {
    height: 60,
  },
}));

let isFetching;

export const TopPublisherList = ({ topPublishersCount, fetchTopPublishersCount }) => {
  useEffect(() => {
    if (!topPublishersCount.isFetched && !isFetching) {
      fetchTopPublishersCount();
      isFetching = true;
    }
  });
  const classes = useStyles();
  return (
    <List
      component="nav"
      subheader={<ListSubheader component="div">{I18n.get('topPublisherTitle')}</ListSubheader>}
      className={classes.root}
    >
      {topPublishersCount.data.map(({ publisher, publisherCount }, index) => (
        <div key={publisher}>
          <ListItem alignItems="flex-start" button className={classes.listItem}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>{publisher.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={publisher}
              secondary={(
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {I18n.get('toPublisherTotal')}
                  </Typography>
                  {` : ${publisherCount}`}
                </React.Fragment>
              )}
            />
          </ListItem>
          {index !== topPublishersCount.length - 1 && <Divider variant="inset" component="li" />}
        </div>
      ))}
    </List>
  );
};
TopPublisherList.propTypes = {
  fetchTopPublishersCount: PropTypes.func.isRequired,
  topPublishersCount: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.bool, PropTypes.array,
  ])).isRequired,
};
const mapStateToProps = state => ({
  topPublishersCount: state.topPublishersCount,
});
const mapDispatchToProps = {
  fetchTopPublishersCount: fetchTopPublishersCountAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(TopPublisherList);
