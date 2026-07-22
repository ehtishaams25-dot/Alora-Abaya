async function testInsert() {
  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;

  // Test 1: index="8"
  const dsl1 = `
    +FrameNode TestNode1 parent="${homeDesktopBp}" index="8";
    SET TestNode1 width="1440px" height="500px";
  `;
  const r1 = await framer.agent.applyChanges(dsl1, { pagePath: "/" });
  console.log("r1:", JSON.stringify(r1));
  const n1 = await framer.agent.getNode({ id: homeDesktopBp });
  console.log("Children order after r1:", n1.children.map((c, idx) => `${idx}:${c.id}:${c.name}`));
  await framer.removeNodes([r1?.renamedIds?.TestNode1].filter(Boolean));

  // Test 2: before="TDz01QmQg"
  const dsl2 = `
    +FrameNode TestNode2 parent="${homeDesktopBp}" before="TDz01QmQg";
    SET TestNode2 width="1440px" height="500px";
  `;
  const r2 = await framer.agent.applyChanges(dsl2, { pagePath: "/" });
  console.log("r2:", JSON.stringify(r2));
  const n2 = await framer.agent.getNode({ id: homeDesktopBp });
  console.log("Children order after r2:", n2.children.map((c, idx) => `${idx}:${c.id}:${c.name}`));
  await framer.removeNodes([r2?.renamedIds?.TestNode2].filter(Boolean));
}
return await testInsert();
