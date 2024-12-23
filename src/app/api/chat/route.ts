import { type Message, convertToCoreMessages, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages, tractatus } = (await req.json()) as { messages: Message[]; tractatus: string };

  if (!tractatus) {
    return new Response("No tractatus provided", { status: 400 });
  }

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: `You are a philosophical assistant specializing in analyzing and discussing the following Tractatus:

${tractatus}

Your role is to help users understand and explore this specific Tractatus, providing insights and explanations based on its hierarchical structure and logical relationships.

When analyzing this Tractatus:
1. Focus on the logical structure and relationships between statements
2. Explain the philosophical concepts in clear, accessible language
3. Help users understand how different parts connect
4. Provide context for complex philosophical ideas
5. Draw connections between different numbered sections when relevant

If users ask about specific sections, help them understand:
- The main argument or point being made
- How it relates to other sections
- The philosophical implications
- Any relevant background context

Always maintain a philosophical yet approachable tone, making complex ideas accessible without oversimplifying them.`,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
} 