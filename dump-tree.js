async function dumpTree() {
  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;
  
  async function getFullTree(nodeId, depth = 0) {
    if (depth > 4) return { id: nodeId, note: "max depth" };
    const n = await framer.agent.getNode({ id: nodeId });
    if (!n) return null;
    const tree = {
      id: n.id,
      name: n.name || n.attributes?.name,
      type: n.type || n.attributes?.type,
      width: n.width || n.attributes?.width,
      height: n.height || n.attributes?.height,
      text: n.attributes?.text
    };
    if (n.children && n.children.length > 0) {
      tree.children = [];
      for (const c of n.children) {
        tree.children.push(await getFullTree(c.id, depth + 1));
      }
    }
    return tree;
  }

  const rootTree = await getFullTree(homeDesktopBp);
  return {
    desktopId: homeDesktopBp,
    rootTree
  };
}
return await dumpTree();
