import { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { GithOAuth } from '../../../scenes/Auth/Login/GithubOAuth';

const GetUserList = ({parameters, ...props}) => {

  const [list, setList] = useState([]);
  const githubToken = window.sessionStorage.getItem('github-token');

  const getList = () => {
      if(!githubToken) return;
      
      axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      }
    }).then(response => {
      console.log(response.data);
      setList(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  const renderList = (repo) => {
    return(
      <div key={repo.id}>
        <h3>{repo.name}</h3>
        <Button variant='contained' color='primary' onClick={() => {window.open(repo.html_url)}} > Open in Github</Button>
      </div>
    );
  }

  return (
    <div>
      {(githubToken && list) ? (
        <div>
          <Button type='submit' variant='contained' color='primary' onClick={() => {getList()}} >Get list</Button>
          <div>{list.map(renderList)}</div>
        </div>
      ) : (
        <>
          <h3>Not connected to Github</h3>
          <GithOAuth />
        </>
      )}
    </div>
  )
}

export default GetUserList;