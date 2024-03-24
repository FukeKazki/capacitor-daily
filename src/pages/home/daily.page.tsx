import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { pencilOutline } from 'ionicons/icons';
import useSWR from "swr";
import { findAllDaily } from "../../features/daily/repository";

export default function DailyPage() {
  const { data, isLoading } = useSWR('/daily', findAllDaily)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonList>
          {data && data.map(daily => (
            <IonItem key={daily.id}>
              <IonCard style={{ width: '100%' }} routerLink={`/preview/${daily.id}`}>
                <IonCardHeader>
                  <IonCardSubtitle>{daily.date}</IonCardSubtitle>
                  <IonCardTitle>{daily.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>{daily.content}</IonCardContent>
              </IonCard>
            </IonItem>
          ))}
          {isLoading && <IonItem>読み込み中</IonItem>}
        </IonList>
        {!isLoading && data?.length === 0 && <p>右下のボタンを押して日記を書こう!</p>}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/new">
            <IonIcon icon={pencilOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}
