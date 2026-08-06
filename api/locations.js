const { connectToDatabase } = require('./db');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { db } = await connectToDatabase();
  const data = await db.collection('data').find({}).sort({ receivedAt: -1 }).toArray();
  return res.status(200).json(data);
};
