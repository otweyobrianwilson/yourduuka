import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  // Basic security check - only allow with proper auth
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

    console.log('🌱 Starting database seeding...');
    
    // Run seed script
    const { stdout, stderr } = await execAsync('npm run db:seed');
    console.log('Seed output:', stdout);
    if (stderr) console.log('Seed warnings:', stderr);

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      output: stdout
    });

  } catch (error: any) {
    console.error('Seeding failed:', error);
    
    // Check if it's a duplicate key error (already seeded)
    if (error.message.includes('duplicate key') || error.message.includes('already exists')) {
      return NextResponse.json({
        success: true,
        message: 'Database already seeded (duplicate key detected)',
        warning: 'Some data may already exist'
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Seeding failed',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Seed endpoint ready. Use POST with Authorization header.',
    usage: 'curl -X POST -H "Authorization: Bearer YOUR_AUTH_SECRET" /api/seed'
  });
}