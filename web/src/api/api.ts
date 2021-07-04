export async function getItems(): Promise<Item[]> {
  const response = await fetch("/api");
  return await response.json();
}

export interface Item {
  id: number;
  name: string;
  createdAt: string;
}
