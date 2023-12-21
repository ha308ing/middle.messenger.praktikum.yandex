import { test, expect, jest, afterEach, describe } from "@jest/globals";
import Component from "@/system/component";
import userEvent from "@testing-library/user-event";
import { getByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom/jest-globals";

class Icon extends Component {
  constructor(props: Record<string, any>) {
    super("img", { alt: "img", "data-testid": "icon", ...props });
  }

  protected _setTemplate(): string | null {
    return ``;
  }
}

const clickMock = jest.fn(x => x);
class Button extends Component {
  constructor() {
    super("button", {
      icon: new Icon({ alt: "button" }),
      username: "Peter",
      click: clickMock,
      "data-testid": "button",
      class: "button",
      style: "color:red",
    });
  }

  protected _setTemplate(): string | null {
    return `{{{icon}}}{{username}}`;
  }
}

const testComp = new Button();
const root = document.createElement("div");
root.setAttribute("id", "root");
root.appendChild(testComp.content);
const buttonElement = getByTestId(root, "button");
const iconElement = getByTestId(root, "icon");

afterEach(() => {
  jest.clearAllMocks();
});

describe("Component", () => {
  describe("internal methods", () => {
    test("component did update should return true on similar objects", () => {
      expect(testComp.componentDidUpdate({ a: { b: 1, c: { d: 2 } } }, { a: { b: 1, c: { d: 2 } } })).toBe(true);
    });

    test("compile should return document fragment", () => {
      const expectedDF = new DocumentFragment();
      const el = document.createElement("div");
      el.textContent = "Peter";
      expectedDF.append(el);

      expect(testComp.compile("<div>{{username}}</div>", { username: "Peter" })).toEqual(expectedDF);
    });

    test("createDocumentElement should create empty tag", () => {
      const span = testComp.createDocumentElement("span");

      expect(span).toContainHTML("<span></span>");
    });

    test("setProps updates component", () => {
      const currentContent = buttonElement.textContent;
      testComp.setProps({ username: "Retep" });
      const newContent = buttonElement.textContent;
      expect(currentContent).not.toBe(newContent);
      expect(buttonElement).toHaveTextContent("Retep");
    });
  });

  describe("should set attributes, events and children", () => {
    test("child element", () => {
      expect(buttonElement).toContainElement(iconElement);
    });

    test("child element has props set in parent", () => {
      expect(iconElement).toHaveAttribute("alt", "button");
    });

    test("events should be fired", async () => {
      const user = userEvent.setup();

      await user.click(buttonElement);

      expect(clickMock).toBeCalled();
    });

    test("set class", () => {
      expect(buttonElement).toHaveClass("button");
    });

    test("set style", () => {
      expect(buttonElement).toHaveStyle({ color: "red" });
    });

    test("set data-testid", () => {
      expect(buttonElement).toHaveAttribute("data-testid", "button");
    });
  });
});
