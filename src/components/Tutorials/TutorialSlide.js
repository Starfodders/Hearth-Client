import "./Tutorials.scss"

const TutorialSlide = ({type, content}) => {
    return (
        <section className={`tutorial__container--${type}`}>
            {content}
        </section>
    );
};

export default TutorialSlide;