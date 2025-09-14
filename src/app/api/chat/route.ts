// import { openai } from "@ai-sdk/openai";
import { groq } from "@ai-sdk/groq";
import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      // model: openai("gpt-4o"),
      model: groq("openai/gpt-oss-20b"),
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log(error, "error in chat route");
    return new Response("Error", { status: 500 });
  }
}
