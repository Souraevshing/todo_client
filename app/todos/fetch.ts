import { BASE_URL } from "@/lib/config";
import { fetchJSON } from "@/lib/http";

export type Todo = { _id: string; title: string; description: string; completed: boolean; createdAt?: string; updatedAt?: string };

export async function getTodos(): Promise<Todo[]> {
    const res = await fetch(`${BASE_URL}/api/v1/todos`, {
        next: {tags: ["todos"]}
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch todos`);
    }
    return fetchJSON<Todo[]>(`${BASE_URL}/api/v1/todos`);
}