import { Crown } from 'lucide-react';

const Header = () => {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <header className="header">
            <div className="branding">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="crown-icon" style={{
                        background: 'var(--accent-gold)',
                        padding: '8px',
                        borderRadius: '8px',
                        color: 'white'
                    }}>
                        <Crown size={24} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', letterSpacing: '0.5px' }}>NxtLvl Tracker</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Level up your habits</p>
                    </div>
                </div>
            </div>
            <div className="date-display card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>📅</span>
                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{today}</span>
            </div>
        </header>
    );
};

export default Header;
