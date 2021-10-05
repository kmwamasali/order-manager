import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import SingleOrderPage from '../components/SingleOrderPage';

function Routes() {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/orders/:id" component={SingleOrderPage} />
      </Switch>
    </Router>
  )
}

export default Routes;