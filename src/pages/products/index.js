import { useContext, useEffect, useState } from "react";
import Product from "../../components/Product";
import { CartContext } from "../../util/context";
import { AiOutlineSearch } from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";
import { FaTshirt } from "react-icons/fa";
import CheckList from "../../components/CheckList";
import "./index.css";

const PriceRanges = ["<=250", "251-499", ">=500"];

const Products = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [genderFilter, setGenderFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const setCart = useContext(CartContext)[1];
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  useEffect(() => {
    fetch(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);
  useEffect(() => {
    let newItems = items;
    if (genderFilter.length > 0) {
      newItems = newItems.filter(
        (item) => genderFilter.indexOf(item.gender) >= 0
      );
    }
    if (colorFilter.length > 0) {
      newItems = newItems.filter(
        (item) => colorFilter.indexOf(item.color) >= 0
      );
    }
    if (typeFilter.length > 0) {
      newItems = newItems.filter((item) => typeFilter.indexOf(item.type) >= 0);
    }
    if (priceFilter.length > 0) {
      newItems = newItems.filter((item) => {
        return priceFilter.some((filter) => {
          if (filter === PriceRanges[0] && +item.price <= 250) return true;
          else if (
            filter === PriceRanges[1] &&
            +item.price > 250 &&
            +item.price < 500
          )
            return true;
          else if (filter === PriceRanges[2] && +item.price >= 500) return true;
          return false;
        });
      });
    }
    if (searchText !== "") {
      const searchTerms = searchText.trim().split(/\s+/);
      newItems = newItems.filter((item) => {
        const str = (
          item.name +
          item.type +
          item.color +
          item.gender
        ).toLowerCase();
        return searchTerms.some((term) => str.search(term.toLowerCase()) > -1);
      });
    }
    setFilteredItems(newItems);
  }, [items, searchText, genderFilter, colorFilter, typeFilter, priceFilter]);

  return (
    <div>
      {items.length === 0 ? (
        <div className="Loader">
          <FaTshirt />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="Products">
          {showFilters && (
            <div className="Sidebar">
              <h2>Filters</h2>
              <div className="Checklist-container">
                <CheckList
                  title="Gender"
                  checklist={items
                    .map((item) => item.gender)
                    .filter(onlyUnique)}
                  selectedList={genderFilter}
                  setSelectedList={setGenderFilter}
                />
                <CheckList
                  title="Color"
                  checklist={items.map((item) => item.color).filter(onlyUnique)}
                  selectedList={colorFilter}
                  setSelectedList={setColorFilter}
                />
                <CheckList
                  title="Price Range"
                  checklist={PriceRanges}
                  selectedList={priceFilter}
                  setSelectedList={setPriceFilter}
                />
                <CheckList
                  title="Type"
                  checklist={items.map((item) => item.type).filter(onlyUnique)}
                  selectedList={typeFilter}
                  setSelectedList={setTypeFilter}
                />
              </div>
            </div>
          )}
          <div className="Main">
            <div style={{ margin: "1rem 0" }}>
              <input
                type="text"
                placeholder="Search for products.."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                style={{ borderWidth: "0 0 1px 0" }}
              />
              <AiOutlineSearch />
              <button
                className="Filter-icon"
                onClick={() => setShowFilters((val) => !val)}
              >
                <BiFilterAlt />
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                margin: "0 2rem",
              }}
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div style={{ margin: "0 4rem 4rem 0" }}>
                    <Product
                      id={item.id}
                      name={item.name}
                      img={item.imageURL}
                      price={item.price}
                      onAdd={() => {
                        setCart((oldVal) => [...oldVal, { item, quantity: 1 }]);
                      }}
                    />
                  </div>
                ))
              ) : (
                <p>OOPS! No Products match your criteria</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
