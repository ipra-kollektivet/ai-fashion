import { Pool } from 'pg';
import { User } from './types/auth';
import dotenv from 'dotenv';
dotenv.config();

// Database connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
export const connectToDatabase = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');
    client.release();
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};

// Create users table
export const createUsersTable = async (): Promise<void> => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createUsersTable);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (
  email: string,
  name: string,
  hashedPassword: string
): Promise<User> => {
  const query = `
    INSERT INTO users (email, name, password)
    VALUES ($1, $2, $3)
    RETURNING id, email, name, created_at;
  `;

  try {
    const result = await pool.query(query, [email, name, hashedPassword]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Find user by email (for login)
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const query = `
    SELECT id, email, name, password, created_at
    FROM users
    WHERE email = $1;
  `;

  try {
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

// Close database connection
export const closeDatabase = async (): Promise<void> => {
  try {
    await pool.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database:', error);
    throw error;
  }
};
