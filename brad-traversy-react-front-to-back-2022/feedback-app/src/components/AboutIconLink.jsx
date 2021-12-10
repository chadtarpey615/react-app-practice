import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";
function AboutIconLink() {
    return (
        <div className='about-link'>
            <Link to='/about'>
                <FaQuestion size={30} />
            </Link>
        </div>
    );
}

export default AboutIconLink;

// about links in react router dom 6.0 with NavLinks
