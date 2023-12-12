import React from 'react'
import logo from '../../assets/logo.svg'
import {Facebook, Instagram, Pinterest, Twitter, YouTube} from "@mui/icons-material";

export default function Footer() {
    return <footer className="primary-footer">
        <div className="primary-footer-wrapper">
            <div className="primary-footer-logo">
                <a href="/"><img src={logo} alt="SportMaps"/></a>
                <ul className="social-list" role="list" aria-label="Social links">
                    <li><a aria-label="youtube" href="#">
                        <Facebook/>
                    </a></li>
                    <li><a aria-label="facebook" href="#">
                        <Instagram/>
                    </a></li>
                    <li><a aria-label="instagram" href="#">
                        <Pinterest/>
                    </a></li>
                    <li><a aria-label="twitter" href="#">
                        <Twitter/>
                    </a></li>
                    <li><a aria-label="pinterest" href="#">
                        <YouTube/>
                    </a></li>
                </ul>
            </div>
            <div className="primary-footer-nav">
                <nav className="footer-nav">
                    <ul className="flow" aria-label="Footer" role="list">
                        <li><a href="/">News</a></li>
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
    </footer>
}
