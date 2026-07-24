async function run() {
  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const bpId = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;
  console.log("bpId:", bpId);
  try {
    const node1 = await framer.agent.getNode({ id: bpId });
    console.log("getNode({id}) children count:", node1?.children?.length);
    console.log("children sample:", node1?.children?.slice(0, 5));
  } catch (e) {
    console.log("getNode({id}) failed:", e.message);
  }
}
return await run();
