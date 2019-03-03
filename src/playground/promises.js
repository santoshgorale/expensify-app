const promise = new Promise((resolve, reject) => {
  //   resolve("I am learning ES6 promises resolve");
  setTimeout(() => {
    reject("I am learning ES6 promises reject");
  }, 5000);
});

promise
  .then(data => {
    console.log("data", data);
  })
  .catch(error => {
    console.log("error", error);
  });
