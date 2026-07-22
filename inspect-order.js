async function inspectAll() {
  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;
  const desktopNode = await framer.agent.getNode({ id: homeDesktopBp });
  
  const detailed = [];
  for (let i = 0; i < desktopNode.children.length; i++) {
    const c = desktopNode.children[i];
    const node = await framer.agent.getNode({ id: c.id });
    let previewText = "";
    if (node.children && node.children.length > 0) {
      for (const sub of node.children.slice(0, 3)) {
        const subNode = await framer.agent.getNode({ id: sub.id });
        if (subNode.attributes?.text) previewText += `[${subNode.attributes.text.substring(0, 30)}] `;
      }
    }
    detailed.push({
      index: i,
      id: node.id,
      name: node.name,
      width: node.attributes?.width || node.width,
      height: node.attributes?.height || node.height,
      previewText
    });
  }
  return detailed;
}
return await inspectAll();
