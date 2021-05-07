import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { GithOAuth } from '../../../scenes/Auth/Login/GithubOAuth';

const useStyles = makeStyles(theme => ({
  form: {
  },
  description: {
    marginTop: theme.spacing(1),
  },
  submit: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  }
}))

function CreateRepo({parameters, ...props}) {

  const [repository, setRepository] = useState('');
  const [description, setDescription] = useState('');

  const githubToken = window.sessionStorage.getItem('github-token');

  const classes = useStyles();

  const CreateRepo = async () => {
    if(!githubToken) return;
    const result = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <div>
      {githubToken ? (
        <form className={classes.form} onSubmit={() => {CreateRepo()}}>
          <TextField
            label='Repository name'
            type='text'
            variant='outlined'
            value={repository}
            onChange={(e) => setRepository(e.target.value)}
            fullWidth
          />
          <TextField
            label='Description'
            type='text'
            variant='outlined'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={classes.description}
            fullWidth
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
            fullWidth
          >
            Create repository
          </Button>
        </form>
      ) : (
        <>
          <h3>Not connected to Github</h3>
          <GithOAuth />
        </>
      )}
    </div>
  )
}

export default CreateRepo;