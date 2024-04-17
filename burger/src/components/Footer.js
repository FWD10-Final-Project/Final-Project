import styles from "./Footer.module.css";
import image from "./footerpic.png";

function Footer() {
  return (
    <div className={styles.imageContainer}>
      <img className={styles.image} src={image} />
    </div>
  );
}

export default Footer;
