import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { SearchAppBar } from '../Header';
import {
  TileProps,
  WeekTilesProps,
  CalendarPageProps,
  Schedule,
  ScheduleContentProps,
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
  let color;
  switch (props.day) {
    case "Sun":
      color = { color: "red" };
      break;
    case "Sat":
      color = { color: "blue" };
      break;
    default:
      color = { color: "black" };
      break;
  }
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
      style={color}
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

  const checkIsScheduled = (d: Date, schedules: Schedule[]) => {
    for (let s of schedules.map(sc => sc.from)) {
      if (new Date(s).toDateString() === d.toDateString()) {
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
          <ScheduleContent schedules={props.schedules} />
        </Box>
      </Collapse>
    </>
  )
}

const ScheduleContent: React.FC<ScheduleContentProps> = (props) => {
  return (
    <>
      <ScheduleList schedules={props.schedules}/>
      <br />
      <AddButton />
    </>
  )
}

const ScheduleList: React.FC<ScheduleContentProps> = (props) => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state: RootState) => state.calendar);
  if (selectedDate === undefined) {
    return <>Schedule Not Found</>
  }

  const isSameDate = (str0: string, str1: string) => {
    return new Date(str0).toDateString() === new Date(str1).toDateString()
  };
  const contents = props.schedules.filter(s => isSameDate(s.from, selectedDate));

  const formatDate = (d: string) => {
    const time = new Date(d);
    let hour: string;
    if (time.getHours() < 10) {
      hour = "0" + time.getHours().toString();
    } else {
      hour = time.getHours().toString();
    }
    let minutes: string;
    if (time.getMinutes() < 10) {
      minutes = "0" + time.getMinutes().toString();
    } else {
      minutes = time.getMinutes().toString();
    }
    return hour + ":" + minutes;
  }

  const handleDeleteSchedule = (s: Schedule) => () => {
    dispatch(deleteSchedule(s))
  }
  
  if (contents.length === 0) {
    return <>Schedule Not Found</>
  } else {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {contents.map(content => 
          <Grid item>
            {formatDate(content.from)} - {formatDate(content.to)}
            <Button
              variant="outlined"
              onClick={handleDeleteSchedule(content)}
              style={{
                color: "white",
                backgroundColor: "#696969",
              }}
            >
              delete
            </Button>
          </Grid>
        )}
      </Grid>
    )
  }
}

const AddButton: React.FC = () => {
  const { selectedDate } = useSelector((state: RootState) => state.calendar);

  const [open, setOpen] = useState(false);
  const [fromTime, setFromTime] = useState("10:00");
  const [toTime, setToTime] = useState("11:00");

  const dispatch = useDispatch();
  const handleNewSchedule = () => {
    let thisDate: Date;
    if (selectedDate === undefined) {
      return
    } else {
      thisDate = new Date(selectedDate);
    }
    const year = thisDate.getFullYear();
    const month = thisDate.getMonth();
    const date = thisDate.getDate()
    const fromTimePair = fromTime.split(":").map(Number);;
    const toTimePair = toTime.split(":").map(Number);;
    const s: Schedule = {
      from: new Date(year, month, date, fromTimePair[0], fromTimePair[1]).toString(),
      to: new Date(year, month, date, toTimePair[0], toTimePair[1]).toString(),
    }
    console.log("schedule:   ", s)
    dispatch(addSchedule(s))
  };

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        style={{ color: "white", backgroundColor: "#708090" }}
        size="small"
      >
        Add schedule !
        {open ? <ExpandLess /> : <ExpandMore />}
      </Button>
      <Collapse in={open} timeout="auto" disableStrictModeCompat>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
          style={{paddingTop: "3px"}}
        >
          <Grid item>
            <TextField
              type="time"
              label="from"
              value={fromTime}
              onChange={e => setFromTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
                style: { color: "white" }
              }}
              inputProps={{
                step: 300, // 5 min
                style: { color: "white" }
              }}
              InputProps={{
                style: { color: "white" }
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              type="time"
              label="to"
              value={toTime}
              onChange={e => setToTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
                style: { color: "white" }
              }}
              inputProps={{
                step: 300, // 5 min
                style: { color: "white" }
              }}
              InputProps={{
                style: { color: "white" }
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={handleNewSchedule}
              style={{
                color: "white",
                backgroundColor: "#696969",
              }}
            >
              add
          </Button>
          </Grid>
        </Grid>
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
        <SelectMonth year={props.year} month={props.month} schedules={props.schedules} />
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
  const { schedules, currentYear, currentMonth } = useSelector((state: RootState) => state.calendar);

  return (
    <>
      <SearchAppBar />
      <CalendarPage year={currentYear} month={currentMonth} schedules={schedules} />
    </>
  )
};
