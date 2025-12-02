import React, { useContext, useEffect, useState } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import burgerMenu from '../../images/burger-menu.svg';
import Menu from '../menu/Menu';
import CatalogModal from '../modals/catalogModal/CatalogModal';
import { useTranslation } from 'react-i18next';
import './navbar.scss';
import Category from './Category';

const Navbar = ({ className = '' }) => {
  const [menuActive, setMenuActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const history = createBrowserHistory({ window });
  const [activeButton, setActiveButton] = useState(
    window.localStorage.getItem('language') || 'ru'
  );
  const [position, setPosition] = useState(getPosition());
  const { t } = useTranslation();

  const scrollToFooter = () => {
    const pageHeight = document.documentElement.scrollHeight;
    window.scrollTo({
      top: pageHeight,
      behavior: 'smooth',
    });
  };

  const handleClick = buttonId => {
    setActiveButton(buttonId);
  };
  const moveRight = offset => {
    setPosition(offset);
  };

  function getPosition() {
    if (activeButton === 'ru') {
      return 0;
    } else if (activeButton === 'uz') {
      return 39;
    }
    return 77;
  }

  const changeLanguage = newLanguage => {
    window.localStorage.setItem('language', newLanguage);
    window.location.reload();
  };

  useEffect(() => {
    const lang = localStorage.getItem('language') || 'ru';
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.homescare.uz/${lang}/products/test-categories/`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 500) {
        // Проверяем, что это мобильное устройство
        if (window.scrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light ${
          isScrolled ? 'scrolled' : ''
        } ${className}`}
      >
        <a className="navbar-brand" href="/">
          <img className="headerImg" src={logo} alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setMenuActive(true)}
        >
          <img src={burgerMenu} alt="" />
        </button>
        <Menu active={menuActive} setActive={setMenuActive} />
        <div
          className="collapse nav-collapse navbar-collapse"
          id="navbarNavAltMarkup"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
            <Link
                to="/"
              className={` nav-link ${
                location.pathname === '/' ? 'active' : ''
              }`}

            >
                {t('navbar.main')}
               </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/aboutCompany"
                className={` nav-link ${
                  history.location.pathname === '/aboutCompany' ? 'active' : ''
                }`}
              >
                {t('navbar.aboutCompany')}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/ourPartners"
                className={` nav-link ${
                  history.location.pathname === '/ourPartners' ? 'active' : ''
                }`}
              >
                {t('navbar.partners')}
              </Link>
            </li>
            {/* <li className="nav-item">
                            <Link
                                to="/order"
                                className={`nav-link ${history.location.pathname === "/order" ? "active" : ""}`}
                            >
                                {t("navbar.ourAdvantages")}
                            </Link>
                        </li> */}
            <li className="nav-item navbar-catalog">
              <Link
                to="/catalog"
                className={`nav-link ${
                  history.location.pathname === '/catalog' ? 'active' : ''
                }`}
              >
                {t('navbar.catalog')}
              </Link>
              <ul className="navbar-catalog-menu" style={{ zIndex: 9999 }}>
                {categories?.map(item => (
                  <Category key={item.id} categoryItems={item} />
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link
                to="/vacancies"
                className={` nav-link ${
                  history.location.pathname === '/vacancies' ? 'active' : ''
                }`}
              >
                {t('navbar.vacancies')}
              </Link>
            </li>
            <li className="nav-item" onClick={() => scrollToFooter()}>
              <Link className={` nav-link `}>{t('navbar.contacts')}</Link>
            </li>
          </ul>
          <div className="changeLanguage" style={{ marginTop: '40px' }}>
            <Link
              style={{ textDecoration: 'none' }}
              className={activeButton === 'ru' ? 'rus active' : 'rus'}
              onClick={() => {
                handleClick(null);
                moveRight(0);
                changeLanguage('ru');
              }}
            >
              rus
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              className={activeButton === 'uz' ? 'uzb active' : 'uzb'}
              onClick={() => {
                handleClick(1);
                moveRight(39);
                changeLanguage('uz');
              }}
            >
              uzb
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              className={activeButton === 'en' ? 'eng active' : 'eng'}
              onClick={() => {
                handleClick(2);
                moveRight(77);
                changeLanguage('en');
              }}
            >
              eng
            </Link>
            <span
              className={'language-button'}
              style={{ left: position }}
            ></span>
            {/* <CatalogModal/> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
