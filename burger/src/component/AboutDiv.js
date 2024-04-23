import styles from "./AboutDiv.module.css";
import abtUsPic from "./Vector.png";
import certifiedAngusBeef from "./certifiedAngusBeef.png";
import glutenFree from "./glutenFree.png";
import smashBurger from "./smashBurger.png";
import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 2000, delay: 200 });
  }, []);

  return (
    <div className={styles.abtContainer} ref={aboutRef}>
      <div className={styles.abtSubContainer}>
        <div className={styles.abtContent}>
          <h1 className={styles.heading} data-aos="fade-down">
            About Us
          </h1>
          <div className={styles.aWording} data-aos="fade-down">
            Danny, Dan and Isaac are burgerholic. They always find and eat
            burger in worldwide. They want to share the best taste of burger
            with Hong Kong People. Therefore, they established DDI in 2024.
            <br />
            Our passion for culinary innovation drives us to continuously
            experiment with thousands of ingredient combinations until we
            achieve the perfect recipe. We use only the finest, high-quality
            ingredients, each one meticulously selected for maximum flavor
            impact, including our custom burger spice blend, carefully curated
            to add a distinctive, bold flavor to every bite.
          </div>
        </div>
        <div className={styles.burgerContainer}>
          <img
            className={styles.burger}
            src={abtUsPic}
            alt="white_burger"
            data-aos="zoom-in"
          />
        </div>
      </div>
    </div>
  );
}

function OurProduct() {
  return (
    <div className={styles.opContainer} ref={ourpdtRef}>
      <div className={styles.opSubContainer}>
        <h1 className={styles.heading} data-aos="fade-up">
          Our Product
        </h1>

        <div className={styles.opAContent} data-aos="zoom-in-up">
          <h2>We make 100% hand made juicy delicious burgers</h2>
          <div className={styles.bWording} data-aos="zoom-in-down">
            Our made-to-order burgers are built differently. Using our signature
            proprietary burger smasher, our culinary masters utilize a special
            smashing technique to create a mouthwatering caramelized, crispy
            sear that seals in all the juicy goodness within.
          </div>
        </div>

        <div className={styles.opSubSubContainer}>
          <div className={styles.opBContent} data-aos="fade-up">
            <h2 className={styles.subtitle}>Every burgers are CERTIFIED</h2>
            <div className={styles.bWording}>
              A burger lovers ourselves, we take our craft seriously - and it
              all starts with the patty. We tried hundreds of beef options until
              we found the one that truly made our taste buds sing: Certified
              Angus Beef.
              <br /> <br />
              Certified Angus Beef® is more than just a name - it's a mark of
              quality. It's the only beef that's certified with 10 strict
              standards, ensuring that each and every patty is juicy, delicious,
              and full of flavor.
            </div>
            <div className={styles.imgBContainer}>
              <img className={styles.angus} src={certifiedAngusBeef} />
            </div>
          </div>

          <div className={styles.opBContent} data-aos="fade-up">
            <h2 className={styles.subtitle}>What is a smashburger?</h2>
            <div className={styles.bWording}>
              To us, burgers are something special. We're obsessed with making
              the best, because honestly… who wants a boring burger? <br />{" "}
              <br />
              Using our customized, metal smasher, designed to perfectly fit our
              patty size (fancy, right?), every burger is freshly smashed onto a
              hot buttered, seasoned grill to caramelize the patty creating the
              most flavorful, crave-able, juicy sear.
              <br /> <br />
              It's a dash of science mixed with culinary craft to deliver the
              perfect burger.
            </div>
            <div className={styles.imgBContainer}>
              <img className={styles.smasher} src={smashBurger} />
            </div>
          </div>

          <div className={styles.opBContent} data-aos="fade-up">
            <h2 className={styles.subtitle}>Gluten-Free</h2>
            If you or a friend or family member that you're dining with has a
            gluten sensitivity, consider trying one of these tasty, gluten-free
            options:
            <br /> <br />
            <li>Gluten Free Bun</li>
            <li>Side Salad</li>
            <div className={styles.imgBContainer}>
              <img className={styles.glutenFree} src={glutenFree} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OurLocation() {
  return (
    <div className={styles.locateContainer}>
      <div className={styles.locateLeftContainer}>
        <div id={styles.locateHead}>Our Location</div>
        <div className={styles.locateContent}>
          G/F 69 Cooke Street HUNG HOM KOWLOON
        </div>
        <div className={styles.locateContent}>Opening Hours: </div>
        <div className={styles.locateContent}>Thursday: 5:30-8:30pm</div>
        <div className={styles.locateContent}>
          Friday-Saturday: 11:30-8:30pm
        </div>
        <div className={styles.locateContent}>Sunday: 11:30-5:30pm</div>
      </div>
      <iframe
        width="600"
        height="300"
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d922.8064792976211!2d114.18365566953368!3d22.307294139468823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400ddf294ad89%3A0xde85f11c6baae0fa!2z57SF56Oh5puy6KGXNjnomZ8!5e0!3m2!1szh-TW!2shk!4v1711988800064!5m2!1szh-TW!2shk"
      ></iframe>
    </div>
  );
}

function About() {
  return (
    <div className={styles.background}>
      <AboutUs />
      <OurProduct />
      <OurLocation />
    </div>
  );
}

export default About;
export const aboutRef = React.createRef();
export const ourpdtRef = React.createRef();
