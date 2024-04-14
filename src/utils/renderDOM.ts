import type { Block } from "@/system/block";

export function renderDOMBlock(query: string, block: Block | Block[]) {
  const root = document.querySelector(query);

  function appendBlock(block: Block) {
    if (root == null) throw Error("renderDOMBlock: no root element found");
    root.appendChild(block.element);
    block.dispatchComponentDidMount();
  }

  if (Array.isArray(block)) {
    block.forEach(appendBlock);
  } else {
    appendBlock(block);
  }

  return root;
}
