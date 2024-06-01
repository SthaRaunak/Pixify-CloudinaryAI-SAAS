import { clerkClient } from "@clerk/nextjs/server";
import { type WebhookEvent } from "@clerk/nextjs/server"; import { headers } from "next/headers"; import { NextResponse } from "next/server";
//svix to verify webhook signature
import { Webhook } from "svix";

//actions
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to env or env.local"
    );
  }

  // get the headers

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers , error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body

  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with the secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  //Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.log("Error verifying webhook:", error);
    return new Response("Error occured", { status: 400 });
  }

  //Get the Id and type

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with an ID of ${id}  and type of ${eventType}`);
  console.log("Webhook body:", body);
  // CREATE

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    } as CreateUserParams;

    const newUser = await createUser(user);

    //set public metadata
    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({
      message: "OK",
      user: newUser,
    });
  }

  if (eventType === "user.updated") {
    const { id, image_url, first_name, last_name, username } = evt.data;

    const user = {
      firstName: first_name,
      lastName: last_name,
      username: username,
      photo: image_url,
    } as UpdateUserParams;

    const updatedUser = await updateUser(id, user);

    return NextResponse.json({ message: "OK", user: updateUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (!id) {
      return new Response("User Deletion Error: Id not provided", {
        status: 400,
      });
    }
    const deletedUser = await deleteUser(id);
    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  return new Response("", { status: 200 });
}
