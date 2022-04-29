# Docs

### API Reference

[API Docs &rarr;](/api)

### The Why

This library was created to unify authentication guards and also add a little structure to it while taking advantage of typescript

In most cases you really won't need this library, as it's just a wrapper around simple functions that you can write and export yourself.

Without this library this is how you'd write authorization guards

```js
export const isOwner = (user, entity) => user.id === entity.user_id;

export const isAdmin = async (userId) =>
  (await db("user").where({ id: userId })).role === "ADMIN";
```

With the library, you'll still be writing them in the same way but wrap it with the library's factory function.

```ts
// guards.js / guards.ts
import { createBouncer } from "@barelyhuman/cani";

export const cani = createBouncer({
  async isOwner(user, entity) {
    return user.id === entity.user_id;
  },
  async isAdmin(user, entity) {
    const userData = await db("user").where({ id: userId });
    return userData.role === "ADMIN";
  },
});
```

```ts
// responseHandler.js
import { cani } from "./guards";

function responseHandler(req, res) {
  if (!(await cani("isOwner")(user, entity))) {
    ///  ^^^ typesafe, so `isOwner` will be available in your editors intellisense
    res.status(403).send({ message: "Can't do it, you don't own it" });
  }
}
```
