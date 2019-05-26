import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    width: 255,
    margin: '0 10px',
  },
  cardDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  },
  contentDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
// The regular experssion to help format numbers to have a comma in every three digitals
const NUM_FORMATE_REGEXP = /(\d)(?=(\d{3})+(?!\d))/g;

export const DashboardNumCard = ({
  classes, displayNum, title, icon, extraContent,
}) => (
  <Card className={classes.card}>
    <CardContent>
      <div className={classes.contentDiv}>
        <div>
          <Box fontSize={14} color="textSecondary">
            {title}
          </Box>
          <Box fontSize={26} fontWeight={1600} color="textSecondary">
            {displayNum ? displayNum.toString().replace(NUM_FORMATE_REGEXP, '$1,') : '--'}
          </Box>
        </div>
        {icon}
      </div>
      {extraContent}
    </CardContent>
  </Card>
);
DashboardNumCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  displayNum: PropTypes.number,
  title: PropTypes.string.isRequired,
  icon: PropTypes.objectOf(PropTypes.any).isRequired,
  extraContent: PropTypes.element,
};
DashboardNumCard.defaultProps = { displayNum: null, extraContent: null };
export default withStyles(styles)(DashboardNumCard);
