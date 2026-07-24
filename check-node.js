async function check() {
  const node = await framer.agent.getNode({ id: "TDz01QmQg" });
  return {
    id: node?.id,
    name: node?.name,
    children: (node?.children || []).map(c => ({ id: c.id, name: c.name }))
  };
}
return await check();
