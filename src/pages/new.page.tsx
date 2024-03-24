import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import useSWRMutation from 'swr/mutation'
import { createDaily } from "../features/daily/repository";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { DailyInput, dailySchema } from "../features/daily/model";
import { useRef } from "react";
import dayjs from 'dayjs'

export default function NewPage() {
  const router = useIonRouter()
  const { trigger } = useSWRMutation('/daily', (_, { arg }: {
    arg: Parameters<typeof createDaily>[0]
  }) => createDaily(arg))

  const { register, handleSubmit, watch } = useForm<DailyInput>({
    defaultValues: {
      title: '',
      content: '',
      date: dayjs().format('YYYY-MM-DD'),
    },
    mode: 'onBlur',
    resolver: zodResolver(dailySchema),
  })

  const submitButtonRef = useRef<HTMLButtonElement>(null)

  const onValid = async (data: DailyInput) => {
    await trigger(data)
    router.goBack()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{watch('date')}</IonTitle>
          <IonButtons slot="end">
            {/* TODO: 差分がないときはdisabled */}
            <IonButton onClick={() => submitButtonRef.current?.click()}>完了</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form onSubmit={handleSubmit(onValid, console.error)}>
          <IonInput {...register('title')} placeholder="今日のタイトル"></IonInput>
          <IonTextarea {...register('content')} placeholder="どんな一日でしたか?" autoGrow></IonTextarea>
          <button ref={submitButtonRef} type="submit" style={{ display: 'none' }}></button>
        </form>
      </IonContent>
    </IonPage>
  )
}
