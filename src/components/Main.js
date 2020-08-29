import React from 'react';
import { sanitize } from '../utils';

const Main = ({ siteSettings, categories }) => {
  return(
    <main>
      <section id="categories"> 
      {categories.map((category) => {
        return(
          <button key={category._id} data-trackingid={category.name} className="category" data-category={category.name}>
            <img 
              src={category.primaryImage.asset.url}
              alt={category.name}
              data-primaryimage={category.primaryImage.asset.url}
              data-carouselimage={category.carouselImage.asset.url}
            />
            <h2>{category.name}</h2>
          </button>
        );
      })}
      </section>

      <button type="button" id="back-to-main-menu">
        &#60; Main Menu
      </button>

      <section id="products"></section>

      <script src="App.js"></script>
    </main>
  ),
};

export default Main;