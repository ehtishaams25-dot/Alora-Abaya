async function checkNodeProto() {
  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;
  const desktopNode = await framer.agent.getNode({ id: homeDesktopBp });
  
  console.log("desktopNode keys:", Object.keys(desktopNode));
  console.log("desktopNode proto keys:", Object.getOwnPropertyNames(Object.getPrototypeOf(desktopNode)));
}
return await checkNodeProto();
