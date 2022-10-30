import { Link } from "react-router-dom";
import "../styling/home.scss";

function Home() {
  return (
    <div id="home-root">
      <section>
        <div id="home-top">
          <h1>Air</h1>
          <h1>Clarity</h1>
        </div>
        <div id="home-bottom">
          <p data-testid="home-text">Wear the sky with us</p>
          <Link to="shop" role="button">
            Shop
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
