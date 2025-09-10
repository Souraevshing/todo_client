import { Pencil, Trash2, CheckCircle, Circle } from "lucide-react";

import { TodoForm } from "@/components/todos/create-todo-form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ActionButton } from "@/components/action-button";
import { Button } from "@/components/ui/button";

import { Todo } from "@/app/todos/fetch";
import {
    deleteTodoAction,
    toggleCompleteAction,
    updateTodoAction,
} from "@/app/todos/actions";
import { cn } from "@/lib/utils";

export function TodoList({ todo }: { todo: Todo }) {

    return (
        <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 transition-colors">
            <div className="flex items-start sm:items-center gap-3 flex-1">

                <form action={toggleCompleteAction} className="flex items-start">
                    <Input type="hidden" name="id" value={todo._id} />
                    <Input
                        type="hidden"
                        name="completed"
                        value={(!todo.completed).toString()}
                    />

                    <ActionButton
                        type="submit"
                        variant="ghost"
                        size="icon"
                        label="Toggle"
                        success={todo.completed ? "Marked incomplete" : "Marked complete"}
                        error="Failed to toggle todo"
                        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        {todo.completed ? (
                            <CheckCircle className="h-5 w-5 text-primary" />
                        ) : (
                            <Circle className="h-5 w-5" />
                        )}
                    </ActionButton>
                </form>

                <div className="flex flex-col min-w-0">
                    <p
                        className={cn(
                            "font-medium line-clamp-1 transition-all",
                            todo.completed && "line-through text-muted-foreground"
                        )}
                    >
                        {todo.title}
                    </p>
                    {todo.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {todo.description}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            aria-label="Edit Todo"
                            className="hover:bg-accent cursor-pointer"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-background text-foreground">

                        <div className="p-6">
                            <DialogHeader className="p-0 mb-4">
                                <DialogTitle>Edit Todo</DialogTitle>
                            </DialogHeader>

                            <TodoForm
                                action={updateTodoAction}
                                submitLabel={"Save Changes"}
                                className="gap-4"
                                defaults={{
                                    id: todo._id,
                                    title: todo.title,
                                    description: todo.description,
                                }}
                            />
                        </div>
                    </DialogContent>
                </Dialog>

                <form action={deleteTodoAction}>
                    <Input type="hidden" name="id" value={todo._id} />
                    <ActionButton
                        type="submit"
                        variant="destructive"
                        size="icon"
                        label="Delete"
                        success="Todo deleted"
                        error="Delete failed"
                        aria-label="Delete todo"
                        className="hover:bg-destructive/90 cursor-pointer"
                    >
                        <Trash2 className="h-4 w-4" />
                    </ActionButton>
                </form>
            </div>
        </Card>
    );
}
