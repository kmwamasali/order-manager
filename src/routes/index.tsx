import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

function Routes() {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default Routes;