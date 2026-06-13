import { useState } from 'react';

export default function Bmi() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');
  const [statusColor, setStatusColor] = useState('#fff');

  const calculateBmi = (e) => {
    e.preventDefault();
    if (!weight || !height || weight <= 0 || height <= 0) {
      alert('Please enter valid positive numbers for weight and height!');
      return;
    }

    // ফুট এবং ইঞ্চিকে আলাদা করে নিখুঁত মিটারে রূপান্তর করার লজিক
    const heightStr = height.toString();
    let calculatedMeters = 0;
    
    if (heightStr.includes('.')) {
      const parts = heightStr.split('.');
      const feet = parseFloat(parts[0]);
      const inches = parseFloat(parts[1] || 0);
      const totalInches = (feet * 12) + inches;
      calculatedMeters = totalInches * 0.0254; // ১ ইঞ্চি = 0.0254 মিটার
    } else {
      calculatedMeters = parseFloat(height) * 0.3048;
    }

    // ✅ এখানে এখন সঠিকভাবে 'calculatedMeters' ভেরিয়েবলটি ব্যবহার করা হয়েছে
    const bmiValue = (parseFloat(weight) / (calculatedMeters * calculatedMeters)).toFixed(1);
    setBmi(bmiValue);

    // বিএমআই স্কোর অনুযায়ী কন্ডিশন ও কালার সেটআপ
    if (bmiValue < 18.5) {
      setMessage('Underweight 🦴 (Time to eat a bit more!)');
      setStatusColor('#FFD93D');
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setMessage('Normal Weight 🎉 (Perfect! Keep it up!)');
      setStatusColor('#6BCB77');
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setMessage('Overweight 🍔 (Try to do some exercises!)');
      setStatusColor('#FF9F43');
    } else {
      setMessage('Obese ⚠️ (Health Alert: Consult a doctor!)');
      setStatusColor('#FF6B6B');
    }
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setMessage('');
    setStatusColor('#fff');
  };

  return (
    <div style={{ maxWidth: '450px', margin: '0 auto', animation: 'fadeIn 0.6s ease-out', color: '#fff' }}>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .bmi-btn:hover {
          background-color: #2980b9 !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
        }
        .bmi-btn:active {
          transform: translateY(0);
        }
        .reset-btn:hover {
          background-color: #c0392b !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
        }
        .bmi-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '5px' }}>⚖️ Fitness Index</h2>
        <p style={{ color: '#aaa', fontSize: '14px', margin: 0 }}>Monitor your Body Mass Index with smart metrics</p>
      </div>

      {/* ইনপুট ফর্ম কার্ড */}
      <div className="bmi-card" style={{ padding: '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <form onSubmit={calculateBmi} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#cbd5e1', fontWeight: '500' }}>
              🏋️ Weight (KG)
            </label>
            <input 
              type="number" 
              placeholder="e.g. 65" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
              style={inputStyle} 
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#cbd5e1', fontWeight: '500' }}>
              📏 Height (Feet.Inch, e.g. 5.6)
            </label>
            <input 
              type="number" 
              step="0.01" 
              placeholder="e.g. 5.6" 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
              style={inputStyle} 
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button 
              type="submit" 
              className="bmi-btn"
              style={{ 
                flex: 2,
                padding: '14px', 
                backgroundColor: '#3498db', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                fontSize: '15px',
                transition: 'all 0.2s ease'
              }}
            >
              Calculate BMI
            </button>

            {bmi && (
              <button 
                type="button" 
                className="reset-btn"
                onClick={handleReset}
                style={{ 
                  flex: 1,
                  padding: '14px', 
                  backgroundColor: '#e74c3c', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '10px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  fontSize: '15px',
                  transition: 'all 0.2s ease'
                }}
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>

      {/* রেজাল্ট কার্ড */}
      {bmi && (
        <div style={{ 
          marginTop: '30px', 
          padding: '25px', 
          backgroundColor: '#1d2138', 
          borderRadius: '16px', 
          border: `2px solid ${statusColor}`,
          boxShadow: `0 10px 25px ${statusColor}15`,
          animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', color: '#888', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Your Result
          </p>
          <h1 style={{ fontSize: '54px', margin: '0 0 10px 0', color: statusColor, fontWeight: '800', lineHeight: '1' }}>
            {bmi}
          </h1>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: `${statusColor}15`,
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: '600',
            color: statusColor,
            border: `1px solid ${statusColor}33`
          }}>
            {message}
          </div>
        </div>
      )}

    </div>
  );
}

const inputStyle = { 
  width: '100%', 
  padding: '14px 15px', 
  borderRadius: '10px', 
  border: '1px solid #4a4e69', 
  boxSizing: 'border-box', 
  backgroundColor: '#1d2138', 
  color: '#fff', 
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.2s',
};