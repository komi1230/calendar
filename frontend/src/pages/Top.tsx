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
        <Grid
          item
        >
          <Typography
            className={classes.mainMessage}
          >
            Search someone's calendar
          </Typography>
        </Grid>
        <Grid
          item
        >
          <TextField
            id="outlined-basic"
            label=""
            placeholder="ID"
            className={classes.searchField}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Button 
              variant="contained" 
              color="primary"
              className={classes.createButton}
            >
              Create
            </Button>
          </Grid>
          <Grid item>
          <Button 
              variant="contained" 
              color="inherit"
              disableElevation={true}
              className={classes.searchButton}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}