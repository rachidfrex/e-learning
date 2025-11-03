import createTables from './init';
import pool from '../config/database';

const runMigrations = async () => {
  try {
    console.log('Running database migrations...');
    await createTables();
    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

runMigrations();
