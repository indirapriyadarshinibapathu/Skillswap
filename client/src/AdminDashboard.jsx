import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'chart.js/auto';
import logo from './assets/logo.jpeg';

const LOGO_URL = logo;

// ── Mock Admin Data ──────────────────────────────────────
const ADM_DB = {
  users: [
    { id: 1, name: 'Aarav Patel', email: 'aarav@vignan.ac.in', status: 'active', verified: true, skills: ['React', 'Node.js'], interests: ['Python', 'ML'], joined: '2024-11-15', color: '#82B3A7' },
    { id: 2, name: 'Priya Sharma', email: 'priya@vignan.ac.in', status: 'active', verified: true, skills: ['Python', 'Data Science'], interests: ['React', 'UX Design'], joined: '2024-11-20', color: '#6B9AC4' },
    { id: 3, name: 'Rohan Kumar', email: 'rohan@vignan.ac.in', status: 'active', verified: true, skills: ['Java', 'Spring Boot'], interests: ['Python', 'DevOps'], joined: '2024-12-01', color: '#B8A9C9' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@vignan.ac.in', status: 'inactive', verified: false, skills: ['UI Design', 'Figma'], interests: ['Frontend', 'React'], joined: '2024-12-10', color: '#E8916D' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@vignan.ac.in', status: 'active', verified: true, skills: ['DevOps', 'AWS'], interests: ['Kubernetes', 'Docker'], joined: '2025-01-05', color: '#5B9B8B' },
    { id: 6, name: 'Ananya Iyer', email: 'ananya@vignan.ac.in', status: 'active', verified: true, skills: ['Machine Learning', 'TensorFlow'], interests: ['Data Engineering', 'NLP'], joined: '2025-01-12', color: '#D4766E' },
    { id: 7, name: 'Kabir Joshi', email: 'kabir@vignan.ac.in', status: 'suspended', verified: true, skills: ['Photography', 'Video Editing'], interests: ['Graphic Design'], joined: '2025-01-20', color: '#0EA5E9' },
    { id: 8, name: 'Meera Nair', email: 'meera@vignan.ac.in', status: 'active', verified: false, skills: ['Content Writing', 'SEO'], interests: ['Digital Marketing'], joined: '2025-02-01', color: '#D946EF' },
    { id: 9, name: 'Arjun Das', email: 'arjun@vignan.ac.in', status: 'active', verified: true, skills: ['Flutter', 'Dart'], interests: ['iOS Dev', 'Swift'], joined: '2025-02-10', color: '#65A30D' },
    { id: 10, name: 'Divya Menon', email: 'divya@vignan.ac.in', status: 'active', verified: true, skills: ['React', 'TypeScript'], interests: ['Rust', 'WebAssembly'], joined: '2025-02-15', color: '#0891B2' }
  ],
  skills: [
    { id: 1, name: 'React', category: 'Frontend', status: 'approved', users: 45, submitted: '2024-10-01' },
    { id: 2, name: 'Python', category: 'Backend', status: 'approved', users: 62, submitted: '2024-10-01' },
    { id: 3, name: 'Node.js', category: 'Backend', status: 'approved', users: 38, submitted: '2024-10-05' },
    { id: 4, name: 'UI/UX Design', category: 'Design', status: 'approved', users: 29, submitted: '2024-10-10' },
    { id: 5, name: 'Machine Learning', category: 'Data Science', status: 'approved', users: 41, submitted: '2024-10-15' },
    { id: 6, name: 'DevOps', category: 'Infrastructure', status: 'approved', users: 22, submitted: '2024-11-01' },
    { id: 7, name: 'Flutter', category: 'Mobile', status: 'approved', users: 18, submitted: '2024-11-10' },
    { id: 8, name: 'Rust', category: 'Backend', status: 'pending', users: 3, submitted: '2025-02-20' },
    { id: 9, name: 'Blockchain', category: 'Emerging Tech', status: 'pending', users: 5, submitted: '2025-02-25' },
    { id: 10, name: 'Swift', category: 'Mobile', status: 'approved', users: 14, submitted: '2024-12-01' }
  ],
  matches: [
    { id: 1, learner: 'Aarav Patel', teacher: 'Priya Sharma', skillWanted: 'Python', skillOffered: 'React', status: 'active', date: '2025-01-15' },
    { id: 2, learner: 'Sneha Reddy', teacher: 'Divya Menon', skillWanted: 'React', skillOffered: 'UI Design', status: 'pending', date: '2025-02-01' },
    { id: 3, learner: 'Rohan Kumar', teacher: 'Vikram Singh', skillWanted: 'DevOps', skillOffered: 'Java', status: 'completed', date: '2024-12-20' },
    { id: 4, learner: 'Ananya Iyer', teacher: 'Priya Sharma', skillWanted: 'Data Science', skillOffered: 'ML', status: 'active', date: '2025-01-28' },
    { id: 5, learner: 'Arjun Das', teacher: 'Aarav Patel', skillWanted: 'React Native', skillOffered: 'Flutter', status: 'pending', date: '2025-02-18' },
    { id: 6, learner: 'Meera Nair', teacher: 'Sneha Reddy', skillWanted: 'Figma', skillOffered: 'SEO', status: 'active', date: '2025-02-10' }
  ],
  resources: [
    { id: 1, title: 'React Complete Guide', category: 'Frontend', type: 'Course', status: 'approved', featured: true, author: 'Aarav Patel', date: '2025-01-10', views: 234 },
    { id: 2, title: 'Python for Data Science', category: 'Data Science', type: 'Tutorial', status: 'approved', featured: true, author: 'Priya Sharma', date: '2025-01-15', views: 189 },
    { id: 3, title: 'DevOps Essentials', category: 'Infrastructure', type: 'Video', status: 'approved', featured: false, author: 'Vikram Singh', date: '2025-01-20', views: 156 },
    { id: 4, title: 'ML with TensorFlow', category: 'Data Science', type: 'Course', status: 'pending', featured: false, author: 'Ananya Iyer', date: '2025-02-05', views: 78 },
    { id: 5, title: 'Flutter Mobile Dev', category: 'Mobile', type: 'Tutorial', status: 'approved', featured: false, author: 'Arjun Das', date: '2025-02-08', views: 112 },
    { id: 6, title: 'Blockchain Basics', category: 'Emerging Tech', type: 'Article', status: 'pending', featured: false, author: 'Kabir Joshi', date: '2025-02-22', views: 45 }
  ],
  posts: [
    { id: 1, title: 'Best practices for React hooks?', category: 'Frontend', author: 'Aarav Patel', comments: 12, status: 'active', pinned: true, date: '2025-02-01' },
    { id: 2, title: 'Python vs R for data science', category: 'Data Science', author: 'Priya Sharma', comments: 24, status: 'active', pinned: false, date: '2025-02-05' },
    { id: 3, title: 'DevOps career roadmap 2025', category: 'Infrastructure', author: 'Vikram Singh', comments: 8, status: 'active', pinned: false, date: '2025-02-10' },
    { id: 4, title: 'Figma tips for beginners', category: 'Design', author: 'Sneha Reddy', comments: 15, status: 'reported', pinned: false, date: '2025-02-12' },
    { id: 5, title: 'ML project ideas for portfolio', category: 'Data Science', author: 'Ananya Iyer', comments: 19, status: 'active', pinned: false, date: '2025-02-15' }
  ],
  reports: [
    { id: 1, type: 'User', target: 'Kabir Joshi', reason: 'Inappropriate profile content', reporter: 'Meera Nair', date: '2025-02-10', status: 'pending' },
    { id: 2, type: 'Post', target: 'Figma tips for beginners', reason: 'Misleading information', reporter: 'Rohan Kumar', date: '2025-02-12', status: 'pending' },
    { id: 3, type: 'Comment', target: 'Offensive reply on Python vs R', reason: 'Hate speech', reporter: 'Priya Sharma', date: '2025-02-14', status: 'reviewed' },
    { id: 4, type: 'User', target: 'Sneha Reddy', reason: 'Spam messaging', reporter: 'Arjun Das', date: '2025-02-16', status: 'pending' },
    { id: 5, type: 'Post', target: 'Blockchain Basics', reason: 'Promotional content', reporter: 'Vikram Singh', date: '2025-02-20', status: 'dismissed' }
  ],
  notifications: [
    { id: 1, title: 'Platform Maintenance Scheduled', message: 'Scheduled maintenance on March 1st, 2025 from 2-4 AM IST.', type: 'alert', sentTo: 'all', date: '2025-02-25' },
    { id: 2, title: 'New Feature: Skill Verification', message: 'We have launched skill verification badges for top contributors.', type: 'announcement', sentTo: 'all', date: '2025-02-20' },
    { id: 3, title: 'Warning issued to Kabir Joshi', message: 'Warning for inappropriate profile content.', type: 'alert', sentTo: 'selected', date: '2025-02-10' }
  ],
  categories: ['Frontend', 'Backend', 'Design', 'Data Science', 'Infrastructure', 'Mobile', 'Emerging Tech', 'DevOps', 'Marketing'],
  activityLog: [
    { text: 'Aarav Patel matched with Priya Sharma for Python', time: '2 min ago', color: '#82B3A7' },
    { text: 'New skill "Rust" submitted for approval', time: '15 min ago', color: '#E8916D' },
    { text: 'Sneha Reddy reported a community post', time: '32 min ago', color: '#D4766E' },
    { text: 'Ananya Iyer added a new learning resource', time: '1 hr ago', color: '#6B9AC4' },
    { text: 'Vikram Singh completed DevOps match', time: '2 hr ago', color: '#82B3A7' },
    { text: 'New user Divya Menon registered', time: '3 hr ago', color: '#B8A9C9' },
    { text: 'Kabir Joshi account suspended', time: '5 hr ago', color: '#D4766E' },
    { text: 'Meera Nair submitted a skill match request', time: '6 hr ago', color: '#5B9B8B' }
  ]
};

// ── Shared Style Constants (matching user app) ──────────
const PAGE_BG = 'linear-gradient(135deg, #E2F1E7 0%, #E8EFFA 40%, #EFE8FA 70%, #F5E8EF 100%)';
const GLASS = {
  backgroundColor: 'rgba(255, 255, 255, 0.65)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)'
};
const C = {
  primary: '#82B3A7', primaryDark: '#5B9B8B', primaryDeep: '#1B4D43',
  accent: '#6B9AC4', accentPurple: '#B8A9C9', accentOrange: '#E8916D', accentRed: '#D4766E',
  text: '#0F172A', textMid: '#1E293B', textSoft: '#475569', textMuted: '#64748B',
  border: '#CBD5E1', borderLight: '#E2E8F0', bg: '#FFFFFF',
  greenBg: '#D4EBE6', redBg: '#FEE2E2', yellowBg: '#FEF3C7', blueBg: '#DBEAFE', purpleBg: '#F3E8FF'
};

const badgeStyle = (type) => {
  const map = {
    active: { bg: C.greenBg, color: '#166534' },
    approved: { bg: C.greenBg, color: '#166534' },
    completed: { bg: C.greenBg, color: '#166534' },
    sent: { bg: C.greenBg, color: '#166534' },
    pending: { bg: C.yellowBg, color: '#92400E' },
    reviewed: { bg: C.yellowBg, color: '#92400E' },
    inactive: { bg: '#F5F5F4', color: '#57534E' },
    dismissed: { bg: '#F5F5F4', color: '#57534E' },
    suspended: { bg: C.redBg, color: '#991B1B' },
    reported: { bg: C.redBg, color: '#991B1B' },
    featured: { bg: C.purpleBg, color: '#6B21A8' }
  };
  const s = map[type] || { bg: '#F5F5F4', color: '#57534E' };
  return { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', backgroundColor: s.bg, color: s.color, whiteSpace: 'nowrap' };
};

// ── ADMIN SIDEBAR NAV ITEMS ─────────────────────────────
const ADMIN_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'users', label: 'User Management', icon: '👥' },
  { id: 'skills', label: 'Skills Management', icon: '💻' },
  { id: 'matches', label: 'Match Management', icon: '🤝' },
  { id: 'learning', label: 'Learning Management', icon: '📚' },
  { id: 'community', label: 'Community', icon: '💬' },
  { id: 'reports', label: 'Reports & Moderation', icon: '🚨' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
];

// ── Main Component ──────────────────────────────────────
export default function AdminDashboard({ onLogout, adminUser }) {
  const admin = adminUser || { name: 'SkillSwap Admin', email: 'admin@skillswap.com' };
  const [activePage, setActivePage] = useState('dashboard');
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter states per module
  const [userFilters, setUserFilters] = useState({ search: '', status: '', skill: '' });
  const [skillFilters, setSkillFilters] = useState({ search: '', category: '', status: '' });
  const [matchFilters, setMatchFilters] = useState({ search: '', status: '' });
  const [resFilters, setResFilters] = useState({ search: '', status: '' });
  const [postFilters, setPostFilters] = useState({ search: '', category: '' });
  const [reportFilters, setReportFilters] = useState({ type: '', status: '' });

  // Notification form
  const [notifForm, setNotifForm] = useState({ title: '', message: '', type: 'announcement', recipient: 'all' });

  // Chart refs
  const chartRefs = useRef({});
  const chartInstances = useRef({});

  // Toast helper
  const showToast = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  // Destroy all charts
  const destroyCharts = useCallback(() => {
    Object.values(chartInstances.current).forEach(inst => { if (inst) inst.destroy(); });
    chartInstances.current = {};
  }, []);

  // Create chart helper
  const makeChart = useCallback((canvasId, type, data, opts = {}) => {
    const canvas = chartRefs.current[canvasId];
    if (!canvas) return null;
    if (chartInstances.current[canvasId]) chartInstances.current[canvasId].destroy();
    chartInstances.current[canvasId] = new Chart(canvas, {
      type, data,
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { labels: { font: { family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', size: 11 }, usePointStyle: true, pointStyle: 'circle' } },
          tooltip: { backgroundColor: '#1E293B', titleFont: { family: '-apple-system' }, bodyFont: { family: '-apple-system' }, cornerRadius: 8, padding: 10 }
        },
        ...opts
      }
    });
    return chartInstances.current[canvasId];
  }, []);

  // Navigate with chart cleanup
  const navigateTo = useCallback((page) => {
    destroyCharts();
    setActivePage(page);
  }, [destroyCharts]);

  // Initialize charts after page renders
  useEffect(() => {
    destroyCharts();
    const timer = setTimeout(() => {
      if (activePage === 'dashboard') initDashboardCharts();
      if (activePage === 'analytics') initAnalyticsCharts();
    }, 80);
    return () => clearTimeout(timer);
  }, [activePage]);

  const initDashboardCharts = () => {
    makeChart('dashUserChart', 'line', {
      labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
      datasets: [{ label: 'New Users', data: [12, 19, 28, 35, 42, 50], borderColor: C.primary, backgroundColor: 'rgba(130,179,167,0.1)', fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: C.primary }]
    }, { scales: { y: { beginAtZero: true, grid: { color: '#F5F5F4' } }, x: { grid: { display: false } } } });

    const catCount = {};
    ADM_DB.skills.forEach(s => { catCount[s.category] = (catCount[s.category] || 0) + 1; });
    makeChart('dashSkillChart', 'doughnut', {
      labels: Object.keys(catCount),
      datasets: [{ data: Object.values(catCount), backgroundColor: [C.primary, C.accentOrange, C.accent, C.accentPurple, C.primaryDark, C.accentRed, '#0EA5E9'], borderWidth: 0 }]
    }, { cutout: '65%', plugins: { legend: { position: 'bottom' } } });

    makeChart('dashMatchChart', 'bar', {
      labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
      datasets: [
        { label: 'Pending', data: [3, 5, 2, 4, 3], backgroundColor: '#FBBF24', borderRadius: 6 },
        { label: 'Active', data: [8, 12, 15, 18, 20], backgroundColor: C.primary, borderRadius: 6 },
        { label: 'Completed', data: [2, 4, 6, 8, 10], backgroundColor: C.accent, borderRadius: 6 }
      ]
    }, { scales: { y: { beginAtZero: true, stacked: true, grid: { color: '#F5F5F4' } }, x: { stacked: true, grid: { display: false } } } });
  };

  const initAnalyticsCharts = () => {
    makeChart('anaRegChart', 'line', {
      labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
      datasets: [
        { label: 'Registrations', data: [8, 15, 22, 30, 38, 45, 52], borderColor: C.primary, backgroundColor: 'rgba(130,179,167,0.08)', fill: true, tension: 0.4, pointRadius: 5, pointBackgroundColor: C.primary },
        { label: 'Active Users', data: [5, 10, 16, 22, 28, 35, 42], borderColor: C.accent, backgroundColor: 'rgba(107,154,196,0.08)', fill: true, tension: 0.4, pointRadius: 5, pointBackgroundColor: C.accent }
      ]
    }, { scales: { y: { beginAtZero: true, grid: { color: '#F5F5F4' } }, x: { grid: { display: false } } } });

    const sorted = [...ADM_DB.skills].sort((a, b) => b.users - a.users).slice(0, 6);
    makeChart('anaPopChart', 'bar', {
      labels: sorted.map(s => s.name),
      datasets: [{ label: 'Users', data: sorted.map(s => s.users), backgroundColor: [C.primary, C.primaryDark, C.accentOrange, C.accent, C.accentPurple, C.primaryDark], borderRadius: 8 }]
    }, { scales: { y: { beginAtZero: true, grid: { color: '#F5F5F4' } }, x: { grid: { display: false } } }, indexAxis: 'y' });

    makeChart('anaMatchChart', 'doughnut', {
      labels: ['Pending', 'Active', 'Completed'],
      datasets: [{ data: [ADM_DB.matches.filter(m => m.status === 'pending').length, ADM_DB.matches.filter(m => m.status === 'active').length, ADM_DB.matches.filter(m => m.status === 'completed').length], backgroundColor: ['#FBBF24', C.primary, C.accent], borderWidth: 0 }]
    }, { cutout: '65%', plugins: { legend: { position: 'bottom' } } });

    makeChart('anaEngChart', 'line', {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        { label: 'Posts', data: [5, 8, 12, 7, 15, 10, 8], borderColor: C.accentPurple, tension: 0.4, pointRadius: 4, pointBackgroundColor: C.accentPurple },
        { label: 'Comments', data: [15, 22, 30, 18, 42, 28, 20], borderColor: C.primaryDark, tension: 0.4, pointRadius: 4, pointBackgroundColor: C.primaryDark }
      ]
    }, { scales: { y: { beginAtZero: true, grid: { color: '#F5F5F4' } }, x: { grid: { display: false } } } });
  };

  // ── Reusable UI Pieces ────────────────────────────────
  const StatCard = ({ label, value, icon, delta, accentBg }) => (
    <div style={{ ...GLASS, borderRadius: '18px', padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: accentBg || C.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{icon}</div>
        {delta && <span style={{ fontSize: '11px', fontWeight: '700', color: delta.startsWith('+') ? '#166534' : '#991B1B' }}>{delta}</span>}
      </div>
      <p style={{ fontSize: '26px', fontWeight: '900', color: C.text, margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{value}</p>
      <p style={{ fontSize: '12px', color: C.textMuted, margin: '4px 0 0 0' }}>{label}</p>
    </div>
  );

  const SectionHeader = ({ title, children }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: '900', color: C.text, margin: 0 }}>{title}</h2>
      <div style={{ flex: 1 }} />
      {children}
    </div>
  );

  const FilterInput = ({ placeholder, value, onChange, icon }) => (
    <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
      {icon && <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: C.textMuted, fontSize: '13px' }}>{icon}</span>}
      <input type="text" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: '10px 14px', paddingLeft: icon ? '36px' : '14px', borderRadius: '12px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', boxSizing: 'border-box' }} />
    </div>
  );

  const FilterSelect = ({ value, onChange, options }) => (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: '10px 14px', borderRadius: '12px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', minWidth: '140px', cursor: 'pointer' }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );

  const ActionBtn = ({ onClick, icon, color, title }) => (
    <button onClick={onClick} title={title} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: '6px', fontSize: '13px', color: color || C.textMuted, transition: 'all 0.15s' }}>{icon}</button>
  );

  const PrimaryBtn = ({ onClick, children, style: extraStyle }) => (
    <button onClick={onClick} style={{ backgroundColor: C.primary, color: '#FFF', border: 'none', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', ...extraStyle }}>{children}</button>
  );

  const GhostBtn = ({ onClick, children, style: extraStyle }) => (
    <button onClick={onClick} style={{ backgroundColor: 'transparent', border: `1px solid ${C.border}`, color: C.textSoft, padding: '10px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', ...extraStyle }}>{children}</button>
  );

  const DangerBtn = ({ onClick, children }) => (
    <button onClick={onClick} style={{ backgroundColor: C.accentRed, color: '#FFF', border: 'none', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>{children}</button>
  );

  const TableWrap = ({ children }) => (
    <div style={{ ...GLASS, borderRadius: '18px', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>{children}</div>
    </div>
  );

  const Thead = ({ children }) => (
    <thead><tr>{children}<th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'rgba(130,179,167,0.06)', borderBottom: `1px solid ${C.borderLight}` }}>Actions</th></tr></thead>
  );

  const Th = ({ children }) => (
    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'rgba(130,179,167,0.06)', borderBottom: `1px solid ${C.borderLight}` }}>{children}</th>
  );

  const Td = ({ children, style: s }) => (
    <td style={{ padding: '12px 16px', borderBottom: `1px solid ${C.borderLight}`, fontSize: '13px', verticalAlign: 'middle', ...s }}>{children}</td>
  );

  const ChartBox = ({ title, canvasId, height = 260 }) => (
    <div style={{ ...GLASS, borderRadius: '18px', padding: '20px' }}>
      <h4 style={{ fontSize: '15px', fontWeight: '800', color: C.text, marginBottom: '14px' }}>{title}</h4>
      <div style={{ height: `${height}px`, position: 'relative' }}>
        <canvas ref={el => { if (el) chartRefs.current[canvasId] = el; }} id={canvasId} />
      </div>
    </div>
  );

  // ── Modal/Toast Renderers ─────────────────────────────
  const renderModal = () => {
    if (!modal) return null;
    return (
      <div onClick={() => setModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div onClick={e => e.stopPropagation()} style={{ background: '#FFF', borderRadius: '20px', padding: '28px', width: '100%', maxWidth: modal.maxW || '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
          {modal.content}
        </div>
      </div>
    );
  };

  const renderToasts = () => (
    <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 1100, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {toasts.map(t => (
        <div key={t.id} style={{ padding: '12px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: t.type === 'error' ? '#991B1B' : t.type === 'info' ? '#1E40AF' : C.primaryDeep, color: '#FFF' }}>
          <span>{t.type === 'error' ? '✕' : t.type === 'info' ? 'ℹ' : '✓'}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );

  // ── Confirmation Modal Helper ─────────────────────────
  const confirmAction = (title, message, onConfirm, btnLabel = 'Confirm', isDanger = true) => {
    setModal({
      content: (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: C.text, marginBottom: '8px' }}>{title}</h3>
          <p style={{ fontSize: '14px', color: C.textSoft, marginBottom: '24px' }}>{message}</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <GhostBtn onClick={() => setModal(null)}>Cancel</GhostBtn>
            <button onClick={() => { onConfirm(); setModal(null); }} style={{ backgroundColor: isDanger ? C.accentRed : C.primary, color: '#FFF', border: 'none', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>{btnLabel}</button>
          </div>
        </div>
      )
    });
  };

  // ── Form Modal Helper ─────────────────────────────────
  const formModal = (title, fields, onSave) => {
    const fieldState = {};
    fields.forEach(f => { fieldState[f.name] = f.value || ''; });

    const FormContent = () => {
      const [vals, setVals] = useState(fieldState);
      return (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: C.text, marginBottom: '16px' }}>{title}</h3>
          {fields.map(f => (
            <div key={f.name} style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: C.textSoft, marginBottom: '5px' }}>{f.label}</label>
              {f.type === 'select' ? (
                <select value={vals[f.name]} onChange={e => setVals({ ...vals, [f.name]: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', cursor: 'pointer' }}>
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea value={vals[f.name]} onChange={e => setVals({ ...vals, [f.name]: e.target.value })} rows="3" placeholder={f.placeholder || ''} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', boxSizing: 'border-box' }} />
              ) : (
                <input type={f.type || 'text'} value={vals[f.name]} onChange={e => setVals({ ...vals, [f.name]: e.target.value })} placeholder={f.placeholder || ''} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', boxSizing: 'border-box' }} />
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <GhostBtn onClick={() => setModal(null)}>Cancel</GhostBtn>
            <PrimaryBtn onClick={() => { onSave(vals); setModal(null); }}>Save</PrimaryBtn>
          </div>
        </div>
      );
    };
    setModal({ content: <FormContent /> });
  };

  // ══════════════════════════════════════════════════════
  // PAGE RENDERERS
  // ══════════════════════════════════════════════════════

  // ── 1. DASHBOARD ──────────────────────────────────────
  const renderDashboard = () => {
    const stats = [
      { label: 'Total Users', value: ADM_DB.users.length, icon: '👥', delta: '+12%', bg: C.greenBg },
      { label: 'Active Users', value: ADM_DB.users.filter(u => u.status === 'active').length, icon: '✅', delta: '+8%', bg: C.blueBg },
      { label: 'Total Skills', value: ADM_DB.skills.length, icon: '💻', delta: '+5%', bg: C.purpleBg },
      { label: 'Total Matches', value: ADM_DB.matches.length, icon: '🤝', delta: '+18%', bg: 'rgba(232,145,109,0.15)' },
      { label: 'Resources', value: ADM_DB.resources.length, icon: '📚', delta: '+3%', bg: C.greenBg },
      { label: 'Posts', value: ADM_DB.posts.length, icon: '💬', delta: '+7%', bg: C.blueBg },
      { label: 'Pending Reports', value: ADM_DB.reports.filter(r => r.status === 'pending').length, icon: '🚨', delta: '-2', bg: C.redBg }
    ];
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <ChartBox title="User Growth" canvasId="dashUserChart" />
          <ChartBox title="Skill Distribution" canvasId="dashSkillChart" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ ...GLASS, borderRadius: '18px', padding: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: C.text, marginBottom: '14px' }}>Recent Activity</h4>
            <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
              {ADM_DB.activityLog.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '10px 0', borderBottom: `1px solid ${C.borderLight}` }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: a.color, marginTop: '5px', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', color: C.textMid, margin: 0 }}>{a.text}</p>
                    <p style={{ fontSize: '11px', color: C.textMuted, margin: '3px 0 0 0' }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ChartBox title="Match Activity" canvasId="dashMatchChart" />
        </div>
      </div>
    );
  };

  // ── 2. USER MANAGEMENT ────────────────────────────────
  const renderUsers = () => {
    const filtered = ADM_DB.users.filter(u => {
      if (userFilters.search && !u.name.toLowerCase().includes(userFilters.search.toLowerCase()) && !u.email.toLowerCase().includes(userFilters.search.toLowerCase())) return false;
      if (userFilters.status && u.status !== userFilters.status) return false;
      if (userFilters.skill && !u.skills.includes(userFilters.skill)) return false;
      return true;
    });
    const allSkills = [...new Set(ADM_DB.skills.map(s => s.name))];
    return (
      <div>
        <SectionHeader title="User Management">
          <PrimaryBtn onClick={() => formModal('Add New User', [
            { name: 'name', label: 'Full Name', placeholder: 'Enter name' },
            { name: 'email', label: 'Email', placeholder: 'user@vignan.ac.in', type: 'email' },
            { name: 'skills', label: 'Skills (comma separated)', placeholder: 'React, Python' }
          ], (data) => {
            if (!data.name || !data.email) { showToast('Name and email required', 'error'); return; }
            ADM_DB.users.push({ id: Date.now(), name: data.name, email: data.email, status: 'active', verified: false, skills: data.skills.split(',').map(s => s.trim()).filter(Boolean), interests: [], joined: new Date().toISOString().split('T')[0], color: C.primary });
            showToast('User added successfully'); setActivePage('users');
          })}>+ Add User</PrimaryBtn>
        </SectionHeader>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <FilterInput placeholder="Search users..." value={userFilters.search} onChange={v => setUserFilters({ ...userFilters, search: v })} icon="🔍" />
          <FilterSelect value={userFilters.status} onChange={v => setUserFilters({ ...userFilters, status: v })} options={[{ value: '', label: 'All Status' }, { value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }, { value: 'suspended', label: 'Suspended' }]} />
          <FilterSelect value={userFilters.skill} onChange={v => setUserFilters({ ...userFilters, skill: v })} options={[{ value: '', label: 'All Skills' }, ...allSkills.map(s => ({ value: s, label: s }))]} />
        </div>
        <TableWrap>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <Thead><Th>User</Th><Th>Email</Th><Th>Skills</Th><Th>Status</Th><Th>Verified</Th><Th>Joined</Th></Thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} style={{ transition: 'background 0.15s' }}>
                  <Td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: u.color, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', flexShrink: 0 }}>{u.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                    <span style={{ fontWeight: '700' }}>{u.name}</span>
                  </div></Td>
                  <Td style={{ color: C.textSoft }}>{u.email}</Td>
                  <Td>{u.skills.slice(0, 2).map(s => <span key={s} style={badgeStyle('inactive')}>{s}</span>)}</Td>
                  <Td><span style={badgeStyle(u.status)}>{u.status}</span></Td>
                  <Td>{u.verified ? '✅' : '❌'}</Td>
                  <Td style={{ color: C.textMuted, fontSize: '12px' }}>{u.joined}</Td>
                  <Td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <ActionBtn onClick={() => formModal(`Edit: ${u.name}`, [
                        { name: 'name', label: 'Name', value: u.name },
                        { name: 'email', label: 'Email', value: u.email, type: 'email' },
                        { name: 'status', label: 'Status', value: u.status, type: 'select', options: ['active', 'inactive', 'suspended'] }
                      ], (d) => { u.name = d.name; u.email = d.email; u.status = d.status; showToast('User updated'); })} icon="✏️" color={C.accent} />
                      {u.status === 'active' && <ActionBtn onClick={() => confirmAction('Deactivate User', `Deactivate ${u.name}?`, () => { u.status = 'inactive'; showToast(`${u.name} deactivated`); })} icon="🚫" color={C.accentOrange} />}
                      {u.status !== 'active' && <ActionBtn onClick={() => { u.status = 'active'; showToast(`${u.name} activated`); }} icon="✅" color="#166534" />}
                      {!u.verified && <ActionBtn onClick={() => { u.verified = true; showToast(`${u.name} verified`); }} icon="🛡️" color={C.accentPurple} />}
                      <ActionBtn onClick={() => confirmAction('Delete User', `Permanently delete ${u.name}?`, () => { ADM_DB.users = ADM_DB.users.filter(x => x.id !== u.id); showToast(`${u.name} deleted`, 'error'); })} icon="🗑️" color={C.accentRed} />
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
        <p style={{ fontSize: '12px', color: C.textMuted, marginTop: '10px' }}>Showing {filtered.length} of {ADM_DB.users.length} users</p>
      </div>
    );
  };

  // ── 3. SKILLS MANAGEMENT ──────────────────────────────
  const renderSkills = () => {
    const filtered = ADM_DB.skills.filter(s => {
      if (skillFilters.search && !s.name.toLowerCase().includes(skillFilters.search.toLowerCase())) return false;
      if (skillFilters.category && s.category !== skillFilters.category) return false;
      if (skillFilters.status && s.status !== skillFilters.status) return false;
      return true;
    });
    return (
      <div>
        <SectionHeader title="Skills Management">
          <GhostBtn onClick={() => formModal('Manage Categories', [{ name: 'cats', label: 'Categories (one per line)', type: 'textarea', value: ADM_DB.categories.join('\n') }], (d) => { ADM_DB.categories = d.cats.split('\n').map(c => c.trim()).filter(Boolean); showToast('Categories updated'); })}>📁 Categories</GhostBtn>
          <PrimaryBtn onClick={() => formModal('Add Skill', [{ name: 'name', label: 'Skill Name', placeholder: 'e.g. Rust' }, { name: 'category', label: 'Category', type: 'select', options: ADM_DB.categories }], (d) => { if (!d.name) { showToast('Name required', 'error'); return; } ADM_DB.skills.push({ id: Date.now(), name: d.name, category: d.category, status: 'approved', users: 0, submitted: new Date().toISOString().split('T')[0] }); showToast('Skill added'); })}>+ Add Skill</PrimaryBtn>
        </SectionHeader>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <FilterInput placeholder="Search skills..." value={skillFilters.search} onChange={v => setSkillFilters({ ...skillFilters, search: v })} icon="🔍" />
          <FilterSelect value={skillFilters.category} onChange={v => setSkillFilters({ ...skillFilters, category: v })} options={[{ value: '', label: 'All Categories' }, ...ADM_DB.categories.map(c => ({ value: c, label: c }))]} />
          <FilterSelect value={skillFilters.status} onChange={v => setSkillFilters({ ...skillFilters, status: v })} options={[{ value: '', label: 'All Status' }, { value: 'approved', label: 'Approved' }, { value: 'pending', label: 'Pending' }]} />
        </div>
        <TableWrap>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <Thead><Th>Skill</Th><Th>Category</Th><Th>Status</Th><Th>Users</Th><Th>Submitted</Th></Thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <Td style={{ fontWeight: '700' }}>💻 {s.name}</Td>
                  <Td><span style={badgeStyle('inactive')}>{s.category}</span></Td>
                  <Td><span style={badgeStyle(s.status)}>{s.status}</span></Td>
                  <Td style={{ fontWeight: '700' }}>{s.users}</Td>
                  <Td style={{ color: C.textMuted, fontSize: '12px' }}>{s.submitted}</Td>
                  <Td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {s.status === 'pending' && <>
                        <ActionBtn onClick={() => { s.status = 'approved'; showToast(`"${s.name}" approved`); }} icon="✅" color="#166534" />
                        <ActionBtn onClick={() => confirmAction('Reject Skill', `Reject "${s.name}"?`, () => { ADM_DB.skills = ADM_DB.skills.filter(x => x.id !== s.id); showToast(`"${s.name}" rejected`, 'error'); })} icon="❌" color={C.accentRed} />
                      </>}
                      <ActionBtn onClick={() => formModal('Edit Skill', [{ name: 'name', label: 'Name', value: s.name }, { name: 'category', label: 'Category', value: s.category, type: 'select', options: ADM_DB.categories }], (d) => { s.name = d.name; s.category = d.category; showToast('Skill updated'); })} icon="✏️" color={C.accent} />
                      <ActionBtn onClick={() => confirmAction('Delete Skill', `Delete "${s.name}"?`, () => { ADM_DB.skills = ADM_DB.skills.filter(x => x.id !== s.id); showToast(`"${s.name}" deleted`, 'error'); })} icon="🗑️" color={C.accentRed} />
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  };

  // ── 4. MATCH MANAGEMENT ───────────────────────────────
  const renderMatches = () => {
    const filtered = ADM_DB.matches.filter(m => {
      if (matchFilters.search && !m.learner.toLowerCase().includes(matchFilters.search.toLowerCase()) && !m.teacher.toLowerCase().includes(matchFilters.search.toLowerCase())) return false;
      if (matchFilters.status && m.status !== matchFilters.status) return false;
      return true;
    });
    return (
      <div>
        <SectionHeader title="Match Management" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <FilterInput placeholder="Search matches..." value={matchFilters.search} onChange={v => setMatchFilters({ ...matchFilters, search: v })} icon="🔍" />
          <FilterSelect value={matchFilters.status} onChange={v => setMatchFilters({ ...matchFilters, status: v })} options={[{ value: '', label: 'All Status' }, { value: 'pending', label: 'Pending' }, { value: 'active', label: 'Active' }, { value: 'completed', label: 'Completed' }]} />
        </div>
        <TableWrap>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <Thead><Th>Learner</Th><Th>Teacher</Th><th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'rgba(130,179,167,0.06)', borderBottom: `1px solid ${C.borderLight}` }}>Skill Wanted</th><Th>Skill Offered</Th><Th>Status</Th><Th>Date</Th></Thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id}>
                  <Td style={{ fontWeight: '700' }}>{m.learner}</Td>
                  <Td style={{ fontWeight: '700' }}>{m.teacher}</Td>
                  <Td><span style={badgeStyle('featured')}>{m.skillWanted}</span></Td>
                  <Td><span style={badgeStyle('inactive')}>{m.skillOffered}</span></Td>
                  <Td><span style={badgeStyle(m.status)}>{m.status}</span></Td>
                  <Td style={{ color: C.textMuted, fontSize: '12px' }}>{m.date}</Td>
                  <Td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {m.status === 'pending' && <ActionBtn onClick={() => { m.status = 'active'; showToast('Match activated'); }} icon="▶️" color="#166534" />}
                      {m.status === 'active' && <ActionBtn onClick={() => { m.status = 'completed'; showToast('Match completed'); }} icon="✅" color={C.accent} />}
                      <ActionBtn onClick={() => confirmAction('Remove Match', 'Remove this match?', () => { ADM_DB.matches = ADM_DB.matches.filter(x => x.id !== m.id); showToast('Match removed', 'error'); })} icon="🗑️" color={C.accentRed} />
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  };

  // ── 5. LEARNING MANAGEMENT ────────────────────────────
  const renderLearning = () => {
    const filtered = ADM_DB.resources.filter(r => {
      if (resFilters.search && !r.title.toLowerCase().includes(resFilters.search.toLowerCase())) return false;
      if (resFilters.status && r.status !== resFilters.status) return false;
      return true;
    });
    return (
      <div>
        <SectionHeader title="Learning Management">
          <PrimaryBtn onClick={() => formModal('Add Resource', [{ name: 'title', label: 'Title', placeholder: 'Resource title' }, { name: 'category', label: 'Category', type: 'select', options: ADM_DB.categories }, { name: 'type', label: 'Type', type: 'select', options: ['Course', 'Tutorial', 'Video', 'Article'] }], (d) => { if (!d.title) { showToast('Title required', 'error'); return; } ADM_DB.resources.push({ id: Date.now(), title: d.title, category: d.category, type: d.type, status: 'approved', featured: false, author: 'Admin', date: new Date().toISOString().split('T')[0], views: 0 }); showToast('Resource added'); })}>+ Add Resource</PrimaryBtn>
        </SectionHeader>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <FilterInput placeholder="Search resources..." value={resFilters.search} onChange={v => setResFilters({ ...resFilters, search: v })} icon="🔍" />
          <FilterSelect value={resFilters.status} onChange={v => setResFilters({ ...resFilters, status: v })} options={[{ value: '', label: 'All Status' }, { value: 'approved', label: 'Approved' }, { value: 'pending', label: 'Pending' }]} />
        </div>
        <TableWrap>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <Thead><Th>Title</Th><Th>Category</Th><Th>Type</Th><Th>Author</Th><Th>Status</Th><Th>Featured</Th><Th>Views</Th></Thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <Td style={{ fontWeight: '700' }}>{r.title}</Td>
                  <Td><span style={badgeStyle('inactive')}>{r.category}</span></Td>
                  <Td><span style={badgeStyle('inactive')}>{r.type}</span></Td>
                  <Td style={{ color: C.textSoft }}>{r.author}</Td>
                  <Td><span style={badgeStyle(r.status)}>{r.status}</span></Td>
                  <Td>{r.featured ? '⭐' : '—'}</Td>
                  <Td>{r.views}</Td>
                  <Td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {r.status === 'pending' && <ActionBtn onClick={() => { r.status = 'approved'; showToast('Resource approved'); }} icon="✅" color="#166534" />}
                      <ActionBtn onClick={() => { r.featured = !r.featured; showToast(r.featured ? 'Featured' : 'Unfeatured'); }} icon="⭐" color={r.featured ? '#D97706' : C.textMuted} />
                      <ActionBtn onClick={() => formModal('Edit Resource', [{ name: 'title', label: 'Title', value: r.title }, { name: 'category', label: 'Category', value: r.category, type: 'select', options: ADM_DB.categories }, { name: 'type', label: 'Type', value: r.type, type: 'select', options: ['Course', 'Tutorial', 'Video', 'Article'] }], (d) => { r.title = d.title; r.category = d.category; r.type = d.type; showToast('Resource updated'); })} icon="✏️" color={C.accent} />
                      <ActionBtn onClick={() => confirmAction('Delete Resource', 'Delete this resource?', () => { ADM_DB.resources = ADM_DB.resources.filter(x => x.id !== r.id); showToast('Resource deleted', 'error'); })} icon="🗑️" color={C.accentRed} />
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  };

  // ── 6. COMMUNITY MANAGEMENT ───────────────────────────
  const renderCommunity = () => {
    const filtered = ADM_DB.posts.filter(p => {
      if (postFilters.search && !p.title.toLowerCase().includes(postFilters.search.toLowerCase())) return false;
      if (postFilters.category && p.category !== postFilters.category) return false;
      return true;
    });
    return (
      <div>
        <SectionHeader title="Community Management" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <FilterInput placeholder="Search posts..." value={postFilters.search} onChange={v => setPostFilters({ ...postFilters, search: v })} icon="🔍" />
          <FilterSelect value={postFilters.category} onChange={v => setPostFilters({ ...postFilters, category: v })} options={[{ value: '', label: 'All Categories' }, ...ADM_DB.categories.slice(0, 5).map(c => ({ value: c, label: c }))]} />
        </div>
        <TableWrap>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <Thead><Th>Title</Th><Th>Category</Th><Th>Author</Th><Th>Comments</Th><Th>Status</Th><Th>Pinned</Th><Th>Date</Th></Thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <Td style={{ fontWeight: '700' }}>{p.pinned ? '📌 ' : ''}{p.title}</Td>
                  <Td><span style={badgeStyle('inactive')}>{p.category}</span></Td>
                  <Td style={{ color: C.textSoft }}>{p.author}</Td>
                  <Td>{p.comments}</Td>
                  <Td><span style={badgeStyle(p.status)}>{p.status}</span></Td>
                  <Td>{p.pinned ? '📌' : '—'}</Td>
                  <Td style={{ color: C.textMuted, fontSize: '12px' }}>{p.date}</Td>
                  <Td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <ActionBtn onClick={() => { p.pinned = !p.pinned; showToast(p.pinned ? 'Pinned' : 'Unpinned'); }} icon="📌" color={p.pinned ? '#D97706' : C.textMuted} />
                      <ActionBtn onClick={() => confirmAction('Remove Post', 'Remove this post?', () => { ADM_DB.posts = ADM_DB.posts.filter(x => x.id !== p.id); showToast('Post removed', 'error'); })} icon="🗑️" color={C.accentRed} />
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  };

  // ── 7. REPORTS & MODERATION ───────────────────────────
  const renderReports = () => {
    const filtered = ADM_DB.reports.filter(r => {
      if (reportFilters.type && r.type !== reportFilters.type) return false;
      if (reportFilters.status && r.status !== reportFilters.status) return false;
      return true;
    });
    const pending = ADM_DB.reports.filter(r => r.status === 'pending').length;
    const reviewed = ADM_DB.reports.filter(r => r.status === 'reviewed').length;
    const dismissed = ADM_DB.reports.filter(r => r.status === 'dismissed').length;
    return (
      <div>
        <SectionHeader title="Reports & Moderation" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '20px' }}>
          <StatCard label="Pending Reports" value={pending} icon="🚨" bg={C.redBg} />
          <StatCard label="Reviewed" value={reviewed} icon="⚠️" bg={C.yellowBg} />
          <StatCard label="Dismissed" value={dismissed} icon="✅" bg={C.greenBg} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <FilterSelect value={reportFilters.type} onChange={v => setReportFilters({ ...reportFilters, type: v })} options={[{ value: '', label: 'All Types' }, { value: 'User', label: 'User' }, { value: 'Post', label: 'Post' }, { value: 'Comment', label: 'Comment' }]} />
          <FilterSelect value={reportFilters.status} onChange={v => setReportFilters({ ...reportFilters, status: v })} options={[{ value: '', label: 'All Status' }, { value: 'pending', label: 'Pending' }, { value: 'reviewed', label: 'Reviewed' }, { value: 'dismissed', label: 'Dismissed' }]} />
        </div>
        <TableWrap>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <Thead><Th>Type</Th><Th>Target</Th><Th>Reason</Th><Th>Reporter</Th><Th>Date</Th><Th>Status</Th></Thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <Td><span style={badgeStyle(r.type === 'User' ? 'featured' : r.type === 'Post' ? 'inactive' : 'pending')}>{r.type}</span></Td>
                  <Td style={{ fontWeight: '700' }}>{r.target}</Td>
                  <Td style={{ color: C.textSoft, fontSize: '12px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.reason}</Td>
                  <Td style={{ color: C.textSoft }}>{r.reporter}</Td>
                  <Td style={{ color: C.textMuted, fontSize: '12px' }}>{r.date}</Td>
                  <Td><span style={badgeStyle(r.status)}>{r.status}</span></Td>
                  <Td>
                    {r.status === 'pending' ? (
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <ActionBtn onClick={() => { r.status = 'dismissed'; showToast('Report dismissed', 'info'); }} icon="❌" color={C.textMuted} />
                        <ActionBtn onClick={() => { r.status = 'reviewed'; showToast('Report reviewed — warning issued'); }} icon="⚠️" color={C.accentOrange} />
                        <ActionBtn onClick={() => confirmAction('Suspend', `Suspend related account for "${r.target}"?`, () => { r.status = 'reviewed'; showToast('Account suspended'); })} icon="🚫" color={C.accentRed} />
                      </div>
                    ) : <span style={{ fontSize: '11px', color: C.textMuted }}>Resolved</span>}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </div>
    );
  };

  // ── 8. ANALYTICS ──────────────────────────────────────
  const renderAnalytics = () => (
    <div>
      <SectionHeader title="Analytics" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <StatCard label="Daily Active Users" value="38" icon="📅" delta="+12%" bg={C.greenBg} />
        <StatCard label="Weekly Active Users" value="142" icon="📊" delta="+8%" bg={C.blueBg} />
        <StatCard label="Monthly Active Users" value="520" icon="📈" delta="+15%" bg={C.purpleBg} />
        <StatCard label="Successful Matches" value={ADM_DB.matches.filter(m => m.status === 'completed').length} icon="🤝" delta="67%" bg="rgba(232,145,109,0.15)" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <ChartBox title="User Registrations" canvasId="anaRegChart" />
        <ChartBox title="Most Popular Skills" canvasId="anaPopChart" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <ChartBox title="Match Statistics" canvasId="anaMatchChart" />
        <ChartBox title="Community Engagement" canvasId="anaEngChart" />
      </div>
    </div>
  );

  // ── 9. NOTIFICATIONS ──────────────────────────────────
  const renderNotifications = () => (
    <div>
      <SectionHeader title="Notifications" />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <div style={{ ...GLASS, borderRadius: '18px', padding: '24px', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: C.text, marginBottom: '16px' }}>Send Notification</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: C.textSoft, marginBottom: '5px' }}>Recipient</label>
                <select value={notifForm.recipient} onChange={e => setNotifForm({ ...notifForm, recipient: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px' }}>
                  <option value="all">All Users</option>
                  <option value="selected">Selected Users</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: C.textSoft, marginBottom: '5px' }}>Type</label>
                <select value={notifForm.type} onChange={e => setNotifForm({ ...notifForm, type: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px' }}>
                  <option value="announcement">Announcement</option>
                  <option value="alert">Platform Alert</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: C.textSoft, marginBottom: '5px' }}>Title</label>
              <input type="text" value={notifForm.title} onChange={e => setNotifForm({ ...notifForm, title: e.target.value })} placeholder="Notification title" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: C.textSoft, marginBottom: '5px' }}>Message</label>
              <textarea value={notifForm.message} onChange={e => setNotifForm({ ...notifForm, message: e.target.value })} rows="3" placeholder="Write your message..." style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <PrimaryBtn onClick={() => {
              if (!notifForm.title || !notifForm.message) { showToast('Title and message required', 'error'); return; }
              ADM_DB.notifications.unshift({ id: Date.now(), ...notifForm, date: new Date().toISOString().split('T')[0] });
              setNotifForm({ title: '', message: '', type: 'announcement', recipient: 'all' });
              showToast('Notification sent');
            }}>📤 Send Notification</PrimaryBtn>
          </div>
          <div style={{ ...GLASS, borderRadius: '18px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.borderLight}` }}>
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: C.text, margin: 0 }}>Notification History</h4>
            </div>
            {ADM_DB.notifications.map(n => (
              <div key={n.id} style={{ padding: '14px 20px', borderBottom: `1px solid ${C.borderLight}`, display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: n.type === 'alert' ? C.redBg : C.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{n.type === 'alert' ? '⚠️' : '📢'}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <p style={{ fontWeight: '700', fontSize: '13px', color: C.text, margin: 0 }}>{n.title}</p>
                    <span style={badgeStyle(n.type === 'alert' ? 'suspended' : 'active')}>{n.type}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: C.textMuted, margin: 0 }}>{n.message}</p>
                  <p style={{ fontSize: '11px', color: C.textMuted, margin: '4px 0 0 0' }}>{n.date} · To: {n.sentTo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ ...GLASS, borderRadius: '18px', padding: '20px', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: C.text, marginBottom: '14px' }}>Quick Announcements</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[{ icon: '🔧', label: 'Maintenance Notice', type: 'alert', title: 'Scheduled Maintenance', msg: 'Platform maintenance scheduled. Service may be briefly unavailable.' },
                { icon: '🚀', label: 'Feature Update', type: 'announcement', title: 'New Feature Released', msg: 'Check out the latest features on SkillSwap!' },
                { icon: '👋', label: 'Welcome New Users', type: 'announcement', title: 'Welcome to SkillSwap', msg: 'Start exploring skills and connect with learners worldwide.' },
                { icon: '🛡️', label: 'Policy Update', type: 'alert', title: 'Policy Update', msg: 'Community guidelines have been updated. Please review.' }
              ].map((q, i) => (
                <button key={i} onClick={() => { ADM_DB.notifications.unshift({ id: Date.now(), title: q.title, message: q.msg, type: q.type, sentTo: 'all', date: new Date().toISOString().split('T')[0] }); showToast('Announcement sent'); }} style={{ background: 'none', border: `1px solid ${C.borderLight}`, padding: '10px 14px', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', color: C.textMid, fontWeight: '600', fontSize: '13px', transition: 'all 0.15s' }}>
                  <span>{q.icon}</span> {q.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ ...GLASS, borderRadius: '18px', padding: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: C.text, marginBottom: '12px' }}>Stats</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[{ label: 'Total Sent', value: ADM_DB.notifications.length }, { label: 'Announcements', value: ADM_DB.notifications.filter(n => n.type === 'announcement').length }, { label: 'Alerts', value: ADM_DB.notifications.filter(n => n.type === 'alert').length }].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: C.textMuted }}>{s.label}</span>
                  <span style={{ fontWeight: '700', fontSize: '13px' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── 10. SETTINGS ──────────────────────────────────────
  const ToggleSwitch = ({ defaultChecked, onChange }) => {
    const [checked, setChecked] = useState(defaultChecked);
    return (
      <div onClick={() => { setChecked(!checked); if (onChange) onChange(!checked); }} style={{ width: '40px', height: '22px', borderRadius: '11px', backgroundColor: checked ? C.primary : '#CBD5E1', cursor: 'pointer', position: 'relative', transition: 'all 0.2s', flexShrink: 0 }}>
        <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#FFF', position: 'absolute', top: '2px', left: checked ? '20px' : '2px', transition: 'all 0.2s' }} />
      </div>
    );
  };

  const renderSettings = () => (
    <div>
      <SectionHeader title="Settings" />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Admin Profile */}
          <div style={{ ...GLASS, borderRadius: '18px', padding: '24px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: C.text, marginBottom: '16px' }}>Admin Profile</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div><label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: C.textSoft, marginBottom: '5px' }}>Full Name</label><input type="text" defaultValue={admin.name} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', boxSizing: 'border-box' }} /></div>
              <div><label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: C.textSoft, marginBottom: '5px' }}>Email</label><input type="email" defaultValue={admin.email} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', boxSizing: 'border-box' }} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div><label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: C.textSoft, marginBottom: '5px' }}>New Password</label><input type="password" placeholder="New password" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', boxSizing: 'border-box' }} /></div>
              <div><label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: C.textSoft, marginBottom: '5px' }}>Confirm Password</label><input type="password" placeholder="Confirm password" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', boxSizing: 'border-box' }} /></div>
            </div>
            <PrimaryBtn onClick={() => showToast('Profile saved')}>💾 Save Profile</PrimaryBtn>
          </div>
          {/* Platform Settings */}
          <div style={{ ...GLASS, borderRadius: '18px', padding: '24px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: C.text, marginBottom: '16px' }}>Platform Settings</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div><label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: C.textSoft, marginBottom: '5px' }}>Platform Name</label><input type="text" defaultValue="SkillSwap" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', boxSizing: 'border-box' }} /></div>
              <div><label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: C.textSoft, marginBottom: '5px' }}>Support Email</label><input type="email" defaultValue="support@skillswap.com" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', boxSizing: 'border-box' }} /></div>
            </div>
            <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: C.textSoft, marginBottom: '5px' }}>Description</label><textarea defaultValue="A peer-to-peer skill exchange and learning platform." rows="2" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, backgroundColor: '#FFF', color: C.textMid, fontSize: '13px', boxSizing: 'border-box' }} /></div>
            <PrimaryBtn onClick={() => showToast('Platform settings saved')}>💾 Save Settings</PrimaryBtn>
          </div>
          {/* Community Settings */}
          <div style={{ ...GLASS, borderRadius: '18px', padding: '24px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: C.text, marginBottom: '16px' }}>Community Settings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[{ label: 'Allow new posts', desc: 'Enable community posting' }, { label: 'Moderate new posts', desc: 'Require admin approval' }, { label: 'Allow comments', desc: 'Enable commenting on posts' }].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div><p style={{ fontWeight: '700', fontSize: '13px', margin: 0 }}>{t.label}</p><p style={{ fontSize: '11px', color: C.textMuted, margin: '2px 0 0 0' }}>{t.desc}</p></div>
                  <ToggleSwitch defaultChecked={i !== 1} onChange={() => showToast('Setting updated')} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Notification Settings */}
          <div style={{ ...GLASS, borderRadius: '18px', padding: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: C.text, marginBottom: '14px' }}>Notification Settings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[{ label: 'Email notifications' }, { label: 'Report alerts' }, { label: 'New user alerts' }].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '13px', margin: 0 }}>{t.label}</p>
                  <ToggleSwitch defaultChecked={i < 2} onChange={() => showToast('Setting updated')} />
                </div>
              ))}
            </div>
          </div>
          {/* User Permissions */}
          <div style={{ ...GLASS, borderRadius: '18px', padding: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: C.text, marginBottom: '14px' }}>User Permissions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[{ label: 'Allow skill submission' }, { label: 'Allow resource upload' }, { label: 'Allow direct messaging' }].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '13px', margin: 0 }}>{t.label}</p>
                  <ToggleSwitch defaultChecked onChange={() => showToast('Setting updated')} />
                </div>
              ))}
            </div>
          </div>
          {/* Skill Categories */}
          <div style={{ ...GLASS, borderRadius: '18px', padding: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: C.text, marginBottom: '12px' }}>Skill Categories</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {ADM_DB.categories.map(c => <span key={c} style={badgeStyle('inactive')}>{c}</span>)}
            </div>
            <GhostBtn onClick={() => formModal('Edit Categories', [{ name: 'cats', label: 'Categories (one per line)', type: 'textarea', value: ADM_DB.categories.join('\n') }], (d) => { ADM_DB.categories = d.cats.split('\n').map(c => c.trim()).filter(Boolean); showToast('Categories updated'); })}>✏️ Edit Categories</GhostBtn>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Page Router ───────────────────────────────────────
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return renderDashboard();
      case 'users': return renderUsers();
      case 'skills': return renderSkills();
      case 'matches': return renderMatches();
      case 'learning': return renderLearning();
      case 'community': return renderCommunity();
      case 'reports': return renderReports();
      case 'analytics': return renderAnalytics();
      case 'notifications': return renderNotifications();
      case 'settings': return renderSettings();
      default: return renderDashboard();
    }
  };

  // ══════════════════════════════════════════════════════
  // MAIN RENDER
  // ══════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: PAGE_BG, color: '#1E293B', display: 'flex' }}>
      {renderModal()}
      {renderToasts()}

      {/* ── ADMIN SIDEBAR ── */}
      <aside style={{ width: '230px', backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(16px)', borderRight: '1px solid rgba(255, 255, 255, 0.7)', padding: '24px 16px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1E293B' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
            <img src={LOGO_URL} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span>SkillSwap</span>
        </div>
        <span style={{ fontSize: '10px', fontWeight: '700', color: C.primary, backgroundColor: C.greenBg, padding: '3px 8px', borderRadius: '6px', marginBottom: '28px', display: 'inline-block', width: 'fit-content' }}>ADMIN</span>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {ADMIN_NAV.map(item => {
            const isActive = activePage === item.id;
            return (
              <button key={item.id} onClick={() => navigateTo(item.id)} style={{
                textAlign: 'left', padding: '10px 16px', borderRadius: '14px', border: 'none',
                backgroundColor: isActive ? C.primary : 'transparent',
                color: isActive ? '#FFFFFF' : C.textSoft,
                fontWeight: '700', fontSize: '13px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
              }}>
                <span style={{ fontSize: '15px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button onClick={onLogout} style={{ textAlign: 'left', padding: '10px 16px', borderRadius: '14px', border: 'none', backgroundColor: 'transparent', color: C.textSoft, fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', borderTop: `1px solid ${C.borderLight}`, paddingTop: '16px' }}>
          <span>🚪</span> <span>Logout</span>
        </button>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{ height: '60px', backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '14px', position: 'sticky', top: 0, zIndex: 30 }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: C.text, margin: 0 }}>{ADMIN_NAV.find(n => n.id === activePage)?.label || 'Dashboard'}</h3>
          <div style={{ flex: 1 }} />
          <div style={{ position: 'relative' }}>
            <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ padding: '8px 14px 8px 34px', borderRadius: '10px', border: `1px solid ${C.borderLight}`, backgroundColor: 'rgba(255,255,255,0.7)', color: C.textMid, fontSize: '13px', width: '200px' }} />
            <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: C.textMuted, fontSize: '13px' }}>🔍</span>
          </div>
          <button onClick={() => navigateTo('notifications')} style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', backgroundColor: 'rgba(130,179,167,0.1)', cursor: 'pointer', fontSize: '15px', position: 'relative' }}>
            🔔
            <span style={{ position: 'absolute', top: '4px', right: '6px', width: '7px', height: '7px', backgroundColor: C.accentRed, borderRadius: '50%', border: '2px solid #FFF' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '12px', borderLeft: `1px solid ${C.borderLight}` }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: C.primary, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800' }}>{admin.name ? admin.name[0].toUpperCase() : 'A'}</div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '700', margin: 0, color: C.textMid }}>{admin.name}</p>
              <p style={{ fontSize: '10px', margin: 0, color: C.textMuted }}>{admin.email}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
