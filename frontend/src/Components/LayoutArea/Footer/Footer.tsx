import Clock from "../../SharedArea/Clock/Clock";
import SocialMedia from "../../SharedArea/SocialMedia/SocialMedia";
import Total from "../../CouponArea/Total/Total";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <SocialMedia/>
			<p>One coupon to rule them all, one coupon to find them, One coupon to bring them all, and in the darkness bind them.</p>
            <Clock/>
            <Total/>
        </div>
    );
}

export default Footer;
