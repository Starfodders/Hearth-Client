import fireGif from "../../assets/images/homepage/fireOnLesser.gif";
import fireStatic from "../../assets/images/homepage/fireOnLesser.png";

import { useState, useEffect } from "react";

const HomePageVisual = ({state, progress}) => {
    // console.log(progress);

    const [fireAnimating, setFireAnimating] = useState(state)
    const [currentBackgroundImage, setCurrentBackgroundImage] = useState(fireStatic)
    const [currentBackgroundGIF, setCurrentBackgroundGIF] = useState(fireGif)

    useEffect(() => {
        if (state) {
            setFireAnimating(true)
        }
        else {
            setFireAnimating(false)
        }
    }, [state])

    useEffect(() => {
        if (progress === 3) {
            import(`../../assets/images/homepage/yesFireOne.png`).then((image) => setCurrentBackgroundImage(image.default))
            import(`../../assets/images/homepage/fireOnOne.gif`).then((gif) => setCurrentBackgroundGIF(gif.default))
        }
        if (progress === 4) {
            import(`../../assets/images/homepage/yesFireTwo.png`).then((image) => setCurrentBackgroundImage(image.default))
            import(`../../assets/images/homepage/fireOnTwo.gif`).then((gif) => setCurrentBackgroundGIF(gif.default))
        }
    }, [progress])


    return (
        <img
        src = {fireAnimating ? currentBackgroundGIF : currentBackgroundImage}
        className="home__image--picture"
        alt = ""
        />
    );
};

export default HomePageVisual;


// if (list && images) {
//     import(`../../assets/images/${images}.gif`).then((gif) =>
//       setCurrentListMascotGIF(gif.default)
//     );
//     import(`../../assets/images/${images}.png`).then((png) =>
//       setCurrentListMascot(png.default)
//     );
//     setCurrentPlaying(currentListMascot);
//   }
// }, [list, images, currentListMascot]);