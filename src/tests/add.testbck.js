const add = (a, b) => a + b;

const generateGreeting = (name = "Anonymous") => `Hello ${name}`;

test("Should add two number", () => {
  const result = add(3, 4);
  expect(result).toBe(7);
  //   if (result != 7) {
  //     throw new Error(`You added 4 and 3. The result was ${result}. Expect 7`);
  //   }
});

test("Should generate greeting from name", () => {
  const greeting = generateGreeting("Santosh");
  expect(greeting).toBe("Hello Santosh");
});

test("Should generate greeting from no name", () => {
  const greeting = generateGreeting();
  expect(greeting).toBe("Hello Anonymous");
});
