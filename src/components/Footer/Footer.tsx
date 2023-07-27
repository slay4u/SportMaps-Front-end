import React from "react";
import logo from "../images/logo.svg";
import facebook from "../images/icon-facebook.svg";
import instagram from "../images/icon-instagram.svg";
import pinterest from "../images/icon-pinterest.svg";
import twitter from "../images/icon-twitter.svg";
import youtube from "../images/icon-youtube.svg";

export default function Footer() {
    return (<footer className="primary-footer">
        <div className="primary-footer-wrapper">
            <div className="primary-footer-logo">
                <a href="/"><img src={logo} alt="SportMaps"/></a>
                <ul className="social-list" role="list" aria-label="Social links">
                    <li><a aria-label="youtube" href="#">
                        <img className="social-icon" src={facebook} alt="Facebook icon"/>
                    </a></li>
                    <li><a aria-label="facebook" href="#">
                        <img className="social-icon" src={instagram} alt="Instagram icon"/>
                    </a></li>
                    <li><a aria-label="instagram" href="#">
                        <img className="social-icon" src={pinterest} alt="Pinterest icon"/>
                    </a></li>
                    <li><a aria-label="twitter" href="#">
                        <img className="social-icon" src={twitter} alt="Twitter icon"/>
                    </a></li>
                    <li><a aria-label="pinterest" href="#">
                        <img className="social-icon" src={youtube} alt="Youtube icon"/>
                    </a></li>
                </ul>
            </div>
            <div className="primary-footer-nav">
                <nav className="footer-nav">
                    <ul className="flow" aria-label="Footer" role="list">
                        <li><a href="/">Home</a></li>
                        <li><a href="/news">News</a></li>
                        <li><a href="/forums">Forums</a></li>
                        <li><a href="/coaches">Coaches</a></li>
                        <li><a href="/maps">Maps</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/terms">Our Terms</a></li>
                        <li><a href="/disclaimer">Disclaimer</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        <div className="center-container primary-footer-copyright">
            <p>© {new Date().getFullYear()} SportMaps. All Rights Reserved.</p>
        </div>
    </footer>);
}
