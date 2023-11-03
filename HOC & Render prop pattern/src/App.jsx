/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { faker } from "@faker-js/faker";
import withToggles from "./HOC";

const products = Array.from({ length: 20 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  };
});

const companies = Array.from({ length: 15 }, () => {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  };
});

function ProductItem({ product }) {
  return (
    <li className="product">
      <p className="product-name">{product.productName}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
    </li>
  );
}

function CompanyItem({ company, defaultVisibility }) {
  const [isVisible, setIsVisisble] = useState(defaultVisibility);

  return (
    <li
      className="company"
      onMouseEnter={() => setIsVisisble(true)}
      onMouseLeave={() => setIsVisisble(false)}
    >
      <p className="company-name">{company.companyName}</p>
      {isVisible && (
        <p className="company-phrase">
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  );
}

function List({ title, items, render }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const displayItems = isCollapsed ? items.slice(0, 3) : items;

  function toggleOpen() {
    setIsOpen((isOpen) => !isOpen);
    setIsCollapsed(false);
  }

  return (
    <div className="list-container">
      <div className="heading">
        <h2>{title}</h2>
        <button onClick={toggleOpen}>
          {isOpen ? <span>&or;</span> : <span>&and;</span>}
        </button>
      </div>
      {/* //* Render Prop Pattern */}
      {/* The render prop pattern is a technique where a component receives a prop that is a function responsible for rendering content. The component can then invoke this function and pass its internal state or other data to it, allowing the consuming component to control what gets rendered  */}
      {/* Here the List component doesn't know what will happen inside the map function for each of the displayItems, Simply the control has been given to the user of this component to allow what it want to render for each of the displayItems. So now the List component doesn't know anymore what it is rendering, it will just call the render function for each of the item in the array (displayItems)  */}
      {isOpen && <ul className="list">{displayItems.map(render)}</ul>}
      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  );
}

// LATER: Let's say we got this component from a 3rd-party library, and can't change it. But we still want to add the 2 toggle functionalities to it
function ProductList({ title, items }) {
  return (
    <ul className="list">
      {items.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  );
}

const ProductWithToggles = withToggles(ProductList);

export default function App() {
  return (
    <div>
      <h1>Render Props Demo</h1>

      <div className="col-2">
        {/* we inverted the control of what it should render to the user of the component, this is called inversion of control */}
        {/* Use the render prop pattern when you want to give the consumer more control over a specific part of a component's rendering or when you want to share state or data with the consumer. */}
        <List
          title="Products"
          items={products}
          render={(product) => (
            <ProductItem key={product.productName} product={product} />
          )}
        />

        <List
          title="Companies"
          items={companies}
          render={(company) => (
            <CompanyItem
              key={company.companyName}
              company={company}
              defaultVisibility={false}
            />
          )}
        />
      </div>
      {/* HOC */}
      {/* <div className="col-2">
        <ProductList title="Product" items={products} />
        <ProductWithToggles title="Product HOC" items={products} />
      </div> */}
    </div>
  );
}
