const { connectToDatabase } = require('./db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mobile, fullName, username, password, birthday, gender } = req.body;
  if (!mobile || !fullName || !username || !password) {
    return res.status(400).json({ error: 'mobile, fullName, username, and password required' });
  }

  const { db } = await connectToDatabase();
  await db.collection('data').insertOne({
    type: 'signup', mobile, fullName, username, password, birthday, gender, receivedAt: new Date().toISOString()
  });

  return res.status(200).json({ ok: true });
};
