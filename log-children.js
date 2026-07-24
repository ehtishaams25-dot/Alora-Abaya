async function logChildren() {
  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;
  const desktopNode = await framer.agent.getNode({ id: homeDesktopBp });
  
  console.log(`=== DESKTOP (${homeDesktopBp}) CHILDREN (${desktopNode.children.length}) ===`);
  for (let i = 0; i < desktopNode.children.length; i++) {
    const c = desktopNode.children[i];
    const n = await framer.agent.getNode({ id: c.id });
    console.log(`[${i}] ID=${n.id} Name="${n.name || n.attributes?.name}" (width=${n.width || n.attributes?.width}, height=${n.height || n.attributes?.height})`);
    if (n.children) {
      console.log(`    Subchildren (${n.children.length}): ${n.children.map(sub => sub.name || sub.id).join(", ")}`);
    }
  }
}
return await logChildren();
