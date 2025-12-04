import { useQuery } from "@tanstack/react-query";

interface CatFact {
  fact: string;
  length: number;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchCatFact = async (): Promise<CatFact> => {
  await delay(1500);
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch cat fact');
  }
  const data: CatFact = await response.json();
  return data;
};

// Вариант 1: Всегда получать новые данные (убрать кэширование)
export const useCatFact = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['catFact'],
    queryFn: fetchCatFact,
    suspense: true,
    staleTime: 0, // Данные сразу устаревают
    cacheTime: 0, // Не хранить в кэше
    enabled, // Запрос только когда enabled = true
  });
};

// Вариант 2: Использовать timestamp в queryKey для уникальности
export const useCatFactWithTimestamp = (timestamp?: number) => {
  return useQuery({
    queryKey: ['catFact', timestamp],
    queryFn: fetchCatFact,
    suspense: true,
    staleTime: 30000,
  });
};