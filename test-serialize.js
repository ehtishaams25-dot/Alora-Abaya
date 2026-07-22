async function testSerializeDSL() {
  const d = await framer.agent.serialize({ id: "TDz01QmQg" });
  console.log("serialize({id}) type:", typeof d);
  console.log("snippet:", typeof d === "string" ? d.substring(0, 300) : JSON.stringify(d).substring(0, 300));
}
return await testSerializeDSL();
