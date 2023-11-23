function renderDOM(rootSelector: string, ...element: HTMLElement[]) {
  const rootNode = document.querySelector(rootSelector);
  if (rootNode == null) throw new Error("renderDOM: rootNode is not found");
  rootNode.innerHTML = "";
  rootNode.append(...element);
}

export default renderDOM;
