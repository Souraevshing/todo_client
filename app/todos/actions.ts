"use server";

import { revalidatePath } from "next/cache";

import { BASE_URL } from "@/lib/config";
import { fetchJSON } from "@/lib/http";

const TODOS_PATH = "/todos";

export async function createTodoAction(formData: FormData):Promise<void> {
    const title = (formData.get("title") as string || "").trim();
    const description = (formData.get("description") as string || "").trim();
    if (!title) throw new Error("Title is required");
    if (!description) throw new Error("Description is required");

    await fetchJSON(`${BASE_URL}/api/v1/todos`, {
        method: "POST",
        body: JSON.stringify({ title, description: description || undefined }),
    });
    revalidatePath(TODOS_PATH);
}

export async function deleteTodoAction(formData: FormData):Promise<void> {
    const id = String(formData.get("id"));
    await fetchJSON(`${BASE_URL}/api/v1/todos/${id}`, { method: "DELETE" });
    revalidatePath(TODOS_PATH);
}

export async function toggleCompleteAction(formData: FormData):Promise<void> {
    const id = String(formData.get("id"));
    const completed = String(formData.get("completed")) === "true";
    await fetchJSON(`${BASE_URL}/api/v1/todos/${id}/complete`, {
        method: "PATCH",
        body: JSON.stringify({ completed }),
    });
    revalidatePath(TODOS_PATH);
}

export async function updateTodoAction(formData: FormData):Promise<void> {
    const id = String(formData.get("id"));
    const title = (formData.get("title") as string || "").trim();
    const description = (formData.get("description") as string || "").trim();
    if (!title) throw new Error("Title is required");
    if (!description) throw new Error("Description is required");

    await fetchJSON(`${BASE_URL}/api/v1/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ title, description }),
    });
    revalidatePath(TODOS_PATH);
}