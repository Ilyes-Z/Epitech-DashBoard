import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#D8C3A5',
  },
  title: {
    color: 'white',
  },
  link: {
    color: 'white',
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar variant='dense'>
        <Box display='flex' flexGrow={1}>
          <Typography variant='h6' className={classes.title}>Dashboard</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;