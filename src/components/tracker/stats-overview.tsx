"use client";

import { Flame, Trophy, TrendingUp, Clock, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatItemProps {
    icon: LucideIcon;
    label: string;
    value: string;
    subtext: string;
    accentColor?: string;
}

function StatCard({ icon: Icon, label, value, subtext, accentColor }: StatItemProps) {
    return (
        <Card className="overflow-hidden border-none shadow-md hover:ring-2 hover:ring-accent/40 transition-all duration-300 group">
            <CardContent className="p-6 relative">
                <div className="flex justify-between items-start mb-4">
                    <div className={cn("p-2 rounded-lg", accentColor || "bg-accent/10")}>
                        <Icon className={cn("h-6 w-6", accentColor ? "text-white" : "text-accent")} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">Live</span>
                </div>
                <div className="space-y-1">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</h3>
                    <p className="text-3xl font-serif font-bold text-primary">{value}</p>
                    <p className="text-[11px] text-muted-foreground font-medium">{subtext}</p>
                </div>
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity overflow-hidden pointer-events-none">
                    <Icon size={48} className="translate-x-4 -translate-y-4" />
                </div>
            </CardContent>
        </Card>
    );
}

export function StatsOverview({
    completedCount,
    productivity,
    streak = "0 days",
    focusTime = "0h"
}: {
    completedCount: number,
    productivity: number,
    streak?: string,
    focusTime?: string
}) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
                icon={Flame}
                label="Streak"
                value={streak}
                subtext="Current daily streak"
            />
            <StatCard
                icon={Trophy}
                label="Completed"
                value={completedCount.toString()}
                subtext="Tasks this month"
            />
            <StatCard
                icon={TrendingUp}
                label="Productivity"
                value={`${productivity}%`}
                subtext="Weekly average"
            />
            <StatCard
                icon={Clock}
                label="Focus Time"
                value={focusTime}
                subtext="Today's total"
            />
        </div>
    );
}
