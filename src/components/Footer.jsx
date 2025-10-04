import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer ">
      <div className="footer-div">
        <div className="links">
           <p style={{color:'navy'}}><b>© 2025 {`</EasyNotes>`}</b></p>,&nbsp;·&nbsp;
          <a href="mailto:noreplyfromtraveldotcom@gmail.com" className="footer-link" style={{ fontWeight: 'bold', color: 'rgb(6, 168, 171)', textDecoration: 'none' }}>Contact Us</a>
          &nbsp;·&nbsp;
          <Link to="/feedback" style={{ fontWeight: 'bold', color: 'rgb(6, 168, 171)', textDecoration: 'none' }} className="footer-link">Give us feedback</Link>
          &nbsp;·&nbsp;
          <Link to="#" className="footer-link" style={{ textDecoration: 'none' }}>Sitemap</Link>
          &nbsp;·&nbsp;
          <Link to="#" className="footer-link" style={{ textDecoration: 'none' }}>Company details</Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;