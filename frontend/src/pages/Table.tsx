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
      minWidth: '40px',
      maxHeight: '50px', 
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
  open: boolean,
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

const WeekTiles: React.FC<WeekTilesProps> = (props) => {
  const weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedDate, setSelectedDate] = useState(0);

  return (
    <>
    <div onClick={props.onClick}>
      {props.dates.map((d: number, idx: number) => {
        return (
          <Tile
            day={weekDays[idx]} 
            date={d} 
            onClick={() => setSelectedDate(d)}
            key={d}  // unique key
          />
        )
      })}
    </div>
      <Collapse in={props.open} timeout="auto" disableStrictModeCompat>
        <Box bgcolor="text.disabled" color="background.paper">
          Clicked date: {selectedDate}
        </Box>
      </Collapse>
    </>
  )
}

export const Table: React.FC = () => {
  const ds0 = [30, 31, 1, 2, 3, 4, 5]
  const ds1 = [6, 7, 8, 9, 10, 11, 12]
  const ds2 = [13, 14, 15, 16, 17, 18, 19]
  const ds3 = [20, 21, 22, 23, 24, 25, 26]
  const ds4 = [27, 28, 29, 30, 1, 2, 3]

  const [selectedWeek, setSelectedWeek] = useState([false, false, false, false, false]);
  function handleClick(idx: number) {
    return (
    () => {
      let lst = new Array(5).fill(false);
      lst[idx] = true
      setSelectedWeek(lst)
    })
  }

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
            <WeekTiles dates={ds0} open={selectedWeek[0]} onClick={handleClick(0)}/>
          </Grid>
          <Grid item>
            <WeekTiles dates={ds1} open={selectedWeek[1]} onClick={handleClick(1)}/>
          </Grid>
          <Grid item>
            <WeekTiles dates={ds2} open={selectedWeek[2]} onClick={handleClick(2)}/>
          </Grid>
          <Grid item>
            <WeekTiles dates={ds3} open={selectedWeek[3]} onClick={handleClick(3)}/>
          </Grid>
          <Grid item>
            <WeekTiles dates={ds4} open={selectedWeek[4]} onClick={handleClick(4)}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
};