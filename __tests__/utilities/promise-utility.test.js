import "regenerator-runtime/runtime";
import { expect, test, describe, beforeEach, vi } from "vitest";
import { debounceToPromise, enqueue } from "../../src/utilities/promise-utility";

const data = {};
beforeEach(() => {
  function myFunc(p1, delay = 0, error = null) {
    return new Promise((resolve, reject) => {
      setTimeout(() => (error ? reject(Error(error)) : resolve(p1)), delay);
    });
  }

  data.func = myFunc;
  data.spyFunc = vi.spyOn(data, "func");
  data.fnListSuccess = [() => data.func(1, 25), () => data.func(2, 10), () => data.func(3, 15), () => data.func(4, 5)];
  data.errorMessage = "bad parameter";
  data.fnListWithError = [() => data.func(1, 25), () => data.func(2, 10, data.errorMessage), () => data.func(3, 15), () => data.func(4, 5)];
});

// debounce
describe("testing debounceToPromise", () => {
  test("debounce a function resulting in a Promise", async () => {
    const debouncedFunc = debounceToPromise(data.func, 25);
    const result = await Promise.race([debouncedFunc(1), debouncedFunc(2), debouncedFunc(3)]);

    expect(data.spyFunc.mock.calls.length).toBe(1);
    expect(result).toBe(3);
  });
});

// test with Promises
describe("testing enqueue on Promise functions", () => {
  test("enqueue a collection of functions resulting in a Promise and execute in order", () => {
    return enqueue(data.fnListSuccess).then((result) => {
      expect(data.spyFunc.mock.calls.length).toBe(data.fnListSuccess.length);
      expect(result).toEqual([1, 2, 3, 4]);
    });
  });
  test("enqueue a collection of functions resulting in a Promise with at least 1 error response", () => {
    return enqueue(data.fnListWithError).catch((results) => {
      expect(data.spyFunc.mock.calls.length).toBe(data.fnListWithError.length);
      expect(data.spyFunc.mock.results[1].value).instanceOf(Error);
      expect(data.spyFunc.mock.results[1].value.message).toBe(data.errorMessage);
      expect(results).toEqual([1, Error(data.errorMessage), 3, 4]);
    });
  });
});
// test async
describe("testing enqueue on async functions", () => {
  test("enqueue a collection of async functions and execute in order", async () => {
    await expect(enqueue(data.fnListSuccess)).resolves.toEqual([1, 2, 3, 4]);
    await expect(data.spyFunc.mock.calls.length).toBe(data.fnListSuccess.length);
  });
  test("enqueue a collection of async functions with at least 1 error response", async () => {
    try {
      await enqueue(data.fnListWithError);
    } catch (results) {
      expect(data.spyFunc.mock.calls.length).toBe(data.fnListWithError.length);
      expect(results).toEqual([1, Error(data.errorMessage), 3, 4]);
    }
  });
});
