"use client";

import {useEffect} from "react";

export default function ToggleCompleteClient({ formId }: { formId: string }) {
    useEffect(() => {
        const form = document.getElementById(formId) as HTMLFormElement | null;
        if (!form) return;
        const checkbox = form.querySelector("input[type='checkbox']") as HTMLInputElement | null;
        if (!checkbox) return;
        const handler = () => form.requestSubmit();
        checkbox.addEventListener("change", handler);
        return () => checkbox.removeEventListener("change", handler);
    }, [formId]);
    return null;
}