async function checkSocial() {
  const qNode = await framer.agent.getNode({ id: "qWfgRQoDM" });
  const tdNode = await framer.agent.getNode({ id: "TDz01QmQg" });
  
  // Find all nodes on the page whose name or text has social / chronicle / journal / lifestyle or ALORA footer
  const allNodes = await framer.agent.getNodesOfTypes({ types: ["FrameNode", "RichTextNode", "WebPageNode"] });
  const foundSocial = [];
  const foundFooter = [];
  
  for (const n of allNodes) {
    const name = (n.name || n.attributes?.name || "").toLowerCase();
    const text = (n.attributes?.text || "").toLowerCase();
    if (name.includes("social") || name.includes("chronicle") || name.includes("journal") || name.includes("lifestyle") || text.includes("lifestyle & journal")) {
      foundSocial.push({ id: n.id, name: n.name || n.attributes?.name, parentId: n.parentId, text: n.attributes?.text });
    }
    if (name.includes("footer") || text.includes("private circle") || text.includes("experience the rare sophistication")) {
      foundFooter.push({ id: n.id, name: n.name || n.attributes?.name, parentId: n.parentId, text: n.attributes?.text });
    }
  }

  return {
    qNodeExists: !!qNode,
    qNodeParent: qNode?.parentId,
    tdNodeName: tdNode?.name || tdNode?.attributes?.name,
    tdNodeParent: tdNode?.parentId,
    foundSocial,
    foundFooter
  };
}
return await checkSocial();
