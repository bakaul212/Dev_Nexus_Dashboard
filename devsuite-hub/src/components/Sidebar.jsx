export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'quiz', label: '📝 Web Dev Quiz' },
    { id: 'weather', label: '🌦️ Weather App' },
    { id: 'calculator', label: '🧮 Calculator' },
    { id: 'bmi', label: '⚖️ BMI Calculator' },
  ];

  return (
    <div style={{ width: '260px', backgroundColor: '#30344c', height: '100vh', padding: '20px', boxShadow: '4px 0 10px rgba(0,0,0,0.2)', boxSizing: 'border-box', position: 'fixed', left: 0, top: 0 }}>
      <h2 style={{ color: '#fff', fontSize: '22px', marginBottom: '30px', textAlign: 'center', borderBottom: '2px solid #4a4e69', paddingBottom: '15px' }}>
        🛠️ DevSuite Hub
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              padding: '12px 20px',
              backgroundColor: activeTab === item.id ? '#3498db' : 'transparent',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '16px',
              fontWeight: activeTab === item.id ? 'bold' : 'normal',
              transition: 'background 0.2s ease',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}