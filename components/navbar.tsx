import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 w-full dark:bg-white bg-background backdrop-blur">
            <div className="container mx-auto max-w-2xl px-4 py-3 flex items-center justify-between">
                <div className="font-semibold tracking-tight">Todo App</div>
                <ThemeToggle />
            </div>
            <Separator />
        </header>
    );
}