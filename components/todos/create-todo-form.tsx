import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TodoForm({
                             action,
                             defaults,
                         }: {
    action?: (fd: FormData) => Promise<void>;
    defaults?: { title?: string; description?: string; id?: string };
}) {
    return (
        <form
            action={action}
            className="grid gap-4 sm:gap-5 p-1"
        >
            {defaults?.id && (
                <Input type="hidden" name="id" defaultValue={defaults.id} />
            )}

            {/* Title */}
            <div className="grid gap-2">
                <Label htmlFor="title" className="text-sm font-medium">
                    Title<span className={`align-super text-red-500`}>*</span>
                </Label>
                <Input
                    id="title"
                    name="title"
                    inputMode="text"
                    autoFocus
                    placeholder="Enter title"
                    defaultValue={defaults?.title}
                    required
                    className="w-full"
                />
            </div>

            {/* Description */}
            <div className="grid gap-2">
                <Label htmlFor="description" className="text-sm font-medium">
                    Description<span className={`align-super text-red-500`}>*</span>
                </Label>
                <Textarea
                    required
                    id="description"
                    name="description"
                    inputMode="text"
                    placeholder="Enter description"
                    defaultValue={defaults?.description}
                    className="min-h-[100px] w-full resize-y"
                />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    type="submit"
                    className="px-4 w-full cursor-pointer"
                >
                    Save
                </Button>
            </div>
        </form>
    );
}
