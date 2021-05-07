import { useState, useEffect } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FolderIcon from '@material-ui/icons/Folder';
import { GithOAuth } from '../../../scenes/Auth/Login/GithubOAuth';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: '50%',
    borderRadius: '15px'
  },
  account: {
    display: 'flex',
    width: '100%'
  },
  infos: {
    width: '50%',
    padding: theme.spacing(2),
  },
  box: {
    display: 'flex',
    marginBottom: theme.spacing(1)
  },
  text: {
    marginLeft: theme.spacing(1),
  }
}))

const Account = ({parameters, ...props}) => {

  const [account, setAccount] = useState(null);

  const githubToken = window.sessionStorage.getItem('github-token');

  const classes = useStyles();

  useEffect(() => {
    if(!githubToken) return;

    axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      }
    }).then(response => {
      setAccount(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [githubToken])

  return (
      <div>
        {account ? (
          <div className={classes.account}>
            <img className={classes.avatar} src={account.avatar_url} alt='avatar'/>
            <div className={classes.infos}>
              <div className={classes.box}>
                <AccountCircleIcon color='primary' />
                <div className={classes.text}>{account.login}</div>
              </div>
              <div className={classes.box}>
                <FolderIcon color='primary' />
                <div className={classes.text}>{account.public_repos + account.total_private_repos}</div>
              </div>
              <Button variant='contained' color='primary' fullWidth onClick={() => window.open(account.html_url)}>
                Open Github
              </Button>
            </div>
          </div>
        ) : (<><GithOAuth/></>)}
      </div>
  );
}

export default Account;