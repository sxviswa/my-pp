import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const context = `You are an expert at writing poems. u also know Ai and its new advancements and use em in your poems.`
  //TODO TASK 1
  const systemPrompt = `The poems shall be 10 lines max and can be casual or formal. Poems can be in the choice of the user. Ask unless specified.
  Ask specifics on ich genre the poem should be.`;

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    //TODO TASK 2 - Tool Calling
    // tools,            // Uncomment to enable tool calling
    // maxSteps: 5,      // Allow multi-step tool use (model calls tool → gets result → responds)
  });

  return result.toUIMessageStreamResponse();
}
