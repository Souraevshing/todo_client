"use client";


import React, { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

interface SubmitButtonProps extends ButtonProps {
    label: string;
    action: (fd: FormData) => Promise<any>;
    success?: string;
    error?: string;
    children?: React.ReactNode;
}

export function SubmitButton({
                                 label,
                                 action,
                                 success = "Success!",
                                 error = "Something went wrong.",
                                 children,
                                 ...props
                             }: SubmitButtonProps) {
    const [pending, startTransition] = useTransition();

    return (
        <Button
            {...props}
            type={props.type ?? "submit"}
            disabled={pending || props.disabled}
            onClick={(e) => {
                e.preventDefault();
                const form = (e.currentTarget as HTMLButtonElement).form;
                if (!form) return;

                const fd = new FormData(form);

                startTransition(async () => {
                    try {
                        await action(fd);
                        toast.success(success);
                    } catch (err: any) {
                        toast.error(error);
                    }
                });
            }}
        >
            {pending ? (
                <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
                    {label}
        </span>
            ) : (
                children ?? label
            )}
        </Button>
    );
}
