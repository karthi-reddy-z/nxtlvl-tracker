"use client";

import { useState } from "react";
import { Plus, Trash2, Circle, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Priority = "high" | "medium" | "low";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    priority: Priority;
}

const INITIAL_TODOS: Todo[] = [
    { id: "1", text: "Prepare quarterly presentation", completed: false, priority: "high" },
    { id: "2", text: "Respond to client emails", completed: true, priority: "medium" },
    { id: "3", text: "Update project timeline", completed: false, priority: "high" },
    { id: "4", text: "Organize workspace", completed: false, priority: "low" },
    { id: "5", text: "Schedule team sync", completed: true, priority: "medium" },
    { id: "6", text: "Research new design trends", completed: false, priority: "low" },
];

export function TodoList({ todos, setTodos }: { todos: Todo[], setTodos: any }) {
    const [newTodo, setNewTodo] = useState("");
    const [newPriority, setNewPriority] = useState<Priority>("medium");

    const pendingCount = todos.filter((t) => !t.completed).length;

    const toggleTodo = (id: string) => {
        setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    };

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([
            { id: crypto.randomUUID(), text: newTodo, completed: false, priority: newPriority },
            ...todos,
        ]);
        setNewTodo("");
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((t) => t.id !== id));
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                    <CardTitle>To Do List</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Priority driven focus</p>
                </div>
                <Badge variant="secondary" className="bg-[#F4E8C1] text-primary hover:bg-[#F4E8C1]/80">
                    {pendingCount} pending
                </Badge>
            </CardHeader>
            <CardContent>
                <form onSubmit={addTodo} className="space-y-4 mb-6">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Add a new task..."
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            className="flex-1 bg-muted/50 border-none focus-visible:ring-accent/50"
                        />
                        <Button type="submit" size="icon" variant="accent">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        {(["high", "medium", "low"] as Priority[]).map((p) => (
                            <Button
                                key={p}
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setNewPriority(p)}
                                className={cn(
                                    "h-7 px-3 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-all",
                                    newPriority === p
                                        ? p === 'high' ? 'bg-destructive/10 border-destructive text-destructive'
                                            : p === 'medium' ? 'bg-accent/10 border-accent text-accent'
                                                : 'bg-secondary border-muted-foreground/30 text-muted-foreground'
                                        : "border-transparent text-muted-foreground/60"
                                )}
                            >
                                {p}
                            </Button>
                        ))}
                    </div>
                </form>

                <div className="space-y-1">
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="group flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors border-b border-muted/30 last:border-0"
                        >
                            <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                <button
                                    onClick={() => toggleTodo(todo.id)}
                                    className="flex-shrink-0"
                                >
                                    {todo.completed ? (
                                        <CheckCircle2 className="h-5 w-5 text-accent" />
                                    ) : (
                                        <Circle className="h-5 w-5 text-muted-foreground/40 group-hover:text-accent/60 transition-colors" />
                                    )}
                                </button>
                                <span className={cn(
                                    "text-sm font-medium transition-all truncate",
                                    todo.completed ? "line-through text-muted-foreground" : "text-primary"
                                )}>
                                    {todo.text}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 ml-4">
                                <Badge variant={todo.priority === 'high' ? 'high' : todo.priority === 'medium' ? 'medium' : 'low'} className="uppercase text-[9px]">
                                    {todo.priority}
                                </Badge>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteTodo(todo.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
