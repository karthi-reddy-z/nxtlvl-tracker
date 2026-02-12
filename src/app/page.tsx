"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    TrackerHeader
} from "@/components/tracker/header";
import {
    StatsOverview
} from "@/components/tracker/stats-overview";
import {
    DailyGoals
} from "@/components/tracker/daily-goals";
import {
    TodoList
} from "@/components/tracker/todo-list";
import {
    WeeklyPlan
} from "@/components/tracker/weekly-plan";
import {
    HabitsTracker
} from "@/components/tracker/habits-tracker";
import {
    MonthlyPlan
} from "@/components/tracker/monthly-plan";
import { Loader2 } from "lucide-react";
import { auth, db, resetFirestore } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Initial data constants
const INITIAL_GOALS: any[] = [];
const INITIAL_TODOS: any[] = [];
const INITIAL_HABITS: any[] = [];
const INITIAL_PLANS = [
    { day: "Monday", shortDay: "M", tasks: [] },
    { day: "Tuesday", shortDay: "T", tasks: [] },
    { day: "Wednesday", shortDay: "W", tasks: [] },
    { day: "Thursday", shortDay: "T", tasks: [] },
    { day: "Friday", shortDay: "F", tasks: [] },
    { day: "Saturday", shortDay: "S", tasks: [] },
    { day: "Sunday", shortDay: "S", tasks: [] },
];

export default function DashboardPage() {
    const [mounted, setMounted] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const [goals, setGoals] = useState<any[]>(INITIAL_GOALS);
    const [todos, setTodos] = useState<any[]>(INITIAL_TODOS);
    const [habits, setHabits] = useState<any[]>(INITIAL_HABITS);
    const [weeklyPlans, setWeeklyPlans] = useState<any[]>(INITIAL_PLANS);
    const [streak, setStreak] = useState("0 days");
    const [focusTime, setFocusTime] = useState("0h");

    const [error, setError] = useState<string | null>(null);

    // Load data from Firestore
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                await loadData(currentUser.uid);
            } else {
                router.push("/auth");
            }
        });

        return () => unsubscribe();
    }, [router]);

    const loadData = async (uid: string) => {
        setLoading(true);
        setError(null);
        try {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setGoals(data.goals || INITIAL_GOALS);
                setTodos(data.todos || INITIAL_TODOS);
                setHabits(data.habits || INITIAL_HABITS);
                setWeeklyPlans(data.weeklyPlans || INITIAL_PLANS);
                setStreak(data.streak || "0 days");
                setFocusTime(data.focusTime || "0h");
            }
            setLoading(false);
        } catch (err: any) {
            console.error("Failed to load user data", err);
            setError(err.message || "Failed to connect to the NxtLvl Cloud. Please check your connection.");
            setLoading(false);
        }
    };

    // Save data to Firestore (with debounce)
    useEffect(() => {
        if (!user || loading) return;

        const timer = setTimeout(async () => {
            try {
                await setDoc(doc(db, "users", user.uid), {
                    goals,
                    todos,
                    habits,
                    weeklyPlans,
                    streak,
                    focusTime,
                    updatedAt: new Date()
                }, { merge: true });
            } catch (err) {
                console.error("Failed to save data", err);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [goals, todos, habits, weeklyPlans, streak, focusTime, user, loading]);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Derived stats
    const completedTasks = todos.filter((t: any) => t.completed).length + goals.filter((g: any) => g.completed).length;
    const totalTasks = todos.length + goals.length;
    const productivity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    if (!mounted || loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-accent" />
                <p className="mt-4 text-[10px] font-serif uppercase tracking-widest text-primary animate-pulse">Summoning your achievements...</p>
            </div>
        );
    }

    if (error) {
        const isActuallyOffline = typeof navigator !== 'undefined' && !navigator.onLine;

        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-destructive/10 p-8 rounded-3xl border border-destructive/20 max-w-lg shadow-2xl backdrop-blur-sm">
                    <div className="h-16 w-16 bg-destructive/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Loader2 className="h-8 w-8 text-destructive animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-primary mb-3">
                        {isActuallyOffline ? "Connection Lost" : "Cloud Sync Interrupted"}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                        {error}
                        {!isActuallyOffline && (
                            <span className="block mt-4 text-[11px] italic">
                                Tip: If this persists, ensure your Firebase Project has "Firestore" enabled in the console and no VPN as blocking the connection.
                            </span>
                        )}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => user && loadData(user.uid)}
                            className="bg-accent text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-accent/20 hover:scale-105 transition-all"
                        >
                            Retry Sync
                        </button>
                        <button
                            onClick={resetFirestore}
                            className="bg-white border border-border text-primary px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-muted/50 transition-all"
                        >
                            Reset App
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background font-sans text-foreground pb-20 selection:bg-accent/30">
            <div className="h-1.5 w-full bg-accent shadow-sm" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TrackerHeader />

                <StatsOverview
                    completedCount={completedTasks}
                    productivity={productivity}
                    streak={streak}
                    focusTime={focusTime}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <DailyGoals goals={goals} setGoals={setGoals} />
                    <TodoList todos={todos} setTodos={setTodos} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <WeeklyPlan plans={weeklyPlans} setPlans={setWeeklyPlans} />
                    <HabitsTracker habits={habits} setHabits={setHabits} />
                </div>

                <div className="mb-8">
                    <MonthlyPlan />
                </div>

                <footer className="mt-20 pt-8 border-t border-border flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 opacity-40">
                        <span className="font-serif font-bold text-primary">NxtLvl Tracker</span>
                        <span className="text-muted-foreground text-xs">•</span>
                        <span className="text-muted-foreground text-xs">Organize your life with elegance</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/30">
                        © 2026 Crafted for Excellence
                    </p>
                </footer>
            </div>
        </main>
    );
}
