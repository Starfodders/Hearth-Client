import bgImage from "../assets/images/homepage/homeBG.png";
import bioPic from "../assets/images/credits__bio.JPG";
import textBook from "../assets/images/textbook-img.jpg";
import "../styles/CreditsPage.scss";

const CreditsPage = () => {
  return (
    <div className="credits__wrapper">
      <section className="credits__block">
        <div className="credits__pic">
          <img className="credits__img" src={bioPic} />
        </div>
        <section className="credits__text">
          <p className="credits__text--el"> Hello! </p>
          <p className="credits__text--el">
            My name is Michael and I've been working as a registered nurse in
            the community for the past 6 years, primarily operating in the
            mental health sector.
          </p>
          <p className="credits__text--el">
            Options for therapy have always been limited for our population and
            I am eager to provide an additional resource to lower the barrier
            for entry.
          </p>
        </section>
      </section>
      <section className="credits__block">
        <section className="credits__text">
          <p className="credits__text--el">
            The content of Hearth is taken directly from The Dialectical
            Behaviour Therapy Skills Workbook. The rest of this app (i.e. code &
            illustrations) are completed by me.
          </p>
          <p className="credits__text--el">Special thanks to:</p>
          <p className="credits__text--el">Joseph Wong (Voiceover)</p>
        </section>
        <div className="credits__pic">
          <img className="credits__img" src={textBook} />
        </div>
      </section>

      <img className="credits__wrapper__img" src={bgImage} />
    </div>
  );
};

export default CreditsPage;
