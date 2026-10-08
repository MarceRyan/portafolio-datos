import { getCollection, type CollectionEntry } from 'astro:content';

export type Caso = CollectionEntry<'casos'>;

/** Todos los casos, del primero al último según `order`. */
export async function getCasos(): Promise<Caso[]> {
  const casos = await getCollection('casos');
  return casos.sort((a, b) => a.data.order - b.data.order);
}
