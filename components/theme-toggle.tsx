"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                className="h-9 w-9 p-0"
                aria-label="Toggle theme (loading)"
                disabled
            />
        );
    }

    const isDark = theme === "dark";

    return (
        <Button
            variant="ghost"
            className="h-9 w-9 p-0 cursor-pointer relative"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
        >
            <Sun
                className={`h-5 w-5 transition-transform duration-300 ${
                    isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
                }`}
            />
            <Moon
                className={`absolute h-5 w-5 transition-transform duration-300 ${
                    isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                }`}
            />
        </Button>
    );
}
