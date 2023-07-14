type FileSystemSyncAccessHandle = {
  close: () => Promise<undefined>;
  flush: () => Promise<undefined>;
  getSize: () => Promise<number>;
  read: (
    buffer: ArrayBuffer | ArrayBufferView,
    options?: { at: number }
  ) => Promise<number>;
  write: (
    buffer: ArrayBuffer | ArrayBufferView,
    options?: { at: number }
  ) => Promise<number>;
};

type FileHandle = FileSystemFileHandle & {
  createSyncAccessHandle: () => Promise<FileSystemSyncAccessHandle>;
};

export const saveFile = (key: string, file: File): Promise<undefined> => {
  return new Promise((resolve) => {
    // navigator.storage.getDirectory は HTTPS が必須
    if (
      typeof navigator?.storage !== "undefined" &&
      location.protocol === "https:"
    ) {
      (async () => {
        const root = await navigator.storage.getDirectory();
        console.log(root);
        console.log(key);
        const h = (await root.getFileHandle(key, {
          create: true,
        })) as FileHandle;
        console.log("hogehogehogehoge", h);
        const c = await h.createSyncAccessHandle();
        console.log("hogehogehogehoge2", c);
        await c.write(await file.arrayBuffer());
        console.log("hogehogehogehoge3");
        await c.flush();
        console.log("hogehogehogehoge4");
        await c.close();
        resolve(undefined);
      })();
    } else {
      console.error("storageにアクセスできません。");
      resolve(undefined);
    }
  });
};

export const loadFile = (key: string): Promise<DataView | undefined> => {
  return new Promise((resolve) => {
    // navigator.storage.getDirectory は HTTPS が必須
    if (
      typeof navigator?.storage !== "undefined" &&
      location.protocol === "https:"
    ) {
      (async () => {
        const root = await navigator.storage.getDirectory();
        const h = (await root.getFileHandle(key)) as FileHandle;
        console.log("hogehogehogehoge", h);
        const c = await h.createSyncAccessHandle();
        console.log("hogehogehogehoge2", c);

        const buffer = new DataView(new ArrayBuffer(await c.getSize()));
        await c.read(buffer, { at: 0 });
        console.log("hogehogehogehoge3");
        await c.close();
        resolve(buffer);
      })();
    } else {
      console.error("storageにアクセスできません。");
      resolve(undefined);
    }
  });
};
