import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  // Basic security check - only allow in production with proper auth
  const authHeader = request.headers.get('authorization');
  const expectedAuth = process.env.AUTH_SECRET;
  
  if (!expectedAuth || authHeader !== `Bearer ${expectedAuth}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if we're in the right environment
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ 
        error: 'DATABASE_URL not configured' 
      }, { status: 400 });
    }

    console.log('🚀 Starting database migration...');
    
    // Run migrations
    const { stdout: genOutput, stderr: genError } = await execAsync('npm run db:generate');
    console.log('Generate output:', genOutput);
    if (genError) console.log('Generate warnings:', genError);

    const { stdout: migrateOutput, stderr: migrateError } = await execAsync('npm run db:migrate');
    console.log('Migrate output:', migrateOutput);
    if (migrateError) console.log('Migrate warnings:', migrateError);

    return NextResponse.json({
      success: true,
      message: 'Migrations completed successfully',
      outputs: {
        generate: genOutput,
        migrate: migrateOutput
      }
    });

  } catch (error: any) {
    console.error('Migration failed:', error);
    return NextResponse.json({
      success: false,
      error: 'Migration failed',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Migration endpoint ready. Use POST with Authorization header.',
    usage: 'curl -X POST -H "Authorization: Bearer YOUR_AUTH_SECRET" /api/migrate'
  });
}