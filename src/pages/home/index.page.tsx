import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route, useLocation } from "react-router-dom";
import SettingsPage from "./settings.page";
import DailyPage from "./daily.page";
import { useMemo } from "react";
import { bookOutline, bookSharp, settingsOutline, settingsSharp } from "ionicons/icons";

export default function HomePage() {
  const location = useLocation();
  const isDaily = useMemo(() => location.pathname === '/home/daily', [location.pathname]);
  const isSettings = useMemo(() => location.pathname === '/home/settings', [location.pathname]);

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
          <IonIcon icon={isDaily ? bookSharp : bookOutline} />
        </IonTabButton>
        <IonTabButton tab="tab2" href="/home/settings">
          <IonLabel>Settings</IonLabel>
          <IonIcon icon={isSettings ? settingsSharp : settingsOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
