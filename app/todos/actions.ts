"use server";

import { revalidatePath } from "next/cache";

import { BASE_URL } from "@/lib/config";
import { fetchJSON } from "@/lib/http";

export async function createTodoAction(formData: FormData) {
    const title = (formData.get("title") as string || "").trim();
    const description = (formData.get("description") as string || "").trim();
    if (!title) throw new Error("Title is required");

    await fetchJSON(`${BASE_URL}/todos`, {
        method: "POST",
        body: JSON.stringify({ title, description: description || undefined }),
    });
    revalidatePath("/");
}

export async function deleteTodoAction(formData: FormData) {
    const id = String(formData.get("id"));
    await fetchJSON(`${BASE_URL}/todos/${id}`, { method: "DELETE" });
    revalidatePath("/");
}

export async function toggleCompleteAction(formData: FormData) {
    const id = String(formData.get("id"));
    const completed = String(formData.get("completed")) === "true";
    await fetchJSON(`${BASE_URL}/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed }),
    });
    revalidatePath("/");
}

export async function updateTodoAction(formData: FormData) {
    const id = String(formData.get("id"));
    const title = (formData.get("title") as string || "").trim();
    const description = (formData.get("description") as string || "").trim();
    if (!title) throw new Error("Title is required");

    await fetchJSON(`${BASE_URL}/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ title, description: description || undefined }),
    });
    revalidatePath("/");
}