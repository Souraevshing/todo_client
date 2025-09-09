import { Pencil, Trash2 } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ToggleCompleteClient from "@/components/todos/toggle-todo";
import { Todo } from "@/app/todos/fetch";
import { deleteTodoAction, toggleCompleteAction, updateTodoAction } from "@/app/todos/actions";
import { TodoForm } from "@/components/todos/create-todo";

export function TodoItem({ todo }: { todo: Todo }) {
    const toggleFormId = `toggle-${todo._id}`;
    return (
        <Card className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
                <form id={toggleFormId} action={toggleCompleteAction} className="contents">
                    <input type="hidden" name="id" value={todo._id} />
                    <input type="hidden" name="completed" value={(!todo.completed).toString()} />
                    <Checkbox defaultChecked={todo.completed} />
                </form>
                <ToggleCompleteClient formId={toggleFormId} />
                <div className="leading-tight">
                    <p className="font-medium line-clamp-1 {todo.completed ? 'line-through text-muted-foreground' : ''}">{todo.title}</p>
                    {todo.description && <p className="text-sm text-muted-foreground line-clamp-2">{todo.description}</p>}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon" aria-label="Edit">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Todo</DialogTitle>
                        </DialogHeader>
                        <TodoForm action={updateTodoAction} defaults={{ id: todo._id, title: todo.title, description: todo.description }} />
                    </DialogContent>
                </Dialog>
                <form action={deleteTodoAction}>
                    <input type="hidden" name="id" value={todo._id} />
                    <Button type="submit" variant="destructive" size="icon" aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </Card>
    );
}