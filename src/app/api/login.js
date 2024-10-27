// pages/api/login.js
import { db } from '../../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      const user = rows[0];

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // If login is successful, set session (NextAuth or custom session setup)
      req.session.user = { id: user.id, username: user.username };
      await req.session.save();

      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Database error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
