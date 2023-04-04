import "./Transcript.scss"

const Transcript = ({text}) => {
    console.log(text);
    const {content} = text

    return (
        <div className = "transcript__container">
            {Object.values(content).map((textBlock, index) => {
                return <p key = {index} className = "transcript__paragraph" >{textBlock}</p>
            })}
        </div>
    );
};

export default Transcript;