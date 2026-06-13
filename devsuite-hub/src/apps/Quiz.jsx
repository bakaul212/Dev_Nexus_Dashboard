import { useState, useEffect } from 'react';

// কুইজের প্রশ্নব্যাংক
const quizData = {
  html: [
    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None of these"], ans: 0 },
    { q: "Which HTML element is used for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], ans: 2 },
    { q: "What is the correct HTML element for inserting a line break?", options: ["<lb>", "<br>", "<break>", "<hr>"], ans: 1 }
  ],
  css: [
    { q: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], ans: 1 },
    { q: "Which HTML attribute is used to define inline styles?", options: ["styles", "class", "font", "style"], ans: 3 },
    { q: "How do you select an element with id 'demo' in CSS?", options: [".demo", "#demo", "demo", "*demo"], ans: 1 }
  ],
  javascript: [
    { q: "Inside which HTML element do we put the JavaScript?", options: ["<scripting>", "<js>", "<script>", "<javascript>"], ans: 2 },
    { q: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');"], ans: 3 },
    { q: "How to write an IF statement in JavaScript?", options: ["if i = 5 then", "if (i == 5)", "if i == 5 then", "if i = 5"], ans: 1 }
  ],
  react: [
    { q: "What is ReactJS?", options: ["A server-side framework", "A frontend JavaScript library", "A database management system", "A programming language"], ans: 1 },
    { q: "What is the use of 'useState' in React?", options: ["To handle side effects", "To store local component state", "To navigate between pages", "To fetch API data"], ans: 1 },
    { q: "Keys in React should be...", options: ["Unique among siblings", "Same for all elements", "Numbers only", "Strings only"], ans: 0 }
  ]
};

export default function Quiz() {
  const [category, setCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  // ✅ ১. ফাংশনগুলোকে আগে ডিক্লেয়ার করা হলো (যাতে Hoisting এরর না আসে)
  const handleNextQuestion = () => {
    const nextQ = currentQuestion + 1;
    if (nextQ < quizData[category].length) {
      setCurrentQuestion(nextQ);
      setSelectedOption(null);
      setTimeLeft(15);
    } else {
      setShowResult(true);
    }
  };

  const handleOptionClick = (idx) => {
    if (selectedOption !== null) return; 
    setSelectedOption(idx);
    if (idx === quizData[category][currentQuestion].ans) {
      setScore((prev) => prev + 1);
    }
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setTimeLeft(15);
  };

  const handleRestart = () => {
    setCategory(null);
    setShowResult(false);
  };

  // ✅ ২. ফাংশন ডিক্লেয়ার করার পর এবার useEffect-এ কল করা হলো
  useEffect(() => {
    if (!category || showResult) return;

    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, category, showResult]);

  return (
    <div style={{ maxWidth: '550px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out', color: '#fff' }}>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .quiz-cat-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(52, 152, 219, 0.3);
          border-color: #3498db !important;
        }
        .option-btn {
          transition: all 0.2s ease;
        }
        .option-btn:hover {
          background-color: #3a3e5c !important;
          transform: translateX(5px);
        }
      `}</style>

      {/* ক্যাটাগরি স্ক্রিন */}
      {!category && (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', marginBottom: '10px' }}>📝 Web Dev Quiz Arena</h2>
          <p style={{ color: '#aaa', marginBottom: '30px', fontSize: '14px' }}>Choose a technology to test your knowledge</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {Object.keys(quizData).map((cat) => (
              <button
                key={cat}
                className="quiz-cat-btn"
                onClick={() => handleCategorySelect(cat)}
                style={{
                  padding: '25px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  backgroundColor: '#2a2e45',
                  border: '1px solid #4a4e69',
                  borderRadius: '14px',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {cat === 'html' && '🌐 HTML5'}
                {cat === 'css' && '🎨 CSS3'}
                {cat === 'javascript' && '⚡ JavaScript'}
                {cat === 'react' && '⚛️ ReactJS'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* কুইজ বোর্ড */}
      {category && !showResult && (
        <div style={{ backgroundColor: '#2a2e45', border: '1px solid #4a4e69', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '13px', backgroundColor: '#3498db', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>
              {category}
            </span>
            <span style={{ fontSize: '14px', color: '#aaa', fontWeight: '500' }}>
              Question {currentQuestion + 1} of {quizData[category].length}
            </span>
          </div>

          {/* প্রোগ্রেস বার */}
          <div style={{ width: '100%', height: '6px', backgroundColor: '#1d2138', borderRadius: '10px', marginBottom: '25px', overflow: 'hidden' }}>
            <div style={{
              width: `${(timeLeft / 15) * 100}%`,
              height: '100%',
              backgroundColor: timeLeft <= 5 ? '#e74c3c' : '#2ecc71',
              transition: 'width 1s linear, background-color 0.5s ease'
            }} />
          </div>

          <h3 style={{ fontSize: '20px', lineHeight: '1.5', marginBottom: '25px', fontWeight: '600' }}>
            {quizData[category][currentQuestion].q}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
            {quizData[category][currentQuestion].options.map((option, idx) => {
              let bg = '#1d2138';
              let border = '1px solid #4a4e69';
              
              if (selectedOption !== null) {
                if (idx === quizData[category][currentQuestion].ans) {
                  bg = '#2ecc7133';
                  border = '1px solid #2ecc71';
                } else if (selectedOption === idx) {
                  bg = '#e74c3c33';
                  border = '1px solid #e74c3c';
                }
              }

              return (
                <button
                  key={idx}
                  className="option-btn"
                  onClick={() => handleOptionClick(idx)}
                  disabled={selectedOption !== null}
                  style={{
                    padding: '16px',
                    textAlign: 'left',
                    backgroundColor: bg,
                    border: border,
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '15px',
                    cursor: selectedOption !== null ? 'not-allowed' : 'pointer',
                    fontWeight: '500'
                  }}
                >
                  {idx + 1}. {option}
                </button>
              );
            })}
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              style={{
                padding: '12px 24px',
                backgroundColor: selectedOption !== null ? '#3498db' : '#4a4e69',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
                fontWeight: 'bold',
                transition: 'background 0.2s'
              }}
            >
              {currentQuestion + 1 === quizData[category].length ? 'Finish' : 'Next Question ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* রেজাল্ট কার্ড */}
      {showResult && (
        <div style={{
          backgroundColor: '#2a2e45',
          border: '1px solid #4a4e69',
          padding: '40px 30px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '15px' }}>
            {score === quizData[category].length ? '🏆' : score >= 1 ? '🎉' : '💤'}
          </div>
          
          <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Quiz Completed!</h2>
          <p style={{ color: '#aaa', marginBottom: '25px' }}>You performed well in the <span style={{ color: '#3498db', fontWeight: 'bold', textTransform: 'uppercase' }}>{category}</span> module.</p>

          <div style={{
            display: 'inline-block',
            backgroundColor: '#1d2138',
            padding: '20px 40px',
            borderRadius: '12px',
            border: '1px solid #4a4e69',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '30px'
          }}>
            Your Score: <span style={{ color: '#2ecc71' }}>{score}</span> / {quizData[category].length}
          </div>

          <div>
            <button
              onClick={handleRestart}
              style={{
                padding: '12px 30px',
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px',
                boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)'
              }}
            >
              🔄 Take Another Quiz
            </button>
          </div>
        </div>
      )}

    </div>
  );
}