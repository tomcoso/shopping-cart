import { Link } from "react-router-dom";
import "../styling/home.scss";

function Home() {
  return (
    <main id="home-root">
      <section>
        <div id="home-top">
          <h1>wear</h1>
          <h1>the sky</h1>
        </div>
        <div id="home-bottom">
          <p data-testid="home-text">Fall collection</p>
          <Link to="shop" role="button">
            SHOP
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
