import { useEffect, useState } from "react";

function Popular() {
  //save our retrieve data into a state
  const [popular, setPopular] = useState([]);

  //we want to run this getPopular() the the component is mounted
  //we leave [] empty to just run it when mounted, can populate with other result
  useEffect(() => {
    getPopular();
  }, []);

  //we add async() here because it is the data we wanna wait for
  const getPopular = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
    );
    const data = await api.json();
    console.log(data);
    setPopular(data.recipes);
  };

  //.map is looking through each recipe
  //key = ... is to remove the unique key error, this is to ensure if data gets removed
  //from data base, the website can response accordingly.
  return (
    <div>
      {popular.map((recipe) => {
        return (
          <div key={recipe.id}>
            <p>{recipe.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Popular;
