import React from 'react';
import { useHistory } from "react-router";
import LoginGithub from 'react-login-github';

const GithOAuth = () => {
  const client_id = process.env.github;
  const history = useHistory();

  return (
    <LoginGithub
    clientId={client_id}
    redirectUri='http://localhost:3000/auth/login'
    scope='user'
    onSuccess={(res) => {
      const body = { 'code': res.code };

      fetch('/api/github', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        window.sessionStorage.setItem('github-token', data.access_token);
        history.push('/dashboard');
      })
      .catch(error => {
        console.log(error);
      })
    }}
    onFailure={(event) => {
      console.log('Github auth failure');
      console.log(event);
    }}
    buttonText='Login with github'
  />
  );
}

export { GithOAuth }