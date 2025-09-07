import { getUser } from '@/lib/db/queries';
import { createBuildSafeResponse } from '@/lib/build-utils';

export async function GET() {
  // Check if we're in build time and return safe response
  const buildResponse = createBuildSafeResponse({
    user: null,
  });
  
  if (buildResponse) {
    return Response.json(buildResponse);
  }

  const user = await getUser();
  return Response.json(user);
}
