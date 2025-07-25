import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../resource'
export const handler: Schema["echo"]["functionHandler"] = async (event, context) => {
  const client = generateClient<Schema>();
   const ratings = await client.models.Rating.list();
  const start = performance.now();
  return {
    content: `Echoing content: ${event.arguments.content} and found ${ratings} ratings`,
    executionDuration: performance.now() - start
  };
};