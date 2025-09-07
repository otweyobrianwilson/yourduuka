import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';
import { getDb, getSchema, getDrizzleORM } from './safe-drizzle';

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }
  
  // Get safe database references
  const db = getDb();
  const schema = getSchema();
  const drizzleORM = getDrizzleORM();
  
  if (!db || !schema || !drizzleORM) {
    console.warn('⚠️ Database not available for user query');
    return null;
  }
  
  const { users } = schema;
  const { and, eq, isNull } = drizzleORM;

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  // Get safe database references
  const db = getDb();
  const schema = getSchema();
  const drizzleORM = getDrizzleORM();
  
  if (!db || !schema || !drizzleORM) {
    throw new Error('Database not available');
  }
  
  const { activityLogs, users } = schema;
  const { desc, eq } = drizzleORM;

  return await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      metadata: activityLogs.metadata,
      userName: users.name
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);
}