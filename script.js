const products = [
  {
    id: 1,
    name: "AURELIA IMPERIUM",
    category: "classic",
    price: 2950,
    img: "images/image 1.png",
    desc: "A refined automatic timepiece with a polished steel case, sapphire crystal and signature AURELIA dial.",
    movement: "Swiss Automatic",
    case: "316L Stainless Steel",
    crystal: "Sapphire Crystal",
    reserve: "48 Hours",
    waterResistance: "10 ATM"
  },

  {
    id: 2,
    name: "AURELIA HERITAGE",
    category: "classic",
    price: 2450,
    img: "images/image 2.png",
    desc: "A timeless leather-strap design inspired by classic European watchmaking.",
    movement: "Swiss Automatic",
    case: "18K Gold",
    crystal: "Sapphire Crystal",
    reserve: "48 Hours",
    waterResistance: "5 ATM"
  },

  {
    id: 3,
    name: "AURELIA CHRONO",
    category: "chronograph",
    price: 3750,
    img: "images/image 3.png",
    desc: "A sophisticated chronograph engineered for precision and performance.",
    movement: "Swiss Chronograph",
    case: "316L Stainless Steel",
    crystal: "Sapphire Crystal",
    reserve: "48 Hours",
    waterResistance: "10 ATM"
  },

  {
    id: 4,
    name: "AURELIA TITAN",
    category: "sport",
    price: 2850,
    img: "images/image 4.png",
    desc: "A bold performance watch combining durability with a modern silhouette.",
    movement: "Swiss Automatic",
    case: "Titanium",
    crystal: "Sapphire Crystal",
    reserve: "50 Hours",
    waterResistance: "20 ATM"
  },

  {
    id: 5,
    name: "AURELIA NOIR",
    category: "sport",
    price: 3200,
    img: "images/image 5.png",
    desc: "Deep black finishes and luminous details create a dramatic contemporary statement.",
    movement: "Swiss Automatic",
    case: "Black PVD Steel",
    crystal: "Sapphire Crystal",
    reserve: "48 Hours",
    waterResistance: "10 ATM"
  },

  {
    id: 6,
    name: "AURELIA ÉLITE",
    category: "classic",
    price: 4100,
    img: "images/image 6.png",
    desc: "Our signature dress watch, crafted for formal occasions and lasting impressions.",
    movement: "Swiss Automatic",
    case: "18K Gold",
    crystal: "Sapphire Crystal",
    reserve: "48 Hours",
    waterResistance: "5 ATM"
  }
];


/* =========================================================
   ELEMENTS
========================================================= */

let cart = JSON.parse(
  localStorage.getItem("aureliaCart") || "[]"
);

const productsEl =
  document.getElementById("products");

const categoryFilter =
  document.getElementById("categoryFilter");

const searchInput =
  document.getElementById("searchInput");

const modal =
  document.getElementById("productModal");

const modalProduct =
  document.getElementById("modalProduct");

const cartPanel =
  document.getElementById("cartPanel");

const cartItems =
  document.getElementById("cartItems");

const cartCount =
  document.getElementById("cartCount");

const cartTotal =
  document.getElementById("cartTotal");

const toast =
  document.getElementById("toast");


const money = number =>
  "$" + Number(number).toLocaleString();


/* =========================================================
   COLLECTION
========================================================= */

function renderProducts() {

  const searchValue =
    searchInput.value
      .toLowerCase()
      .trim();

  const selectedCategory =
    categoryFilter.value;


  const filteredProducts =
    products.filter(product => {

      const categoryMatch =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const searchMatch =
        product.name
          .toLowerCase()
          .includes(searchValue);

      return categoryMatch && searchMatch;
    });


  if (!filteredProducts.length) {

    productsEl.innerHTML = `
      <div class="empty-results">

        <h3>No watches found</h3>

        <p>
          Try another search or category.
        </p>

      </div>
    `;

    return;
  }


  let scenes = "";


  for (
    let i = 0;
    i < filteredProducts.length;
    i += 2
  ) {

    const leftWatch =
      filteredProducts[i];

    const rightWatch =
      filteredProducts[i + 1];


    scenes += `

      <div class="watch-scene">


        <!-- LEFT WATCH -->

        <article
          class="cinematic-watch left product"
          data-id="${leftWatch.id}"
        >

          <img
            class="watch-photo"
            src="${leftWatch.img}"
            alt="${leftWatch.name}"
          >


          <div class="watch-label">

            <h3>
              ${leftWatch.name}
            </h3>


            <span>
              ${leftWatch.category.toUpperCase()}
              · AUTOMATIC
            </span>


            <strong>
              ${money(leftWatch.price)}
            </strong>


            <!-- THIS ONLY OPENS DETAILS -->

            <button
              class="scene-action"
              data-view="${leftWatch.id}"
            >
              TO CART →
            </button>

          </div>

        </article>


        ${
          rightWatch
            ? `

              <!-- RIGHT WATCH -->

              <article
                class="cinematic-watch right product"
                data-id="${rightWatch.id}"
              >

                <img
                  class="watch-photo"
                  src="${rightWatch.img}"
                  alt="${rightWatch.name}"
                >


                <div class="watch-label">

                  <h3>
                    ${rightWatch.name}
                  </h3>


                  <span>
                    ${rightWatch.category.toUpperCase()}
                    · AUTOMATIC
                  </span>


                  <strong>
                    ${money(rightWatch.price)}
                  </strong>


                  <!-- THIS ONLY OPENS DETAILS -->

                  <button
                    class="scene-action"
                    data-view="${rightWatch.id}"
                  >
                    TO CART →
                  </button>

                </div>

              </article>

            `
            : ""
        }


        <div class="scene-line"></div>

      </div>

    `;
  }


  productsEl.innerHTML =
    scenes;


  activateScenes();
}


/* =========================================================
   SCROLL ANIMATION
========================================================= */

function activateScenes() {

  const scenes =
    document.querySelectorAll(
      ".watch-scene"
    );


  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "scene-visible"
            );

          }

        });

      },

      {
        threshold: 0.25
      }

    );


  scenes.forEach(scene => {

    observer.observe(scene);

  });

}


/* =========================================================
   CART
========================================================= */

function saveCart() {

  localStorage.setItem(
    "aureliaCart",
    JSON.stringify(cart)
  );


  renderCart();
}


function addToCart(id) {

  const existing =
    cart.find(
      item => item.id === id
    );


  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      id: id,
      qty: 1
    });

  }


  saveCart();


  showToast(
    "Added to your collection"
  );
}


function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );


  saveCart();


  showToast(
    "Removed from your collection"
  );
}


function changeQuantity(id, amount) {

  const item =
    cart.find(
      item => item.id === id
    );


  if (!item) return;


  item.qty += amount;


  if (item.qty <= 0) {

    removeFromCart(id);

    return;
  }


  saveCart();
}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

  cart =
    cart.filter(item =>
      products.some(
        product =>
          product.id === item.id
      )
    );


  const items =
    cart.map(item => {

      const product =
        products.find(
          product =>
            product.id === item.id
        );


      return {
        ...product,
        qty: item.qty
      };

    });


  cartCount.textContent =
    items.reduce(
      (total, item) =>
        total + item.qty,
      0
    );


  if (!items.length) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        <div>◇</div>

        <h3>
          Your collection is empty
        </h3>

        <p>
          Discover a timepiece worthy
          of your collection.
        </p>

      </div>

    `;


    cartTotal.textContent =
      "$0";

    return;
  }


  cartItems.innerHTML =
    items.map(item => `

      <div class="cart-item">

        <img
          src="${item.img}"
          alt="${item.name}"
        >


        <div>

          <strong>
            ${item.name}
          </strong>


          <small>
            ${money(item.price)}
          </small>


          <div class="quantity-controls">

            <button
              data-minus="${item.id}"
            >
              −
            </button>


            <span>
              ${item.qty}
            </span>


            <button
              data-plus="${item.id}"
            >
              +
            </button>

          </div>

        </div>


        <button
          class="remove"
          data-remove="${item.id}"
        >
          ×
        </button>

      </div>

    `).join("");


  const total =
    items.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.qty,
      0
    );


  cartTotal.textContent =
    money(total);
}


/* =========================================================
   PRODUCT INFORMATION
========================================================= */

function openProduct(id) {

  const product =
    products.find(
      item => item.id === id
    );


  if (!product) return;


  modalProduct.innerHTML = `

    <img
      src="${product.img}"
      alt="${product.name}"
    >


    <div>

      <p class="eyebrow">
        ${product.category.toUpperCase()}
        COLLECTION
      </p>


      <h2>
        ${product.name}
      </h2>


      <div class="modal-price">
        ${money(product.price)}
      </div>


      <p>
        ${product.desc}
      </p>


      <p>

        <strong>
          Movement:
        </strong>

        ${product.movement}

        <br>


        <strong>
          Case:
        </strong>

        ${product.case}

        <br>


        <strong>
          Crystal:
        </strong>

        ${product.crystal}

        <br>


        <strong>
          Power Reserve:
        </strong>

        ${product.reserve}

        <br>


        <strong>
          Water Resistance:
        </strong>

        ${product.waterResistance}

      </p>


      <!-- THIS IS THE REAL ADD BUTTON -->

      <button
        class="gold-btn"
        data-modal-add="${product.id}"
      >
        ADD TO COLLECTION →
      </button>

    </div>

  `;


  modal.classList.add(
    "open"
  );
}


/* =========================================================
   COLLECTION CLICK EVENTS
========================================================= */

/*
   IMPORTANT:

   "TO CART" does NOT add anything.

   It only opens the product information.
*/

productsEl.addEventListener(
  "click",
  event => {


    /* ================================
       TO CART
       OPEN PRODUCT INFORMATION
    ================================= */

    const viewButton =
      event.target.closest(
        "[data-view]"
      );


    if (viewButton) {

      event.preventDefault();
      event.stopPropagation();


      const productId =
        Number(
          viewButton.dataset.view
        );


      openProduct(
        productId
      );


      return;
    }


    /* ================================
       CLICK WATCH ITSELF
       ALSO OPENS INFORMATION
    ================================= */

    const product =
      event.target.closest(
        ".product"
      );


    if (product) {

      openProduct(
        Number(
          product.dataset.id
        )
      );

    }

  }
);


/* =========================================================
   GENERAL CLICK EVENTS
========================================================= */

document.addEventListener(
  "click",
  event => {


    /* =================================
       ADD TO COLLECTION
       THIS ACTUALLY ADDS THE WATCH
    ================================= */

    const modalAddButton =
      event.target.closest(
        "[data-modal-add]"
      );


    if (modalAddButton) {

      event.preventDefault();
      event.stopPropagation();


      const productId =
        Number(
          modalAddButton.dataset.modalAdd
        );


      /* ADD WATCH */

      addToCart(
        productId
      );


      /* CLOSE INFORMATION POPUP */

      modal.classList.remove(
        "open"
      );


      /* OPEN YOUR COLLECTION */

      cartPanel.classList.add(
        "open"
      );


      return;
    }


    /* =================================
       REMOVE FROM CART
    ================================= */

    const removeButton =
      event.target.closest(
        "[data-remove]"
      );


    if (removeButton) {

      removeFromCart(
        Number(
          removeButton.dataset.remove
        )
      );


      return;
    }


    /* =================================
       QUANTITY -
    ================================= */

    const minusButton =
      event.target.closest(
        "[data-minus]"
      );


    if (minusButton) {

      changeQuantity(
        Number(
          minusButton.dataset.minus
        ),
        -1
      );


      return;
    }


    /* =================================
       QUANTITY +
    ================================= */

    const plusButton =
      event.target.closest(
        "[data-plus]"
      );


    if (plusButton) {

      changeQuantity(
        Number(
          plusButton.dataset.plus
        ),
        1
      );


      return;
    }

  }
);


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
  "input",
  renderProducts
);


/* =========================================================
   FILTER
========================================================= */

categoryFilter.addEventListener(
  "change",
  renderProducts
);


/* =========================================================
   CLOSE PRODUCT MODAL
========================================================= */

document
  .getElementById("closeModal")
  .onclick = () => {

    modal.classList.remove(
      "open"
    );

  };


modal.addEventListener(
  "click",
  event => {

    if (
      event.target === modal
    ) {

      modal.classList.remove(
        "open"
      );

    }

  }
);


/* =========================================================
   CART OPEN
========================================================= */

document
  .getElementById("cartBtn")
  .onclick = () => {

    cartPanel.classList.add(
      "open"
    );

  };


/* =========================================================
   CART CLOSE
========================================================= */

document
  .getElementById("closeCart")
  .onclick = () => {

    cartPanel.classList.remove(
      "open"
    );

  };


/* =========================================================
   MOBILE MENU
========================================================= */

document
  .getElementById("menuBtn")
  .onclick = () => {

    document
      .getElementById("nav")
      .classList.toggle(
        "open"
      );

  };


/* =========================================================
   SEARCH ICON
========================================================= */

document
  .getElementById("searchBtn")
  .onclick = () => {

    document
      .getElementById("collection")
      .scrollIntoView({
        behavior: "smooth"
      });


    setTimeout(() => {

      searchInput.focus();

    }, 600);

  };


/* =========================================================
   NEWSLETTER
========================================================= */

document
  .getElementById("newsletterForm")
  .onsubmit = event => {

    event.preventDefault();


    showToast(
      "Welcome to the AURELIA world"
    );


    event.target.reset();

  };


/* =========================================================
   FILM
========================================================= */

document
  .getElementById("filmBtn")
  .onclick = () => {

    showToast(
      "The AURELIA film is coming soon"
    );

  };


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  setTimeout(() => {

    toast.classList.remove(
      "show"
    );

  }, 1800);
}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.classList.add(
            "visible"
          );

        }

      });

    },

    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach(element => {

    revealObserver.observe(
      element
    );

  });


/* =========================================================
   INITIALIZE
========================================================= */

renderProducts();

renderCart();

/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
========================================================= */

const navLinks = document.querySelectorAll(".nav a");

const sections = document.querySelectorAll(
  "main section[id]"
);

function updateActiveNavigation() {

  const scrollPosition =
    window.scrollY + 150;

  let currentSection = "home";

  sections.forEach(section => {

    if (
      scrollPosition >= section.offsetTop
    ) {
      currentSection = section.id;
    }

  });


  navLinks.forEach(link => {

    link.classList.remove("active");

    const linkTarget =
      link.getAttribute("href");

    if (
      linkTarget === `#${currentSection}`
    ) {
      link.classList.add("active");
    }

  });

}


window.addEventListener(
  "scroll",
  updateActiveNavigation
);


/* Run once when page loads */

updateActiveNavigation();