import React from 'react';
import { Button, Grid, TextField, MenuItem, makeStyles } from '@material-ui/core';

const apiKey = process.env.news;

class NewsByDate extends React.Component {
  state = {
    year: ["2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013"],
    month: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    day: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
    topic: '',
    post: [],
    syear: '',
    smonth: '',
    sday: '',
    eyear: '',
    emonth: '',
    eday: ''
  };

  handleSelect = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getNews = () => {
    fetch(`http://newsapi.org/v2/everything?q=${this.topic}&from=${this.syear}-${this.smonth}-${this.sday}&to=${this.eyear}-${this.emonth}-${this.eday}&sortBy=popularity&apiKey=${apiKey}`)
    .then( res => res.json())
    .then(data => {
      this.setState({
        post: data.articles
      });
      console.log(data);
    });
  };

  render() {
    const { year, month, day, post, syear, smonth, sday, eyear, emonth, eday } = this.state;

    return (
      <div>
        <select
          name='syear'
          value={syear}
          onChange={this.handleSelect}>
            {year.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
        </select>
        <select
          name='smonth'
          value={smonth}
          onChange={this.handleSelect}>
            {month.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
        </select>
        <select
          name='sday'
          value={sday}
          onChange={this.handleSelect}>
            {day.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
        </select>
        <select
          name='eyear'
          value={eyear}
          onChange={this.handleSelect}>
            {year.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
        </select>
        <select
          name='emonth'
          value={emonth}
          onChange={this.handleSelect}>
            {month.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
        </select>
        <select
          name='eday'
          value={eday}
          onChange={this.handleSelect}>
            {day.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
        </select>
        <input type='text' name='topic' placeholder='choose your topic' onChange={this.handleInput}/>
        <button onClick={this.getNews}>Get News</button>
        <div>
            <ul>
              {post.map(p => (
                <li key={p.articles}>{p.title} {p.url}</li>
              ))}
            </ul>
        </div>
      </div>
    );
  }
};

export default NewsByDate;