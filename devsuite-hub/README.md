# 🚀 Advanced All-in-One Executive Dashboard

একটি প্রিমিয়াম, আধুনিক এবং সুপার-অ্যানিমেটেড অল-ইন-ওয়ান রিয়্যাক্ট ড্যাশবোর্ড অ্যাপ্লিকেশন। এই প্রজেক্টে দৈনন্দিন প্রয়োজনীয় চমৎকার ৫টি মডিউলকে একটি সেন্ট্রাল কোর কনসোলের আওতায় নিয়ে আসা হয়েছে। 

🌐 **লাইভ ডেমো লিংক:** [Peaceful Praline Dashboard](https://peaceful-praline-6c9b41.netlify.app)

---

## 🎨 Key Features & Modules

### 🏠 1. Home Hub & Productivity Engine
* **User Profile & Skills:** ডেভেলপার প্রোফাইল শোকেসিং এবং এনিমেটেড স্কিল ব্যাজ।
* **Pomodoro Focus Timer:** ২৫-মিনিটের কাউন্টডাউন ফোকাস মেকানিজম (অটো-অ্যালার্টসহ)।
* **Persistent Mission Log (To-Do):** দৈনন্দিন কাজের ট্র্যাকার যা ব্রাউজার রিফ্রেশ করলেও ডেটা ধরে রাখে।

### 🎨 2. Engine Theme Customizer
* সম্পূর্ণ ড্যাশবোর্ডের থিম এক ক্লিকে পরিবর্তনের সুবিধা।
* **উপলভ্য থিমসমূহ:** Deep Blue (ডিফল্ট), Ocean Green, Royal Purple, এবং Golden Neon।

### ⚖️ 3. Fitness Index (BMI Calculator)
* সঠিক ফুট-ইঞ্চির হিসাব থেকে নিখুঁত বডি মাস ইনডেক্স (BMI) ক্যালকুলেশন।
* বিএমআই স্কোরের উপর ভিত্তি করে এনিমেটেড কালার-কোডেড রেসপন্স কার্ড।

### 🧮 4. Math Engine (Scientific Calculator)
* সাধারণ মোডের পাশাপাশি সায়েন্টিফিক মেথড (sin, cos, tan, log, ln, square, sqrt) সাপোর্ট।
* **Calculation Log:** প্রতিটি সফল হিসাবের অটো-হিস্টোরি ট্র্যাকিং (LocalStorage সিঙ্কসহ) এবং পুরনো হিস্টোরিতে ক্লিক করে তা পুনরায় ডিসপ্লেতে ব্যাক করার সুবিধা।

### 🌦️ 5. Sky Analytics (Weather App)
* রিয়েল-টাইম আবহাওয়ার আপডেট জানার জন্য একটি ইন্টারঅ্যাক্টিভ মডিউল।

### 📝 6. Web Dev Quiz Arena
* টাইমার বেসড প্রোগ্রেস বার সমৃদ্ধ ইন্টারঅ্যাক্টিভ কুইজ প্ল্যাটফর্ম।
* Hoisting-ফ্রি লিন্টার ফ্রেন্ডলি অপ্টিমাইজড আর্কিটেকচার।

---

## ⚙️ Tech Stack Used

* **Frontend:** React.js (v19)
* **Styling:** CSS-in-JS (Inline dynamic styling & Global keyframes injection)
* **State Management:** React hooks (`useState`, `useEffect`)
* **Storage:** Web LocalStorage API (For Tasks & Calculation logs)
* **Deployment:** Netlify

---

## 🛠️ Performance Optimization & Fixes
* **Anti-Hoisting Control:** জাভাস্ক্রিপ্ট হোইস্টিং এরর এড়াতে সকল কোর মেথড এবং লজিকগুলোকে `useEffect`-এর উপরে ডিক্লেয়ার করা হয়েছে।
* **Cascading Render Prevention:** পোমোডোরো টাইমার ও অন্যান্য সাইড-ইফেক্টের সিঙ্ক্রোনাস `setState` কলগুলোকে ম্যাক্রো-টাস্ক কিউ (`setTimeout`) দিয়ে রেন্ডার অপ্টিমাইজ করা হয়েছে।
* **Anti-eval Security:** ক্যালকুলেটরে সরাসরি ক্ষতিকারক `eval()` ব্যবহার না করে `Function` কনস্ট্রাক্টর ও স্যানিটাইজড স্ট্রিং মেথড ব্যবহার করা হয়েছে।

---

## 📦 Installation & Local Setup

প্রজেক্টটি আপনার লোকাল কম্পিউটারে রান করতে চাইলে নিচের ধাপগুলো অনুসরণ করুন:

১. রিপোজিটরি ক্লোন করুন:
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)