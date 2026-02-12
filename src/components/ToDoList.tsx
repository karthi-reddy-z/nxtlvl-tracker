import { useState } from 'react';
import { Plus, Circle, CheckCircle2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ToDoList = ({ tasks, setTasks }: { tasks: any[], setTasks: any }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [newTask, setNewTask] = useState('');
    const [newPriority, setNewPriority] = useState('Medium');

    const filters = ['All', 'High', 'Medium', 'Low'];

    const toggleTask = (id: number) => {
        setTasks(tasks.map((t: any) => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setTasks(tasks.filter((t: any) => t.id !== id));
    };

    const addTask = (e: any) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([{ id: Date.now(), text: newTask, priority: newPriority, completed: false }, ...tasks]);
        setNewTask('');
    };

    const filteredTasks = activeFilter === 'All'
        ? tasks
        : tasks.filter((t: any) => t.priority === activeFilter);

    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'High': return '#FEE2E2';
            case 'Medium': return '#FEF3C7';
            case 'Low': return '#E0F2FE';
            default: return '#F3F4F6';
        }
    };

    const getPriorityTextColor = (p: string) => {
        switch (p) {
            case 'High': return '#991B1B';
            case 'Medium': return '#92400E';
            case 'Low': return '#075985';
            default: return '#374151';
        }
    };

    return (
        <div className="card to-do-list">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 className="serif">To Do List</h3>
                <span style={{ background: '#F4E8C1', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {tasks.filter((t: any) => !t.completed).length} pending
                </span>
            </div>

            <form onSubmit={addTask} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task..."
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
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {filters.slice(1).map(p => (
                        <button
                            key={p}
                            type="button"
                            onClick={() => setNewPriority(p)}
                            style={{
                                fontSize: '0.7rem',
                                padding: '4px 10px',
                                borderRadius: '12px',
                                border: '1px solid',
                                borderColor: newPriority === p ? getPriorityTextColor(p) : 'var(--border-color)',
                                backgroundColor: newPriority === p ? getPriorityColor(p) : 'transparent',
                                color: getPriorityTextColor(p)
                            }}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </form>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '0.85rem',
                            fontWeight: activeFilter === f ? 600 : 400,
                            color: activeFilter === f ? 'var(--text-main)' : 'var(--text-muted)',
                            borderBottom: activeFilter === f ? '2px solid var(--accent-gold)' : '2px solid transparent',
                            padding: '4px 8px'
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <ul style={{ listStyle: 'none' }}>
                <AnimatePresence mode='popLayout'>
                    {filteredTasks.map((task: any) => (
                        <motion.li
                            key={task.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 0',
                                borderBottom: '1px solid var(--bg-color)'
                            }}
                        >
                            <div onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                {task.completed ?
                                    <CheckCircle2 size={20} color="var(--accent-gold)" /> :
                                    <Circle size={20} color="var(--border-color)" />
                                }
                            </div>
                            <div style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.5 : 1 }}>
                                {task.text}
                            </div>
                            <span style={{
                                fontSize: '0.65rem',
                                padding: '2px 8px',
                                borderRadius: '8px',
                                backgroundColor: getPriorityColor(task.priority),
                                color: getPriorityTextColor(task.priority),
                                fontWeight: 600,
                                marginRight: '8px'
                            }}>
                                {task.priority}
                            </span>
                            <button
                                onClick={(e) => deleteTask(task.id, e)}
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

export default ToDoList;
