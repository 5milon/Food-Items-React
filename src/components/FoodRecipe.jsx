import React, { useEffect, useState } from "react";
import styles from "./FoodRecipe.module.css";
const FoodRecipe = () => {
  const [mealData, setMealData] = useState([]);
  const [area, setArea] = useState("russian");
const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const foodData = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const apiData = await foodData.json();
      setMealData(apiData.meals);
    };
    fetchData();
  }, [area]);

  const handleSearch = async (e) => {
    e.preventDefault();
     
      const foodData = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const apiData = await foodData.json();
      setMealData(apiData.meals);
      setSearchTerm(" ");
    }
   
  
  return (
    <>
      <div>
        <div className={`justify-content-center flex-wrap d-flex gap-4 my-4`}>
          <button
            onClick={() => setArea("indian")}
            type="button"
            className="btn btn-outline-primary"
          >
            Indian
          </button>
          <button
           onClick={() => setArea("canadian")}
            type="button"
            className="btn btn-outline-secondary"
          >
            Canadian
          </button>
          <button
            onClick={() => setArea("american")}
            type="button"
            className="btn btn-outline-success"
          >
            American
          </button>
          <button
           onClick={() => setArea("thai")}
            type="button"
            className="btn btn-outline-danger"
          >
            Thai
          </button>
          <button
           onClick={() => setArea("british")}
            type="button"
            className="btn btn-outline-warning"
          >
            British
          </button>
          <button
           onClick={() => setArea("russian")}
            type="button"
            className="btn btn-outline-info"
          >
            Russian
          </button>
         
        </div>
        <form onSubmit={handleSearch}  className={`m-auto text-center my-3`}>
          <input onChange={(e)=>setSearchTerm(e.target.value)} type="text" className={`${styles.searchFormInput}`} />
        </form>


        <div className="d-flex flex-wrap justify-content-center gap-3">
          {mealData.map((data) => (
            <div
              key={data.idMeal}
              className="text-center p-3 border rounded-3 shadow-lg"
              style={{ width: "300px" }}
            >
              <h2>{data.strMeal}</h2>
              <div className="d-flex justify-content-center border rounded-3 p-2">
                <img
                  src={data.strMealThumb}
                  style={{
                    height: "250px",
                    width: "250px",
                    objectFit: "cover",
                    border: "2px solid #ccc",
                    borderRadius: "10px",
                  }}
                  alt={data.strMeal}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodRecipe;
