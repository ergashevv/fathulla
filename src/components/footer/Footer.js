import React, { useState } from "react";
import arrow from "../../images/arrow-top-right-large.svg";
import footerLogo from "../../images/footer-logo.svg";
import instagram from "../../images/pngwing 1.png";
import telegram from "../../images/Telegram_2019_Logo 1.png";
import phone from "../../images/phone icon.svg";
import location from "../../images/location icon.svg";
import AboutModal from "../modals/aboutModal/AboutModal";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useTranslation } from "react-i18next";
import "./footer.scss";
const Footer = () => {
  const [aboutModal, setAboutModal] = useState(false);
  const history = createBrowserHistory({ window });

  const openModal = () => {
    setAboutModal(true);

    document.body.style.overflow = "hidden";
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const { t } = useTranslation()

  return (
    <>
      <footer className="footer">
        <div className="footer-components container">
          {/* <div className="footer-form">
            <p className={`subtitle`}>
              АКТУАЛЬНЫЕ ВАКАНСИИ В<br /> НАШЕЙ КОМПАНИИ
            </p>
            <button className="btn" onClick={() => openModal()}>
              ОТПРАВИТЬ
              <br /> СВОИ ДАННЫЕ <img src={arrow} alt="" />
            </button>
          </div> */}
          <div className="footer-navigate">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <img width={156} src={footerLogo} alt="" />
                <ul className="navbar-footer">
                  <li className="nav-item">
                    <Link
                      to="/"
                      className={` nav-link ${history.location.pathname === "/" ? "active" : ""
                        }`}
                      onClick={scrollToTop}
                    >
                      {t("navbar.main")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/aboutCompany"
                      className={` nav-link ${history.location.pathname === "/aboutCompany"
                        ? "active"
                        : ""
                        }`}
                      onClick={scrollToTop}
                    >
                      {t("navbar.aboutCompany")}
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link
                      to="/ourPartners"
                      className={` nav-link ${
                        history.location.pathname === "/ourPartners"
                          ? "active"
                          : ""
                      }`}
                      onClick={scrollToTop}
                    >
                      ПАРТНЕРЫ
                    </Link>
                  </li> */}
                  {/* <li className="nav-item"><Link to="/order" className={`nav-link ${history.location.pathname === "/order" ? "active" : ""}`} onClick={scrollToTop}>НАШИ ПРЕИМУЩЕСТВА</Link></li> */}
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-6 main-part">
                <ul className="navbar-footer">
                  <li className="nav-item">
                    <Link
                      to="/catalog"
                      className={`nav-link ${history.location.pathname === "/catalog" ? "active" : ""
                        }`}
                      onClick={scrollToTop}
                    >
                      {t("navbar.catalog")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/vacancies"
                      className={` nav-link ${history.location.pathname === "/vacancies"
                        ? "active"
                        : ""
                        }`}
                      onClick={scrollToTop}
                    >
                      {t("navbar.vacancies")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={` nav-link`}>{t("navbar.contacts")}</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="footer-socials">
                  <Link target='blank' to="https://www.instagram.com/nobeltrade?igsh=OGh0ZDc1anl4M3Iz">
                    <img src={instagram} alt="" />
                  </Link>
                  <Link target='blank' to="https://t.me/nobeltradeuz">
                    <img src={telegram} alt="" />
                  </Link>
                </div>
                <div className="footer-contacts">
                  <p className="phone-number">
                    <img src={phone} alt="" />
                    <a
                      className="text-white text-decoration-none"
                      href="tel:998 71 209 33 35"
                    >
                      +998 71 209 33 35
                    </a>
                  </p>
                  <Link
                    className="address text-white text-decoration-none mb-3"
                    target="_blank"
                    to="https://yandex.com/maps/-/CHa05PLU"
                  >
                    <img src={location} alt="" />
                    {t("about.tash")}
                  </Link>
                </div>
              </div>
              <div className="col-lg-12">
                <h6>{t("about.year")}</h6>
                {/* <p>LF- Latipov Fathulla</p> */}
              </div>
              <AboutModal
                modalActive={aboutModal}
                setModalActive={setAboutModal}
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
