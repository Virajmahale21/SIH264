// ==========================================
// Environment & Runtime Safety Validator
// ==========================================

export function validateEnv() {
  const isProduction = process.env.NODE_ENV === 'production';
  const warnings = [];

  // Check critical variables
  if (!process.env.JWT_SECRET) {
    if (isProduction) {
      throw new Error('FATAL: JWT_SECRET environment variable is missing in production!');
    } else {
      process.env.JWT_SECRET = 'aicte-sih-2026-development-fallback-secret-key-change-me';
      warnings.push('JWT_SECRET not set; falling back to development default.');
    }
  }

  if (!process.env.DATABASE_URL) {
    if (isProduction) {
      throw new Error('FATAL: DATABASE_URL environment variable is missing in production!');
    } else {
      process.env.DATABASE_URL = 'file:../prisma/dev.db';
      warnings.push('DATABASE_URL not set; using default SQLite database file.');
    }
  }

  // Display startup health advice
  if (warnings.length > 0 && process.env.NODE_ENV !== 'test') {
    console.log('⚠️  Configuration Notices:');
    warnings.forEach(w => console.log(`   - ${w}`));
  }

  return {
    valid: true,
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5001
  };
}
