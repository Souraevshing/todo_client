"use client";

import {useEffect} from "react";

export default function ToggleCompleteClient({ formId }: { formId: string }) {

    useEffect(() => {

        const form = document.getElementById(formId) as HTMLFormElement | null;

        if (!form) return;

        const checkbox = form.querySelector("input[type='checkbox']") as HTMLInputElement | null;

        if (!checkbox) return;

        checkbox.classList.add(
            "h-5", "w-5", "rounded-md", "border-gray-300", "dark:border-gray-600",
            "text-primary", "focus:ring-2", "focus:ring-primary",
            "dark:focus:ring-primary", "transition-all", "cursor-pointer"
        );

        const handler = () => form.requestSubmit();
        checkbox.addEventListener("change", handler);

        return () => checkbox.removeEventListener("change", handler);
    }, [formId]);
    return null;
}