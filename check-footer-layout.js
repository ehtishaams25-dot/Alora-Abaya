async function checkFooter() {
  const node = await framer.agent.getNode({ id: "Nhq4A7BDD" }); // FooterSection
  const topRow = await framer.agent.getNode({ id: "s7lFAmgWL" });
  const brand = await framer.agent.getNode({ id: "nxfPMPbBE" });
  const news = await framer.agent.getNode({ id: "M7GIp1WYX" });
  const cols = await framer.agent.getNode({ id: "fe6w6SU1A" });
  const bottom = await framer.agent.getNode({ id: "CKJJ_r27B" });

  return {
    footer: { id: node?.id, width: node?.attributes?.width, height: node?.attributes?.height, layout: node?.attributes?.layout, gap: node?.attributes?.gap },
    topRow: { id: topRow?.id, width: topRow?.attributes?.width, layout: topRow?.attributes?.layout, stackDistribution: topRow?.attributes?.stackDistribution },
    brandBox: { id: brand?.id, width: brand?.attributes?.width, height: brand?.attributes?.height },
    newsBox: { id: news?.id, width: news?.attributes?.width, height: news?.attributes?.height },
    columns: { id: cols?.id, childrenCount: cols?.children?.length },
    bottomBar: { id: bottom?.id, childrenCount: bottom?.children?.length }
  };
}
return await checkFooter();
