import seedData from './seed';
import pool from '../config/database';

const runSeed = async () => {
  try {
    console.log('Starting database seed...');
    await seedData();
    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

runSeed();
