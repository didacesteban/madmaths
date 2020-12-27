import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const doTheMaths = (position, value1, value2) => {
    if (position === 0) {
        return value1 + value2;
    }
    if (position === 1) {
        return value1 - value2;
    }
    if (position === 2) {
        return value1 * value2;
    }
    if (position === 3) {
        return value1 / value2;
    }
};

const doTheAlternative = (position, value1, value2, level) => {
    const alternativePosition = Math.floor(Math.random() * (3 - 0));
    if (alternativePosition === 0) {
        return doTheMaths(position, value1, value2) + Math.floor(Math.random() * (level - 1) + 1);
    }
    if (alternativePosition === 1) {
        return doTheMaths(position, value1, value2) - Math.floor(Math.random() * (level - 1) + 1);
    }
    if (alternativePosition === 2) {
        return doTheMaths(position, value1, value2) * Math.floor(Math.random() * (level - 1) + 1);
    }
    if (alternativePosition === 3) {
        return doTheMaths(position, value1, value2) / Math.floor(Math.random() * (level - 1) + 1);
    }
}

const App = () => {
    const operator = ['+', '-', '*', '/'];
    const [level, setLevel] = useState(0);
    const [position, setPosition] = useState(Math.floor(Math.random() * (3 - 0)));
    const [value1, setValue1] = useState(Math.floor(Math.random() * (level - 1) + 1));
    const [value2, setValue2] = useState(Math.floor(Math.random() * (level - 1) + 1));
    const [resultsArray, setResultsArray] = useState([]);

    const checkResult = result => {
        if (result === doTheMaths(position, value1, value2)) {
            handleGameConfiguration(10);
        } else {
            handleGameConfiguration(0);
        }
    };

    const handleGameConfiguration = gameLevel => {
        setPosition(Math.floor(Math.random() * (3 - 0)));
        setValue1(Math.floor(Math.random() * (gameLevel - 1) + 1));
        setValue2(Math.floor(Math.random() * (gameLevel - 1) + 1));
        setLevel(gameLevel);
    };

    useEffect(() => {
        setResultsArray([doTheMaths(position, value1, value2), doTheAlternative(position, value1, value2, level), doTheAlternative(position, value1, value2, level)]);
    }, [position, value1, value2, level]);

    return (
        <div>
            {level === 0 && (
                <div>
                    <button onClick={() => handleGameConfiguration(10)}>Start Game</button>
                </div>
            )}
             {level > 0 && (
                <div>
                    <p>
                        {value1} {operator[position]} {value2}
                    </p>
                    {resultsArray.sort(() => .5 - Math.random()).map(result => <button onClick={() => checkResult(result)}>{result}</button>)}
                </div>
            )}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));