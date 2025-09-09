import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TodoForm({ action, defaults }: { action: (fd: FormData) => Promise<void>; defaults?: { title?: string; description?: string; id?: string } }) {
    return (
        <form action={action} className="grid gap-3">
            {defaults?.id && <input type="hidden" name="id" defaultValue={defaults.id} />}
            <div className="grid gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="New todo title…" defaultValue={defaults?.title} required />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Optional description" defaultValue={defaults?.description} />
            </div>
            <div className="flex justify-end gap-2 pt-1">
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}