import { Flame, Trophy, TrendingUp, Clock } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, subtext, color }: any) => (
    <div className="card stat-card" style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
            <Icon size={18} style={{ color }} />
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>{value}</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{subtext}</div>
    </div>
);

const StatCards = ({ completedCount, productivity }: { completedCount: number, productivity: number }) => {
    return (
        <div className="stats-grid">
            <StatCard
                icon={Flame}
                label="Streak"
                value="12 days"
                subtext="Current daily streak"
                color="#F59E0B"
            />
            <StatCard
                icon={Trophy}
                label="Completed"
                value={completedCount.toString()}
                subtext="Tasks this month"
                color="var(--accent-gold)"
            />
            <StatCard
                icon={TrendingUp}
                label="Productivity"
                value={`${productivity}%`}
                subtext="All-time average"
                color="#10B981"
            />
            <StatCard
                icon={Clock}
                label="Focus Time"
                value="6.5h"
                subtext="Today's total"
                color="#3B82F6"
            />
        </div>
    );
};

export default StatCards;
