import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { SearchAppBar } from '../Header';
import {
  TileProps,
  WeekTilesProps,
  CalendarPageProps,
  Schedule
} from './CalendarType';
import { RootState } from '../rootReducer';
import { selectDate, addSchedule, deleteSchedule, changeMonth } from './CalendarModule';

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
      borderRadius: 50,
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

const SelectMonth: React.FC<CalendarPageProps> = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { currentMonth, currentYear } = useSelector((state: RootState) => state.calendar);
  const handleClick = (method: string) => () => {
    dispatch(changeMonth(method))
  }

  return (
    <Box bgcolor="text.secondary" color="background.paper" p={2} className={classes.month}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <IconButton onClick={handleClick('DECREMENT')} style={{ color: "white" }}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6} sm={2}>
          {currentYear} / {currentMonth}
        </Grid>
        <Grid item>
          <IconButton onClick={handleClick('INCREMENT')} style={{ color: "white" }}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  )
}

const Tile: React.FC<TileProps> = (props) => {
  const dispatch = useDispatch();

  const thisDate = new Date(props.year, props.month, props.date).toString();
  const setSelectedDate = () => {
    dispatch(selectDate(thisDate))
  }

  const classes = useStyles();
  return (
    <Button
      onClick={setSelectedDate}
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
          <ArrowDropDownIcon
            style={
              props.isScheduled ?
                { position: "absolute", top: "85%", left: "50%", transform: "translate(-50%, -50%)" } :
                { position: "absolute", top: "85%", left: "50%", color: "transparent" }
            }
          />
        </Grid>
      </Grid>
    </Button>
  )
};

const WeekTiles: React.FC<WeekTilesProps> = (props) => {
  const weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const { selectedDate } = useSelector((state: RootState) => state.calendar);

  let isOpen: boolean;
  if (selectedDate === undefined) {
    isOpen = false
  } else {
    isOpen = props.dates.map(d => d.toString()).includes(selectedDate);
  }

  let printDate: string;
  if (selectedDate === undefined) {
    printDate = "NOT FOUND"
  } else {
    printDate = new Date(selectedDate).toDateString();
  }

  const checkIsScheduled = (d: Date, schedules: Schedule[]) => {
    for (let s of schedules.map(sc => sc.from)) {
      let yearOK = d.getFullYear() === new Date(s).getFullYear();
      let monthOK = d.getMonth() === new Date(s).getMonth();
      let dateOK = d.getDate() === new Date(s).getDate();
      if (yearOK && monthOK && dateOK) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      {props.dates.map((d: Date, idx: number) => {
        return (
          <Tile
            year={d.getFullYear()}
            month={d.getMonth()}
            day={weekDays[d.getDay()]}
            date={d.getDate()}
            isScheduled={checkIsScheduled(d, props.schedules)}
            key={idx}  // unique key
          />
        )
      })}
      <Collapse in={isOpen} timeout="auto" disableStrictModeCompat>
        <Box bgcolor="text.disabled" color="background.paper">
          Clicked date: {printDate}
        </Box>
      </Collapse>
    </>
  )
}

const getLastSunday = (year: number, month: number): Date => {
  var t = new Date(year, month - 1);
  t.setDate(t.getDate() - t.getDay());
  return t;
}

const afterDate = (date: Date, num: number): Date => new Date(date.getTime() + num * (24 * 60 * 60 * 1000));

const CalendarPage: React.FC<CalendarPageProps> = (props) => {
  const { currentYear, currentMonth } = useSelector((state: RootState) => state.calendar);
  const firstDate = getLastSunday(currentYear, currentMonth);
  const weeks: Date[][] = Array.from({ length: 6 }, (_, k) => k).map(week =>
    Array.from({ length: 7 }, (_, kk) => kk).map(date =>
      afterDate(firstDate, date + 7 * week)
    )
  );

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="stretch"
    >
      <Grid item>
        <SelectMonth year={props.year} month={props.month} schedules={props.schedules}/>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" justify="center">
          {weeks.map((week: Date[], num: number) =>
            <Grid item key={num}>
              <WeekTiles
                dates={week}
                schedules={props.schedules}
                key={num}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
};

export const Calendar: React.FC = () => {
  const dispatch = useDispatch();
  const { schedules, currentYear, currentMonth } = useSelector((state: RootState) => state.calendar);

  const tmpSchedule: Schedule = {
    from: new Date(2020, 7, 15, 10).toString(),
    to: new Date(2020, 7, 15, 13).toString(),
  };
  const setNewSchedule = () => {
    dispatch(addSchedule(tmpSchedule))
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  return (
    <>
      <SearchAppBar />
      <CalendarPage year={currentYear} month={currentMonth} schedules={schedules} />
      <Button
        onClick={setNewSchedule}
        variant="outlined"
      >
        Add Schecule !
      </Button>
    </>
  )
};