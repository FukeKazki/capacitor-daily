import { IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import useSWR from "swr";
import { findDaily } from "../features/daily/repository";
import { pencilOutline } from 'ionicons/icons';

export default function PreviewPage({ match }: RouteComponentProps<{
  id: string
}>) {
  const { data } = useSWR(`/daily/${match.params.id}`, () => findDaily(match.params.id))

  if (!match.params?.id) {
    return <IonPage>日記が見つかりません</IonPage>
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{data?.date}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <h1>{data?.title}</h1>
        <p>{data?.content}</p>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink={`/edit/${data?.id}`}>
            <IonIcon icon={pencilOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}
