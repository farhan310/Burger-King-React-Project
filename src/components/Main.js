import React from 'react';

const Main = ({ siteSettings, categories, products }) => {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [cart, setCart] = React.useState({});
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const addToCart = (priceId) => {
    const newCart = {
      ...cart,
      [priceId]: cart[priceId] ? cart[priceId] + 1 : 1,
    };
    setCart(newCart);
    setIsCartOpen(true);
  };

  const subtractFromCart = (priceId) => {
    const newCart = {
      ...cart,
      [priceId]: cart[priceId] - 1,
    };
    if (newCart[priceId] === 0) {
      delete newCart[priceId];
    }
    setCart(newCart);
    if (Object.keys(newCart).length === 0) {
      setIsCartOpen(false);
    }
  };

  const emptyCart = () => {
    setCart({});
    setIsCartOpen(false);
  };

  const handleCheckout = async () => {
    const response = await fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ cart }),
    });
    const data = await response.json();
    stripe.redirectToCheckout({
      sessionId: data.session_id,
    });
  };

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return(
  <>
   {console.log(filteredProducts)}
    <header>
      <nav>
        <div className="leftNavWrapper">
          <a href="#">Order</a>
          <a href="#">Restaurants</a>
          <a href="#">Offers</a>
          <a href="#">Trending</a>
          <a href="#">More</a>
        </div>
        <div className="logo">
          <img
            id="logo"
            alt="logo"
            className={!siteSettings.logo.asset.url ? 'hidden' : ''}
            src={siteSettings.logo.asset.url}
          />
        </div>
        <div className="rightNavWrapper">
          <button type="button" className="signup">
            sign up
          </button>

          <aside id="cart">
            <button type="button" id="cart-button">
              $0.00
              <img
                id="bag-icon"
                alt="bag-icon"
                className={!siteSettings.bagIcon.asset.url ? 'hidden' : ''}
                src={siteSettings.bagIcon.asset.url}
              />
            </button>

            <dialog id="dialog">
              <ul id="line-items">
                <li>Your Cart is Empty!</li>
              </ul>
              <button type="button" id="checkout-button" disabled>
                Checkout
              </button>
            </dialog>
          </aside>
        </div>
      </nav>
    </header>
    <div>
        <div id="menu-hero-text">{siteSettings.menuHeroText}</div>
        <main>
        <button 
        type="button" 
        id="main-button" 
        onClick={() => setSelectedCategory("")} style={{ opacity: selectedCategory ? 1 : 0 }}>
            &#60; Main Menu
          </button>
          <section id="categories" className={selectedCategory ? "hidden" : ""}>
            {categories.map(category => (
              <button
                key={category._id}
                data-trackingid={category.name}
                className="category"
                data-category={category.name}
                onClick={() => {handleCategorySelect(category.name)}
                }>
                <img
                  src={category.primaryImage.asset.url}
                  alt={category.name}
                  data-primaryimage={category.primaryImage.asset.url}
                  data-carouselimage={category.carouselImage.asset.url}
                />
                <h2>{category.name}</h2>
              </button>
            ))}
          </section>

        <section id="products" className={selectedCategory ? "" : "hidden"}>
          {filteredProducts.map((product) => {
          
          return (
          <div class = "product" data-priceid={product.price_id}>
          <img 
          src ={product.image} 
          data-trackingid={product.name} 
          alt={product.name}/>

          <h2>{product.name}</h2>      
          <button 
          data-trackingid={product.name} 
          className="add-to-cart" 
          onClick={() => addToCart(product.price_id)}>
          Add <span className="currency">{product.currency}$</span> 
          {(product.price_cents / 100).toFixed(2)}</button>
          <p>{product.nutrition} Cal</p>
          </div>);
        })}
        </section>
      </main> 
    </div>
  </>
  );
  };
export default Main;
