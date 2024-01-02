import './Footer.css';
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <img src={playStore} alt="playStore" />
        <img src={appStore} alt="appStore" />
      </div>
      <div className="midFooter">
        <h1>ElectroShop</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2022 &copy; Alexander Sidorov</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://instagram.com/">Instagram</a>
        <a href="https://youtube.com/">Youtube</a>
        <a href="https://facebook.com/">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
