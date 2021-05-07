import { IconButton, Paper, makeStyles } from '@material-ui/core';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import services from 'services';

const useStyles = makeStyles(theme => ({
  widget: {
    borderRadius: '10px',
    padding: '20px',
  },
  header: {
    display: 'inline-block',
    width: '100%'
  },
  title: {
    float: 'left',
    marginTop: '12px',
  },
  menu: {
    float: 'right',
  }
}))

function WidgetWrapper({component: Component, widget, index, widgetRemover, ...props}) {

  const classes = useStyles();

  const service = services.find(s => s.id === widget.service);
  const details = service.widgets.find(w => w.id === widget.widget);


  return (
    <Paper className={classes.widget} elevation={3}>
      <div className={classes.header}>
        <h3 className={classes.title}>{service.name} | {details.name}</h3>
        <IconButton
          onClick={() => widgetRemover(index)}
          color='primary'
          className={classes.menu}
        >
          <HighlightOffIcon />
        </IconButton>
      </div>
      <Component {...props} />
    </Paper>
  );
}

export default WidgetWrapper;