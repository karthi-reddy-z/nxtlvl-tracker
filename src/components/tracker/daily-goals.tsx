"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Goal {
    id: string;
    text: string;
    completed: boolean;
}

const INITIAL_GOALS: Goal[] = [
    { id: "1", text: "Daily meditation (15 mins)", completed: true },
    { id: "2", text: "Complete project proposal", completed: false },
    { id: "3", text: "Drink 2L of water", completed: true },
    { id: "4", text: "Push-ups workout", completed: false },
    { id: "5", text: "Read 20 pages of a book", completed: false },
];

export function DailyGoals({ goals, setGoals }: { goals: Goal[], setGoals: any }) {
    const [newGoal, setNewGoal] = useState("");

    const completedCount = goals.filter((g) => g.completed).length;
    const progress = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

    const toggleGoal = (id: string) => {
        setGoals(goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g)));
    };

    const addGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGoal.trim()) return;
        setGoals([...goals, { id: crypto.randomUUID(), text: newGoal, completed: false }]);
        setNewGoal("");
    };

    const deleteGoal = (id: string) => {
        setGoals(goals.filter((g) => g.id !== id));
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle>Daily Goals</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Consistency is key</p>
                </div>
                <div className="text-right">
                    <span className="text-sm font-bold text-primary">{completedCount}/{goals.length}</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mb-6 space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        <span>Overall Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-muted transition-all" />
                </div>

                <form onSubmit={addGoal} className="flex gap-2 mb-6">
                    <Input
                        placeholder="Add a new goal..."
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        className="flex-1 bg-muted/50 border-none focus-visible:ring-accent/50"
                    />
                    <Button type="submit" size="icon" variant="accent">
                        <Plus className="h-4 w-4" />
                    </Button>
                </form>

                <ul className="space-y-3">
                    {goals.map((goal) => (
                        <li
                            key={goal.id}
                            className="group flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    checked={goal.completed}
                                    onCheckedChange={() => toggleGoal(goal.id)}
                                    className="border-accent data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                />
                                <span className={cn(
                                    "text-sm font-medium transition-all",
                                    goal.completed ? "line-through text-muted-foreground" : "text-primary"
                                )}>
                                    {goal.text}
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteGoal(goal.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
