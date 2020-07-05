import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
)

interface CalendarPageProps {
  year: number,
  month: number,
}

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
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,   // modify event type
}

const Tile: React.FC<TileProps> = (props) => {
  const day = props.day;
  const date = props.date;
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
          <MonthHeader year={2020} month={6} />
        </Grid>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <Tile day="Mon" date={12} onClick={() => alert("hoge")} />
          </Grid>
          <Grid item>
            <Tile day="Tue" date={13} onClick={() => alert("hoge")} />
          </Grid>
          <Grid item>
            <Tile day="Wed" date={14} onClick={() => alert("hoge")} />
          </Grid>
          <Grid item>
            <Tile day="Thu" date={15} onClick={() => alert("hoge")} />
          </Grid>
          <Grid item>
            <Tile day="Fri" date={16} onClick={() => alert("hoge")} />
          </Grid>
          <Grid item>
            <Tile day="Sat" date={17} onClick={() => alert("hoge")} />
          </Grid>
          <Grid item>
            <Tile day="Sun" date={18} onClick={() => alert("hoge")} />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
};