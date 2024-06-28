const { createApp, ref, computed, reactive, toRefs } = Vue;

const app = createApp({
  setup() {
      // const product = ref('Socks')
      
      // 2.4
      const product = ref("Boots");

      // 8.1
      const brand = ref("SE 331");
      //
      const image = computed(() => {
        return variants.value[selectedVariant.value].image;
      });
      const inStock = computed(() => {
        return variants.value[selectedVariant.value].quantity;
      });
      // const inStock = ref(true)
      const inventory = ref(1);
      const onsale = ref(true);
      // 5.1
      // const details = ref(["50% cotton", "30% wool", "20% polyester"]);
      const variants = ref([
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ]);
      const selectedVariant = ref(0);

     

      //6.1
      const cart = ref([]);

      //6.4 Implement the addToCart method
      function updateCart(_id) {
            // for (var i = 0; i < cart.value.length; i++) {
            //     if(cart.value[i].id === _id){
            //         cart.value[i].amount++;
            //         return;
            //     }
            // }
            // cart.value.push({id:_id, amount: 1})

            cart.value.push(_id)
            console.log("cart value",cart.value)
            return;
        }

        function removeFromCart(_id) {
          console.log("remove is called with id",_id)
          cart.value.splice(-1,1)
            // for (let i = 0; i < cart.value.length; i++) {
            //     if (cart.value[i].id === _id) {
            //         cart.value[i].amount--;
            //         if (cart.value[i].amount === 0) {
            //             cart.value.splice(i, 1);
            //         }
            //         return;
            //     }
            // }
        }

      

      // 8.2
      const title = computed(() => {
        return brand.value + " " + product.value;
      });

      function updateVariant(index) {
        selectedVariant.value = index;
      }

      //8.5
      const saleMessage = computed(() => {
        if (onsale.value) {
          return `${brand.value} ${product.value} is on sale`;
        }
        return '';
      });
      return {
        title,
        image,
        inStock,
        inventory,
        onsale,
        // details,
        variants,
        cart,
        
  
        updateVariant,
        saleMessage,
        cart,
        
        updateCart,
        removeFromCart
      };
    },
  });
   
 

app.component("product-display", productDisplay);
app.component("review-form", reviewForm);
app.component("review-list", reviewList);
app.component("product-details", productdetails)



app.mount("#app");