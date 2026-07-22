async function run() {
  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const home = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const bp = home.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || home.children?.[0]?.id;
  const node = await framer.agent.getNode({ id: bp });
  console.log("=== CANVAS VERIFICATION ===");
  console.log("Desktop children count:", node.children?.length);
  node.children?.forEach((c, i) => {
    console.log(`[${i}] ${c.name || "Frame"} (ID: ${c.id})`);
  });
}
return await run();
