import express from 'express';
import cors from 'cors';
// import { Pool } from 'pg';
import dotenv from 'dotenv';
import { connectToDatabase, createUsersTable } from './database';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

connectToDatabase()
  .then(() => createUsersTable())
  .catch((error) => {
    console.error('Error initializing database:', error);
    process.exit(1); // Exit the application if database connection fails
  });

// Test database connection
// pool.connect((err, client, release) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//   } else {
//     console.log('Connected to PostgreSQL database');
//     release();
//   }
// });

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'AI Stylist API Server is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
