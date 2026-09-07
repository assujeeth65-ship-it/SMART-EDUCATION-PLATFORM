import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

dotenv.config();
const app = express();
const PORT = Number(process.env.AI_SERVER_PORT || 3001);
const GEMINI_MODELS = (process.env.GEMINI_MODELS || 'gemini-3.8-flash,gemini-2.5-flash').split(',').map(s => s.trim()).filter(Boolean);
const DATA_DIR = path.join(process.cwd(), 'server', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const HACKATHONS_FILE = path.join(DATA_DIR, 'hackathons.json');
const ADMIN_SESSIONS_FILE = path.join(DATA_DIR, 'admin-sessions.json');
const ADMIN_USER_ID = (process.env.ADMIN_USER_ID || 'admin').trim();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@12345';
fs.mkdirSync(DATA_DIR, { recursive: true });

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}
function writeJsonAtomic(file, value) {
  const temp = `${file}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(value, null, 2), 'utf8');
  fs.renameSync(temp, file);
}
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}
function verifyPassword(password, salt, expectedHash) {
  const actual = Buffer.from(hashPassword(password, salt).hash, 'hex');
  const expected = Buffer.from(expectedHash, 'hex');
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}
function makeUserId(role) {
  const prefix = role === 'college' ? 'COL' : role === 'school' ? 'SCH' : 'USR';
  return `${prefix}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}
function publicUser(user) {
  return { id: user.id, userId: user.userId, role: user.role, profile: user.profile, createdAt: user.createdAt };
}
function bearerToken(req) {
  return req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : '';
}

function authUser(req) {
  const token = bearerToken(req);
  if (!token) return null;
  const sessions = readJson(SESSIONS_FILE, {});
  const userId = sessions[token];
  if (!userId) return null;
  const users = readJson(USERS_FILE, {});
  return users[userId] || null;
}


function authAdmin(req) {
  const token = bearerToken(req);
  if (!token) return false;
  const sessions = readJson(ADMIN_SESSIONS_FILE, {});
  return sessions[token] === ADMIN_USER_ID;
}

function requireAdmin(req, res, next) {
  if (!authAdmin(req)) return res.status(401).json({ error: 'Admin authentication required.' });
  next();
}


const FALLBACK_ANNA_INSTITUTIONS = [
  'Anna University - College of Engineering, Guindy',
  'Anna University - Alagappa College of Technology',
  'Anna University - Madras Institute of Technology',
  'Anna University - School of Architecture and Planning',
  'Anna University Regional Campus, Coimbatore',
  'Anna University Regional Campus, Madurai',
  'Anna University Regional Campus, Tirunelveli',
  'University College of Engineering Arni',
  'University College of Engineering Ariyalur',
  'University College of Engineering Dindigul',
  'University College of Engineering Kanchipuram',
  'University College of Engineering Nagercoil',
  'University College of Engineering Panruti',
  'University College of Engineering Pattukkottai',
  'University College of Engineering Ramanathapuram',
  'University College of Engineering Thirukkuvalai',
  'University College of Engineering Tindivanam',
  'University College of Engineering Villupuram',
  'University College of Engineering (BIT Campus), Tiruchirappalli',
  'University College of Engineering (VOC College of Engineering), Thoothukudi',
  'PSG College of Technology',
  'Coimbatore Institute of Technology',
  'Thiagarajar College of Engineering',
  'Government College of Technology, Coimbatore',
  'Government College of Engineering, Salem',
  'Government College of Engineering, Tirunelveli',
  'Government College of Engineering, Dharmapuri',
  'Government College of Engineering, Thanjavur',
  'Government College of Engineering, Theni',
  'Alagappa Chettiar Government College of Engineering and Technology',
  'Thanthai Periyar Government Institute of Technology',
  'Aalim Muhammed Salegh College of Engineering',
  'Jaya Engineering College',
  'Prathyusha Engineering College',
  'R M D Engineering College',
  'R M K Engineering College',
  'S A Engineering College',
  'Vel Tech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College',
  'Velammal Engineering College',
  'J N N Institute of Engineering',
  'St. Peters College of Engineering and Technology',
  'Kings Engineering College',
  'Panimalar Engineering College',
  'Rajalakshmi Engineering College',
  'Saveetha Engineering College',
  'Sri Venkateswara College of Engineering',
  'Chennai Institute of Technology',
  'Easwari Engineering College',
  'Jeppiaar Engineering College',
  'Jerusalem College of Engineering',
  'Meenakshi Sundararajan Engineering College',
  'K C G College of Technology',
  'Agni College of Technology',
  'St. Josephs College of Engineering',
  'Dhanalakshmi Srinivasan College of Engineering and Technology',
  'Mailam Engineering College',
  'SRM Valliammai Engineering College',
  'Tagore Engineering College',
  'Kongu Engineering College',
  'Kumaraguru College of Technology',
  'Sri Ramakrishna Engineering College',
  'SNS College of Technology',
  'Sri Shakthi Institute of Engineering and Technology',
  'Hindusthan College of Engineering and Technology',
  'Karpagam College of Engineering',
  'Adhiyamaan College of Engineering',
  'K S Rangasamy College of Technology',
  'Mahendra Engineering College',
  'Muthayammal Engineering College',
  'Paavai Engineering College',
  'Sona College of Technology',
  'Bannari Amman Institute of Technology',
  'Dr. Mahalingam College of Engineering and Technology',
  'Nehru Institute of Engineering and Technology'
];

function stripHtml(value) {
  return String(value).replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

async function fetchAnnaUniversityInstitutions() {
  const names = new Set(FALLBACK_ANNA_INSTITUTIONS);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  await Promise.all(letters.map(async (letter) => {
    try {
      const url = `https://annauniv.edu/cai/Affiliated%20Colleges%20list%20by%20Alphabetical/${letter}.html`;
      const response = await fetch(url, { signal: AbortSignal.timeout(4500) });
      if (!response.ok) return;
      const html = await response.text();
      const cells = [...html.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m => stripHtml(m[1]));
      for (const cell of cells) {
        if (!cell || cell.length < 8 || cell.length > 180) continue;
        if (/^(sl\.?\s*no|code|district|college|institution|type|s\.?no)$/i.test(cell)) continue;
        if (/(college|institute|university|engineering|technology|campus|school of architecture|polytechnic)/i.test(cell)) names.add(cell);
      }
    } catch {}
  }));
  return [...names].sort((a, b) => a.localeCompare(b));
}

app.use(cors({ origin: true }));
app.use(express.json({ limit: '4mb' }));

app.get('/', (_req, res) => res.json({ status: 'ok', message: 'SIH AI server is running' }));


app.get('/api/colleges/anna-university', async (_req, res) => {
  try {
    const colleges = await fetchAnnaUniversityInstitutions();
    return res.json({ university: 'Anna University', source: 'Anna University Centre for Affiliation of Institutions', colleges });
  } catch (error) {
    console.error('Anna University college list error:', error);
    return res.json({ university: 'Anna University', source: 'Fallback', colleges: FALLBACK_ANNA_INSTITUTIONS.sort() });
  }
});

app.get('/api/hackathons', (_req, res) => {
  const hackathons = readJson(HACKATHONS_FILE, []);
  // Student-facing feed: only published/circulating events are visible.
  return res.json({ hackathons: hackathons.filter((event) => event.registrationOpen) });
});

app.get('/api/admin/hackathons', requireAdmin, (_req, res) => {
  return res.json({ hackathons: readJson(HACKATHONS_FILE, []) });
});

app.post('/api/admin/login', (req, res) => {
  const { login, password } = req.body || {};
  if (!login?.trim() || !password) return res.status(400).json({ error: 'Admin ID and password are required.' });
  const loginOk = login.trim().toLowerCase() === ADMIN_USER_ID.toLowerCase();
  const expected = Buffer.from(ADMIN_PASSWORD);
  const actual = Buffer.from(String(password));
  const passwordOk = expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
  if (!loginOk || !passwordOk) return res.status(401).json({ error: 'Invalid admin ID or password.' });

  const token = crypto.randomBytes(32).toString('hex');
  const sessions = readJson(ADMIN_SESSIONS_FILE, {});
  sessions[token] = ADMIN_USER_ID;
  writeJsonAtomic(ADMIN_SESSIONS_FILE, sessions);
  return res.json({ token, admin: { userId: ADMIN_USER_ID, role: 'admin' } });
});

app.get('/api/admin/me', requireAdmin, (_req, res) => {
  return res.json({ admin: { userId: ADMIN_USER_ID, role: 'admin' } });
});

app.post('/api/admin/logout', (req, res) => {
  const token = bearerToken(req);
  if (token) {
    const sessions = readJson(ADMIN_SESSIONS_FILE, {});
    delete sessions[token];
    writeJsonAtomic(ADMIN_SESSIONS_FILE, sessions);
  }
  return res.json({ ok: true });
});

app.post('/api/admin/hackathons', requireAdmin, (req, res) => {
  try {
    const event = req.body || {};
    if (!event.id || !event.name || !event.organizer || !event.problemStatement) {
      return res.status(400).json({ error: 'Hackathon name, organizer and problem statement are required.' });
    }
    const hackathons = readJson(HACKATHONS_FILE, []);
    const next = [event, ...hackathons.filter((item) => item.id !== event.id)];
    writeJsonAtomic(HACKATHONS_FILE, next);
    return res.status(201).json({ event });
  } catch (error) {
    console.error('Hackathon publish error:', error);
    return res.status(500).json({ error: 'Could not save hackathon.' });
  }
});

app.put('/api/admin/hackathons/:id', requireAdmin, (req, res) => {
  try {
    const id = req.params.id;
    const hackathons = readJson(HACKATHONS_FILE, []);
    const index = hackathons.findIndex((item) => item.id === id);
    if (index === -1) return res.status(404).json({ error: 'Hackathon not found.' });
    hackathons[index] = { ...hackathons[index], ...(req.body || {}), id };
    writeJsonAtomic(HACKATHONS_FILE, hackathons);
    return res.json({ event: hackathons[index] });
  } catch (error) {
    console.error('Hackathon update error:', error);
    return res.status(500).json({ error: 'Could not update hackathon.' });
  }
});

app.delete('/api/admin/hackathons/:id', requireAdmin, (req, res) => {
  try {
    const id = req.params.id;
    const hackathons = readJson(HACKATHONS_FILE, []);
    writeJsonAtomic(HACKATHONS_FILE, hackathons.filter((item) => item.id !== id));
    return res.json({ ok: true });
  } catch (error) {
    console.error('Hackathon delete error:', error);
    return res.status(500).json({ error: 'Could not remove hackathon.' });
  }
});

app.post('/api/auth/register', (req, res) => {
  try {
    const { role, fullName, emailOrMobile, password, profile = {} } = req.body || {};
    if (!['school', 'college'].includes(role)) return res.status(400).json({ error: 'Please choose School Student or College Student.' });
    if (!fullName?.trim() || !emailOrMobile?.trim() || !password) return res.status(400).json({ error: 'Name, email/mobile and password are required.' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must contain at least 6 characters.' });

    const users = readJson(USERS_FILE, {});
    const loginKey = emailOrMobile.trim().toLowerCase();
    if (Object.values(users).some(u => u.loginKey === loginKey)) return res.status(409).json({ error: 'An account already exists with this email/mobile. Please log in.' });

    let userId = makeUserId(role);
    while (users[userId]) userId = makeUserId(role);
    const { salt, hash } = hashPassword(password);
    const user = {
      id: userId,
      userId,
      loginKey,
      passwordHash: hash,
      passwordSalt: salt,
      role,
      profile: { ...profile, studentName: fullName.trim(), preferredLanguage: profile.preferredLanguage || 'English' },
      state: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users[userId] = user;
    writeJsonAtomic(USERS_FILE, users);
    return res.status(201).json({ user: publicUser(user), message: 'Registration successful. Your User ID is ready for login.' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Could not create the account.' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { login, password } = req.body || {};
    if (!login?.trim() || !password) return res.status(400).json({ error: 'User ID/email/mobile and password are required.' });
    const users = readJson(USERS_FILE, {});
    const normalized = login.trim().toLowerCase();
    const user = Object.values(users).find(u => u.userId.toLowerCase() === normalized || u.loginKey === normalized);
    if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) return res.status(401).json({ error: 'Invalid User ID/email/mobile or password.' });

    const token = crypto.randomBytes(32).toString('hex');
    const sessions = readJson(SESSIONS_FILE, {});
    sessions[token] = user.userId;
    writeJsonAtomic(SESSIONS_FILE, sessions);
    return res.json({ token, user: publicUser(user), state: user.state || {} });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Could not log in.' });
  }
});

app.get('/api/auth/me', (req, res) => {
  const user = authUser(req);
  if (!user) return res.status(401).json({ error: 'Session expired. Please log in again.' });
  return res.json({ user: publicUser(user), state: user.state || {} });
});

app.put('/api/user/state', (req, res) => {
  const user = authUser(req);
  if (!user) return res.status(401).json({ error: 'Not authenticated.' });
  const users = readJson(USERS_FILE, {});
  const stored = users[user.userId];
  if (!stored) return res.status(404).json({ error: 'User account not found.' });
  stored.state = req.body?.state || {};
  stored.profile = req.body?.profile ? { ...stored.profile, ...req.body.profile } : stored.profile;
  stored.updatedAt = new Date().toISOString();
  users[user.userId] = stored;
  writeJsonAtomic(USERS_FILE, users);
  return res.json({ ok: true, updatedAt: stored.updatedAt });
});

app.post('/api/auth/logout', (req, res) => {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : '';
  if (token) {
    const sessions = readJson(SESSIONS_FILE, {});
    delete sessions[token];
    writeJsonAtomic(SESSIONS_FILE, sessions);
  }
  res.json({ ok: true });
});


app.post('/api/analyze-document', async (req, res) => {
  try {
    const { fileName, text, role = 'school', profile = {} } = req.body || {};
    if (!text?.trim()) return res.status(400).json({ error: 'No readable document text was provided.' });
    const key = process.env.GEMINI_API_KEY?.trim();
    if (!key) return res.status(500).json({ error: 'GEMINI_API_KEY is missing on the server.' });
    const learner = role === 'school'
      ? `school student, ${profile.board || 'school board'}, ${profile.grade || 'current grade'}`
      : `college student, ${profile.degree || 'degree'}, ${profile.department || 'current department'}, ${profile.year || 'current year'}`;
    const prompt = `You are an AI learning-content analyzer. Analyze the uploaded educational document and turn it into an interactive lesson for a ${learner}.

FILE: ${fileName || 'uploaded document'}

DOCUMENT TEXT:
${String(text).slice(0, 50000)}

Return ONLY valid JSON with this shape:
{
  "title": "...",
  "subject": "...",
  "topic": "...",
  "summary": "clear explanation in simple language",
  "concepts": [{"name":"...","explanation":"...","example":"..."}],
  "keyPoints": ["..."],
  "quiz": [{"question":"...","options":["...","...","...","..."],"answer":0,"explanation":"..."}]
}
Create 5 to 8 important concepts and 5 quiz questions based ONLY on the document. The explanations must teach the concepts, not merely verify the file. Make the quiz test understanding of those concepts.`;
    for (const model of GEMINI_MODELS) {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.25, maxOutputTokens: 5000, responseMimeType: 'application/json' } })
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        const raw = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('').trim();
        if (raw) {
          const cleaned = raw.replace(/^```json\s*/i, '').replace(/\s*```$/i, '');
          const result = JSON.parse(cleaned);
          return res.json({ ...result, fileName, model });
        }
      }
      if (![400, 404].includes(response.status)) return res.status(502).json({ error: data?.error?.message || `Gemini returned HTTP ${response.status}.` });
    }
    return res.status(502).json({ error: 'No configured Gemini model is available for document analysis.' });
  } catch (error) {
    console.error('Document analysis error:', error);
    return res.status(500).json({ error: error?.message || 'Could not analyze the document.' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], context = {} } = req.body || {};
    if (!message?.trim()) return res.status(400).json({ error: 'Question cannot be empty.' });
    const key = process.env.GEMINI_API_KEY?.trim();
    if (!key) return res.status(500).json({ error: 'GEMINI_API_KEY is missing on the server.' });
    const conversation = history.slice(-12).map((item) => `${item.sender === 'ai' ? 'Assistant' : 'Student'}: ${item.text || ''}`).join('\n');
    const prompt = `You are the Personal AI Learning Assistant for a Smart Education Platform.\n\nContext:\nSubject: ${context.subject || 'General'}\nChapter: ${context.chapter || 'General'}\nConcept: ${context.concept || 'General'}\nLearning level: ${context.level || 'Intermediate'}\n\nPrevious conversation:\n${conversation || 'None'}\n\nStudent question:\n${message}\n\nAnswer the student's exact question. Do not use a fixed/default response. Be clear and concise.`;
    for (const model of GEMINI_MODELS) {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 1024 } })
      });
      let data = {}; try { data = await response.json(); } catch {}
      if (response.ok) {
        const answer = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('').trim();
        if (answer) return res.json({ answer, model });
      }
      if (![400, 404].includes(response.status)) return res.status(502).json({ error: data?.error?.message || `Gemini returned HTTP ${response.status}.` });
    }
    return res.status(502).json({ error: 'No configured Gemini model is available for this API key.' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error?.message || 'Server error' });
  }
});

app.listen(PORT, () => console.log(`✅ AI server running at http://localhost:${PORT}`));
