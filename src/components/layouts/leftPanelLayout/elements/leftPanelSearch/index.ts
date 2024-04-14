import { Input } from "@/components/elements/input";

export class LeftPanelSearch extends Input {
  constructor() {
    super({
      type: "search",
      id: "search",
      name: "search",
      placeholder: "Search",
      class: "input threadList_search",
    });
  }
}
