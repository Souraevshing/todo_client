import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTodos } from "@/app/todos/fetch";
import { TodoForm } from "@/components/todos/create-todo";
import { createTodoAction } from "@/app/todos/actions";
import { TodoItem } from "@/components/todos/todo-list";

export const dynamic = "force-dynamic";


export default async function Page() {
  const todos = await getTodos();

  return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-semibold tracking-tight">Todos</h1>
          </CardHeader>
          <CardContent>
            <TodoForm action={createTodoAction} />
          </CardContent>
        </Card>


        <section className="space-y-2">
          {todos.length === 0 ? (
              <p className="text-sm text-muted-foreground">No todos yet. Add your first one above.</p>
          ) : (
              todos.map((t) => <TodoItem key={t._id} todo={t} />)
          )}
        </section>
      </div>
  );
}