import { Fragment } from 'react';
import { Sparkles, Trash2 } from 'lucide-react';

const HabitTracker = ({ habits, setHabits }: { habits: any[], setHabits: any }) => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    const toggleHabit = (habitIndex: number, dayIndex: number) => {
        const newHabits = [...habits];
        newHabits[habitIndex].history[dayIndex] = !newHabits[habitIndex].history[dayIndex];

        // Update count string e.g. "4/7"
        const doneCount = newHabits[habitIndex].history.filter((h: boolean) => h).length;
        newHabits[habitIndex].stats = `${doneCount}/7`;

        setHabits(newHabits);
    };

    const deleteHabit = (habitIndex: number) => {
        setHabits(habits.filter((_: any, i: number) => i !== habitIndex));
    };

    return (
        <div className="card habit-tracker">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <Sparkles size={20} color="var(--accent-gold)" />
                <h3 className="serif">Habit Tracker</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '40px 100px repeat(7, 1fr) 30px', gap: '10px', alignItems: 'center' }}>
                <div />
                <div />
                <div />
                {days.map((d, i) => (
                    <div key={i} style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{d}</div>
                ))}

                {habits.map((habit: any, i: number) => (
                    <Fragment key={i}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'var(--bg-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            border: '1px solid var(--border-color)'
                        }}>
                            {habit.code}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{habit.name}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{habit.stats}</div>
                        </div>
                        {habit.history.map((done: boolean, j: number) => (
                            <div
                                key={j}
                                className="habit-dot"
                                onClick={() => toggleHabit(i, j)}
                                style={{
                                    aspectRatio: '1',
                                    borderRadius: '12px',
                                    background: done ? 'var(--accent-gold)' : 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {done && <span style={{ color: 'white', fontSize: '10px' }}>✓</span>}
                            </div>
                        ))}
                        <button
                            onClick={() => deleteHabit(i)}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '4px',
                                cursor: 'pointer',
                                color: 'var(--text-muted)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                        >
                            <Trash2 size={14} />
                        </button>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default HabitTracker;
