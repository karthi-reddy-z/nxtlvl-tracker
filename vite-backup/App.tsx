import { useState, useEffect } from 'react';
import Header from './components/Header';
import StatCards from './components/StatCards';
import DailyGoals from './components/DailyGoals';
import ToDoList from './components/ToDoList';
import WeeklyPlan from './components/WeeklyPlan';
import HabitTracker from './components/HabitTracker';
import MonthlyPlan from './components/MonthlyPlan';
import './App.css';

// Initial Data
const INITIAL_GOALS = [
  { id: 1, text: 'Morning meditation - 15 minutes', completed: true },
  { id: 2, text: 'Complete project proposal draft', completed: false },
  { id: 3, text: 'Review team performance reports', completed: false },
  { id: 4, text: 'Exercise for 30 minutes', completed: true },
  { id: 5, text: 'Read 20 pages of current book', completed: false },
];

const INITIAL_TASKS = [
  { id: 1, text: 'Prepare quarterly presentation', priority: 'High', completed: false },
  { id: 2, text: 'Respond to client emails', priority: 'Medium', completed: true },
  { id: 3, text: 'Update project timeline', priority: 'High', completed: false },
  { id: 4, text: 'Organize workspace', priority: 'Low', completed: false },
  { id: 5, text: 'Schedule team sync', priority: 'Medium', completed: true },
];

const INITIAL_HABITS = [
  { name: 'Meditate', code: 'M', history: [true, true, false, true, true, false, false] },
  { name: 'Exercise', code: 'E', history: [true, false, true, false, true, true, false] },
  { name: 'Read', code: 'R', history: [true, true, true, true, false, false, false] },
  { name: 'Journal', code: 'J', history: [false, true, false, true, true, false, false] },
  { name: 'Hydrate', code: 'H', history: [true, true, true, true, true, true, false] },
];

function App() {
  // Persistence Utility
  const getStored = (key: string, initial: any) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  };

  // State
  const [goals, setGoals] = useState(() => getStored('nxt_goals', INITIAL_GOALS));
  const [tasks, setTasks] = useState(() => getStored('nxt_tasks', INITIAL_TASKS));
  const [habits, setHabits] = useState(() => getStored('nxt_habits', INITIAL_HABITS));
  const [weeklyTasks, setWeeklyTasks] = useState(() => getStored('nxt_weekly', {}));

  // Effect for persistence
  useEffect(() => {
    localStorage.setItem('nxt_goals', JSON.stringify(goals));
    localStorage.setItem('nxt_tasks', JSON.stringify(tasks));
    localStorage.setItem('nxt_habits', JSON.stringify(habits));
    localStorage.setItem('nxt_weekly', JSON.stringify(weeklyTasks));
  }, [goals, tasks, habits, weeklyTasks]);

  // Derived Stats
  const completedCountTotal = tasks.filter((t: any) => t.completed).length + goals.filter((g: any) => g.completed).length;
  const productivityScore = Math.round(((tasks.filter((t: any) => t.completed).length + goals.filter((g: any) => g.completed).length) / (tasks.length + goals.length)) * 100);

  return (
    <div className="container">
      <div className="dashboard">
        <Header />

        <div className="main-content">
          <StatCards completedCount={completedCountTotal} productivity={productivityScore} />

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'var(--spacing-xl)' }}>
            <DailyGoals goals={goals} setGoals={setGoals} />
            <ToDoList tasks={tasks} setTasks={setTasks} />
          </div>

          <WeeklyPlan weeklyTasks={weeklyTasks} setWeeklyTasks={setWeeklyTasks} />
        </div>

        <div className="sidebar">
          <HabitTracker habits={habits} setHabits={setHabits} />
          <MonthlyPlan />
        </div>
      </div>
    </div>
  );
}

export default App;

