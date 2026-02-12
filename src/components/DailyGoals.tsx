import { useState } from 'react';
import { Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DailyGoals = ({ goals, setGoals }: { goals: any[], setGoals: any }) => {
    const [newGoal, setNewGoal] = useState('');

    const toggleGoal = (id: number) => {
        setGoals(goals.map((g: any) => g.id === id ? { ...g, completed: !g.completed } : g));
    };

    const deleteGoal = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setGoals(goals.filter((g: any) => g.id !== id));
    };

    const addGoal = (e: any) => {
        e.preventDefault();
        if (!newGoal.trim()) return;
        setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
        setNewGoal('');
    };

    const completedCount = goals.filter((g: any) => g.completed).length;
    const progress = (completedCount / goals.length) * 100;

    return (
        <div className="card daily-goals">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="serif">Daily Goals</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{completedCount}/{goals.length}</span>
            </div>

            <div className="progress-bar-container" style={{
                height: '6px',
                background: 'var(--border-color)',
                borderRadius: '3px',
                marginBottom: '24px',
                overflow: 'hidden'
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    style={{ height: '100%', background: '#1A1A1A' }}
                />
            </div>

            <form onSubmit={addGoal} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="Add a new goal..."
                    style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-color)',
                        outline: 'none'
                    }}
                />
                <button type="submit" style={{
                    background: 'var(--accent-gold)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Plus size={20} />
                </button>
            </form>

            <ul style={{ listStyle: 'none' }}>
                <AnimatePresence>
                    {goals.map((goal: any) => (
                        <motion.li
                            key={goal.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '14px',
                                cursor: 'pointer',
                                opacity: goal.completed ? 0.6 : 1
                            }}
                            className="goal-item"
                        >
                            <div
                                onClick={() => toggleGoal(goal.id)}
                                style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}
                            >
                                {goal.completed ?
                                    <CheckCircle2 size={20} color="var(--accent-gold)" /> :
                                    <Circle size={20} color="var(--border-color)" />
                                }
                                <span style={{
                                    textDecoration: goal.completed ? 'line-through' : 'none',
                                    fontSize: '0.95rem'
                                }}>
                                    {goal.text}
                                </span>
                            </div>
                            <button
                                onClick={(e) => deleteGoal(goal.id, e)}
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
                                <Trash2 size={16} />
                            </button>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
};

export default DailyGoals;
