const productDisplay = {
  template:
    /* html */
    `
      <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :src="image" />
          </div>
        </div>
      <div class="product-info">
 <!-- 3.6. Add a new link to the product name, so that when we click on the product name, it will lead the user to www.camt.cmu.ac.th. The link attribute must be binded using the v-bind or 
                shorthand of the v-bind command. -->
        <h1><a :href="productLink" target="_blank">{{title}}</a></h1>

        <div class="StockButton">
        <button class="button" @click="updateStock" v-if="inStock">
          In Stock
        </button>
        <button class="button" @click="updateStock" v-else>
          Out of Stock
        </button>
      </div>
       
        <p>Sizes: {{ sizes.join(', ') }}</p>
        <product-details></product-details>

        <p>Shipping: {{ shipping }}</p>


        <div
          v-for="(variant, index) in variants"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{backgroundColor: variant.color}"
        >
        </div>
        <button
          class="button"
          :disabled="!inStock"
          @click.prevent="addToCart"
          :class="{disabledButton: !inStock}"
        >
          Add To Cart
        </button>
      <button
          class="button"
          :disabled="!inStock"
          @click.prevent="removeFromCart"
          :class="{disabledButton: !inStock}"
        >
          Remove From Cart
        </button>
      
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
      </div>
      `,
  //9.7
  props: {
    premium: Boolean,
  },
  setup(props, { emit }) {
    //9.8
    const shipping = computed(() => {
      if (props.premium) {
        return "Free";
      } else {
        return 30;
      }
    });
    const product = ref("Boots");
    const brand = ref("SE 331");
     //5.5
     const sizes = ref(["S", "M", "L"]);
     const productLink = ref("http://www.camt.cmu.ac.th");

    // const image = ref("./assets/images/socks_green.jpg");
    // const inStock = ref(true);
    const inventory = ref(100);
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

    //review variables
    const reviews = ref([]);
    
    //add review function
    const addReview = (review) => {
      reviews.value.push(review);
      console.log(reviews.value);
    };
    const updateVariant = (index) => {
      selectedVariant.value = index;
    };
    const image = computed(() => {
      return variants.value[selectedVariant.value].image;
    });
    const inStock = computed(() => {
      return variants.value[selectedVariant.value].quantity;
    });
    const addToCart = () => {
      emit("add-to-cart", variants.value[selectedVariant.value].id);
    };

    const removeFromCart = () => {
      emit("remove-from-cart", variants.value[selectedVariant.value].id);
    };
    const title = computed(() => {
      return brand.value + " " + product.value;
    });
    const updateImage = (variantImage) => {
      image.value = variantImage;
    };
    //6.7 Add new button which will toggle the inStock status
    function toggleInStock() {
      inStock.value = !inStock.value;
    }
    return {
      title,
      productLink,
      sizes,
      image,
      inStock,
      inventory,
      variants,
      addToCart,
      updateImage,
      updateVariant,
      shipping,
      addReview,
      reviews,
      toggleInStock,
      removeFromCart
    };
  },
};
