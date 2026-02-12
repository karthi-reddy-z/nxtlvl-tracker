"use client";

import { useState, Fragment } from "react";
import { Sparkles, Trash2, Check, Plus, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Habit {
    id: string;
    name: string;
    icon: string;
    days: boolean[];
}

export function HabitsTracker({ habits, setHabits }: { habits: Habit[], setHabits: any }) {
    const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState("");
    const [newIcon, setNewIcon] = useState("");

    const toggleHabit = (habitId: string, dayIndex: number) => {
        setHabits(habits.map(h => {
            if (h.id === habitId) {
                const newDays = [...h.days];
                newDays[dayIndex] = !newDays[dayIndex];
                return { ...h, days: newDays };
            }
            return h;
        }));
    };

    const deleteHabit = (id: string) => {
        setHabits(habits.filter(h => h.id !== id));
    };

    const addHabit = () => {
        if (!newName.trim() || !newIcon.trim()) return;

        const newHabit: Habit = {
            id: Date.now().toString(),
            name: newName,
            icon: newIcon.substring(0, 1).toUpperCase(),
            days: new Array(7).fill(false)
        };

        setHabits([...habits, newHabit]);
        setNewName("");
        setNewIcon("");
        setIsAdding(false);
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
                <div className="flex flex-row items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                    <div>
                        <CardTitle>Habit Tracker</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">Consistency build character</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsAdding(!isAdding)}
                    className={cn("h-8 w-8 rounded-full border border-border shadow-sm transition-all", isAdding && "rotate-45")}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {isAdding && (
                    <div className="mb-6 p-4 rounded-xl bg-accent/5 border border-accent/10 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-[40px_1fr] gap-3">
                            <Input
                                placeholder="A"
                                value={newIcon}
                                onChange={(e) => setNewIcon(e.target.value)}
                                maxLength={1}
                                className="h-10 text-center font-bold uppercase"
                            />
                            <Input
                                placeholder="Habit Name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addHabit()}
                                className="h-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" className="flex-1" onClick={addHabit}>Add Habit</Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-[1fr_repeat(7,36px)_32px] gap-2 items-center">
                    {/* Header */}
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Habit</div>
                    {weekDays.map((day, i) => (
                        <div key={i} className="text-center text-[10px] font-bold uppercase text-muted-foreground">
                            {day}
                        </div>
                    ))}
                    <div />

                    {/* Rows */}
                    {habits.map((habit) => {
                        const completedDays = habit.days.filter(d => d).length;

                        return (
                            <Fragment key={habit.id}>
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <div className="h-6 w-6 rounded bg-primary flex items-center justify-center text-[10px] font-extrabold text-white shrink-0">
                                        {habit.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-primary truncate">{habit.name}</span>
                                        <span className="text-[9px] font-medium text-accent">{completedDays}/7</span>
                                    </div>
                                </div>

                                {habit.days.map((done, dayIndex) => (
                                    <button
                                        key={dayIndex}
                                        onClick={() => toggleHabit(habit.id, dayIndex)}
                                        className={cn(
                                            "h-8 w-8 rounded-md flex items-center justify-center transition-all border",
                                            done
                                                ? "bg-accent border-accent text-white shadow-sm"
                                                : "bg-muted/30 border-transparent hover:border-accent/30 text-transparent"
                                        )}
                                    >
                                        <Check className={cn("h-4 w-4", done ? "opacity-100" : "opacity-0")} />
                                    </button>
                                ))}

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteHabit(habit.id)}
                                    className="h-8 w-8 text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </Fragment>
                        );
                    })}

                    {habits.length === 0 && !isAdding && (
                        <div className="col-span-full py-10 flex flex-col items-center justify-center text-center opacity-30">
                            <Plus className="h-8 w-8 mb-2" />
                            <p className="text-xs font-serif italic text-primary">No habits tracking yet</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
