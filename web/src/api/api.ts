export async function getItems(): Promise<Item[]> {
  const response = await fetch("/api");
  return await response.json();
}

export async function addItem(name: string): Promise<Item> {
  const response = await fetch("/api", {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function deleteItem(id: number): Promise<void> {
  await fetch("/api", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export interface Item {
  id: number;
  name: string;
  createdAt: string;
}
