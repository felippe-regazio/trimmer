import Home from './views/Home'
import Chunks from './views/Chunks'
import { Context } from './context'
import { useContext, useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from "react-router-dom"

declare global {
  interface Window {
    /* eslint-disable-next-line */
    FFMPEGClient: any;
  }
}

export default function App(): JSX.Element {
  const [ , dispatch ] = useContext(Context);

  useEffect(() => {
    new window.FFMPEGClient({
      worker: `${window.location.origin}/ffmpeg-client-js/ffmpeg-worker/worker.js`,
      on: {
        notSupported: console.log,
        ready: () => {
          dispatch({ 
            type: 'updateStore', 
            payload: { ffmpegLoaded: true, supported: true }
          });
        },
      }
    });
  }, []);

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
  