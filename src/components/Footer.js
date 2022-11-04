import { FaGithub } from "react-icons/fa";
import "../styling/footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <a
        href="https://github.com/tomcoso/shopping-cart"
        rel="noreferrer"
        target={"_blank"}
      >
        <FaGithub size={"1.2rem"} color="#1c1c1c" />
      </a>
      <span>Copyright &copy; {year} Tomas Dessy</span>
    </footer>
  );
};

export default Footer;
