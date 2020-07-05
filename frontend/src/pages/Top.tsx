import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { SearchAppBar } from './Header';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    mainMessage: {
      flexGrow: 1,
      alignItems: 'center',
      fontSize: '1.2rem',
      marginTop: theme.spacing(15),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(20),
        width: 'auto',
        fontSize: '2rem',
      },
    },
    searchField: {
      textAlign: "center",
      marginTop: theme.spacing(5),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(10),
        width: 'auto',
      },
    },
    createButton: {
      backgroundColor: "#4169e1",
      '&:hover': {
        backgroundColor: "#191970",
      },
      marginTop: theme.spacing(10),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(10),
        width: 'auto',
      },
    },
    searchButton: {
      color: "#FFFFFF",
      backgroundColor: "#ff9900",
      '&:hover': {
        backgroundColor: "#ff7700",
      },
      marginTop: theme.spacing(10),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(10),
        width: 'auto',
      },
    }
  })
);

const TopMessage: React.FC = () => {
  const classes = useStyles();
  return (
    <Typography
      className={classes.mainMessage}
    >
      Search someone's calendar
    </Typography>
  )
};

const InputID: React.FC = () => {
  const classes = useStyles();
  return (
    <TextField
      id="outlined-basic"
      label=""
      placeholder="ID"
      className={classes.searchField}
    />
  )
};

const CreateButton: React.FC = () => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.createButton}
    >
      Create
    </Button>
  )
};

const SearchButton: React.FC = () => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="inherit"
      disableElevation={true}
      className={classes.searchButton}
    >
      Search
    </Button>
  )
};

export const CreatePage: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SearchAppBar />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <TopMessage />
        </Grid>
        <Grid item>
          <InputID />
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <CreateButton />
          </Grid>
          <Grid item>
            <SearchButton />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
};