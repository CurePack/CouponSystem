import "./Home.css";
import image from "../../../Assets/Images/mainBackground.jpg";

function Home(): JSX.Element {
    return (
        // <div className="Home">
		// 	This is the homepage of CouponSystem website. It's empty by now ...
        // </div>
        <div className="Home" style ={{backgroundImage:`url(${image})`}}>
            {/* blabla */}
        </div>
    );
}

export default Home;
