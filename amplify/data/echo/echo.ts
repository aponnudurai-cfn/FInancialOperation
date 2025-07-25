import type { Schema } from "../resource";

// manually type the function context
export const handler = async (
  context: {
    arguments: {
      content?: string;
    };
    db: {
      Rating: {
        list: () => Promise<{ items: { id: string }[] }>;
      };
    };
  }
) => {
  const start = performance.now();

  const { items: ratings } = await context.db.Rating.list();

  return {
    content: `Echoing content: ${context.arguments.content} and found ${ratings.length} ratings`,
    executionDuration: performance.now() - start,
  };
};
