"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {};

interface SubmitButtonProps extends ButtonProps {
    label: string;
    success?: string;
    error?: string;
    children?: React.ReactNode;
};

export function SubmitButton({
                                 label,
                                 success = "Success!",
                                 error = "Something went wrong.",
                                 children,
                                 ...props
                             }: SubmitButtonProps) {
    const [pending, startTransition] = useTransition();

    return (
        <Button
            {...props}
            type="submit"
            disabled={pending || props.disabled}
            onClick={() => {
                startTransition(() => {
                    toast.loading("Processing...");
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
