import { TextField, Button, makeStyles } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  div: {
    marginTop: theme.spacing(1),
    display: 'flex',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  error: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  }
}))

function DayWeatherForm({loadweather, error, ...props}) {

  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={loadweather}>
      {error ? (
        <div className={classes.error}>Need a City and a Country</div>
      ) : (<></>)}
      <TextField
        label='City'
        type='text'
        variant='outlined'
        name='city'
        fullWidth
      />
      <div className={classes.div}>
        <TextField
          label='Country'
          type='text'
          variant='outlined'
          name='country'
          fullWidth
        />
        <Button className={classes.button} color='primary' type='submit' variant='contained'>
          SEARCH
        </Button>
      </div>
    </form>
  );
}

export default DayWeatherForm;