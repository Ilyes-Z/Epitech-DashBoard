import { Button, makeStyles, MenuItem, TextField } from '@material-ui/core';
import { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
  },
  button: {
    marginLeft: theme.spacing(1),
  }
}))

function WidgetSelect({service, refresh, ...props}) {

  const [widget, setWidget] = useState('');

  const classes = useStyles();

  const handleNewWidget = (event) => {
    event.preventDefault();

    if (widget === '') return;

    var userWidgets = JSON.parse(localStorage.getItem('widgets')) || [];
    userWidgets.push({
      id: `${service.id}-${widget}-${new Date()}`,
      service: service.id,
      widget: widget,
      parameters: {},
    });

    localStorage.removeItem('widgets');
    localStorage.setItem('widgets', JSON.stringify(userWidgets));

    refresh();
  }

  return (
    <form className={classes.form} onSubmit={handleNewWidget}>
      <TextField
        id='service-select'
        variant='outlined'
        label={service.name}
        value={widget}
        onChange={(e) => setWidget(e.target.value)}
        fullWidth
        select
      >
        {service.widgets.map((w, index) => (
          <MenuItem key={index} value={w.id}>{w.name}</MenuItem>
        ))}
      </TextField>
      <Button color='primary' type='submit' className={classes.button} variant='contained'>
        <AddIcon color='secondary' />
      </Button>
    </form>
  );
}

export default WidgetSelect;