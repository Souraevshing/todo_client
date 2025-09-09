"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function SubmitButton({ label }: { label: string }) {
    const [pending, startTransition] = useTransition();

    return (
        <Button
            type="submit"
            disabled={pending}
            onClick={(e) => {
                e.preventDefault();
                const form = (e.target as HTMLButtonElement).form;
                if (!form) return;
                startTransition(async () => {
                    try {
                        await form.requestSubmit();
                        toast.success(`${label} successful!`);
                    } catch {
                        toast.error(`${label} failed!`);
                    }
                });
            }}
        >
            {pending ? "Loading..." : label}
        </Button>
    );
}
