import "./UnitSlide.scss"

const UnitSlide = ({slide, index}) => {
    const {content} = slide
    
    return (
        <div className = "slide__container">
            <p className = "slide__content">{content}</p>
        </div>
    );
};

export default UnitSlide;