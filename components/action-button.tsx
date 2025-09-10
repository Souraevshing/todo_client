"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { useTransition, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {usePathname} from "next/navigation";


import { Button } from "@/components/ui/button";
import {SubmitButtonProps} from "@/types/button.types"

export function ActionButton({
                                 label,
                                 onAction,
                                 success = "Success!",
                                 error = "Something went wrong.",
                                 autoSuccess = true,
                                 children,
                                 ...props
                             }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    const pathname = usePathname();
    const [transitionPending, startTransition] = useTransition();

    const isLoading = pending || transitionPending;
    const loadingToastId = useRef<string | number | undefined>(undefined);

    useEffect(() => {
        if (onAction) return;
        if (pending && loadingToastId.current == null) {
            loadingToastId.current = toast.loading("Processing…");
        } else if(!pending && loadingToastId.current !=null) {
            toast.dismiss(loadingToastId.current);
            loadingToastId.current = undefined;
            if(autoSuccess) {
                toast.success(success)
            }
        }
    }, [pending, onAction, autoSuccess, success]);

    useEffect(() => {
        if (loadingToastId.current != null) {
            toast.dismiss(loadingToastId.current);
            loadingToastId.current = undefined;
        }
    }, [pathname]);

    useEffect(() => {
        return () => {
            if (loadingToastId.current != null) {
                toast.dismiss(loadingToastId.current);
                loadingToastId.current = undefined;
            }
        };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!onAction) return;
        e.preventDefault();

        const form = (e.currentTarget as HTMLButtonElement).form;
        if (!form) return;

        const fd = new FormData(form);

        startTransition(async () => {
            try {
                loadingToastId.current = toast.loading("Processing…");

                await onAction(fd);

                if (loadingToastId.current !== undefined) {
                    toast.dismiss(loadingToastId.current);
                    loadingToastId.current = undefined;
                }
                toast.success(success);

                } catch (err: any) {
                 if (loadingToastId.current !== undefined) {
                    toast.dismiss(loadingToastId.current);
                    loadingToastId.current = undefined;
                }
                toast.error(err?.message ?? error);
            }
        });
    };

    return (
        <Button
            {...props}
            type={props.type ?? "submit"}
            disabled={isLoading || props.disabled}
            onClick={handleClick}
        >
            {isLoading ? (
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
