import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 w-full bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-border transition-colors duration-300">
            <div className="container mx-auto max-w-2xl px-4 py-3 flex items-center justify-between">
                {/* App Title / Logo */}
                <div className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors duration-200 cursor-pointer underline uppercase hover:no-underline">
                    Todo App
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />
            </div>
            <Separator />
        </header>
    );
}
