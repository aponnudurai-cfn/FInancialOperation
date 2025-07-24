import { type ClientSchema, 
  a, 
  defineData, 
  defineFunction } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/

const echo = defineFunction({
  entry: './echo/echo.ts'
})

const signUpForNewsletter = defineFunction({
  entry: './signup/signup.ts'
});

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      isDone: a.boolean(),
      TodoType: a.enum(["weekdays", "weekend", "other"]),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Rating: a
    .model({
      id: a.id().required(),
      Subject: a.string(),
      Year: a.integer(),
      Semester: a.integer(),
      Ranking: a.integer(),
    })
    .secondaryIndexes((index) => [
      index("Subject").sortKeys(["Year", "Semester", "Ranking"]),
      index("Year").sortKeys(["Semester", "Ranking"])
    ])
    .authorization((allow) => [allow.publicApiKey()]),
  Course: a.model({
    id: a.id(),
    courseName: a.string().required(),
    lessons: a.hasMany('Lesson', 'courseId')
  }).authorization((allow) => [allow.publicApiKey()]),
  Lesson: a.model({
    id: a.id(),
    title: a.string().required(),
    courseId: a.id().required(), // foreign key to Course
    course: a.belongsTo("Course", "courseId")
  }).authorization((allow) => [allow.publicApiKey()]),
  CustomerAddress: a.customType({
    street: a.string(),
    city: a.string(),
    state: a.string(),
    zip: a.string(),
  }),
  Customer: a.model({
    id: a.id(),
    name: a.string(),
    address: a.ref('CustomerAddress'),
  }).authorization((allow) => [allow.publicApiKey()]),

  EchoResponse:a.customType({
    content: a.string(),
    executionDuration: a.float()}),
   echo: a
    .query()
    .arguments({
      content: a.string()
    })
    .handler(a.handler.function(echo))
    .returns(a.ref('EchoResponse'))
    .authorization(allow => [allow.publicApiKey()]),
    

    signUpForNewsletter: a.mutation()
      .arguments({
        email: a.email()
      })
      .handler(a.handler.function(signUpForNewsletter).async())
      .authorization((allow) => allow.guest())
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
