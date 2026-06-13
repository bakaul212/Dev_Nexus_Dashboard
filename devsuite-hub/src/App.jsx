import { useState, useEffect } from 'react';
import Bmi from './apps/Bmi';
import Calculator from './apps/Calculator';
import Weather from './apps/Weather';
import Quiz from './apps/Quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  
  // ২. থিম কাস্টমাইজার স্টেট (ডিফল্ট: ডার্ক ব্লু ভাইব)
  const [theme, setTheme] = useState({
    bg: '#1a1d36',
    cardBg: '#2a2e45',
    sidebarBg: '#131526',
    accent: '#3498db',
    text: '#ffffff'
  });

  // ৪. LocalStorage Sync যুক্ত টু-ডু লিস্ট স্টেট
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('db_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, text: 'Complete React Dashboard ⚡', done: true },
      { id: 2, text: 'Test BMI & Weather Modules 🌦️', done: false }
    ];
  });
  const [newTask, setNewTask] = useState('');

  // ৩. পোমোডোরো টাইমার স্টেট
  const [pomoTime, setPomoTime] = useState(25 * 60);
  const [pomoActive, setPomoActive] = useState(false);

  // টু-ডু লিস্ট লোকাল স্টোরেজে সেভ রাখার ইফেক্ট
  useEffect(() => {
    localStorage.setItem('db_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // পোমোডোরো টাইমার কাউন্টডাউন লজিক
  useEffect(() => {
    let interval = null;
    if (pomoActive && pomoTime > 0) {
      interval = setInterval(() => {
        setPomoTime((prev) => prev - 1);
      }, 1000);
    } else if (pomoTime === 0) {
      alert('Time to take a break! ☕');
      setPomoActive(false);
      setPomoTime(25 * 60);
    }
    return () => clearInterval(interval);
  }, [pomoActive, pomoTime]);

  // থিম পরিবর্তনের ফাংশন
  const changeTheme = (type) => {
    if (type === 'blue') {
      setTheme({ bg: '#1a1d36', cardBg: '#2a2e45', sidebarBg: '#131526', accent: '#3498db', text: '#ffffff' });
    } else if (type === 'green') {
      setTheme({ bg: '#0f1f1a', cardBg: '#18332b', sidebarBg: '#091411', accent: '#2ecc71', text: '#e0f2fe' });
    } else if (type === 'purple') {
      setTheme({ bg: '#1e1430', cardBg: '#2f204a', sidebarBg: '#140d21', accent: '#9b59b6', text: '#fae8ff' });
    } else if (type === 'gold') {
      setTheme({ bg: '#1c1917', cardBg: '#292524', sidebarBg: '#1c1917', accent: '#eab308', text: '#fafaf9' });
    }
  };

  // টাস্ক যোগ ও ডিলিট লজিক
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const formatPomoTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.bg, color: theme.text, fontFamily: 'sans-serif', transition: 'all 0.4s ease' }}>
      
      <style>{`
        .nav-btn { padding: 12px 20px; border: none; border-radius: 8px; text-align: left; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.2s; background: transparent; color: #aaa; }
        .nav-btn:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .theme-dot { width: 20px; height: 20px; border-radius: 50%; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); transition: transform 0.2s; }
        .theme-dot:hover { transform: scale(1.2); }
      `}</style>

      {/* বাম পাশের নেভিগেশন সাইডবার */}
      <div style={{ width: '260px', backgroundColor: theme.sidebarBg, padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '8px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ fontSize: '20px', margin: '0 0 30px 10px', fontWeight: '700', color: theme.accent }}>🚀 Core Console</h2>
        
        <button className="nav-btn" onClick={() => setActiveTab('home')} style={activeTab === 'home' ? { backgroundColor: theme.accent, color: '#fff' } : {}}>🏠 Home Dashboard</button>
        <button className="nav-btn" onClick={() => setActiveTab('bmi')} style={activeTab === 'bmi' ? { backgroundColor: theme.accent, color: '#fff' } : {}}>⚖️ Fitness Index (BMI)</button>
        <button className="nav-btn" onClick={() => setActiveTab('calc')} style={activeTab === 'calc' ? { backgroundColor: theme.accent, color: '#fff' } : {}}>🧮 Scientific Calc</button>
        <button className="nav-btn" onClick={() => setActiveTab('weather')} style={activeTab === 'weather' ? { backgroundColor: theme.accent, color: '#fff' } : {}}>🌦️ Sky Analytics</button>
        <button className="nav-btn" onClick={() => setActiveTab('quiz')} style={activeTab === 'quiz' ? { backgroundColor: theme.accent, color: '#fff' } : {}}>📝 Web Dev Quiz</button>
        
        {/* টপ লেভেল থিম কাস্টমাইজার উইজেট */}
        <div style={{ marginTop: 'auto', padding: '15px', backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: '10px' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#888', fontWeight: 'bold' }}>🎨 ENGINE THEME</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="theme-dot" onClick={() => changeTheme('blue')} style={{ backgroundColor: '#3498db' }} />
            <div className="theme-dot" onClick={() => changeTheme('green')} style={{ backgroundColor: '#2ecc71' }} />
            <div className="theme-dot" onClick={() => changeTheme('purple')} style={{ backgroundColor: '#9b59b6' }} />
            <div className="theme-dot" onClick={() => changeTheme('gold')} style={{ backgroundColor: '#eab308' }} />
          </div>
        </div>
      </div>

      {/* ডান পাশের মূল কন্টেন্ট এরিয়া */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {activeTab === 'home' && (
          <div style={{ maxWidth: '900px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
            
            {/* হেডার গ্রিটিংস */}
            <h1 style={{ fontSize: '32px', marginBottom: '5px', fontWeight: '700' }}>Welcome Back, Master! 👋</h1>
            <p style={{ color: '#aaa', marginBottom: '40px', fontSize: '15px' }}>Here is your productivity and utilities summary for today.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              
              {/* ১. প্রোফাইল ও স্কিল কার্ড */}
              <div style={{ backgroundColor: theme.cardBg, padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: theme.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 'bold' }}>💻</div>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '20px' }}>Your Name / Portfolio</h3>
                    <p style={{ margin: '0', fontSize: '13px', color: '#aaa' }}>Full-Stack React Developer</p>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', margin: '0 0 10px 0' }}>ACTIVE CORE SKILLS:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['HTML5', 'CSS3', 'JavaScript', 'React 19', 'REST APIs', 'Clean Code'].map(s => (
                    <span key={s} style={{ fontSize: '11px', backgroundColor: 'rgba(255,255,255,0.06)', padding: '5px 10px', borderRadius: '20px', border: `1px solid ${theme.accent}33`, color: theme.accent, fontWeight: 'bold' }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* ৩. পোমোডোরো ফোকাস টাইমার উইজেট */}
              <div style={{ backgroundColor: theme.cardBg, padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#888', fontWeight: 'bold', letterSpacing: '1px' }}>⏱️ POMODORO FOCUS ENGINE</h4>
                <h1 style={{ fontSize: '54px', margin: '10px 0', fontFamily: 'monospace', fontWeight: '700', color: pomoActive ? theme.accent : '#fff' }}>{formatPomoTime(pomoTime)}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button onClick={() => setPomoActive(!pomoActive)} style={{ padding: '8px 20px', border: 'none', borderRadius: '6px', backgroundColor: pomoActive ? '#e74c3c' : '#2ecc71', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                    {pomoActive ? 'Pause' : 'Start Focus'}
                  </button>
                  <button onClick={() => { setPomoActive(false); setPomoTime(25 * 60); }} style={{ padding: '8px 15px', border: 'none', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>

              {/* ৪. লোকাল স্টোরেজ সিন্ড টু-ডু উইজেট (Full Width Row) */}
              <div style={{ gridColumn: '1 / -1', backgroundColor: theme.cardBg, padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>📋 Persistent Mission Log (To-Do)</h3>
                
                <form onSubmit={addTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <input type="text" placeholder="Add a new master objective..." value={newTask} onChange={(e) => setNewTask(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', outline: 'none' }} />
                  <button type="submit" style={{ padding: '12px 24px', backgroundColor: theme.accent, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Add Objective</button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tasks.map(task => (
                    <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => toggleTask(task.id)}>
                        <input type="checkbox" checked={task.done} readOnly style={{ accentColor: theme.accent }} />
                        <span style={{ fontSize: '14px', textDecoration: task.done ? 'line-through' : 'none', color: task.done ? '#666' : '#fff' }}>{task.text}</span>
                      </div>
                      <button onClick={() => deleteTask(task.id)} style={{ background: 'transparent', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* সাব-অ্যাপ্লিকেশন মডিউল লোডার */}
        {activeTab === 'bmi' && <Bmi />}
        {activeTab === 'calc' && <Calculator />}
        {activeTab === 'weather' && <Weather />}
        {activeTab === 'quiz' && <Quiz />}

      </div>
    </div>
  );
}