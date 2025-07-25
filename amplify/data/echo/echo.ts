import { type Schema } from "../resource"; // adjust path if needed

export const handler: Schema["echo"]["functionHandler"] = async (context) => {
  const start = performance.now();

  // ✅ This only works if the context is properly typed
  const { items: ratings } = await context.db.Rating.list();

  return {
    content: `Echoing content: ${context.arguments.content} and found ${ratings.length} ratings`,
    executionDuration: performance.now() - start,
  };
};
