import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

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
    const check = localStorage.getItem("popular");

    const api = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
    );
    const data = await api.json();
    localStorage.setItem("popular", JSON.stringify(data.recipes));
    setPopular(data.recipes);
    console.log(data);
  };

  //.map is looking through each recipe
  //key = ... is to remove the unique key error, this is to ensure if data gets removed
  //from data base, the website can response accordingly.
  return (
      <div>
        <Wrapper>
          <h3>Popular Recipe</h3>

          <Splide
              options={{
                perPage: 4,
                drag: "free",
                gap: "3rem",
              }}
          >
            {popular.map((recipe) => {
              return (
                  <SplideSlide key={recipe.id}>
                    <Card>
                      <Link to={"/recipe/" + recipe.id}>
                        <p>{recipe.title}</p>
                        <img
                            src={recipe.image}
                            width={300}
                            height={250}
                            alt={recipe.title}
                        />
                      </Link>
                    </Card>
                  </SplideSlide>
              );
            })}
          </Splide>
        </Wrapper>
      </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0 rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 650;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5);
`;

export default Popular;