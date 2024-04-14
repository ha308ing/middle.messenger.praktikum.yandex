import { Input } from "@/components/elements/input";

export class InputFindUser extends Input {
  constructor() {
    super({
      class: "findUser searchContainer",
      type: "text",
      name: "findUser",
      placeholder: "Find user (enter login)",
    });
  }
}
