import { WebContainer } from "@webcontainer/api";
import files from "@/src/webcontainers/files";

let instance: Singleton;
let webcontainerInstance: WebContainer;

class Singleton {
  constructor() {
    if (!instance) {

        (async () => {
            webcontainerInstance = await WebContainer.boot();
            await webcontainerInstance.mount(files);

            const installProcess = await webcontainerInstance.spawn("npm", ["ci"]);
            installProcess.output.pipeTo(new WritableStream<never>({
                write(data) {
                    console.info("webcontainer|npm ci|", data);
                }
            }))
            await installProcess.exit;

            const process = await webcontainerInstance.spawn("ts-node", ["index.ts"]);
            process.output.pipeTo(new WritableStream<never>({
                write(data) {
                    console.info("webcontainer|ts-node index.ts|", data);
                }
            }));
            await process.exit;
        })();

    
      }
    }

  get webcontainerInstance() {
    return webcontainerInstance;
  }
}

const singletonInstance = Object.freeze(new Singleton());
export default singletonInstance.webcontainerInstance;
