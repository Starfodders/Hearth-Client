import bioPic from "../assets/images/credits__bio.JPG";
import textBook from "../assets/images/textbook-img.jpg";
import "../styles/CreditsPage.scss";
import { Helmet } from "react-helmet"

const CreditsPage = () => {
  return (
    <div className="credits__wrapper">
      <Helmet>
        <meta name = "description" content = "Credits, content is pulled heavily from The Dialectical Behaviour Therapy skills workbook by Jeffrey Brantley, Jeffrey C. Wood, and Matthew McKay"/>
        <meta name = "keywords" content = "Jeffrey Brantley, Jeffrey C. Wood, Matthew McKay, Michael Deng"/>
      </Helmet>
      <section className="credits__block">
        <div className="credits__pic">
          <img className="credits__img" src={bioPic} alt = "Michael Deng" />
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
            illustrations) are completed by me. Check out my <a href = 'https://www.linkedin.com/in/michael-deng-840215199/' target ='_blank' className="credits__linkedin" rel="noreferrer">LinkedIn!</a>
          </p>
          <p className="credits__text--el">Special thanks to:</p>
          <p className="credits__text--el">Joseph Wong (Voiceover)</p>
          <p className="credits__text--el">
            Meditation Completion Sound - UNIVERSFIELD on Pixabay
          </p>
        </section>
        <div className="credits__pic">
          <img className="credits__img" src={textBook} alt = "Dialectical Behaviour Skills Handbook"/>
        </div>
      </section>
    </div>
  );
};

export default CreditsPage;
