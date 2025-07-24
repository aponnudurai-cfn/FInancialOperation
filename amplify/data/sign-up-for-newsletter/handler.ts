import type { Schema } from '../resource'

export const handler: Schema["signUpForNewsletter"]["functionHandler"] = async (event, context) => {
  const start = performance.now();
  console.log(`Signing up for newsletter with email: ${event.arguments.email}`);
};