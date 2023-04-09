import { useEffect, useState } from "react";

const ProgressBar = ({details, level, progress}) => {
    console.log(details);
    const {current, unit} = progress
    
    // const [available, setAvailable] = useState(true)
    const [currentContent, setCurrentContent] = useState(current)

    useEffect(() => {
       
    }, [details])

    if (level === 'units') {
        if (details.id <= current) {
            return <div>
                Complete
            </div>
        }
        else if (details.id === unit) {
            return <div>
                In Progress
            </div>
        }
    }

    // if (level === 'chapters') {
    //     return <div>
    //         1/{details.units}
    //     </div>
    // }

     return (
        <div>
            {`${current}/${details.units}`}
        </div>
    );
};

export default ProgressBar;

//progress bar will always take a prop
//this will be total units inside 

//can make a get request on chapters page for specific numbers of sections

//Chapter Cards will have % of units inside completed
//Section Cards will have % of units inside completed

//so need which units completed and can do math upwards

//if at level UNITS, progress bar should be replaced with a boolean whether the unit is done or not
//get user profile and pass down the units #