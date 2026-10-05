import React, { useState, useRef } from 'react';
import AdminDashboard from './AdminDashboard';
import logo from './assets/logo.jpeg';

const LOGO_URL = logo;
const SUGGESTED_SKILLS = [
  "React", "TypeScript", "Python", "Machine Learning", 
  "Data Science", "UI/UX Design", "Figma", "Public Speaking", 
  "Statistics", "Calculus"
];
const REAL_MATCHES = [
  {
    id: 1,
    name: "Roman",
    role: "UI/UX Designer",
    teach: "Drawing & Sketching",
    matchLevel: "77%",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Passionate about fine arts and digital sketching.",
    youtubeId: "wujEE3PRVUo",
    videoTitle: "The Mathematics of Sidewalk Illusions — Perspective & Sketching (Animated)"
  },
  {
    id: 2,
    name: "Kashish",
    role: "Frontend Student",
    teach: "Drawing & Sketching",
    matchLevel: "58%",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    bio: "Exploring creative design and web interfaces.",
    youtubeId: "XzOi-yNQYWs",
    videoTitle: "UX Design in 100 Seconds (Animated Explainer)"
  },
  {
    id: 3,
    name: "Dhruv",
    role: "Computer Science Peer",
    teach: "Drawing & Sketching",
    matchLevel: "52%",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    bio: "Loves coding backend logic and practicing basic design.",
    youtubeId: "V8A4qudmsX0",
    videoTitle: "Animation Basics: The Optical Illusion of Motion (Animated)"
  }
];

// ── Peer roster: every skill/course has at least 10 teachers ─────────────
const EXTRA_PEERS = [
  { id: 4, name: "Ananya", role: "Frontend Developer", teaches: ["React", "TypeScript", "UI/UX Design"], wants: ["Python", "Statistics"], level: 4 },
  { id: 5, name: "Rohan", role: "Full Stack Student", teaches: ["React", "TypeScript", "Python"], wants: ["Figma", "Public Speaking"], level: 3 },
  { id: 6, name: "Priya", role: "UI/UX Designer", teaches: ["UI/UX Design", "Figma", "Public Speaking"], wants: ["React", "Data Science"], level: 5 },
  { id: 7, name: "Karthik", role: "ML Enthusiast", teaches: ["Python", "Machine Learning", "Data Science"], wants: ["React", "Public Speaking"], level: 4 },
  { id: 8, name: "Sneha", role: "Data Analyst", teaches: ["Data Science", "Statistics", "Python"], wants: ["UI/UX Design", "Figma"], level: 4 },
  { id: 9, name: "Aditya", role: "Web Developer", teaches: ["React", "TypeScript", "Figma"], wants: ["Machine Learning", "Calculus"], level: 3 },
  { id: 10, name: "Meera", role: "Math Tutor", teaches: ["Calculus", "Statistics", "Data Science"], wants: ["React", "UI/UX Design"], level: 5 },
  { id: 11, name: "Vikram", role: "AI Researcher", teaches: ["Machine Learning", "Python", "Calculus"], wants: ["Public Speaking", "Figma"], level: 5 },
  { id: 12, name: "Divya", role: "Product Designer", teaches: ["Figma", "UI/UX Design", "Public Speaking"], wants: ["TypeScript", "Python"], level: 4 },
  { id: 13, name: "Harsha", role: "Backend Developer", teaches: ["Python", "TypeScript", "Data Science"], wants: ["UI/UX Design", "Public Speaking"], level: 3 },
  { id: 14, name: "Pooja", role: "Statistics Topper", teaches: ["Statistics", "Calculus", "Machine Learning"], wants: ["React", "Figma"], level: 4 },
  { id: 15, name: "Arjun", role: "Debate Club Lead", teaches: ["Public Speaking", "Statistics", "UI/UX Design"], wants: ["Python", "Machine Learning"], level: 4 },
  { id: 16, name: "Lakshmi", role: "Frontend Student", teaches: ["React", "UI/UX Design", "Figma"], wants: ["Statistics", "Calculus"], level: 3 },
  { id: 17, name: "Sai Teja", role: "Competitive Programmer", teaches: ["Python", "Calculus", "TypeScript"], wants: ["UI/UX Design", "Data Science"], level: 4 },
  { id: 18, name: "Nikhil", role: "Data Science Peer", teaches: ["Data Science", "Machine Learning", "Statistics"], wants: ["TypeScript", "Figma"], level: 3 },
  { id: 19, name: "Bhavana", role: "Design Intern", teaches: ["Figma", "UI/UX Design", "React"], wants: ["Machine Learning", "Public Speaking"], level: 4 },
  { id: 20, name: "Rahul", role: "Software Intern", teaches: ["TypeScript", "React", "Python"], wants: ["Statistics", "Public Speaking"], level: 5 },
  { id: 21, name: "Swathi", role: "Public Speaking Coach", teaches: ["Public Speaking", "UI/UX Design", "Data Science"], wants: ["TypeScript", "Calculus"], level: 5 },
  { id: 22, name: "Keerthi", role: "Analytics Peer", teaches: ["Statistics", "Data Science", "Python"], wants: ["Figma", "React"], level: 3 },
  { id: 23, name: "Manoj", role: "Calculus Mentor", teaches: ["Calculus", "Machine Learning", "Statistics"], wants: ["TypeScript", "UI/UX Design"], level: 4 },
  { id: 24, name: "Varun", role: "ML Engineer", teaches: ["Machine Learning", "Data Science", "TypeScript"], wants: ["Figma", "Public Speaking"], level: 4 },
  { id: 25, name: "Anjali", role: "UX Researcher", teaches: ["UI/UX Design", "Public Speaking", "Statistics"], wants: ["React", "Python"], level: 4 },
  { id: 26, name: "Charan", role: "React Developer", teaches: ["React", "Figma", "TypeScript"], wants: ["Data Science", "Calculus"], level: 4 },
  { id: 27, name: "Sowmya", role: "Python Tutor", teaches: ["Python", "Statistics", "Public Speaking"], wants: ["React", "UI/UX Design"], level: 3 },
  { id: 28, name: "Tarun", role: "Data Engineer", teaches: ["Data Science", "Python", "TypeScript"], wants: ["Machine Learning", "Public Speaking"], level: 3 },
  { id: 29, name: "Nandini", role: "Figma Specialist", teaches: ["Figma", "React", "Public Speaking"], wants: ["Python", "Calculus"], level: 4 },
  { id: 30, name: "Ravi", role: "Maths Olympiad Peer", teaches: ["Calculus", "Statistics", "Python"], wants: ["React", "Figma"], level: 5 },
  { id: 31, name: "Deepika", role: "Communication Mentor", teaches: ["Public Speaking", "Figma", "UI/UX Design"], wants: ["Data Science", "TypeScript"], level: 4 },
  { id: 32, name: "Pranav", role: "AI Club Member", teaches: ["Machine Learning", "Python", "React"], wants: ["UI/UX Design", "Public Speaking"], level: 3 },
  { id: 33, name: "Shruthi", role: "Statistics TA", teaches: ["Statistics", "Calculus", "Data Science"], wants: ["Figma", "TypeScript"], level: 5 },
  { id: 34, name: "Yashwanth", role: "Full Stack Developer", teaches: ["React", "TypeScript", "Data Science"], wants: ["Statistics", "Machine Learning"], level: 4 },
  { id: 35, name: "Harini", role: "Visual Designer", teaches: ["UI/UX Design", "Figma", "TypeScript"], wants: ["Python", "Public Speaking"], level: 3 },
  { id: 36, name: "Abhinav", role: "Deep Learning Peer", teaches: ["Machine Learning", "Calculus", "Python"], wants: ["UI/UX Design", "Statistics"], level: 4 },
  { id: 37, name: "Mounika", role: "Toastmasters Member", teaches: ["Public Speaking", "Statistics", "React"], wants: ["Machine Learning", "Figma"], level: 3 },
  { id: 38, name: "Sandeep", role: "Data Science Mentor", teaches: ["Data Science", "Machine Learning", "Calculus"], wants: ["React", "Public Speaking"], level: 5 },
  { id: 39, name: "Tejaswi", role: "Web Designer", teaches: ["Figma", "React", "UI/UX Design"], wants: ["Data Science", "Statistics"], level: 4 },
  { id: 40, name: "Kiran", role: "TypeScript Developer", teaches: ["TypeScript", "Python", "React"], wants: ["Calculus", "Figma"], level: 3 },
  { id: 41, name: "Pavani", role: "Research Scholar", teaches: ["Statistics", "Machine Learning", "Calculus"], wants: ["Public Speaking", "UI/UX Design"], level: 5 },
  { id: 42, name: "Ashwin", role: "Career Mentor", teaches: ["Public Speaking", "Data Science", "TypeScript"], wants: ["Figma", "Machine Learning"], level: 4 },
  { id: 43, name: "Ishita", role: "Creative Technologist", teaches: ["UI/UX Design", "Figma", "Machine Learning"], wants: ["TypeScript", "Statistics"], level: 4 },
];

// Original 3 peers (kept as-is, with their chats & videos) + 40 more peers
const ALL_PEERS = [
  ...REAL_MATCHES.map((m) => {
    const extra = {
      Roman: { teaches: ["UI/UX Design", "Figma"], wants: ["React", "Python"], level: 4 },
      Kashish: { teaches: ["React", "Figma"], wants: ["Statistics", "Calculus"], level: 3 },
      Dhruv: { teaches: ["Python", "Data Science"], wants: ["UI/UX Design", "Figma"], level: 3 }
    }[m.name];
    return { ...m, ...extra };
  }),
  ...EXTRA_PEERS.map((p) => ({
    ...p,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(p.name)}&backgroundColor=bce3dc`,
    bio: `Happy to help campus peers with ${p.teaches.slice(0, -1).join(', ')} and ${p.teaches[p.teaches.length - 1]}.`,
    youtubeId: null,
    videoTitle: `${p.teaches[0]} — Beginner Tutorial`
  }))
];

// Animated explainer video for every course (YouTube IDs)
const SKILL_VIDEOS = {
  "React": { id: "Tn6-PIqc4UM", title: "React in 100 Seconds — Animated Explainer" },
  "TypeScript": { id: "zQnBQ4tB3ZA", title: "TypeScript in 100 Seconds — Animated Explainer" },
  "Python": { id: "x7X9w_GIm1s", title: "Python in 100 Seconds — Animated Explainer" },
  "Machine Learning": { id: "aircAruvnKk", title: "But what is a neural network? — 3Blue1Brown (Animated)" },
  "Data Science": { id: "-Og-i4emY-Q", title: "Data Science — A Brief Animated Introduction" },
  "UI/UX Design": { id: "XzOi-yNQYWs", title: "UX Design in 100 Seconds (Animated Explainer)" },
  "Figma": { id: "Cx2dkpBxst8", title: "Figma for Beginners — Official Getting Started Guide" },
  "Public Speaking": { id: "1sOgYNgq88E", title: "What's the best way to give a presentation? — TED-Ed (Animated)" },
  "Statistics": { id: "sxYrzzy3cq8", title: "How statistics can be misleading — TED-Ed (Animated)" },
  "Calculus": { id: "WUvTyaaNkzM", title: "The Essence of Calculus — 3Blue1Brown (Animated)" }
};

const canonicalSkill = (s) =>
  SUGGESTED_SKILLS.find((x) => x.toLowerCase() === s.trim().toLowerCase()) || s.trim();

const hashString = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
};

// At least 10 teachers for ANY skill (suggested or custom)
const getTeachersForSkill = (skill) => {
  const canon = canonicalSkill(skill);
  if (SUGGESTED_SKILLS.includes(canon)) {
    return ALL_PEERS.filter((p) => p.teaches.includes(canon));
  }
  const start = hashString(canon.toLowerCase()) % ALL_PEERS.length;
  return Array.from({ length: 10 }, (_, i) => ALL_PEERS[(start + i * 4) % ALL_PEERS.length]);
};

// Match % = how well a peer fits the user's requirement (max 100)
//  • 35–60 : teaches the course(s) you want to learn (more of your courses = higher)
//  • up to 15 : peer's expertise level
//  • up to 25 : skill swap — peer wants to learn what you teach
const computeMatches = (learnList, teachList) => {
  const wanted = [...new Set((learnList.length ? learnList : SUGGESTED_SKILLS).map(canonicalSkill))];
  const myTeach = teachList.map(canonicalSkill);
  const found = {};
  wanted.forEach((skill) => {
    getTeachersForSkill(skill).forEach((peer) => {
      if (!found[peer.id]) found[peer.id] = { peer, skills: [] };
      found[peer.id].skills.push(skill);
    });
  });
  return Object.values(found)
    .map(({ peer, skills }) => {
      const courseScore = 35 + 25 * (skills.length / wanted.length);
      const expertiseScore = peer.level * 3;
      const swapSkills = peer.wants.filter((w) => myTeach.includes(w));
      const swapScore = Math.min(25, swapSkills.length * 12.5);
      const pct = Math.min(100, Math.round(courseScore + expertiseScore + swapScore));
      const videoSkill = skills[0];
      const video = SKILL_VIDEOS[videoSkill];
      return {
        ...peer,
        videoSkill,
        youtubeId: video ? video.id : null,
        videoTitle: video ? video.title : `${videoSkill} — Animated Explainer`,
        teach: skills.length <= 2 ? skills.join(' & ') : `${skills[0]} & ${skills.length - 1} more`,
        matchPercent: pct,
        matchLevel: `${pct}%`,
        matchInfo:
          `Teaches: ${skills.join(', ')} • Expertise: ${peer.level}/5` +
          (swapSkills.length ? ` • Wants to learn from you: ${swapSkills.join(', ')}` : '')
      };
    })
    .sort((a, b) => b.matchPercent - a.matchPercent || a.name.localeCompare(b.name));
};

const AUTO_REPLIES = {
  Roman: [
    "Sure thing! Let's start with basic shapes before we move on to shading — want to book a session?",
    "That's a great question. I usually sketch loose gesture lines first, then refine. I can show you live in our next call.",
    "Happy to help! Send me a photo of your sketch and I'll give you feedback.",
    "Good question — perspective takes practice. Let's go over it step by step next time we meet."
  ],
  Kashish: [
    "Honestly still figuring that out myself, but let's practice wireframing together!",
    "I found a neat approach for that recently — I'll share my notes before our next session.",
    "Good question! Let's compare our Figma boards and see what works best.",
    "I think starting with low-fidelity sketches helps a lot here. Want to try it together?"
  ],
  Dhruv: [
    "Haha, as a fellow dev I totally get that struggle. Let's break it down logically like code!",
    "I can share the resources that helped me get started with basic drawing.",
    "Good question — let's schedule a quick session to go over the fundamentals.",
    "I think of shapes like building blocks, kind of like components in code. Want me to show you?"
  ]
};

const getAutoReply = (name) => {
  const pool = AUTO_REPLIES[name] || [
    "Hey! Happy to help — what would you like to start with?",
    "Sounds good! Let's set up a quick session and go through it together.",
    "Great question! I'll share some resources and we can practice in our next session.",
    "Thanks for reaching out! I'm free this week — want to book a slot on the calendar?"
  ];
  return pool[Math.floor(Math.random() * pool.length)];
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

// ── Admin credentials (mock, front-end only) ─────────────
const ADMIN_CREDENTIALS = {
  email: 'admin@skillswap.com',
  password: 'Admin@123'
};

export default function App() {
  const [currentStep, setCurrentStep] = useState('landing'); 
  const [authTab, setAuthTab] = useState('signup'); 
  const [authRole, setAuthRole] = useState('student'); // 'student' | 'admin'
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [onboardStep, setOnboardStep] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState('Roman');
  const dropdownRef = useRef(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [inputmessage, setInputmessage] = useState('');
  
  const [activityTimeframe, setActivityTimeframe] = useState('Today');
  
  const [formData, setFormData] = useState({
    fullName: 'Bapathu',
    email: '241FA07084@vignan.ac.in',
    gradYear: '2026',
    password: ''
  });

const [registeredUser, setRegisteredUser] = useState(() => {
  const saved = localStorage.getItem('registeredUser');
  return saved ? JSON.parse(saved) : null;
});
  const [avatarImage, setAvatarImage] = useState(null);
  const fileInputRef = useRef(null);
  const [authError, setAuthError] = useState('');
  const [teachSkills, setTeachSkills] = useState(["React", "UI/UX Design"]);
  const [learnSkills, setLearnSkills] = useState(["Python", "Machine Learning"]);
  const [customTeachInput, setCustomTeachInput] = useState('');
  const [customLearnInput, setCustomLearnInput] = useState('');
  const [userBio, setUserBio] = useState("Short bio about my passions and coding journey.");
  
  // Dynamic Calendar State — always starts on the real current date
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date().getDate());
  const [calendarSubTab, setCalendarSubTab] = useState('upcoming');
  
  const [sessions, setSessions] = useState([]);
  const [showCalendarAddModal, setShowCalendarAddModal] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState(null);
  
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionTime, setSessionTime] = useState('10:00 AM');
  const [sessionMentor, setSessionMentor] = useState('');
  const [sessionFullDate, setSessionFullDate] = useState(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  });
  const [messages, setMessages] = useState(() => {
  const saved = localStorage.getItem('chatMessages');
  return saved ? JSON.parse(saved) : {
    Roman: [{ id: 1, sender: 'Roman', text: 'Hi! Ready for our Skillswap session today?' }],
    Kashish: [],
    Dhruv: []
  };
});
  const [savedProfiles, setSavedProfiles] = useState([]);

  // All matches for every course you want to learn, with match % against your requirements
  const matches = React.useMemo(() => computeMatches(learnSkills, teachSkills), [learnSkills, teachSkills]);
  
  // Video Player States & Refs
  const [activeVideoPeer, setActiveVideoPeer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  // Close the profile dropdown when clicking outside of it
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dynamic Calendar Logic
  const currentMonthIndex = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonthIndex + 1, 1));
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfWeek = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex);
  const firstDayOfWeek = getFirstDayOfWeek(currentYear, currentMonthIndex);

  const flashcards = [
    {
      step: 'Step 01',
      title: 'Create Your Skill Profile 👤',
      desc: 'Sign up with your campus email (@vignan.ac.in). Choose what skills you can teach and what topics you want to learn.',
      icon: '🚀',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80'
    },
    {
      step: 'Step 02',
      title: 'Discover & Match Peers 🤝',
      desc: 'Browse students on campus. Our smart match algorithm pairs you with students who want to learn what you teach and vice-versa.',
      icon: '🔎',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80'
    },
    {
      step: 'Step 03',
      title: 'Schedule & Swap Skills 📅',
      desc: 'Book interactive peer sessions using our built-in interactive calendar and chat directly with your mentors.',
      icon: '💡',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const handleFlashcardScroll = (e) => {
    if (e.deltaY > 0) {
      if (cardIndex < flashcards.length - 1) setCardIndex(cardIndex + 1);
    } else {
      if (cardIndex > 0) setCardIndex(cardIndex - 1);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);
    }
  };

  // ── UPDATED AUTH LOGIC — now branches for Student vs Admin ──
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    // ── ADMIN LOGIN PATH ──
    if (authRole === 'admin') {
      const inputEmail = formData.email.trim().toLowerCase();
      const inputPassword = formData.password;

      if (inputEmail === ADMIN_CREDENTIALS.email && inputPassword === ADMIN_CREDENTIALS.password) {
        setAuthError('');
        setFormData({ ...formData, password: '' });
        setCurrentStep('admin');
      } else {
        setAuthError('Invalid admin email or password.');
      }
      return;
    }

    // ── STUDENT SIGNUP / LOGIN PATH ──
    // 1. Email Domain Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@vignan\.ac\.in$/i;
    if (!emailRegex.test(formData.email.trim())) {
      setAuthError('Email must end with @vignan.ac.in (e.g. 241FA07084@vignan.ac.in).');
      return;
    }

    // 2. Password Strength Validation
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setAuthError('Password must be at least 8 characters long with letters, numbers, and a special character.');
      return;
    }

    if (authTab === 'signup') {
      const nameRegex = /^[a-zA-Z]+(\s+[a-zA-Z]+)+$/;
      if (!nameRegex.test(formData.fullName.trim())) {
        setAuthError('Please enter full name (First & Last Name).');
        return;
      }
      
      // Save created account details into registeredUser state
      setRegisteredUser({
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });
localStorage.setItem('registeredUser', JSON.stringify({
  fullName: formData.fullName.trim(),
  email: formData.email.trim().toLowerCase(),
  password: formData.password
}));
      setCurrentStep('onboarding');
      setOnboardStep(1);
    } else {
      // LOGIN VALIDATION LOGIC
      if (!registeredUser) {
        setAuthError('No registered account found. Please Sign Up first.');
        return;
      }

      const inputEmail = formData.email.trim().toLowerCase();
      const inputPassword = formData.password;

      // Check if entering correct email AND password
      if (inputEmail === registeredUser.email && inputPassword === registeredUser.password) {
        setAuthError('');
        setCurrentStep('dashboard');
      } else {
        setAuthError('Incorrect email or password. Please try again.');
      }
    }
  };

  const toggleTeachSkill = (skill) => {
    if (teachSkills.includes(skill)) {
      setTeachSkills(teachSkills.filter(s => s !== skill));
    } else {
      setTeachSkills([...teachSkills, skill]);
    }
  };

  const toggleLearnSkill = (skill) => {
    if (learnSkills.includes(skill)) {
      setLearnSkills(learnSkills.filter(s => s !== skill));
    } else {
      setLearnSkills([...learnSkills, skill]);
    }
  };

  const addCustomTeachSkill = () => {
    if (customTeachInput.trim() && !teachSkills.includes(customTeachInput.trim())) {
      setTeachSkills([...teachSkills, customTeachInput.trim()]);
      setCustomTeachInput('');
    }
  };
  const addCustomLearnSkill = () => {
    if (customLearnInput.trim() && !learnSkills.includes(customLearnInput.trim())) {
      setLearnSkills([...learnSkills, customLearnInput.trim()]);
      setCustomLearnInput('');
    }
  };

  const handleSaveSessionCalendar = (e) => {
    e.preventDefault();
    if (!sessionTitle.trim() || !sessionMentor.trim()) return;
    const dateParsed = new Date(sessionFullDate);
    const dayNum = dateParsed.getDate() || selectedDate;
    if (editingSessionId) {
      setSessions(sessions.map(s => s.id === editingSessionId ? {
        ...s,
        title: sessionTitle,
        time: sessionTime,
        mentor: sessionMentor,
        date: dayNum,
        fullDate: sessionFullDate,
        status: calendarSubTab
      } : s));
      setEditingSessionId(null);
    } else {
      const newSession = {
        id: Date.now(),
        title: sessionTitle,
        time: sessionTime,
        mentor: sessionMentor,
        date: dayNum,
        fullDate: sessionFullDate,
        status: 'upcoming'
      };
      setSessions([...sessions, newSession]);
    }
    setSessionTitle('');
    setSessionMentor('');
    setShowCalendarAddModal(false);
  };

  const handleEditClickCalendar = (session) => {
    setEditingSessionId(session.id);
    setSessionTitle(session.title);
    setSessionTime(session.time);
    setSessionMentor(session.mentor);
    setSessionFullDate(session.fullDate || `${currentYear}-${(currentMonthIndex + 1).toString().padStart(2, '0')}-${session.date < 10 ? '0' + session.date : session.date}`);
    setShowCalendarAddModal(true);
  };

  const handleDeleteSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputmessage || inputmessage.trim() === '') return;

        const chatUser = activeChatUser;
        const userMsg = {
            id: Date.now(),
            sender: formData.fullName || 'You',
            text: inputmessage,
            isUser: true
        };

        setMessages(prev => {
            const updated = {
                ...prev,
                [chatUser]: [...(prev[chatUser] || []), userMsg]
            };
            localStorage.setItem('chatMessages', JSON.stringify(updated));
            return updated;
        });
        setInputmessage('');

        // Simulate the mentor actually replying so the conversation feels two-way
        setTimeout(() => {
            setMessages(prev => {
                const updated = {
                    ...prev,
                    [chatUser]: [
                        ...(prev[chatUser] || []),
                        {
                            id: Date.now() + 1,
                            sender: chatUser,
                            text: getAutoReply(chatUser),
                            isUser: false
                        }
                    ]
                };
                localStorage.setItem('chatMessages', JSON.stringify(updated));
                return updated;
            });
        }, 1100);
    };

  const toggleSaveProfile = (profile) => {
    if (savedProfiles.some(p => p.id === profile.id)) {
      setSavedProfiles(savedProfiles.filter(p => p.id !== profile.id));
    } else {
      setSavedProfiles([...savedProfiles, profile]);
    }
  };

  // Video Controls Logic (kept for potential future use with a custom player)
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind10 = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const handleForward10 = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (timeInSec) => {
    if (isNaN(timeInSec)) return "00:00";
    const min = Math.floor(timeInSec / 60);
    const sec = Math.floor(timeInSec % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const openVideoModal = (peer) => {
    setActiveVideoPeer(peer);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const closeVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveVideoPeer(null);
    setIsPlaying(false);
  };

  // Currently active chat partner's full profile (fixes the chat header/thread not updating)
  const currentChatMatch = matches.find(m => m.name === activeChatUser) || ALL_PEERS.find(p => p.name === activeChatUser) || matches[0] || ALL_PEERS[0];
  // Chat list = all matches + anyone you already have a conversation with
  const chatPeers = [...matches, ...ALL_PEERS.filter(p => !matches.some(m => m.id === p.id) && (messages[p.name] || []).length > 0)];

  const todaySessions = sessions.filter(s => s.date === selectedDate);
  const futureSessions = sessions.filter(s => s.date >= selectedDate).sort((a, b) => a.date - b.date);
  const nextSession = futureSessions.length > 0 ? futureSessions[0] : null;
  const filteredCalendarSessions = sessions.filter(s => {
    if (calendarSubTab === 'upcoming') return s.date >= selectedDate;
    if (calendarSubTab === 'requests') return s.status === 'requests';
    if (calendarSubTab === 'history') return s.date < selectedDate;
    return true;
  });

  const pageBg = 'linear-gradient(135deg, #E2F1E7 0%, #E8EFFA 40%, #EFE8FA 70%, #F5E8EF 100%)';
  const glassCard = {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)'
  };

  const Navbar = () => (
    <nav style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      padding: '24px 60px',
      position: 'relative',
      zIndex: 10
    }}>
      <div onClick={() => { setCurrentStep('landing'); setActiveDropdown(null); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', fontWeight: '800', cursor: 'pointer', color: '#1E293B' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' }}>
          <img src={LOGO_URL} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <span>SkillSwap<span style={{ color: '#5B9B8B' }}>+</span></span>
      </div>
      <div style={{ justifySelf: 'center', position: 'relative' }}>
        <button 
          onClick={() => setActiveDropdown(activeDropdown === 'product' ? null : 'product')}
          style={{ background: 'none', border: 'none', color: '#334155', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          Product <span>{activeDropdown === 'product' ? '▲' : '▼'}</span>
        </button>
        {activeDropdown === 'product' && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '280px',
            ...glassCard,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '12px',
            zIndex: 100
          }}>
            <div onClick={() => { setCurrentStep('features'); setActiveDropdown(null); }} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px', borderRadius: '10px', cursor: 'pointer', backgroundColor: 'rgba(130, 179, 167, 0.1)' }}>
              <span style={{ fontSize: '18px', backgroundColor: 'rgba(130, 179, 167, 0.2)', padding: '8px', borderRadius: '8px' }}>⚡</span>
              <div>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#1E293B' }}>Features</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>Discover SkillSwap features</p>
              </div>
            </div>
            <div onClick={() => { setCurrentStep('how-it-works'); setActiveDropdown(null); }} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px', borderRadius: '10px', cursor: 'pointer', backgroundColor: 'rgba(130, 179, 167, 0.1)' }}>
              <span style={{ fontSize: '18px', backgroundColor: 'rgba(130, 179, 167, 0.2)', padding: '8px', borderRadius: '8px' }}>🎯</span>
              <div>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#1E293B' }}>How it works</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>Interactive flashcard stack</p>
              </div>
            </div>
            <div onClick={() => { setCurrentStep('pricing'); setActiveDropdown(null); }} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px', borderRadius: '10px', cursor: 'pointer', backgroundColor: 'rgba(130, 179, 167, 0.1)' }}>
              <span style={{ fontSize: '18px', backgroundColor: 'rgba(130, 179, 167, 0.2)', padding: '8px', borderRadius: '8px' }}>💳</span>
              <div>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#1E293B' }}>Pricing</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>100% Free for Campus</p>
              </div>
            </div>
            <div onClick={() => { setCurrentStep('community'); setActiveDropdown(null); }} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px', borderRadius: '10px', cursor: 'pointer', backgroundColor: 'rgba(130, 179, 167, 0.1)' }}>
              <span style={{ fontSize: '18px', backgroundColor: 'rgba(130, 179, 167, 0.2)', padding: '8px', borderRadius: '8px' }}>👥</span>
              <div>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#1E293B' }}>Community</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>Peer network & events</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div></div>
    </nav>
  );

  return (
    <div style={{ minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: pageBg, color: '#1E293B' }}>
      
      {/* LANDING PAGE */}
      {currentStep === 'landing' && (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px 80px 20px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '64px', fontWeight: '900', lineHeight: '1.1', marginBottom: '24px', color: '#0F172A' }}>
              Learn anything.<br />
              <span style={{ background: 'linear-gradient(to right, #5B9B8B, #6B9AC4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Teach what you love.</span>
            </h1>
            <p style={{ fontSize: '18px', color: '#475569', maxWidth: '680px', lineHeight: '1.6', marginBottom: '36px' }}>
              A peer-to-peer campus platform where students exchange skills instead of money. Real-time matching, peer learning, and connect with fellow creators.
            </p>
            <button onClick={() => { setAuthRole('student'); setAuthTab('signup'); setCurrentStep('auth'); }} style={{ backgroundColor: '#82B3A7', color: '#FFFFFF', border: 'none', padding: '16px 38px', borderRadius: '30px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(130, 179, 167, 0.4)' }}>
              Get started
            </button>
            
          </div>
        </div>
      )}

      {/* FEATURES PAGE */}
      {currentStep === 'features' && (
        <div style={{ minHeight: '100vh' }}>
          <Navbar />
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 80px 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#1E293B', marginBottom: '16px' }}>Discover Everything SkillSwap Can Do</h1>
              <p style={{ fontSize: '18px', color: '#64748B', maxWidth: '700px', margin: '0 auto' }}>Empowering students to connect, teach, and learn seamlessly through smart matching, dynamic scheduling, and campus network tools.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              <div style={{ ...glassCard, borderRadius: '24px', padding: '32px' }}>
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=80" alt="Peer Matching" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '16px', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '10px', color: '#0F172A' }}>Smart Peer Matching</h3>
                <p style={{ color: '#64748B', lineHeight: '1.6', fontSize: '14px' }}>Find peers based on exact skill matches—whether you want to master Python or teach UI/UX Design.</p>
              </div>
              <div style={{ ...glassCard, borderRadius: '24px', padding: '32px' }}>
                <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&auto=format&fit=crop&q=80" alt="Calendar Scheduling" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '16px', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '10px', color: '#0F172A' }}>Interactive Calendar</h3>
                <p style={{ color: '#64748B', lineHeight: '1.6', fontSize: '14px' }}>Book available peer learning slots seamlessly with automated notifications and calendar sync.</p>
              </div>
              <div style={{ ...glassCard, borderRadius: '24px', padding: '32px' }}>
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=80" alt="Live Chat" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '16px', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '10px', color: '#0F172A' }}>Direct Messaging</h3>
                <p style={{ color: '#64748B', lineHeight: '1.6', fontSize: '14px' }}>Communicate directly with your study partners, share study resources, and plan sessions.</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button onClick={() => { setAuthRole('student'); setCurrentStep('auth'); }} style={{ backgroundColor: '#82B3A7', color: '#FFF', border: 'none', padding: '16px 40px', borderRadius: '30px', fontWeight: '800', fontSize: '16px', cursor: 'pointer' }}>Start Exploring Now →</button>
            </div>
          </div>
        </div>
      )}

      {/* HOW IT WORKS PAGE */}
      {currentStep === 'how-it-works' && (
        <div style={{ minHeight: '100vh' }}>
          <Navbar />
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#0F172A', marginBottom: '10px' }}>How SkillSwap Works</h1>
            <p style={{ color: '#64748B', fontSize: '15px', marginBottom: '40px' }}>Scroll or click buttons to flip through the flashcard stack below!</p>
            <div onWheel={handleFlashcardScroll} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center', ...glassCard, borderRadius: '28px', padding: '40px' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ backgroundColor: '#82B3A7', color: '#FFF', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>{flashcards[cardIndex].step}</span>
                <h2 style={{ fontSize: '32px', fontWeight: '900', margin: '16px 0', color: '#0F172A' }}>{flashcards[cardIndex].title}</h2>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7', marginBottom: '28px' }}>{flashcards[cardIndex].desc}</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button disabled={cardIndex === 0} onClick={() => setCardIndex(cardIndex - 1)} style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #82B3A7', backgroundColor: 'transparent', color: '#1E293B', fontWeight: '700', cursor: cardIndex === 0 ? 'not-allowed' : 'pointer', opacity: cardIndex === 0 ? 0.4 : 1 }}>← Previous</button>
                  <button disabled={cardIndex === flashcards.length - 1} onClick={() => setCardIndex(cardIndex + 1)} style={{ padding: '10px 20px', borderRadius: '12px', backgroundColor: '#82B3A7', border: 'none', color: '#FFF', fontWeight: '700', cursor: cardIndex === flashcards.length - 1 ? 'not-allowed' : 'pointer', opacity: cardIndex === flashcards.length - 1 ? 0.4 : 1 }}>Next Card →</button>
                </div>
              </div>
              <div style={{ position: 'relative', height: '320px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {flashcards.map((card, idx) => {
                  const offset = idx - cardIndex;
                  return (
                    <div key={idx} onClick={() => setCardIndex(idx)} style={{ position: 'absolute', width: '100%', height: '280px', borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(130, 179, 167, 0.6)', transition: 'all 0.4s ease', transform: `translateY(${offset * 15}px) scale(${1 - Math.abs(offset) * 0.08})`, zIndex: 10 - Math.abs(offset), opacity: offset < 0 ? 0.3 : (offset === 0 ? 1 : 0.6), cursor: 'pointer' }}>
                      <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.8), transparent)', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
                        <p style={{ margin: 0, fontWeight: '800', fontSize: '14px', color: '#FFF' }}>{card.step}: {card.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRICING PAGE */}
      {currentStep === 'pricing' && (
        <div style={{ minHeight: '100vh' }}>
          <Navbar />
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '52px', fontWeight: '900', color: '#0F172A', marginBottom: '16px' }}>100% Free For Campus Students</h1>
            <p style={{ fontSize: '18px', color: '#64748B', marginBottom: '50px' }}>No subscriptions. No hidden fees. SkillSwap relies on collaborative skill exchanges.</p>
            <div style={{ ...glassCard, borderRadius: '32px', padding: '50px' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', backgroundColor: 'rgba(130, 179, 167, 0.2)', color: '#1B4D43', padding: '8px 18px', borderRadius: '20px' }}>CAMPUS ACCESS PASS</span>
              <h2 style={{ fontSize: '64px', fontWeight: '900', margin: '24px 0 10px 0', color: '#0F172A' }}>$0 <span style={{ fontSize: '20px', color: '#64748B' }}>/ forever</span></h2>
              <p style={{ color: '#475569', marginBottom: '36px', fontSize: '16px' }}>Unlocked using your official university email domain (@vignan.ac.in).</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAlign: 'left', maxWidth: '600px', margin: '0 auto 40px auto', color: '#334155' }}>
                <div>✅ Unlimited Skill Exchanges</div>
                <div>✅ Unlimited Peer Match Requests</div>
                <div>✅ Full Interactive Calendar Sync</div>
                <div>✅ Campus Peer Messaging</div>
              </div>
              <button onClick={() => { setAuthRole('student'); setCurrentStep('auth'); }} style={{ backgroundColor: '#82B3A7', color: '#FFF', border: 'none', padding: '16px 40px', borderRadius: '30px', fontWeight: '800', fontSize: '16px', cursor: 'pointer' }}>Claim Free Account →</button>
            </div>
          </div>
        </div>
      )}

      {/* COMMUNITY PAGE */}
      {currentStep === 'community' && (
        <div style={{ minHeight: '100vh' }}>
          <Navbar />
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#0F172A', marginBottom: '16px' }}>Campus Peer Community & Events</h1>
              <p style={{ color: '#64748B', fontSize: '16px' }}>Connect with study groups, join campus hackathons, and attend peer learning meetups.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div style={{ ...glassCard, borderRadius: '20px', padding: '24px' }}>
                <span style={{ fontSize: '28px' }}>🚀</span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '12px 0 8px 0', color: '#0F172A' }}>Weekend Hackathons</h3>
                <p style={{ color: '#64748B', fontSize: '13px', lineHeight: '1.6' }}>Team up with developers, UI designers, and AI enthusiasts to build campus projects together.</p>
              </div>
              <div style={{ ...glassCard, borderRadius: '20px', padding: '24px' }}>
                <span style={{ fontSize: '28px' }}>☕</span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '12px 0 8px 0', color: '#0F172A' }}>Campus Code Circles</h3>
                <p style={{ color: '#64748B', fontSize: '13px', lineHeight: '1.6' }}>Weekly physical meetup groups at campus library for hands-on peer problem solving.</p>
              </div>
              <div style={{ ...glassCard, borderRadius: '20px', padding: '24px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', overflow: 'hidden', display: 'inline-block' }}>
                  <img src={LOGO_URL} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '12px 0 8px 0', color: '#0F172A' }}>Senior Mentor Network</h3>
                <p style={{ color: '#64748B', fontSize: '13px', lineHeight: '1.6' }}>Get guidance on internships, placement prep, and projects directly from senior peers.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTH PAGE — now supports Student and Admin roles */}
      {currentStep === 'auth' && (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ maxWidth: '1050px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' }}>
                  <img src={LOGO_URL} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A' }}>SkillSwap<span style={{ color: '#5B9B8B' }}>+</span></span>
              </div>
              <h1 style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1.15', marginBottom: '16px', color: '#0F172A' }}>
                {authRole === 'admin' ? <>Admin <span style={{ color: '#5B9B8B' }}>control center.</span></> : <>Your campus, <span style={{ color: '#5B9B8B' }}>unlocked.</span></>}
              </h1>
              <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.6' }}>
                {authRole === 'admin'
                  ? 'Sign in with your admin credentials to manage users, skills, matches, and moderation for SkillSwap.'
                  : 'Connect with fellow students to swap skills, learn React, Python, UI Design, and schedule peer learning sessions on campus.'}
              </p>
              <button onClick={() => setCurrentStep('landing')} style={{ background: 'none', border: 'none', color: '#5B9B8B', fontWeight: '700', cursor: 'pointer', marginTop: '20px', fontSize: '14px' }}>← Back to Home</button>
            </div>
            <div style={{ ...glassCard, borderRadius: '24px', padding: '36px' }}>

              {/* Student / Admin role switch */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '18px' }}>
                <button
                  type="button"
                  onClick={() => { setAuthRole('student'); setAuthError(''); setFormData({ ...formData, password: '' }); }}
                  style={{ background: 'none', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', padding: '4px 10px', borderRadius: '8px', color: authRole === 'student' ? '#1B4D43' : '#94A3B8', backgroundColor: authRole === 'student' ? '#D4EBE6' : 'transparent' }}
                >
                  🎓 Student
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthRole('admin'); setAuthError(''); setFormData({ ...formData, email: '', password: '' }); }}
                  style={{ background: 'none', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', padding: '4px 10px', borderRadius: '8px', color: authRole === 'admin' ? '#1B4D43' : '#94A3B8', backgroundColor: authRole === 'admin' ? '#D4EBE6' : 'transparent' }}
                >
                  🛡️ Admin
                </button>
              </div>

              {authRole === 'student' && (
                <div style={{ display: 'flex', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '12px', padding: '4px', marginBottom: '24px', border: '1px solid #E2E8F0' }}>
                  <button type="button" onClick={() => { setAuthTab('signup'); setAuthError(''); }} style={{ flex: 1, padding: '10px 0', border: 'none', borderRadius: '8px', backgroundColor: authTab === 'signup' ? '#82B3A7' : 'transparent', color: authTab === 'signup' ? '#FFF' : '#64748B', fontWeight: '700', cursor: 'pointer' }}>Sign up</button>
                  <button type="button" onClick={() => { setAuthTab('login'); setAuthError(''); }} style={{ flex: 1, padding: '10px 0', border: 'none', borderRadius: '8px', backgroundColor: authTab === 'login' ? '#82B3A7' : 'transparent', color: authTab === 'login' ? '#FFF' : '#64748B', fontWeight: '700', cursor: 'pointer' }}>Log in</button>
                </div>
              )}

              {authRole === 'admin' && (
                <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1E40AF', padding: '10px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', marginBottom: '18px' }}>
                  🛡️ Admin access is provisioned — there's no admin sign-up, just log in below.
                </div>
              )}

              {authError && (
                <div style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '12px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', marginBottom: '18px' }}>
                  ⚠️ {authError}
                </div>
              )}
              <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {authRole === 'student' && authTab === 'signup' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: '#334155' }}>Full Name</label>
                    <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} placeholder="e.g. Bapathu Indhu" required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', boxSizing: 'border-box' }} />
                  </div>
                )}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: '#334155' }}>
                    {authRole === 'admin' ? 'Admin Email' : 'Campus Email (@vignan.ac.in)'}
                  </label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder={authRole === 'admin' ? 'admin@skillswap.com' : '241FA07084@vignan.ac.in'} required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', boxSizing: 'border-box' }} />
                </div>
                {authRole === 'student' && authTab === 'signup' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: '#334155' }}>Graduation Year</label>
                    <select value={formData.gradYear} onChange={(e) => setFormData({...formData, gradYear: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', boxSizing: 'border-box' }}>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                  </div>
                )}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: '#334155' }}>Password</label>
                  <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder={authRole === 'admin' ? 'Admin password' : 'e.g. Indhu@2026'} required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" style={{ backgroundColor: '#82B3A7', color: '#FFFFFF', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', marginTop: '10px' }}>
                  {authRole === 'admin' ? 'Log In to Admin Panel →' : (authTab === 'signup' ? 'Create Account & Continue →' : 'Log In →')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ONBOARDING FLOW */}
      {currentStep === 'onboarding' && (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ ...glassCard, borderRadius: '24px', width: '100%', maxWidth: '640px', padding: '40px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
              {[1, 2, 3].map((step) => (
                <div key={step} style={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: step <= onboardStep ? '#82B3A7' : '#E2E8F0' }} />
              ))}
            </div>
            {onboardStep === 1 && (
              <div>
                <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  What skills can you teach? 
                  <span style={{ width: '28px', height: '28px', borderRadius: '6px', overflow: 'hidden', display: 'inline-block' }}>
                    <img src={LOGO_URL} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </span>
                </h2>
                <p style={{ color: '#64748B', marginBottom: '24px', fontSize: '14px' }}>Select skills you are comfortable sharing with campus peers.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                  {SUGGESTED_SKILLS.map((skill) => {
                    const isSelected = teachSkills.includes(skill);
                    return (
                      <button key={skill} type="button" onClick={() => toggleTeachSkill(skill)} style={{ padding: '8px 16px', borderRadius: '20px', border: isSelected ? '2px solid #82B3A7' : '1px solid #CBD5E1', backgroundColor: isSelected ? '#D4EBE6' : '#FFF', color: isSelected ? '#1B4D43' : '#475569', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                        {isSelected ? '✓ ' : '+ '}{skill}
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                  <input type="text" placeholder="Add custom skill..." value={customTeachInput} onChange={(e) => setCustomTeachInput(e.target.value)} style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', fontSize: '13px' }} />
                  <button type="button" onClick={addCustomTeachSkill} style={{ backgroundColor: '#82B3A7', color: '#FFF', border: 'none', padding: '10px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Add</button>
                </div>
                <button onClick={() => setOnboardStep(2)} style={{ width: '100%', backgroundColor: '#82B3A7', color: '#FFF', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Next: Skills to Learn →</button>
              </div>
            )}
            {onboardStep === 2 && (
              <div>
                <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', margin: '0 0 8px 0' }}>What do you want to learn? 🚀</h2>
                <p style={{ color: '#64748B', marginBottom: '24px', fontSize: '14px' }}>Pick skills you want to master through peer sessions.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                  {SUGGESTED_SKILLS.map((skill) => {
                    const isSelected = learnSkills.includes(skill);
                    return (
                      <button key={skill} type="button" onClick={() => toggleLearnSkill(skill)} style={{ padding: '8px 16px', borderRadius: '20px', border: isSelected ? '2px solid #6B9AC4' : '1px solid #CBD5E1', backgroundColor: isSelected ? '#DCE7F5' : '#FFF', color: isSelected ? '#1E3A8A' : '#475569', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                        {isSelected ? '✓ ' : '+ '}{skill}
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                  <input type="text" placeholder="Add custom skill..." value={customLearnInput} onChange={(e) => setCustomLearnInput(e.target.value)} style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', fontSize: '13px' }} />
                  <button type="button" onClick={addCustomLearnSkill} style={{ backgroundColor: '#6B9AC4', color: '#FFF', border: 'none', padding: '10px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Add</button>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setOnboardStep(1)} style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid #CBD5E1', color: '#475569', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>← Back</button>
                  <button onClick={() => setOnboardStep(3)} style={{ flex: 2, backgroundColor: '#82B3A7', color: '#FFF', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Next: Bio & Profile →</button>
                </div>
              </div>
            )}
            {onboardStep === 3 && (
              <div>
                <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', margin: '0 0 8px 0' }}>Tell peers about yourself ✍️</h2>
                <p style={{ color: '#64748B', marginBottom: '24px', fontSize: '14px' }}>Add a short bio to finish setting up your profile.</p>
                <textarea value={userBio} onChange={(e) => setUserBio(e.target.value)} rows="4" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', fontSize: '14px', boxSizing: 'border-box', marginBottom: '24px' }} />
                <button onClick={() => setCurrentStep('dashboard')} style={{ width: '100%', backgroundColor: '#82B3A7', color: '#FFF', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>Complete Setup & Go to Dashboard 🚀</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADMIN DASHBOARD — reached only via successful admin login above */}
      {currentStep === 'admin' && (
        <AdminDashboard
          adminUser={{ name: 'SkillSwap Admin', email: ADMIN_CREDENTIALS.email }}
          onLogout={() => {
            setAuthRole('student');
            setFormData({ ...formData, password: '' });
            setCurrentStep('landing');
          }}
        />
      )}

      {/* DASHBOARD MAIN APP */}
      {currentStep === 'dashboard' && (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          
          {/* LEFT SIDEBAR */}
          <aside style={{ width: '230px', backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(16px)', borderRight: '1px solid rgba(255, 255, 255, 0.7)', padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '20px', fontWeight: '800', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1E293B' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                <img src={LOGO_URL} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span>SkillSwap</span>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'matches', label: 'Matches', icon: '🤝' },
                { id: 'chat', label: 'Chat', icon: '💬' },
                { id: 'calendar', label: 'Calendar', icon: '📅' },
                { id: 'progress', label: 'Progress', icon: '📈' },
                { id: 'community', label: 'Community', icon: '👥' },
              ].map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setProfileDropdownOpen(false); }}
                    style={{
                      textAlign: 'left',
                      padding: '12px 18px',
                      borderRadius: '16px',
                      border: 'none',
                      backgroundColor: isActive ? '#82B3A7' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#475569',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.2s'
                    }}>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            
            {/* TOP HEADER BAR */}
            <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid rgba(255, 255, 255, 0.7)', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                
                {/* Profile Dropdown Container */}
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                  <div 
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.7)', border: '1px solid #CBD5E1' }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#82B3A7', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontWeight: 'bold', color: '#FFF' }}>
                      {avatarImage ? <img src={avatarImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (formData.fullName ? formData.fullName[0].toUpperCase() : 'B')}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>{formData.fullName}</span>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>▼</span>
                  </div>
                  {profileDropdownOpen && (
                    <div style={{ position: 'absolute', top: '110%', right: 0, width: '180px', backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '8px 0', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', zIndex: 100 }}>
                      <button onClick={() => { setActiveTab('profile'); setProfileDropdownOpen(false); }} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', color: '#1E293B', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>👤 Profile</button>
          
                      <button onClick={() => { setActiveTab('saved'); setProfileDropdownOpen(false); }} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', color: '#1E293B', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>🔖 Saved Profiles</button>
                      <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '4px 0' }}></div>
                      <button onClick={() => { setProfileDropdownOpen(false); setFormData({ ...formData, password: '' }); setAuthRole('student'); setAuthTab('login'); setCurrentStep('auth'); }} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', color: '#E11D48', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>↳ Log Out</button>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* TAB CONTENTS */}
            <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
              
              {/* DASHBOARD TAB */}
              {activeTab === 'dashboard' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Activity Box */}
                    <div style={{ ...glassCard, borderRadius: '20px', padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Activity</h2>
                        <select 
                          value={activityTimeframe} 
                          onChange={(e) => setActivityTimeframe(e.target.value)}
                          style={{ 
                            fontSize: '12px', 
                            backgroundColor: 'rgba(255,255,255,0.8)', 
                            padding: '6px 12px', 
                            borderRadius: '12px', 
                            color: '#1B4D43', 
                            border: '1px solid #CBD5E1',
                            outline: 'none',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}>
                          <option value="Today">Today</option>
                          <option value="This Week">This Week</option>
                          <option value="This Month">This Month</option>
                        </select>
                      </div>
                      {todaySessions.length > 0 ? (
                        <div>
                          <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1B4D43', fontWeight: '700' }}>🎉 You have active sessions scheduled ({activityTimeframe})!</p>
                          {todaySessions.map(s => (
                            <div key={s.id} style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '12px 16px', borderRadius: '12px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E2E8F0' }}>
                              <div>
                                <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#1E293B' }}>{s.title}</p>
                                <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>{s.time} with {s.mentor}</p>
                              </div>
                              <button onClick={() => { setActiveTab('calendar'); handleEditClickCalendar(s); }} style={{ backgroundColor: '#82B3A7', border: 'none', color: '#FFF', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Edit in Calendar</button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                          <p style={{ margin: '0 0 8px 0', fontWeight: '700', fontSize: '15px', color: '#1E293B' }}>Ready for your first SkillSwap session?</p>
                          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#64748B' }}>Book a session to start tracking your activity.</p>
                          <button 
                            onClick={() => { setActiveTab('calendar'); setShowCalendarAddModal(true); }} 
                            style={{ backgroundColor: '#82B3A7', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: '700', cursor: 'pointer' }}>
                            Schedule a session
                          </button>
                        </div>
                      )}
                      {nextSession && (
                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B' }}>
                          📅 <strong>Next Upcoming Session:</strong> {nextSession.title} on {MONTHS[currentMonthIndex].substring(0, 3)} {nextSession.date} at {nextSession.time}
                        </div>
                      )}
                    </div>

                    {/* Matches Section */}
                    <div style={{ ...glassCard, borderRadius: '20px', padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Matches</h2>
                        <button onClick={() => setActiveTab('matches')} style={{ background: 'none', border: 'none', color: '#5B9B8B', fontSize: '12px', cursor: 'pointer' }}>see all</button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                        {matches.slice(0, 3).map((match) => (
                          <div key={match.id} style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '16px', padding: '16px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                            <img src={match.avatar} alt={match.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', marginBottom: '8px', border: '2px solid #82B3A7' }} />
                            <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#1E293B' }}>{match.name}</h3>
                            <p style={{ margin: '0 0 6px 0', fontSize: '10px', color: '#64748B' }}>Teaches:</p>
                            <span style={{ display: 'inline-block', backgroundColor: '#BCE3DC', color: '#1B4D43', padding: '4px 8px', borderRadius: '12px', fontSize: '10px', marginBottom: '10px', fontWeight: '600' }}>{match.teach}</span>
                            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '10px' }}>Match level: <strong style={{ color: '#1B4D43', display: 'block', fontSize: '14px' }}>{match.matchLevel}</strong></div>
                            <button 
                              onClick={() => openVideoModal(match)}
                              style={{ width: '100%', backgroundColor: '#6B9AC4', color: '#FFF', border: 'none', padding: '6px 10px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                            >
                              <span>▶</span> View Skill Videos
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: DYNAMIC CALENDAR */}
                  <div style={{ ...glassCard, borderRadius: '20px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <button onClick={handlePrevMonth} style={{ background: 'none', border: 'none', color: '#1E293B', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>&lt;</button>
                      <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{MONTHS[currentMonthIndex]} {currentYear}</h2>
                      <button onClick={handleNextMonth} style={{ background: 'none', border: 'none', color: '#1E293B', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>&gt;</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '11px', color: '#64748B', marginBottom: '10px' }}>
                      <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
                      {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                        <div key={`empty-${idx}`} style={{ padding: '8px' }}></div>
                      ))}
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((dateNum) => {
                        const isSelected = selectedDate === dateNum;
                        const hasSession = sessions.some(s => s.date === dateNum);
                        return (
                          <button
                            key={dateNum}
                            onClick={() => setSelectedDate(dateNum)}
                            style={{
                              padding: '8px 0',
                              borderRadius: '50%',
                              border: 'none',
                              backgroundColor: isSelected ? '#82B3A7' : 'transparent',
                              color: isSelected ? '#FFFFFF' : '#1E293B',
                              fontWeight: isSelected ? '700' : 'normal',
                              fontSize: '12px',
                              cursor: 'pointer',
                              position: 'relative'
                            }}>
                            {dateNum}
                            {hasSession && !isSelected && (
                              <span style={{ position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#82B3A7' }} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '700' }}>{MONTHS[currentMonthIndex].substring(0, 3)} {selectedDate} Status</span>
                      </div>
                      <div>
                        {sessions.filter(s => s.date === selectedDate).length === 0 ? (
                          <div style={{ textAlign: 'center', padding: '20px 0', color: '#64748B', fontSize: '12px' }}>
                            <div style={{ fontSize: '24px', marginBottom: '4px' }}>📅</div>
                            No lessons on this day
                          </div>
                        ) : (
                          sessions.filter(s => s.date === selectedDate).map(s => (
                            <div key={s.id} style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '10px 12px', borderRadius: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E2E8F0' }}>
                              <div>
                                <p style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: '#1E293B' }}>{s.title}</p>
                                <p style={{ margin: 0, fontSize: '10px', color: '#64748B' }}>{s.time} • {s.mentor}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MATCHES TAB */}
              {activeTab === 'matches' && (
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: '#0F172A' }}>Campus Peer Matches</h1>
                  <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '28px' }}>Students paired with your skill profile. Save profiles or schedule learning sessions directly.</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {matches.map((match) => {
                      const isSaved = savedProfiles.some(p => p.id === match.id);
                      return (
                        <div key={match.id} style={{ ...glassCard, borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <img src={match.avatar} alt={match.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #82B3A7' }} />
                            <div>
                              <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>{match.name}</h3>
                              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>{match.role}</p>
                              <span title={match.matchInfo} style={{ display: 'inline-block', backgroundColor: '#BCE3DC', color: '#1B4D43', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', marginTop: '6px' }}>
                                Match {match.matchLevel}
                              </span>
                            </div>
                          </div>
                          
                          <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>{match.bio}</p>
                          
                          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: '10px 14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px' }}>Can Teach You:</div>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#1B4D43' }}>{match.teach}</div>
                          </div>

                          <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                            <button 
                              onClick={() => openVideoModal(match)} 
                              style={{ flex: 1, backgroundColor: '#6B9AC4', color: '#FFF', border: 'none', padding: '10px', borderRadius: '12px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                              <span>▶</span> Demo Video
                            </button>
                            <button 
                              onClick={() => toggleSaveProfile(match)} 
                              style={{ backgroundColor: isSaved ? '#FEE2E2' : 'transparent', border: '1px solid #CBD5E1', color: isSaved ? '#991B1B' : '#475569', padding: '10px 14px', borderRadius: '12px', cursor: 'pointer', fontSize: '12px' }}>
                              {isSaved ? '❤️ Saved' : '🤍 Save'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CHAT TAB */}
              {activeTab === 'chat' && (
                <div style={{ maxWidth: '900px', margin: '0 auto', height: 'calc(100vh - 160px)', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px' }}>
                  <div style={{ ...glassCard, borderRadius: '20px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>Messages</h3>
                    {chatPeers.map(m => (
                 <div 
  key={m.id} 
  onClick={() => setActiveChatUser(m.name)}
  style={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', padding: '8px', borderRadius: '10px', background: activeChatUser === m.name ? 'rgba(130, 179, 167, 0.2)' : 'transparent' }}
>
                 <img src={m.avatar} alt={m.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <p style={{ margin: 0, fontWeight: '700', fontSize: '13px', color: '#0F172A' }}>{m.name}</p>
                          <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>{m.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ ...glassCard, borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ paddingBottom: '12px', borderBottom: '1px solid #E2E8F0', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={currentChatMatch.avatar} alt={currentChatMatch.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{currentChatMatch.name}</h4>
                        <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>Online • {currentChatMatch.role}</p>
                      </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px' }}>
                    {(messages[activeChatUser] || []).length === 0 ? (
                      <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '12px', marginTop: '20px' }}>No messages yet. Say hi to {currentChatMatch.name}!</p>
                    ) : (
                      (messages[activeChatUser] || []).map(msg => (
                        <div key={msg.id} style={{ alignSelf: msg.isUser ? 'flex-end' : 'flex-start', maxWidth: '70%', backgroundColor: msg.isUser ? '#82B3A7' : '#FFFFFF', color: msg.isUser ? '#FFFFFF' : '#1E293B', padding: '10px 16px', borderRadius: '16px', fontSize: '13px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
                          {msg.text}
                        </div>
                      ))
                    )}
                    </div>

                    <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
                      <input 

  type="text"
  placeholder={`Message ${currentChatMatch.name}...`}
  value={inputmessage || ''}
  onChange={(e) => setInputmessage(e.target.value)}
  style={{ flex: 1, padding: '12px 16px', borderRadius: '20px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', fontSize: '13px' }}
/>
                      <button type="submit" style={{ backgroundColor: '#82B3A7', color: '#FFF', border: 'none', padding: '0 20px', borderRadius: '20px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>Send</button>
                    </form>
                  </div>
                </div>
              )}

              {/* CALENDAR TAB */}
              {activeTab === 'calendar' && (
                <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '32px', alignItems: 'start', maxWidth: '1100px', margin: '0 auto' }}>
                  
                  {/* Left Box */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ ...glassCard, borderRadius: '24px', padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '0 8px' }}>
                        <button onClick={handlePrevMonth} style={{ background: 'none', border: 'none', color: '#1E293B', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>&lt;</button>
                        <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{MONTHS[currentMonthIndex]} {currentYear}</h2>
                        <button onClick={handleNextMonth} style={{ background: 'none', border: 'none', color: '#1E293B', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>&gt;</button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '11px', color: '#64748B', marginBottom: '16px' }}>
                        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px 4px', textAlign: 'center' }}>
                        {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                          <div key={`empty-${idx}`} style={{ width: '36px', height: '36px' }}></div>
                        ))}
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((dateNum) => {
                          const isSelected = selectedDate === dateNum;
                          return (
                            <button
                              key={dateNum}
                              onClick={() => setSelectedDate(dateNum)}
                              style={{
                                width: '36px',
                                height: '36px',
                                margin: '0 auto',
                                borderRadius: '50%',
                                border: 'none',
                                backgroundColor: isSelected ? '#82B3A7' : 'transparent',
                                color: isSelected ? '#FFFFFF' : '#1E293B',
                                fontWeight: isSelected ? '700' : 'normal',
                                fontSize: '13px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s'
                              }}>
                              {dateNum}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <button 
                      onClick={() => { setEditingSessionId(null); setSessionTitle(''); setSessionMentor(''); setShowCalendarAddModal(true); }}
                      style={{ 
                        width: '100%', 
                        backgroundColor: '#82B3A7', 
                        color: '#FFFFFF', 
                        border: 'none', 
                        padding: '14px', 
                        borderRadius: '30px', 
                        fontWeight: '700', 
                        fontSize: '14px', 
                        cursor: 'pointer',
                        boxShadow: '0 8px 20px rgba(130, 179, 167, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        gap: '8px'
                      }}>
                      <span>+</span> New session request
                    </button>
                  </div>

                  {/* Right Box */}
                  <div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                      {[
                        { id: 'upcoming', label: 'Upcoming' },
                        { id: 'requests', label: 'Requests' },
                        { id: 'history', label: 'History' }
                      ].map((tab) => {
                        const active = calendarSubTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setCalendarSubTab(tab.id)}
                            style={{
                              backgroundColor: active ? '#82B3A7' : 'transparent',
                              border: active ? 'none' : '1px solid #CBD5E1',
                              color: active ? '#FFFFFF' : '#64748B',
                              padding: '8px 22px',
                              borderRadius: '20px',
                              fontWeight: '700',
                              fontSize: '13px',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}>
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                    {showCalendarAddModal && (
                      <form onSubmit={handleSaveSessionCalendar} style={{ ...glassCard, padding: '20px', borderRadius: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <h4 style={{ margin: 0, color: '#0F172A', fontSize: '16px', fontWeight: '800' }}>
                          {editingSessionId ? 'Edit Session' : 'Request New Session'}
                        </h4>
                        
                        <div style={{ backgroundColor: '#D4EBE6', border: '1px solid #82B3A7', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', color: '#1B4D43' }}>
                          🔒 <em>You can only request sessions with matches. Select a teacher/mentor first.</em>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '4px', fontWeight: '700' }}>Select Teacher / Mentor *</label>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <select 
                              value={sessionMentor} 
                              onChange={(e) => setSessionMentor(e.target.value)} 
                              required 
                              style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', fontSize: '13px' }}
                            >
                              <option value="">-- Choose from Matches --</option>
                              {matches.map(m => (
                                <option key={m.id} value={m.name}>{m.name} ({m.teach})</option>
                              ))}
                            </select>
                            <button 
                              type="button" 
                              onClick={() => setActiveTab('matches')} 
                              style={{ backgroundColor: '#D4EBE6', border: '1px solid #82B3A7', color: '#1B4D43', borderRadius: '10px', padding: '0 12px', fontSize: '11px', cursor: 'pointer', fontWeight: '700' }}
                            >
                              Find matches 🔍
                            </button>
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '4px', fontWeight: '700' }}>Session Title *</label>
                          <input type="text" placeholder="e.g. Figma Basics & Wireframing" value={sessionTitle} onChange={(e) => setSessionTitle(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', fontSize: '13px', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '4px', fontWeight: '700' }}>Set Date</label>
                            <input 
                              type="date" 
                              value={sessionFullDate} 
                              onChange={(e) => setSessionFullDate(e.target.value)} 
                              required 
                              style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', fontSize: '13px', boxSizing: 'border-box' }} 
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '4px', fontWeight: '700' }}>Set Time</label>
                            <input type="text" placeholder="10:00 AM" value={sessionTime} onChange={(e) => setSessionTime(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', fontSize: '13px', boxSizing: 'border-box' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                          <button type="submit" disabled={!sessionMentor} style={{ flex: 2, backgroundColor: sessionMentor ? '#82B3A7' : '#94A3B8', color: '#FFF', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '700', cursor: sessionMentor ? 'pointer' : 'not-allowed' }}>
                            {editingSessionId ? 'Update Session' : 'Confirm & Send Request'}
                          </button>
                          <button type="button" onClick={() => setShowCalendarAddModal(false)} style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid #CBD5E1', color: '#64748B', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                      </form>
                    )}
                    {filteredCalendarSessions.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '60px 20px', ...glassCard, borderRadius: '20px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>No {calendarSubTab} sessions.</h3>
                        <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Click "+ New session request" button to book a slot.</p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {filteredCalendarSessions.map(s => (
                          <div key={s.id} style={{ ...glassCard, padding: '18px 22px', borderRadius: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <h4 style={{ margin: '0 0 4px 0', color: '#0F172A', fontSize: '15px', fontWeight: '700' }}>{s.title}</h4>
                              <p style={{ margin: 0, color: '#64748B', fontSize: '12px' }}>⏰ {s.time} • Partner: <strong>{s.mentor}</strong> ({s.fullDate || `${MONTHS[currentMonthIndex].substring(0, 3)} ${s.date}`})</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <button onClick={() => handleEditClickCalendar(s)} style={{ backgroundColor: '#D4EBE6', border: '1px solid #82B3A7', color: '#1B4D43', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Edit</button>
                              <button onClick={() => handleDeleteSession(s.id)} style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PROGRESS TAB */}
              {activeTab === 'progress' && (
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ ...glassCard, borderRadius: '20px', padding: '24px 32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Your level:</span>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>Newcomer</span> <span style={{ fontSize: '24px', fontWeight: '900', color: '#82B3A7' }}>1</span>
                        </div>
                      </div>
                      <div style={{ flex: 1, margin: '0 40px', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ width: '15%', height: '100%', backgroundColor: '#82B3A7' }}></div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '11px', color: '#64748B' }}></span>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                          <span style={{ fontSize: '24px', fontWeight: '900', color: '#82B3A7' }}>2</span> <span>Apprentice</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ ...glassCard, borderRadius: '20px', padding: '28px', minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Activity</h3>
                        <select style={{ backgroundColor: '#FFF', border: '1px solid #CBD5E1', color: '#64748B', padding: '4px 10px', borderRadius: '8px', fontSize: '12px' }}>
                          <option>All time</option>
                        </select>
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: '0 0 6px 0' }}>Ready for your first SkillSwap session?</p>
                        <p style={{ fontSize: '11px', color: '#64748B', margin: '0 0 16px 0', maxWidth: '220px', lineHeight: '1.4' }}>Book a session to start tracking your activity.</p>
                        <button onClick={() => setActiveTab('calendar')} style={{ backgroundColor: '#82B3A7', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>
                          Schedule a session
                        </button>
                      </div>
                      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>Hours spent on learning</div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>0h 0m</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Hours spent on teaching</div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>0h 0m</div>
                      </div>
                    </div>
                    <div style={{ ...glassCard, borderRadius: '20px', padding: '28px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Badges</h3>
                        <span style={{ fontSize: '12px', color: '#82B3A7', cursor: 'pointer' }}>see all</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#64748B' }}>No badges unlocked yet. Complete sessions to earn badges!</p>
                    </div>
                    <div style={{ ...glassCard, borderRadius: '20px', padding: '28px', gridColumn: 'span 2' }}>
                      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Next goals</h3>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', flex: 1 }}>
                          <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>🎯 Complete 1st Session</p>
                          <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>Reward</p>
                        </div>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', flex: 1 }}>
                          <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>💬 Swap 3 Messages</p>
                          <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>Reward</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#0F172A' }}>Edit Profile</h1>
                  <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '32px', alignItems: 'start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#82B3A7', color: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '48px', fontWeight: 'bold', overflow: 'hidden' }}>
                        {avatarImage ? <img src={avatarImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (formData.fullName ? formData.fullName[0].toUpperCase() : 'B')}
                      </div>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
                      <button onClick={() => fileInputRef.current.click()} style={{ backgroundColor: '#82B3A7', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                        Change Avatar
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>Your name</label>
                        <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>Profile description</label>
                        <textarea value={userBio} onChange={(e) => setUserBio(e.target.value)} rows="3" placeholder="Short bio" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>Skills you want to teach</label>
                        <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B' }}>
                          {teachSkills.map((s, i) => <option key={i}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>Skills you want to learn</label>
                        <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', color: '#1E293B' }}>
                          {learnSkills.map((s, i) => <option key={i}>{s}</option>)}
                        </select>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                        <button style={{ backgroundColor: '#82B3A7', color: '#FFF', border: 'none', padding: '12px 24px', borderRadius: '20px', fontWeight: '700', cursor: 'pointer' }}>Save Profile</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SAVED PROFILES TAB */}
              {activeTab === 'saved' && (
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', color: '#0F172A' }}>Your saved profiles</h1>
                  {savedProfiles.length === 0 ? (
                    <p style={{ color: '#64748B', fontSize: '14px' }}>You haven't saved anyone yet.</p>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                      {savedProfiles.map((p, i) => (
                        <div key={i} style={{ ...glassCard, padding: '16px', borderRadius: '16px', textAlign: 'center' }}>
                          <img src={p.avatar} alt={p.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', marginBottom: '8px' }} />
                          <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{p.name}</h3>
                          <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#64748B' }}>{p.role}</p>
                          <button onClick={() => toggleSaveProfile(p)} style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer' }}>Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* COMMUNITY TAB (was missing — sidebar nav pointed here but nothing rendered) */}
              {activeTab === 'community' && (
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: '#0F172A' }}>Campus Community</h1>
                  <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '28px' }}>Peer groups, campus events, and fellow SkillSwap members you can connect with.</p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                    <div style={{ ...glassCard, borderRadius: '20px', padding: '22px' }}>
                      <span style={{ fontSize: '26px' }}>🚀</span>
                      <h3 style={{ fontSize: '17px', fontWeight: '800', margin: '10px 0 6px 0', color: '#0F172A' }}>Weekend Hackathons</h3>
                      <p style={{ color: '#64748B', fontSize: '13px', lineHeight: '1.5' }}>Team up with developers, UI designers, and AI enthusiasts to build campus projects together.</p>
                    </div>
                    <div style={{ ...glassCard, borderRadius: '20px', padding: '22px' }}>
                      <span style={{ fontSize: '26px' }}>☕</span>
                      <h3 style={{ fontSize: '17px', fontWeight: '800', margin: '10px 0 6px 0', color: '#0F172A' }}>Campus Code Circles</h3>
                      <p style={{ color: '#64748B', fontSize: '13px', lineHeight: '1.5' }}>Weekly meetups at the campus library for hands-on peer problem solving.</p>
                    </div>
                    <div style={{ ...glassCard, borderRadius: '20px', padding: '22px' }}>
                      <span style={{ fontSize: '26px' }}>🎓</span>
                      <h3 style={{ fontSize: '17px', fontWeight: '800', margin: '10px 0 6px 0', color: '#0F172A' }}>Senior Mentor Network</h3>
                      <p style={{ color: '#64748B', fontSize: '13px', lineHeight: '1.5' }}>Get guidance on internships, placement prep, and projects directly from senior peers.</p>
                    </div>
                  </div>

                  <div style={{ ...glassCard, borderRadius: '20px', padding: '24px' }}>
                    <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Recently Active Peers</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {matches.slice(0, 3).map(m => (
                        <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.7)', padding: '12px 16px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={m.avatar} alt={m.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <p style={{ margin: 0, fontWeight: '700', fontSize: '13px', color: '#0F172A' }}>{m.name}</p>
                              <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>{m.role} • Teaches {m.teach}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => { setActiveChatUser(m.name); setActiveTab('chat'); }}
                            style={{ backgroundColor: '#82B3A7', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>
                            Message
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </main>
          </div>
        </div>
      )}

      {/* VIDEO MODAL OVERLAY — now plays a YouTube video via embedded iframe */}
      {activeVideoPeer && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFF',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '680px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={activeVideoPeer.avatar} alt={activeVideoPeer.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#0F172A' }}>{activeVideoPeer.name} ({activeVideoPeer.role})</p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>{activeVideoPeer.videoTitle}</p>
                </div>
              </div>
              <button onClick={closeVideoModal} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748B' }}>✕</button>
            </div>

            <div style={{ backgroundColor: '#000', position: 'relative' }}>
              {activeVideoPeer.youtubeId ? (
                <iframe
                  width="100%"
                  height="340"
                  style={{ display: 'block', border: 'none' }}
                  src={`https://www.youtube.com/embed/${activeVideoPeer.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideoPeer.videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div style={{ height: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', color: '#FFF' }}>
                  <span style={{ fontSize: '40px' }}>▶</span>
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent((activeVideoPeer.videoSkill || activeVideoPeer.teaches[0]) + ' animated explainer')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: '#82B3A7', color: '#FFF', padding: '10px 22px', borderRadius: '20px', fontWeight: '700', fontSize: '13px', textDecoration: 'none' }}
                  >
                    Watch animated {activeVideoPeer.videoSkill || activeVideoPeer.teaches[0]} videos on YouTube ↗
                  </a>
                </div>
              )}
            </div>

            <div style={{ padding: '14px 20px', backgroundColor: '#F8FAFC', textAlign: 'center' }}>
              <a
                href={activeVideoPeer.youtubeId ? `https://www.youtube.com/watch?v=${activeVideoPeer.youtubeId}` : `https://www.youtube.com/results?search_query=${encodeURIComponent((activeVideoPeer.videoSkill || activeVideoPeer.teaches[0]) + ' animated explainer')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '12px', color: '#6B9AC4', fontWeight: '700', textDecoration: 'none' }}
              >
                Watch on YouTube ↗
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
