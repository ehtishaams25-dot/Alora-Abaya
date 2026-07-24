async function checkShop() {
  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const shop = pages.find(p => p.attributes?.path === "/shop" || p.id === "kvk2d5CZR");
  const webPage = pages.find(p => p.id === "sscDaPktU");

  async function dumpNode(p) {
    if (!p) return null;
    const bp = p.$breakpoints?.[0] || p.children?.[0];
    const node = bp ? await framer.agent.getNode({ id: bp.id }) : null;
    return {
      id: p.id,
      name: p.name,
      path: p.attributes?.path,
      bpId: bp?.id,
      children: (node?.children || []).map(c => ({ id: c.id, name: c.name }))
    };
  }

  return {
    shop: await dumpNode(shop),
    webPage: await dumpNode(webPage)
  };
}
return await checkShop();
