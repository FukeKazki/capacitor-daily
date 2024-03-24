import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import HomePage from './pages/home/index.page';
import NewPage from './pages/new.page';
import EditPage from './pages/edit.page';
import PreviewPage from './pages/preview.page';

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter basename={import.meta.env.BASE_URL}>
        <IonRouterOutlet onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
          <Route path="/home" render={() => <HomePage />} />
          <Route path="/new" render={() => <NewPage />} />
          <Route path="/edit/:id" render={props => <EditPage {...props} />} />
          <Route path="/preview/:id" render={props => <PreviewPage {...props} />} />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
