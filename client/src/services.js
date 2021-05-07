import MoneyConverter from 'widgets/Converter/MoneyConverter';

import WeatherService from 'widgets/Weather/Weather';

import NewsByCountry from 'widgets/News/NewsByCountry/NewsByCountry';
import NewsByDate from 'widgets/News/NewsByDate/NewsByDate';
import NewsByTopic from 'widgets/News/NewsByTopic/NewsByTopic';

import CreateRepo from 'widgets/Github/CreateRepo/CreateRepo';
import Account from 'widgets/Github/Account/Account';
import GetUserList from 'widgets/Github/RepoList/RepoList';

const services = [
  {
    id: 'converter',
    name: 'Converter',
    widgets: [
      {
        id: 'money',
        name: 'Money converter',
        component: MoneyConverter,
      },
    ]
  },
  {
    id: 'weather',
    name: 'Weather',
    widgets: [
      {
        id: 'day',
        name: "Today's weather",
        component: WeatherService,
      }
    ]
  },
  {
    id: 'news',
    name: 'News',
    widgets: [
      {
        id: 'news-by-country',
        name: 'Top news by country',
        component: NewsByCountry,
      },
      {
        id: 'news-by-date',
        name: 'Top news by dates',
        component: NewsByDate,
      },
      {
        id: 'news-by-topic',
        name: 'Top news by topic',
        component: NewsByTopic,
      }
    ]
  },
  {
    id: 'github',
    name: 'Github',
    widgets: [
      {
        id: 'create-repo',
        name: 'Create new repository',
        component: CreateRepo,
      },
      {
        id: 'account',
        name: 'Account informations',
        component: Account,
      },
      {
        id: 'get-list',
        name: 'list of your public repositories',
        component: GetUserList,
      }
    ]
  }
];

export default services;