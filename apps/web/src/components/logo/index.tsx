import { Link } from "react-router";
import logo from "../../assets/images/logo.svg";

export default function Logo() {
    return (
        <Link to="/" className="inline-flex shrink-0" aria-label="Logo">
            <img src={logo} alt="Eventerest Logo" width={32} height={32} />
        </Link>
    );
}
