"use client";

import { useState, useEffect } from "react";
import { Crown, Calendar, User, LogIn } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function TrackerHeader() {
    const today = new Date();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-8 mb-8 border-t-[4px] border-accent pt-6">
            <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-lg shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Crown className="text-accent h-8 w-8" />
                </div>
                <div>
                    <h1 className="text-4xl font-serif text-primary tracking-tight">NxtLvl Tracker</h1>
                    <p className="text-muted-foreground text-sm font-medium italic">Organize your life with elegance</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="bg-white/50 backdrop-blur-sm px-6 py-2.5 rounded-full border border-border shadow-sm flex items-center gap-3">
                    <Calendar className="text-accent h-4 w-4" />
                    <span className="text-[13px] font-bold text-primary/80 uppercase tracking-wide">
                        {format(today, "EEEE, MMMM dd, yyyy")}
                    </span>
                </div>

                {user ? (
                    <Link href="/profile" className="flex items-center gap-3 pl-4 pr-1 py-1 rounded-full border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-all group">
                        <span className="text-xs font-bold text-primary">Master {user.displayName || user.email?.split('@')[0]}</span>
                        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold shadow-sm ring-2 ring-white">
                            {(user.displayName || user.email || "U").substring(0, 1).toUpperCase()}
                        </div>
                    </Link>
                ) : (
                    <Button asChild variant="outline" size="sm" className="rounded-full border-accent/50 text-accent hover:bg-accent hover:text-white transition-all font-bold">
                        <Link href="/auth">
                            <LogIn className="h-4 w-4 mr-2" />
                            Sign In
                        </Link>
                    </Button>
                )}
            </div>
        </header>
    );
}
