import "./styling/notfound.scss";
import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div id="not-found">
      <p>error 404 : page does not exist</p>
      <Link to={"/"}>go back to the light</Link>
      <TbError404 size="50%" color="rgba(255,255,255,.2)" />
    </div>
  );
};
export default NotFound;
