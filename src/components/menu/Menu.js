import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {createBrowserHistory} from "history";
import instagram from "../../images/pngwing 1.png";
import telegram from "../../images/Telegram_2019_Logo 1.png";
import phone from "../../images/phone icon.svg";
import location from "../../images/location icon.svg";
import closeButton from '../../images/close-button.svg'
import { useTranslation } from 'react-i18next';
import './menu.scss'

const Menu = ({active, setActive}) => {
    const history = createBrowserHistory({window});
    const [activeButton, setActiveButton] = useState(window.localStorage.getItem("language") || "ru");
    const [position, setPosition] = useState(0)
    const { t } = useTranslation();


    const scrollToFooter = () => {
        // Получаем высоту страницы
        const pageHeight = document.documentElement.scrollHeight;
        // Прокручиваем страницу до нижней части
        window.scrollTo({
            top: pageHeight,
            behavior: 'smooth' // Добавляем плавную анимацию скролла
        });
    }

    const handleClick = (buttonId) => {
        setActiveButton(buttonId)
    }
    const moveRight = (offset) => {
        setPosition(offset);
    };

    const changeLanguage = (newLanguage) => {
        window.localStorage.setItem("language", newLanguage);
        window.location.reload();
    };

    return (
        <>
            {active && <div className="menu-navbar-overlay" onClick={() => setActive(false)}></div>}
            <div className={active ? "menu-navbar activeTab" : "menu-navbar"}>

                <div className="collapse menu-collapse navbar-collapse" id="navbarNavAltMarkup">
                    <button className={`btn close-button`} type='button' onClick={() => setActive(false)}><img
                        src={closeButton} alt=""/></button>
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link to="/"
                                                       className={` nav-link ${history.location.pathname === "/" ? "active" : ""}`}> {t('navbar.main')}</Link>
                        </li>
                        <li className="nav-item"><Link to="/aboutCompany"
                                                       className={` nav-link ${history.location.pathname === "/aboutCompany" ? "active" : ""}`}> {t('navbar.aboutCompany')}</Link>
                        </li>
                        {/* <li className="nav-item"><Link  to="/ourPartners" className={` nav-link ${history.location.pathname === "/ourPartners" ? "active" : ""}`}>ПАРТНЕРЫ</Link></li> */}
                        {/* <li className="nav-item"><Link to="/order" className={`nav-link ${history.location.pathname === "/order" ? "active" : ""}`}>НАШИ ПРЕИМУЩЕСТВА</Link></li> */}
                        <li className="nav-item"><Link to="/catalog"
                                                       className={`nav-link ${history.location.pathname === "/catalog" ? "active" : ""}`}>{t('navbar.catalog')}</Link>
                        </li>
                        <li className="nav-item"><Link to="/vacancies"
                                                       className={` nav-link ${history.location.pathname === "/vacancies" ? "active" : ""}`}>{t('navbar.vacancies')}</Link>
                        </li>
                        <li className="nav-item"><Link onClick={() => {
                            scrollToFooter();
                            setActive(false)
                        }}
                                                       className={` nav-link ${history.location.pathname === "/" ? "active" : ""}`}>{t('navbar.contacts')}</Link>
                        </li>

                    </ul>
                    <div className="changeLanguage">
                        <div className={activeButton === "ru" ? "rus active" : "rus"} onClick={() => {
                            handleClick("ru")  // Изменено с null на "ru"
                            moveRight(0)
                            changeLanguage("ru")
                            setActive(false)
                        }}>rus
                        </div>
                        <div className={activeButton === "uz" ? "uzb active" : "uzb"} onClick={() => {
                            handleClick("uz")
                            moveRight(28)
                            changeLanguage("uz")
                            setActive(false)
                        }}>uzb
                        </div>
                        <div
                            className={activeButton === "en" ? "eng active" : "eng"}
                            onClick={() => {
                                handleClick("en")
                                moveRight(59)
                                changeLanguage("en")
                                setActive(false)
                            }}
                        >eng
                        </div>
                        {/* <span className="language-button" style={{left: `${position}px`}}>
                        </span> */}
                    </div>
                    <div className="contact">
                        <div className="footer-socials">
                            <Link target='blank' to="https://www.instagram.com/nobeltrade?igsh=OGh0ZDc1anl4M3Iz">
                                <img src={instagram} alt=""/>
                            </Link>
                            <Link target='blank' to="https://t.me/nobeltradeuz">
                                <img src={telegram} alt=""/>
                            </Link>
                        </div>
                        <div className="footer-contacts">
                            <p className="phone-number">
                                <img src={phone} alt=""/>
                                <a
                                    className="text-white text-decoration-none"
                                    href="tel:998 71 209 33 35"
                                >
                                    +998 71 209 33 35
                                </a>
                            </p>

                            <p className="address">
                                <img src={location} alt=""/>
                                <Link className='text-decoration-none'

                                      target="_blank"
                                      to="https://yandex.com/maps/-/CHa05PLU"
                                > {t("about.tash")}
                                </Link>
                            </p>

                        </div>
                    </div>
                    <h6>©2024 Nobel Trade. All rights reserved.</h6>
                </div>
            </div>
        </>
    );
};

export default Menu;