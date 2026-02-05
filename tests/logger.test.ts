import { describe, it, expect } from "vitest";
import { createLogger } from "../src";

describe("Logger", () => {
  it("should create a logger instance", () => {
    const log = createLogger("test");
    expect(log).toBeDefined();
  });
});