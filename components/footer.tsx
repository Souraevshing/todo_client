'use client'

import {useEffect, useState} from 'react'

export default function Footer(){

    const [currentTime, setCurrentTime] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString());
    },[]);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return(
        <footer className="w-full border-t border-border bg-background/50 backdrop-blur-sm transition-colors">
            <div className="container mx-auto max-w-2xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">

                <div className="text-center sm:text-left">
                    <p className="font-semibold text-foreground">Todo List</p>
                    <p>© {new Date().getFullYear()} All rights reserved</p>
                </div>

                <div className="mt-3 sm:mt-0 text-xs text-muted-foreground">
                    <p>Last rendered: {currentTime}</p>
                </div>
            </div>
        </footer>
    )
}