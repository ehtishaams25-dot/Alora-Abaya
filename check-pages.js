async function checkPages() {
  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const info = [];
  for (const p of pages) {
    info.push({
      id: p.id,
      name: p.name,
      path: p.attributes?.path,
      breakpointsCount: p.$breakpoints?.length
    });
  }
  return info;
}
return await checkPages();
