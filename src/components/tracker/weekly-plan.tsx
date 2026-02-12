"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Task {
    id: string;
    text: string;
}

interface DayPlan {
    day: string;
    shortDay: string;
    tasks: Task[];
}

const INITIAL_PLANS: DayPlan[] = [
    { day: "Monday", shortDay: "M", tasks: [{ id: "1", text: "Team standup at 9 AM" }, { id: "2", text: "Sprint planning session" }] },
    { day: "Tuesday", shortDay: "T", tasks: [{ id: "3", text: "Deep work: UI Design" }, { id: "4", text: "Kitchen renovation meeting" }] },
    { day: "Wednesday", shortDay: "W", tasks: [{ id: "5", text: "Weekly sync" }] },
    { day: "Thursday", shortDay: "T", tasks: [{ id: "6", text: "Product review" }, { id: "7", text: "Client call" }] },
    { day: "Friday", shortDay: "F", tasks: [{ id: "8", text: "Bug fixing" }, { id: "9", text: "Retrospective" }] },
    { day: "Saturday", shortDay: "S", tasks: [] },
    { day: "Sunday", shortDay: "S", tasks: [] },
];

export function WeeklyPlan({ plans, setPlans }: { plans: DayPlan[], setPlans: any }) {
    const [activeDay, setActiveDay] = useState("Monday");
    const [newTask, setNewTask] = useState("");

    const currentPlan = plans.find((p) => p.day === activeDay) || plans[0];

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        setPlans(plans.map(p => {
            if (p.day === activeDay) {
                return { ...p, tasks: [...p.tasks, { id: crypto.randomUUID(), text: newTask }] };
            }
            return p;
        }));
        setNewTask("");
    };

    const removeTask = (taskId: string) => {
        setPlans(plans.map(p => {
            if (p.day === activeDay) {
                return { ...p, tasks: p.tasks.filter(t => t.id !== taskId) };
            }
            return p;
        }));
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Weekly Plan</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Strategic overview of the week</p>
            </CardHeader>
            <CardContent>
                <div className="flex gap-1 p-1 bg-secondary rounded-lg mb-6 overflow-x-auto scrollbar-hide">
                    {plans.map((p, i) => {
                        const isMatch = p.day === activeDay && (p.day !== "Thursday" || i === 3); // Handle duplicate T
                        const isActive = p.day === activeDay;
                        // In current data Friday is index 4, Thursday index 3. 
                        // Tuesday is index 1, Thursday is index 3. 
                        // Let's use index as the key to be safe.
                        return (
                            <button
                                key={p.day + i}
                                onClick={() => setActiveDay(p.day)}
                                className={cn(
                                    "flex-1 flex flex-col items-center py-2 px-3 rounded-md transition-all min-w-[44px]",
                                    p.day === activeDay ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-white/50"
                                )}
                            >
                                <span className="text-[10px] uppercase font-bold opacity-60">{p.shortDay}</span>
                                <span className="text-xs font-bold">{plans.filter(day => day.day === p.day)[0] === p ? (p.day.substring(0, 3)) : p.day.substring(0, 3)}</span>
                                <div className={cn(
                                    "w-1 h-1 rounded-full mt-1",
                                    p.tasks.length > 0 ? (p.day === activeDay ? "bg-accent" : "bg-accent") : "bg-transparent"
                                )} />
                            </button>
                        )
                    })}
                </div>

                <div className="space-y-6">
                    <form onSubmit={addTask} className="flex gap-2">
                        <Input
                            placeholder={`Add task for ${activeDay}...`}
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="flex-1 bg-muted/50 border-none focus-visible:ring-accent/50"
                        />
                        <Button type="submit" size="icon" variant="accent">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </form>

                    <div className="bg-muted/30 rounded-xl p-4 min-h-[160px]">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-muted-foreground/10 pb-2">
                            {activeDay} Schedule
                        </h4>

                        {currentPlan.tasks.length === 0 ? (
                            <div className="h-24 flex items-center justify-center text-sm text-muted-foreground italic">
                                Rest and recharge. No tasks scheduled.
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {currentPlan.tasks.map((task) => (
                                    <li
                                        key={task.id}
                                        className="group flex items-center justify-between animate-in fade-in slide-in-from-left-2 duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            <span className="text-sm font-medium text-primary">
                                                {task.text}
                                            </span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeTask(task.id)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
