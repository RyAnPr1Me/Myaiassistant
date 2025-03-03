// pages/api/auth.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const users = []; // For production, use a persistent database.
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const { method } = req;
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
  
  const { action, username, password } = req.body;
  if (!action || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  
  try {
    if (action === 'register') {
      const existingUser = users.find(user => user.username === username);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { username, password: hashedPassword };
      users.push(newUser);
      return res.status(201).json({ message: 'User registered successfully.' });
    } else if (action === 'login') {
      const user = users.find(user => user.username === username);
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials.' });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid credentials.' });
      }
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } else {
      return res.status(400).json({ error: 'Invalid action.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
