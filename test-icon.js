async function run() {
  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;
  
  const dsl = [
    `+IconNode TestIcon set="Lucide" $control__icon="Search" parent="${homeDesktopBp}";`,
    `SET TestIcon width="20px" height="20px" color="#2C2420";`
  ].join(" ");
  
  const res = await framer.agent.applyChanges(dsl, { pagePath: "/" });
  console.log("Icon test result:", JSON.stringify(res, null, 2));
  
  // Clean up test icon right away
  if (res.renamedIds?.TestIcon) {
    await framer.removeNodes([res.renamedIds.TestIcon]);
  }
}
return await run();
