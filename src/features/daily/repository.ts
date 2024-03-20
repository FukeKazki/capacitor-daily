
import { Preferences } from '@capacitor/preferences';
import { Daily } from './model';

const STORAGE_KEY = 'daily-list';

export async function findAllDaily(): Promise<Daily[]> {
  const dailyList = await Preferences.get({ key: STORAGE_KEY });
  if (!dailyList.value) return [];
  return JSON.parse(dailyList.value);
}

export async function findDaily(id: string) {
  const dailyList = await findAllDaily();
  return dailyList.find(v => v.id === id);
}

export async function createDaily(row: {
  title: string;
  content: string;
  date: string;
}) {
  const daily: Daily = {
    id: Date.now().toString(),
    date: row.date,
    title: row.title,
    content: row.content,
  }
  const dailyList = await findAllDaily();
  if (dailyList.length === 0) {
    return await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify([daily]) });
  }
  await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify([daily, ...dailyList]) });
}

export async function updateDaily(daily: Daily) {
  const dailyList = await findAllDaily();
  const newDailyList = dailyList.map(v => {
    if (v.id === daily.id) {
      return daily
    }
    return v;
  })

  await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(newDailyList) });
}

export async function deleteDaily(id: string) {
  const dailyList = await findAllDaily();
  const newDailyList = dailyList.filter(v => v.id !== id);
  await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(newDailyList) });
}

export async function clearAllDaily() {
  await Preferences.remove({ key: STORAGE_KEY });
}
