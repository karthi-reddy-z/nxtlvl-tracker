import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';

const WeeklyPlan = ({ weeklyTasks, setWeeklyTasks }: { weeklyTasks: any, setWeeklyTasks: any }) => {
    const days = [
        { name: 'Monday', code: 'M' },
        { name: 'Tuesday', code: 'T' },
        { name: 'Wednesday', code: 'W' },
        { name: 'Thursday', code: 'Th' },
        { name: 'Friday', code: 'F' },
        { name: 'Saturday', code: 'S' },
        { name: 'Sunday', code: 'Su' },
    ];

    const [selectedDay, setSelectedDay] = useState('Monday');
    const [newTask, setNewTask] = useState('');

    const currentTasks = weeklyTasks[selectedDay] || [];

    const addTask = (e: any) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        setWeeklyTasks({
            ...weeklyTasks,
            [selectedDay]: [...currentTasks, { text: newTask, completed: false, id: Date.now() }]
        });
        setNewTask('');
    };

    const toggleTask = (taskId: number) => {
        setWeeklyTasks({
            ...weeklyTasks,
            [selectedDay]: currentTasks.map((t: any) => t.id === taskId ? { ...t, completed: !t.completed } : t)
        });
    };

    const deleteWeeklyTask = (taskId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setWeeklyTasks({
            ...weeklyTasks,
            [selectedDay]: currentTasks.filter((t: any) => t.id !== taskId)
        });
    };

    return (
        <div className="card weekly-plan">
            <h3 className="serif" style={{ marginBottom: '20px' }}>Weekly Plan</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}><ChevronLeft size={20} /></button>
                <div style={{ flex: 1, display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                    {days.map(day => (
                        <button
                            key={day.name}
                            onClick={() => setSelectedDay(day.name)}
                            style={{
                                padding: '6px 16px',
                                borderRadius: '20px',
                                border: 'none',
                                background: selectedDay === day.name ? 'var(--text-main)' : 'var(--border-color)',
                                color: selectedDay === day.name ? 'white' : 'var(--text-main)',
                                fontSize: '0.8rem',
                                whiteSpace: 'nowrap',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {day.name}
                            <span style={{
                                opacity: 0.7,
                                fontSize: '0.7rem',
                                background: selectedDay === day.name ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)',
                                padding: '2px 6px',
                                borderRadius: '10px'
                            }}>
                                {(weeklyTasks[day.name] || []).length}
                            </span>
                        </button>
                    ))}
                </div>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}><ChevronRight size={20} /></button>
            </div>

            <div className="day-detail" style={{ background: 'var(--bg-color)', borderRadius: '12px', padding: '20px' }}>
                <form onSubmit={addTask} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder={`Add task for ${selectedDay}...`}
                        style={{
                            flex: 1,
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: 'white',
                            outline: 'none',
                            fontSize: '0.9rem'
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
                    {currentTasks.length > 0 ? (
                        currentTasks.map((task: any) => (
                            <li
                                key={task.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    marginBottom: '12px',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div
                                    onClick={() => toggleTask(task.id)}
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        cursor: 'pointer',
                                        opacity: task.completed ? 0.5 : 1,
                                        textDecoration: task.completed ? 'line-through' : 'none'
                                    }}
                                >
                                    <span style={{ color: task.completed ? 'var(--text-muted)' : 'var(--accent-gold)', fontWeight: 700 }}>
                                        {task.completed ? '✓' : '•'}
                                    </span>
                                    {task.text}
                                </div>
                                <button
                                    onClick={(e) => deleteWeeklyTask(task.id, e)}
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
                            </li>
                        ))
                    ) : (
                        <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '10px' }}>No tasks scheduled</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default WeeklyPlan;
