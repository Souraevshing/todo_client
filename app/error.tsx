"use client";

import { AlertTriangle } from "lucide-react";
import {useRouter} from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error;
    reset: () => void;
}) {
    const router=useRouter();

    const handleRetry=()=>{
        reset();
        router.refresh();
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center space-y-6 transition-colors">
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="h-8 w-8" />
            </div>

            {/* Title & Message */}
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-black">
                    Oops, something went wrong
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md">
                    {error.message || "An unexpected error occurred. Please try again."}
                </p>
            </div>

            {/* Action */}
            <Button
                variant={`outline`}
                size="lg"
                onClick={handleRetry}
                className="px-6 cursor-pointer hover:text-black"
            >
                Try again
            </Button>
        </div>
    );
}
