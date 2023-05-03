import topwave from "../../assets/images/top-wave.svg";
import "../../styles/ChaptersPage.scss";


const SlidesBackground = () => {
  return (
    <div className="chapters__bg">
      <img src={topwave} className="chapters__bg--img" alt="moving waves" />
    </div>
  );
};

export default SlidesBackground;
