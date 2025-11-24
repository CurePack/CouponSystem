import "./SocialMedia.css";
import {FaFacebook,FaTwitter,FaGithub,FaInstagram,FaLinkedin} from "react-icons/fa"

function SocialMedia(): JSX.Element {
    return (
        <div className="SocialMedia">
			<FaFacebook className="image-distance" size={42}/>
            <FaTwitter className="image-distance" size={42}/>
            <FaGithub className="image-github" size={42}/>
            <FaInstagram className="image-distance" size={42}/>
            <FaLinkedin className="image-distance" size={42}/>
        </div>
    );
}

export default SocialMedia;
