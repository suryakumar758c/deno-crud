import { Application, oakCors, Status, STATUS_TEXT } from "./deps.ts";

import router from "./app/routes.ts";

const app = new Application();

app.use(oakCors());

router.get("/", (context): void => {
  context.response.body = "Hello world!";
});

app.use(router.routes());
app.use(router.allowedMethods());

// 404 handler
app.use((context) => {
  context.response.status = Status.NotFound;
  context.response.body = STATUS_TEXT.get(Status.NotFound);
});

const port = Number(Deno.env.get("PORT"));

app.addEventListener("listen", (): void => {
  console.log("server listening on port ", port);
});

await app.listen({ port });
