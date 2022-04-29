import { test } from "uvu";
import * as assert from "uvu/assert";
import { combineAnd, createBouncer } from "../src";

interface User {
  id: number;
  role?: string;
}

interface Post {
  userId: number;
}

const cani = createBouncer({
  async isPostOwner({ user, post }: { user: User; post: Post }) {
    return user.id === post.userId;
  },
  async isAdmin({ user }: { user: User }) {
    return user.role === "ADMIN";
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
  const canDeletePost = combineAnd(cani("isAdmin"), cani("isPostOwner"));

  const result = await canDeletePost({
    user: { role: "ADMIN", id: 1 },
    post: {
      userId: 1,
    },
  });

  assert.ok(result);
});

test.run();
