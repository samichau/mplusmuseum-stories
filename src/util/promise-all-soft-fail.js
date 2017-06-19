function softFail(promise) {
  return new Promise((resolve) => {
    promise.then(resolve).catch(resolve);
  });
}

export default function promiseAllSoftFail(promiseArray) {
  return Promise.all(promiseArray.map(softFail)).then(response => response);
}
