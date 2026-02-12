import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const MonthlyPlan = () => {
    const [selectedDay, setSelectedDay] = useState(12);
    const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1);
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
        <div className="card monthly-plan">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CalendarIcon size={20} color="var(--accent-gold)" />
                    <h3 className="serif">Monthly Plan</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <ChevronLeft size={18} style={{ cursor: 'pointer' }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>February 2026</span>
                    <ChevronRight size={18} style={{ cursor: 'pointer' }} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
                {weekDays.map(d => (
                    <div key={d} style={{ background: '#F1EDE6', padding: '8px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                        {d}
                    </div>
                ))}
                {daysInMonth.map(d => (
                    <div
                        key={d}
                        onClick={() => setSelectedDay(d)}
                        style={{
                            background: selectedDay === d ? 'var(--accent-gold-light)' : 'white',
                            height: '60px',
                            padding: '8px',
                            fontSize: '0.85rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            border: selectedDay === d ? '1px solid var(--accent-gold)' : 'none'
                        }}
                    >
                        <span style={{ fontWeight: selectedDay === d ? 700 : 400 }}>{d}</span>
                        {d === 12 && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-gold)' }} />}
                        {[8, 15, 10, 22].includes(d) && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)', opacity: 0.5 }} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthlyPlan;
