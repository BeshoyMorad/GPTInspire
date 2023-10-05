import { connectToDB } from "@/utils/database";
import Prompt from "@/models/Prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
