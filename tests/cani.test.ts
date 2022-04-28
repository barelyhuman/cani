import { test } from "uvu";
import * as assert from "uvu/assert";
import cani from "../src";

cani.define(
  "meetWife",
  async (my: { id: number }, wife: { husbandId: number }) => {
    return my.id === wife.husbandId;
  }
);

test("Simple check should return true", async () => {
  const canDo = await cani.can.meetWife({ id: 1 }, { husbandId: 1 });
  assert.ok(canDo);
});

test("Simple check should return false", async () => {
  const canDo = await cani.can.meetWife({ id: 1 }, { husbandId: 2 });
  assert.not.ok(canDo);
});

test.run();
