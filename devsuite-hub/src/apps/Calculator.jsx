import { useState, useEffect } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('');
  const [isScientific, setIsScientific] = useState(false);
  
  // 📜 লোকাল স্টোরেজ সিঙ্কসহ হিস্টোরি স্টেট
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('calc_history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // হিস্টোরি লোকাল স্টোরেজে সেভ রাখার ইফেক্ট
  useEffect(() => {
    localStorage.setItem('calc_history', JSON.stringify(history));
  }, [history]);

  // বাটনে চাপ দিলে স্ক্রিনে ভ্যালু অ্যাড হবে
  const handleBtnClick = (val) => {
    setDisplay((prev) => prev + val);
  };

  // পুরো স্ক্রিন ক্লিয়ার করা
  const handleClear = () => {
    setDisplay('');
  };

  // একটা একটা করে ব্যাকস্পেস বা ডিলিট করা
  const handleBackspace = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  // হিস্টোরি সম্পূর্ণ মুছে ফেলার ফাংশন
  const handleClearHistory = () => {
    setHistory([]);
  };

  // নিরাপদ ক্যালকুলেশন ইঞ্জিন এবং হিস্টোরি ট্র্যাকিং
  const handleCalculate = () => {
    try {
      if (!display) return;
      
      // সায়েন্টিফিক ফাংশনগুলোকে জাভাস্ক্রিপ্ট Math অবজেক্টে রূপান্তর
      let sanitizeDisplay = display
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/√\(/g, 'Math.sqrt(');

      const calcEngine = new Function(`return ${sanitizeDisplay}`);
      let result = calcEngine();
      
      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
      } else {
        const finalResult = Number(result.toFixed(8)).toString();
        
        // ✅ হিসাব সফল হলে তা হিস্টোরি লিস্টের শুরুতে (Top) যোগ হবে
        setHistory((prev) => [{ expression: display, result: finalResult }, ...prev]);
        
        setDisplay(finalResult); 
      }
    } catch {
      setDisplay('Error');
    }
  };

  // ইনস্ট্যান্ট ক্যালকুলেশন (স্কয়ার, কিউব, ইনভার্স) ও হিস্টোরি ট্র্যাকিং
  const handleInstantCalc = (type) => {
    try {
      if (!display) return;
      let num = parseFloat(display);
      if (isNaN(num)) return setDisplay('Error');

      let finalResult = '';
      let expr = '';

      if (type === 'square') {
        finalResult = (num * num).toString();
        expr = `(${display})²`;
      }
      if (type === 'cube') {
        finalResult = (num * num * num).toString();
        expr = `(${display})³`;
      }
      if (type === 'inverse') {
        finalResult = (1 / num).toString();
        expr = `1/(${display})`;
      }

      setHistory((prev) => [{ expression: expr, result: finalResult }, ...prev]);
      setDisplay(finalResult);
    } catch {
      setDisplay('Error');
    }
  };

  const generalButtons = [
    ['C', '⌫', '(', ')'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];

  const scientificButtons = [
    ['sin(', 'cos(', 'tan(', '√('],
    ['log(', 'ln(', 'π', 'e'],
    ['x²', 'x³', '1/x']
  ];

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .calc-btn { transition: all 0.15s ease; }
        .calc-btn:hover { background-color: #4a4e69 !important; transform: translateY(-2px); }
        .calc-btn:active { transform: translateY(1px); }
        .op-btn { background-color: #34495e !important; }
        .op-btn:hover { background-color: #2c3e50 !important; }
        .eq-btn { background-color: #e74c3c !important; }
        .eq-btn:hover { background-color: #c0392b !important; }
        .history-item:hover { background-color: rgba(255, 255, 255, 0.05); transform: translateX(2px); }
      `}</style>

      {/* মোড টগল হেডার */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '22px' }}>🧮 Math Engine</h2>
        <button 
          onClick={() => setIsScientific(!isScientific)}
          style={{
            padding: '8px 16px',
            backgroundColor: isScientific ? '#e74c3c' : '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '12px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}
        >
          {isScientific ? '🔬 Scientific Mode' : '🔢 General Mode'}
        </button>
      </div>

      {/* ডিসপ্লে স্ক্রিন */}
      <div style={{
        backgroundColor: '#1d2138',
        padding: '20px',
        borderRadius: '12px',
        textAlign: 'right',
        marginBottom: '20px',
        border: '1px solid #4a4e69',
        boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.3)',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
        <div style={{ fontSize: '14px', color: '#888', minHeight: '18px', marginBottom: '5px' }}>
          {isScientific ? 'Rad Mode Active' : 'Standard'}
        </div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>
          {display || '0'}
        </div>
      </div>

      {/* বাটন প্যাড গ্রিড */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        
        {isScientific && scientificButtons.map((row, rIdx) => (
          <div key={`sci-${rIdx}`} style={{ display: 'grid', gridTemplateColumns: `repeat(${row.length}, 1fr)`, gap: '10px' }}>
            {row.map((btn) => (
              <button
                key={btn}
                className="calc-btn"
                onClick={() => {
                  if (btn === 'x²') handleInstantCalc('square');
                  else if (btn === 'x³') handleInstantCalc('cube');
                  else if (btn === '1/x') handleInstantCalc('inverse');
                  else handleBtnClick(btn);
                }}
                style={{ ...btnStyle, backgroundColor: '#2a2e45', color: '#3498db', fontWeight: 'bold' }}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}

        {generalButtons.map((row, rIdx) => (
          <div key={`gen-${rIdx}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {row.map((btn) => {
              let isOp = ['/', '*', '-', '+', '(', ')'].includes(btn);
              let isSpecial = ['C', '⌫'].includes(btn);
              let isEqual = btn === '=';

              return (
                <button
                  key={btn}
                  className={`calc-btn ${isOp ? 'op-btn' : ''} ${isEqual ? 'eq-btn' : ''}`}
                  onClick={() => {
                    if (btn === 'C') handleClear();
                    else if (btn === '⌫') handleBackspace();
                    else if (btn === '=') handleCalculate();
                    else handleBtnClick(btn);
                  }}
                  style={{
                    ...btnStyle,
                    backgroundColor: isSpecial ? '#7f8c8d' : '#3a3e5c',
                    color: '#fff',
                    fontSize: isOp || isSpecial ? '18px' : '16px',
                    fontWeight: '600'
                  }}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* 📜 এনিমেটেড লাইভ হিস্টোরি প্যানেল */}
      <div style={{ 
        backgroundColor: '#2a2e45', 
        borderRadius: '12px', 
        padding: '20px', 
        border: '1px solid #4a4e69',
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', color: '#888', fontWeight: 'bold', letterSpacing: '0.5px' }}>📜 CALCULATION LOG</h4>
          {history.length > 0 && (
            <button 
              onClick={handleClearHistory}
              style={{ background: 'transparent', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
            >
              Clear All
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto', paddingRight: '5px' }}>
          {history.length === 0 ? (
            <p style={{ color: '#666', fontSize: '13px', textAlign: 'center', margin: '15px 0' }}>No history records yet.</p>
          ) : (
            history.map((item, idx) => (
              <div 
                key={idx} 
                className="history-item"
                onClick={() => setDisplay(item.result)} // ক্লিক করলে রেজাল্ট ডিসপ্লেতে লোড হবে
                style={{ 
                  padding: '10px 12px', 
                  backgroundColor: '#1d2138', 
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  textAlign: 'right',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '12px', color: '#888', fontFamily: 'monospace', marginBottom: '2px' }}>{item.expression} =</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2ecc71', fontFamily: 'monospace' }}>{item.result}</div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

const btnStyle = {
  padding: '18px 0',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontFamily: 'monospace',
};