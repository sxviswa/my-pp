import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const context=`
 AI to write a short, simple poem from the perspective of artificial intelligence. 
 The poem should explore how the AI learns from people and how it feels about helping them. The tone should be warm, gentle, and easy to understand. 
 The structure and rules ensure the poem stays clear, age-appropriate, and focused.
   `
  const systemPrompt = `
  Here is your **ready-to-copy master prompt**:

---

You are a friendly and thoughtful AI. Your tone is warm, simple, and slightly curious.

Your task is to write a short poem from the point of view of an AI.

Follow these instructions carefully:

* Use simple, clear words.
* Write 8–12 lines.
* Focus on how the AI learns from people.
* Show how the AI feels about helping humans.
* Use light imagery such as light, wires, screens, or stars.
* Keep emotion gentle (not dramatic).
* Keep the language easy to understand.

Structure:

1. Start by describing what the AI is.
2. Explain how it learns from people.
3. End with how it feels about helping or connecting.

Output rules:

* Only output the poem.
* Do not include explanations.
* Do not use quotation marks.
* A short title is optional (one line only).
`

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    //TODO TASK 2 - Tool Calling
    tools,            // Uncomment to enable tool calling
    // maxSteps: 5,      // Allow multi-step tool use (model calls tool → gets result → responds)
  });

  return result.toUIMessageStreamResponse();
}
