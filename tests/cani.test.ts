import { test } from "uvu";
import * as assert from "uvu/assert";
import { createBouncer } from "../src";

const { cani, combine } = createBouncer({
  async isPostOwner({ user, post }) {
    return user?.id === post?.userId;
  },
  async isAdmin({ user }) {
    return user?.role === "ADMIN";
  },
});

test("Should only allow owner", async () => {
  const allow = await cani("isPostOwner")({
    user: { id: 1 },
    post: { userId: 1 },
  });

  const notAllowed = await cani("isPostOwner")({
    user: { id: 1 },
    post: { userId: 2 },
  });

  assert.ok(allow);
  assert.not.ok(notAllowed);
});

test("should allow admin to delete only own post", async () => {
  // FIX: handle different param function types
  // @ts-ignore
  const canDeletePost = await combine(
    {
      user: { role: "ADMIN", id: 1 },
      post: {
        userId: 1,
      },
    },
    cani("isAdmin"),
    cani("isPostOwner")
  );

  assert.ok(canDeletePost);
});

test.run();
