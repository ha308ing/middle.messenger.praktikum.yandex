import { IconButtonAttach } from "@/components/elements/iconButton";
import ThreadAPI from "@/api/threadsAPI";
import wsController from "@/controllers/wsController";
import store from "@/system/store";
import { Block } from "@/system/block";

export class AttachButton extends Block {
  constructor() {
    super("label", {
      for: "attach",
      img: "/icon_attach.png",
      settings: { withInternalId: true },
      change: (e: FormDataEvent) => {
        const activeThreadId = store.get("activeThread");
        const files = (e.target as HTMLFormElement).files;
        ThreadAPI.sendFile(files).then(contentId => {
          wsController.sendFile(activeThreadId, contentId);
        });
      },
    });

    this.children.content = new IconButtonAttach();
  }

  render() {
    const template = `<img style="cursor:pointer; width:1.5rem" src={{{img}}} /><input type="file" accept="image/*"  id="attach" style="display:none"/>`;
    return this.compile(template, { ...this.props, content: this.children.content });
  }
}
