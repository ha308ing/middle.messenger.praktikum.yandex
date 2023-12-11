import Input from "@/components/elements/input";

export class LeftPanelSearch extends Input {
  constructor() {
    super(
      "div",
      {
        type: "search",
        id: "search",
        name: "search",
        placeholder: "Search",
      },
      "threadList_search"
    );
  }
}
