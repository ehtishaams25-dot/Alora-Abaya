async function checkProto() {
  console.log("agent proto methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(framer.agent)));
  console.log("framer proto methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(framer)));
}
return await checkProto();
