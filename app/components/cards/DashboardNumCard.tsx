import React, { ReactElement, memo } from 'react';
import { Box, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  displayNum: string | number | null;
  title: string;
  icon: ReactElement;
  extraContent?: ReactElement | null;
}

const useStyles = makeStyles({
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
});
// The regular experssion to help format numbers to have a comma in every three digitals
const NUM_FORMATE_REGEXP = /(\d)(?=(\d{3})+(?!\d))/g;

export const DashboardNumCard = ({
  displayNum = null, title, icon, extraContent = null,
}: Props): ReactElement => {
  const classes = useStyles({});
  return (
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
};
export default memo(DashboardNumCard);
