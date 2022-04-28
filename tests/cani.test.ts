import { test } from "uvu";
import * as assert from "uvu/assert";
import cani from "../src";

// use returned set of definition
const { can } = cani.define(
  "meetWife",
  async (my: { id: number }, wife: { husbandId: number }) => {
    return my.id === wife.husbandId;
  }
);

// define other stuff somewhere before execution

cani.define(
  "meetWithGirlfriend",
  async (my: { id: number; hasWife: true }, girlFriend: { bfId: number }) => {
    return !my.hasWife && my.id === girlFriend.bfId;
  }
);

test("Simple check should return true", async () => {
  const canDo = await can.meetWife({ id: 1 }, { husbandId: 1 });
  assert.ok(canDo);
});

test("Simple check should return false", async () => {
  const canDo = await can.meetWife({ id: 1 }, { husbandId: 2 });
  assert.not.ok(canDo);
});

test("additional definitions should return true", async () => {
  const canDo = await can.meetWithGirlfriend(
    { id: 1, hasWife: false },
    { bfId: 1 }
  );
  assert.ok(canDo);
});

test("additional definitions should return false", async () => {
  const canDo = await can.meetWithGirlfriend(
    { id: 1, hasWife: true },
    { bfId: 1 }
  );
  assert.not.ok(canDo);
});

test.run();
