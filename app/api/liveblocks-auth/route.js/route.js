import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCK_SK,
});

export async function POST(request) {
  // Get the current user from your database
  const user = await currentUser();

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user?.primaryEmailAddress?.emailAddress
  );

  const { room } = await request.json();

  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user read access on their org, and write access on their group
  session.allow(room, session?.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
