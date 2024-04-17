import VideoBG from "./burgerVideo .mp4";
import classes from "./VideoDiv.module.css";
import { Link } from "react-router-dom";
function VideoDiv({ tabletSize }) {
  return (
    <>
      <div className={classes.videoDiv}>
        <video className={classes.videoBg} src={VideoBG} autoPlay loop muted />
        <div className={classes.contextDiv}>
          <div className={classes.sloganDiv}>
            <p>
              Build Your Burger
              <br />
              Your Way!
            </p>
          </div>
          {!tabletSize && (
            <div className={classes.descriptionDiv}>
              <p>
                Embark on a culinary adventure where the only limit is your
                imagination. <br /> Get ready to indulge in the burger of your
                dreams.
              </p>
            </div>
          )}
          <Link to="/BurgerCm">
            <button className={classes.orderBtn}> click me to start !!</button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default VideoDiv;
