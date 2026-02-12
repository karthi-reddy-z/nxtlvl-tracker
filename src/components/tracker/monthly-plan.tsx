"use client";

import { useState } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MonthlyEvent {
    id: string;
    text: string;
    date: Date;
    color: "gold" | "navy" | "rose";
}

const INITIAL_EVENTS: MonthlyEvent[] = [];

export function MonthlyPlan() {
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1));
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 1, 12));
    const [events, setEvents] = useState<MonthlyEvent[]>(INITIAL_EVENTS);
    const [newEvent, setNewEvent] = useState("");
    const [newColor, setNewColor] = useState<"gold" | "navy" | "rose">("gold");

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    const getDayEvents = (date: Date) => {
        return events.filter((e) => isSameDay(e.date, date));
    };

    const addEvent = () => {
        if (!newEvent.trim() || !selectedDate) return;
        setEvents([
            ...events,
            { id: crypto.randomUUID(), text: newEvent, date: selectedDate, color: newColor },
        ]);
        setNewEvent("");
    };

    const deleteEvent = (id: string) => {
        setEvents(events.filter((e) => e.id !== id));
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Monthly Plan</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Calendar overlook</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="min-w-[120px] text-center font-serif font-bold text-lg">
                        {format(currentMonth, "MMMM yyyy")}
                    </span>
                    <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 border-t border-l rounded-lg overflow-hidden border-border bg-border/5">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="py-3 text-center text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground border-r border-b bg-muted/30">
                            {day}
                        </div>
                    ))}
                    {calendarDays.map((day, i) => {
                        const dayEvents = getDayEvents(day);
                        const isSelected = selectedDate && isSameDay(day, selectedDate);

                        return (
                            <div
                                key={i}
                                onClick={() => setSelectedDate(day)}
                                className={cn(
                                    "min-h-[100px] p-2 border-r border-b cursor-pointer transition-all hover:bg-accent/5",
                                    !isSameMonth(day, monthStart) && "opacity-25",
                                    isSelected && "ring-2 ring-inset ring-accent bg-accent/5 z-10"
                                )}
                            >
                                <div className="flex justify-between items-start">
                                    <span className={cn(
                                        "text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full mt-1",
                                        isToday(day) ? "bg-accent text-white" : "text-primary/70"
                                    )}>
                                        {format(day, "d")}
                                    </span>
                                </div>
                                <div className="mt-2 space-y-1">
                                    {dayEvents.slice(0, 3).map((event) => (
                                        <div
                                            key={event.id}
                                            className={cn(
                                                "h-1.5 w-1.5 rounded-full inline-block mr-1",
                                                event.color === "gold" ? "bg-accent" : event.color === "navy" ? "bg-primary" : "bg-destructive"
                                            )}
                                        />
                                    ))}
                                    {dayEvents.length > 0 && (
                                        <div className="text-[8px] font-bold text-muted-foreground/50 truncate">
                                            {dayEvents[0].text}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {selectedDate && (
                    <div className="mt-8 animate-in slide-in-from-top-4 duration-500 bg-secondary/50 rounded-2xl p-6 border border-accent/20">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h4 className="text-xl font-serif text-primary">Events for {format(selectedDate, "MMMM do")}</h4>
                                <div className="h-1 w-12 bg-accent mt-1 rounded-full" />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedDate(null)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">New Event</label>
                                    <Input
                                        value={newEvent}
                                        onChange={(e) => setNewEvent(e.target.value)}
                                        placeholder="Describe your event..."
                                        className="bg-white border-none shadow-sm focus-visible:ring-accent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Color Label</label>
                                    <div className="flex gap-2">
                                        {(["gold", "navy", "rose"] as const).map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => setNewColor(c)}
                                                className={cn(
                                                    "w-8 h-8 rounded-full border-2 transition-all",
                                                    c === "gold" ? "bg-accent border-accent" : c === "navy" ? "bg-primary border-primary" : "bg-destructive border-destructive",
                                                    newColor === c ? "ring-2 ring-offset-2 ring-primary scale-110" : "opacity-40 hover:opacity-100"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <Button className="w-full" variant="accent" onClick={addEvent}>Add to Calendar</Button>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Scheduled Events</label>
                                {getDayEvents(selectedDate).length === 0 ? (
                                    <p className="text-sm text-muted-foreground italic py-4">No events scheduled for this day.</p>
                                ) : (
                                    <div className="space-y-2">
                                        {getDayEvents(selectedDate).map(event => (
                                            <div key={event.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-muted">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "w-2 h-8 rounded-full",
                                                        event.color === "gold" ? "bg-accent" : event.color === "navy" ? "bg-primary" : "bg-destructive"
                                                    )} />
                                                    <span className="font-semibold text-primary">{event.text}</span>
                                                </div>
                                                <Button variant="ghost" size="icon" onClick={() => deleteEvent(event.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
