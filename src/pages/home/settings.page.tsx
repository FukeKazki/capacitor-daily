import { IonButton, IonContent, IonHeader, IonItem, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Dialog } from '@capacitor/dialog';
import { clearAllDaily } from "../../features/daily/repository";
import { useSWRConfig } from "swr";

export default function SettingsPage() {
  const { mutate } = useSWRConfig()
  const handleDelete = async () => {
    const { value } = await Dialog.confirm({
      message: 'データを削除しますか？',
    });
    if (value) {
      await clearAllDaily()
      await mutate('/daily')
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonList>
          <IonListHeader>アカウント</IonListHeader>
          <IonItem>
            <IonButton onClick={handleDelete}>データ削除</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}
