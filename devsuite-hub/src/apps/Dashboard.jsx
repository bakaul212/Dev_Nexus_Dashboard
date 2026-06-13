import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [time, setTime] = useState(new Date());

  // লাইভ ঘড়ির জন্য টাইমার সেটআপ
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out', color: '#fff' }}>
      
      {/* CSS Animation Injection (ইনলাইন স্টাইলে কি-ফ্রেম অ্যানিমেশনের জন্য) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(52, 152, 219, 0.2) !important;
          border-color: #3498db !important;
        }
      `}</style>

      {/* Top Welcome Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #3a6073 0%, #3a7bd5 100%)',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '36px', margin: '0 0 10px 0', fontWeight: '800', letterSpacing: '0.5px' }}>
          🚀 Welcome to DevSuite Hub
        </h1>
        <p style={{ fontSize: '16px', color: '#e0e0e0', margin: '0 auto', maxWidth: '600px', lineHeight: '1.6' }}>
          Your ultimate multi-utility workspace. Monitor the weather, solve quick web-dev quizzes, calculate metrics, and test your BMI—all from a single premium environment.
        </p>
      </div>

      {/* Live Time & Date Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '25px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        marginBottom: '40px'
      }}>
        <h2 style={{ fontSize: '48px', margin: '0', fontWeight: '700', color: '#3498db', letterSpacing: '1px' }}>
          {formattedTime}
        </h2>
        <p style={{ fontSize: '16px', color: '#aaa', margin: '8px 0 0 0', fontWeight: '500' }}>
          📅 {formattedDate}
        </p>
      </div>

      {/* Grid Quick Stats / Overview */}
      <h3 style={{ fontSize: '20px', marginBottom: '20px', fontWeight: '600', color: '#cbd5e1' }}>⚙️ Available Modules</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        
        <div className="stat-card" style={cardStyle}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📝</div>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>Web Dev Quiz</h4>
          <p style={{ margin: '0', fontSize: '12px', color: '#888' }}>Test your frontend coding skills</p>
        </div>

        <div className="stat-card" style={cardStyle}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>🌦️</div>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>Weather App</h4>
          <p style={{ margin: '0', fontSize: '12px', color: '#888' }}>Real-time weather reports worldwide</p>
        </div>

        <div className="stat-card" style={cardStyle}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>🧮</div>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>Calculator</h4>
          <p style={{ margin: '0', fontSize: '12px', color: '#888' }}>General & Scientific math engine</p>
        </div>

        <div className="stat-card" style={cardStyle}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚖️</div>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>BMI Calculator</h4>
          <p style={{ margin: '0', fontSize: '12px', color: '#888' }}>Monitor your health index instantly</p>
        </div>

      </div>

    </div>
  );
}

// কার্ডের বেসিক ডার্ক প্রিমিয়াম স্টাইল
const cardStyle = {
  backgroundColor: '#2a2e45',
  border: '1px solid #4a4e69',
  padding: '20px',
  borderRadius: '14px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
};