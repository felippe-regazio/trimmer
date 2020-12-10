import Home from './Home/'
import Chunks from './Chunks'
import { HashRouter as Router, Switch, Route } from "react-router-dom"

export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/chunks">
          <Chunks />
        </Route>
        
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
  