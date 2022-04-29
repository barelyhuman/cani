# API

[Home](/) &nbsp; [API](/api) &nbsp; [Github](https://github.com/barelyhuman/cani)

### `createBouncer`

The factory function responsible to giving out usable auth checkers.
This is what handles the core of the library.

```js
const cani = createBouncer({
  async isOwner({ user, entity }) {
    return user.id === entity.user_id;
  },
  async isAdmin({ user }) {
    const userData = await db("user").where({ id: userId });
    return userData.role === "ADMIN";
  },
});
```

#### `cani`

A curried function that is to be used to trigger all your auth checkers.

example:
If i use the above example's defined rules, it would look something like this.

```js
await cani("isOwner")({
  user,
  entity,
}); //  true | false based on the check result

// checking multiple rules
(await cani("isOwner")({
  user,
  entity,
})) &&
  (await cani("isAdmin")({
    user,
  }));
```

#### composers

The advantage of using functional approaches is that composition is made a lot more easier.

You can use the `combineAnd` function to combine the checkers and run them as one with the AND condition.
You can use the `combineOr` function to combine the checkers and run them as one with the OR condition.

```js
const canDeleteAdminPost = combineAnd(cani("isOwner"), cani("isAdmin"));
await canDeleteAdminPost({
  user,
  entity,
});

const canEditPost = combineOr(cani("isOwner"), cani("isAdmin"));
await canEditPost({
  user,
  entity,
});
```
