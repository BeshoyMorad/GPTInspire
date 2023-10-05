import Prompt from "@/models/Prompt";
import { connectToDB } from "@/utils/database";

// GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

// PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id).populate("creator");

    if (!existingPrompt) {
      return new Response(JSON.stringify({ error: "Prompt not found" }), {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

// DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response(
      JSON.stringify({ message: "Prompt deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
