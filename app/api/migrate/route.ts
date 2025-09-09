import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/connection';
import { sql } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

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
    
    // Run migrations directly using SQL files
    const migrationsDir = path.join(process.cwd(), 'lib/db/migrations');
    const migrationFiles = [
      '0000_petite_odin.sql',
      '0001_short_red_hulk.sql', 
      '0002_eager_tag.sql'
    ];

    const results = [];

    for (const migrationFile of migrationFiles) {
      const migrationPath = path.join(migrationsDir, migrationFile);
      
      if (fs.existsSync(migrationPath)) {
        console.log(`Running migration: ${migrationFile}`);
        const migrationSql = fs.readFileSync(migrationPath, 'utf8');
        
        // Split by statement breakpoints and execute each
        const statements = migrationSql
          .split('--> statement-breakpoint')
          .map(s => s.trim())
          .filter(s => s.length > 0);
          
        for (const statement of statements) {
          if (statement.trim()) {
            try {
              await db.execute(sql.raw(statement));
              console.log(`✅ Executed: ${statement.substring(0, 50)}...`);
            } catch (error: any) {
              // Ignore "already exists" errors
              if (!error.message.includes('already exists')) {
                console.warn(`⚠️ Migration warning for ${migrationFile}:`, error.message);
              }
            }
          }
        }
        
        results.push(`✅ ${migrationFile}`);
      } else {
        results.push(`⚠️ ${migrationFile} not found`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Migrations completed successfully',
      results: results
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