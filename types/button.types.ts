import React from "react";

import {Button} from "@/components/ui/button";

export type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

export type SubmitButtonProps = ButtonProps & {
    label: string;
    onAction?: (fd: FormData) => Promise<unknown>;
    success?: string;
    error?: string;
    autoSuccess?: boolean;
    children?: React.ReactNode;
};