import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { SearchAppBar } from './Header';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    month: {
      textAlign: "center",
    },
    tile: {
      maxWidth: '30px', maxHeight: '50px', minWidth: '50px', minHeight: '30px',
      borderRadius: '0'
    },
    tileDay: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      fontSize: "8px"
    },
    tileDate: {
      fontSize: "16px"
    }
  })
);

interface CalendarPageProps {
  year: number,
  month: number,
};

const MonthHeader: React.FC<CalendarPageProps> = (props) => {
  const classes = useStyles();
  const year = props.year;
  const month = props.month;
  return (
    <Box bgcolor="text.secondary" color="background.paper" p={2} className={classes.month}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <ChevronLeftIcon />
        </Grid>
        <Grid item xs={6} sm={2}>
          {year} / {month}
        </Grid>
        <Grid item>
          <ChevronRightIcon />
        </Grid>
      </Grid>
    </Box>
  )
};

interface TileProps {
  day: string,
  date: number,
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
};

const Tile: React.FC<TileProps> = (props) => {
  const day: string = props.day;
  const date: number = props.date;
  const onClick = props.onClick;
  const classes = useStyles();
  return (
    <Button 
      //variant="outlined" 
      onClick={onClick} 
      size="small" 
      className={classes.tile}
    >
      <Grid 
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <div className={classes.tileDay}>
            {day}
          </div>
        </Grid>
        <Grid item>
          <div className={classes.tileDate}>
            {date}
          </div>
        </Grid>
      </Grid>
    </Button>
  )
};

interface WeekTilesProps {
  dates: number[],
}

const WeekTiles: React.FC<WeekTilesProps> = (props) => {
  const weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItem>
      {props.dates.map((d: number, idx: number) => {
        return (
          <Tile
            day={weekDays[idx]} 
            date={d} 
            onClick={handleClick}
            key={d}  // unique key
          />
        )
      })}
      </ListItem>
      <Collapse in={open} timeout="auto" disableStrictModeCompat>
        <Box bgcolor="text.secondary" color="background.paper">
          hogehoge
        </Box>
      </Collapse>
    </List>
  )
}

export const Table: React.FC = () => {
  const ds = [30, 31, 1, 2, 3, 4, 5]
  return (
    <>
      <SearchAppBar />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        <Grid item>
          <MonthHeader year={2020} month={6} />
        </Grid>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <WeekTiles dates={ds}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
};