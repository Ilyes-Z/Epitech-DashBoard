import { useState } from 'react';
import { TextField, MenuItem, Button, Grid, makeStyles } from '@material-ui/core';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';

const apiKey = process.env.news;

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    marginTop: theme.spacing(1),
    width: '100%'
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  title: {
    textAlign: 'justify',
  },
  desc: {
    textAlign: 'justify',
  },
  grid: {
    marginTop: theme.spacing(2),
  }
}))

function NewsByTopic(props) {

  const countries = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'se', 'ud', 'zh'];

  const [topic, setTopic] = useState('');
  const [country, setCountry] = useState('');
  const [news, setNews] = useState([]);

  const [index, setIndex] = useState(0);

  const getNewsFromTopic = (event) => {
    event.preventDefault();

    const baseUrl = `https://newsapi.org/v2/top-headlines?q=${topic}&apiKey=${apiKey}`;
    const url = country === '' ? baseUrl : `https://newsapi.org/v2/top-headlines?q=${topic}&language=${country}&apiKey=${apiKey}`;

    if (topic === '') return;

    fetch(url)
      .then(res => res.json())
      .then(res => setNews(res.articles))
      .catch(err => console.log(err));
  }

  const classes = useStyles();

  return (
    <div className={classes.div}>
      <TextField
        id='country-select'
        variant='outlined'
        label='Country'
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        fullWidth
        select
      >
        <MenuItem value=''>None</MenuItem>
        {countries.map((c, index) => (
          <MenuItem key={index} value={c}>{c}</MenuItem>
        ))}
      </TextField>
      <form className={classes.form} onSubmit={getNewsFromTopic}>
        <TextField
          label='Topic'
          type='text'
          variant='outlined'
          value={topic}
          onChange={(e => setTopic(e.target.value))}
          fullWidth
        />
        <Button className={classes.button} color='primary' type='submit' variant='contained'>
          SEARCH
        </Button>
      </form>
      {news.length ? (
        <div>
          <h4 className={classes.title}>{news[index].title}</h4>
          <div class={classes.desc}>{news[index].description}</div>
          <Grid className={classes.grid} container justify='center' spacing={2}>
            <Grid item>
              <Button variant='contained' color='primary' onClick={() => setIndex(index === 0 ? news.length - 1 : index - 1)}>
                <ArrowBackIosIcon color='secondary' />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={() => window.open(news[index].url)}
              >
                READ
              </Button>
            </Grid>
            <Grid item>
              <Button variant='contained' color='primary' onClick={() => setIndex(index === news.length - 1 ? 0 : index + 1)}>
                <ArrowForwardIosIcon color='secondary' />
              </Button>
            </Grid>

          </Grid>
        </div>
        ) : (<></>)}
    </div>
  );
}

export default NewsByTopic;