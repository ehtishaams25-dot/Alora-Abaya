async function inspect() {
  const sec = await framer.agent.getNode({ id: "k3UPdw1ry" });
  const track = await framer.agent.getNode({ id: "kdFf4IfFR" });
  return {
    secAttr: sec?.attributes,
    trackAttr: track?.attributes,
    card1Attr: track?.children?.[0]?.attributes,
    card2Attr: track?.children?.[1]?.attributes,
    card3Attr: track?.children?.[2]?.attributes
  };
}
return await inspect();
