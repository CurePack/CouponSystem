import "./SocialMedia.css";
import { FaGithub, FaLinkedin, FaWhatsapp, FaTelegram } from "react-icons/fa";

function SocialMedia(): JSX.Element {
    return (
        <div className="SocialMedia">
            <a href="https://github.com/CurePack" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub className="image-github" size={42}/>
            </a>
            <a href="https://www.linkedin.com/in/dmitry-balakhnov/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="image-distance" size={42}/>
            </a>
            <a href="https://wa.me/16474465336" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <FaWhatsapp className="image-distance" size={42}/>
            </a>
            <a href="https://t.me/dmitry_balakhnov" target="_blank" rel="noreferrer" aria-label="Telegram">
                <FaTelegram className="image-distance" size={42}/>
            </a>
        </div>
    );
}

export default SocialMedia;
