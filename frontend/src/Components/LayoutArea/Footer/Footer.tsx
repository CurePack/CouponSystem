import SocialMedia from "../../SharedArea/SocialMedia/SocialMedia";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <SocialMedia/>
			<p>One coupon to rule them all, one coupon to find them, One coupon to bring them all, and in the darkness bind them.</p>
            <div className="Footer-spacer" aria-hidden="true">
                <SocialMedia/>
            </div>
        </div>
    );
}

export default Footer;
