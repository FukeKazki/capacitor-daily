import { IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import SettingsPage from "./settings.page";
import DailyPage from "./daily.page";

export default function HomePage() {
  return (
    <IonTabs>
      <IonRouterOutlet onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
        <Route path="/home/daily" render={() => <DailyPage />} exact />
        <Route path="/home/settings" render={() => <SettingsPage />} exact />
        <Redirect exact from="/home" to="/home/daily" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/home/daily">
          <IonLabel>Daily</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/home/settings">
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
