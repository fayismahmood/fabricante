export default {
  fetch: async ({ url }) => {
    let res = await fetch(url);
    let data = await res.json();
    return res
  },
  console:(props)=>console.log(props)
};
