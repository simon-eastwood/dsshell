window = self;
self.addEventListener('message', event => {
  try {
    const { data } = event;
    if (!data) return;

    const { runtimeHash, pathName, workerFileName } = data;
    if (!workerFileName) return;

    const workerScript = `${pathName}${workerFileName}`;
    self.importScripts(...(runtimeHash ? [`${pathName}runtime.${runtimeHash}.js`, workerScript] : [workerScript]));

    self.workerHandle && self.postMessage(self.workerHandle(data));
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    self.close();
  }
});