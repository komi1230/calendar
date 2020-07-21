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
      borderRadius: '0',
      [theme.breakpoints.up('sm')]: {
        minWidth: '80px',
        minHeight: '80px'
      },
    },
    tileDay: {
      ...theme.typography.button,
      backgroundColor: "transparent",
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
  year: number,
  month: number,
  day: string,
  date: number,
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
};

const Tile: React.FC<TileProps> = (props) => {
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
            {props.day}
          </div>
        </Grid>
        <Grid item>
          <div className={classes.tileDate}>
            {props.date}
          </div>
        </Grid>
      </Grid>
    </Button>
  )
};

interface WeekTilesProps {
  dates: Date[],
  open: boolean,
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

const WeekTiles: React.FC<WeekTilesProps> = (props) => {
  const weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const handleClick = (year: number, month: number, date: number) => () => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDate(date);
  }

  return (
    <>
      <div onClick={props.onClick}>
        {props.dates.map((d: Date, idx: number) => {
          return (
            <Tile
              year={d.getFullYear()}
              month={d.getMonth()+1}
              day={weekDays[d.getDay()]} 
              date={d.getDate()} 
              onClick={handleClick(d.getFullYear(), d.getMonth(), d.getDate())}
              key={idx}  // unique key
            />
          )
        })}
      </div>
      <Collapse in={props.open} timeout="auto" disableStrictModeCompat>
        <Box bgcolor="text.disabled" color="background.paper">
          Clicked date: {selectedYear} / {selectedMonth} / {selectedDate}
        </Box>
      </Collapse>
    </>
  )
}

const getLastSunday = (year: number, month: number): Date => {
  var t = new Date(year, month-1);
  t.setDate(t.getDate() - t.getDay());
  return t;
}

const afterDate = (date: Date, num: number): Date => new Date(date.getTime() + num * (24 * 60 * 60 * 1000));

const MonthTiles: React.FC<CalendarPageProps> = (props) => {
  const firstDate = getLastSunday(props.year, props.month)
  const weeks = Array.from({length: 6}, (_, k) => k).map(week => 
    Array.from({length: 7}, (_, kk) => kk).map(date => 
      afterDate(firstDate, date + 7 * week)
    )
  );

  const [selectedWeek, setSelectedWeek] = useState([false, false, false, false, false]);
  const handleClick = (idx: number) => () => {
    let lst = new Array(5).fill(false);
    lst[idx] = true
    setSelectedWeek(lst)
  };

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      {weeks.map((week: Date[], num: number) => 
        <Grid item>
          <WeekTiles dates={week} open={selectedWeek[num]} onClick={handleClick(num)}/>
        </Grid>
    )}
    </Grid>
  )
}

export const Table: React.FC = () => {
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
          <MonthHeader year={2020} month={7} />
        </Grid>
        <MonthTiles year={2020} month={7}/>
      </Grid>
    </>
  )
};