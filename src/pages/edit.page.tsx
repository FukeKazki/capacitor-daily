import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import useSWR, { useSWRConfig } from "swr";
import { findDaily, updateDaily } from "../features/daily/repository";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router-dom";
import { DailyInput, dailySchema } from "../features/daily/model";
import { useRef } from "react";
import useSWRMutation from 'swr/mutation'

export default function EditPage({ match }: RouteComponentProps<{
  id: string
}>) {
  const router = useIonRouter()
  const { data } = useSWR(`/daily/${match.params.id}`, () => findDaily(match.params.id))
  const { trigger } = useSWRMutation(`/daily/${match.params.id}`, (_, { arg }: {
    arg: Parameters<typeof updateDaily>[0]
  }) => updateDaily(arg))
  const { mutate } = useSWRConfig()

  const { register, handleSubmit, watch } = useForm<DailyInput>({
    defaultValues: {
      title: data?.title,
      content: data?.content,
      date: data?.date,
    },
    mode: 'onBlur',
    resolver: zodResolver(dailySchema),
  })

  const submitButtonRef = useRef<HTMLButtonElement>(null)

  const onValid = async (input: DailyInput) => {
    await trigger({
      ...input,
      id: match.params.id,
    })
    await mutate('/daily')
    router.goBack()
  }

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
          <IonTitle>{watch('date')}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => submitButtonRef.current?.click()}>完了</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form onSubmit={handleSubmit(onValid, console.error)}>
          <IonInput {...register('title')} placeholder="今日のタイトル"></IonInput>
          <IonTextarea {...register('content')} placeholder="どんな一日でしたか?"></IonTextarea>
          <button ref={submitButtonRef} type="submit" style={{ display: 'none' }}></button>
        </form>
      </IonContent>
    </IonPage>
  )
}
