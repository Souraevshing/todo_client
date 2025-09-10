import { ClipboardList } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TodoForm } from "@/components/todos/create-todo-form";
import { TodoList } from "@/components/todos/todo-list";

import { createTodoAction } from "@/app/todos/actions";
import {getTodos, Todo} from "@/app/todos/fetch";

export const dynamic = "force-dynamic";

export default async function Page() {

    const todos:Todo[] = await getTodos();

    return (
        <div className="container mx-auto max-w-2xl space-y-8 px-4 py-6">
            <Card className="shadow-sm transition-colors">
                <CardHeader>
                    <Link href="/" prefetch className={`inline-flex items-center`}>
                    <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                        Todos App
                    </h1>
                    </Link>
                </CardHeader>
                <CardContent>
                    <TodoForm action={createTodoAction} />
                </CardContent>
            </Card>

            {/* Todo List */}
            <section className="space-y-3">
                {todos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                        <ClipboardList className="h-8 w-8 mb-2 opacity-70 dark:text-gray-500 text-neutral-900" />
                        <p className="text-sm sm:text-base font-medium">
                            No todos yet.
                        </p>
                    </div>
                ) : (
                    todos.map((t) => <TodoList key={t._id} todo={t} />)
                )}
            </section>
        </div>
    );
}
