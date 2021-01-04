import Home from './views/Home'
import { Context } from './context'
import { useContext, useEffect } from 'react'
import UpperHeader from './components/UpperHeader/'
import { HashRouter, Switch, Route } from "react-router-dom"

declare global {
  interface Window {
    /* eslint-disable-next-line */
    FFMPEGClient: any;
    /* eslint-disable-next-line */
    FFMPEGClientProcessors: any;
  }
}

export default function App(): JSX.Element {
  const [ , dispatch ] = useContext(Context);

  useEffect(() => {
    const ffmpeg = new window.FFMPEGClient({
      worker: `${window.location.origin}/ffmpeg-client-js/ffmpeg-worker/worker.js`,
      on: {
        notSupported: () => {
          dispatch({ 
            type: 'updateStore', 
            payload: { 
              ffmpeg: false,
              loading: false, 
              supported: false,
            }
          });          
        },
        ready: () => {
          dispatch({ 
            type: 'updateStore', 
            payload: { 
              ffmpeg: ffmpeg,
              loading: false, 
              supported: true,
              processors: new FFMPEGClientProcessors(ffmpeg)
            }
          });
        },
      }
    });
  }, []);

  return (
    <HashRouter basename="/">
      <UpperHeader />
      
      <Switch>        
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  )
}
  