const productdetails = {
  template:
    /* html */

    `
    <ul>
    <li v-for="detail in details">{{details}}</li>
    </ul>
    `
,
setup() {
  const details = ref(["50% cotton", "30% wool", "20% polyester"]);
  return {
    details,
  }

}
};

