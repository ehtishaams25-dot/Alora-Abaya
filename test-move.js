async function testMove() {
  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;
  const n1 = await framer.agent.getNode({ id: homeDesktopBp });
  console.log("Before move order:", n1.children.map((c, idx) => `${idx}:${c.id}`));
  
  // Try to move index 1 (bFar8Jy4T) to the end by setting its parent
  const dsl = `SET bFar8Jy4T parent="${homeDesktopBp}";`;
  const r = await framer.agent.applyChanges(dsl, { pagePath: "/" });
  console.log("move result:", JSON.stringify(r));
  
  const n2 = await framer.agent.getNode({ id: homeDesktopBp });
  console.log("After move order:", n2.children.map((c, idx) => `${idx}:${c.id}`));

  // Put it back to index 1 if it moved? Or wait, let's see if it moved!
}
return await testMove();
