import { BASE_URL } from "@/lib/config";
import { fetchJSON } from "@/lib/http";

export type Todo = { _id: string; title: string; description?: string; completed: boolean; createdAt?: string; updatedAt?: string };

export type CreateTodoInput = { title: string; description?: string };
export type UpdateTodoInput = Partial<Omit<Todo, "_id">>;
export async function getTodos(): Promise<Todo[]> {
    return fetchJSON<Todo[]>(`${BASE_URL}/api/v1/todos`);
}