import { useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';

import services from 'services';
import WidgetWrapper from 'components/widgetWrapper/WidgetWrapper';
import WidgetSelect from 'components/WidgetSelect/WidgetSelect';

const useStyles = makeStyles(theme => ({
  widgetList: {
    marginTop: '30px',
  }
}));

function Dashboard(props) {

  const widgets = JSON.parse(localStorage.getItem('widgets')) || [];

  const [widgetList, setWidgetList] = useState(widgets);

  const classes = useStyles();

  const refreshWidgetList = () => setWidgetList(JSON.parse(localStorage.getItem('widgets')));

  const removeWidgetByIndex = (index) => {
    var newList = JSON.parse(localStorage.getItem('widgets'));

    newList.splice(index, 1);

    localStorage.removeItem('widgets');
    localStorage.setItem('widgets', JSON.stringify(newList));

    refreshWidgetList();
  }

  // const removeWidgetById = (id) => {
  //   const list = JSON.parse(localStorage.getItem('widgets'));
  //   const newList = list.filter(widget => widget.id !== id);

  //   localStorage.removeItem('widgets');
  //   localStorage.setItem('widgets', JSON.stringify(newList));

  //   refreshWidgetList();
  // }

  return (
    <Container component='main'>
      <Grid container spacing={2} justify='center' className={classes.widgetList}>
        {services.map((service, index) => (
          <Grid key={index} item xs={3}>
            <WidgetSelect service={service} refresh={refreshWidgetList} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} className={classes.widgetList}>
        {widgetList.map((item, index) => {
          const widget = services.find(s => s.id === item.service).widgets.find(w => w.id === item.widget);

          return (
            <Grid key={index} item xs={4}>
              <WidgetWrapper widget={item} index={index} component={widget.component} widgetRemover={removeWidgetByIndex} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Dashboard;