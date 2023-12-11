import type Component from "@/system/component";

function renderDOM(rootSelector: string, ...element: HTMLElement[]) {
  const rootNode = document.querySelector(rootSelector);
  if (rootNode == null) throw new Error("renderDOM: rootNode is not found");
  rootNode.innerHTML = "";
  rootNode.append(...element);
}

export function renderDOMComponent(rootSelector: string, ...component: Component[]) {
  const rootNode = document.querySelector(rootSelector);
  if (rootNode == null) throw new Error("renderDOM: rootNode is not found");
  rootNode.innerHTML = "";
  rootNode.append(...component.map(c => c.content));
}

export default renderDOM;
