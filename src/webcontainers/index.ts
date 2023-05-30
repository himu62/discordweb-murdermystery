import { WebContainer } from "@webcontainer/api";
import files from "@/src/webcontainers/files";

let instance: Singleton;
let webcontainerInstance: WebContainer;

class Singleton {
  constructor() {
    if (!instance) {
      WebContainer.boot().then((wc) => {
        webcontainerInstance = wc;
        webcontainerInstance.mount(files).then(() => {
          webcontainerInstance.spawn("node", ["index.js"]).then((p) => {
            p.output.pipeTo(
              new WritableStream<never>({
                write(data) {
                  console.info("webcontainer|", data);
                },
              })
            );
          });
        });
      });
    }
  }

  get webcontainerInstance() {
    return webcontainerInstance;
  }
}

const singletonInstance = Object.freeze(new Singleton());
export default singletonInstance.webcontainerInstance;
