import { NavLink } from "react-router-dom";
import "./Credits.css";

function Credits(): JSX.Element {
    return (
        <div className="Credits">
			<p>Thanks to Kobi Shasha for the amazing level of commitment in teaching us programming in multiple languages & frameworks!</p>
            <p>Thanks to Mom & Dad!</p>
            <p>Thanks to the amazing guy that recreated
            <a href="https://www.dafontfree.io/download/the-lord-of-the-rings/" rel="noreferrer"> the font </a>
            from "Lord of the Rings" which I gladly used.
             </p> 
             <p>Big thanks to my girlfriend who didn't dump me for all this time I spent on this project lol.</p>
            

        </div>
    );
}

export default Credits;
