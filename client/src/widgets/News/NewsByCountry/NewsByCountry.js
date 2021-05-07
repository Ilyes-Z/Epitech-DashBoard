import { Button, Grid, TextField, MenuItem, makeStyles } from '@material-ui/core';
import { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const apiKey = process.env.news;

const useStyles = makeStyles(theme => ({
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

function NewsByCountry(props) {

  const countries = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa" ,"se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"];

  const [country, setCountry] = useState('fr');
  const [news, setNews] = useState([]);

  const [index, setIndex] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setNews(data.articles);
        console.log(data.articles);
      })
      .catch(err => console.log(err));
  }, [country])

  return (
    <div>
      <TextField
        id='country-select'
        variant='outlined'
        label='Country'
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        fullWidth
        select
      >
        {countries.map((c, index) => (
          <MenuItem key={index} value={c}>{c}</MenuItem>
        ))}
      </TextField>
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

export default NewsByCountry;