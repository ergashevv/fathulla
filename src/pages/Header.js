import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import cardImg1 from '../partnersImg/17.png';
import cardImg2 from '../partnersImg/18.png';
import Flickity from 'react-flickity-component';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import HeaderVideo from '../video/ru2.mp4';
import oilCard from '../images/milk2.png';
import oilCard2 from '../images/cat2.png';
import top5Card from '../images/top-col-5-card.png';
import rectengleImg from '../images/squre-elemrnt.svg';
import top3CardMain from '../images/top-col-3-card.png';
import capsule from '../images/header-capsule-text.svg';
import carouselCard1 from '../images/milk2.png';
import bottom5Card from '../images/bottom-col-5-card.png';
import ourValuesIcon1 from '../images/our_values_icon_1.svg';
import ourValuesIcon2 from '../images/our_values_icon_2.svg';
import ourValuesIcon3 from '../images/our_values_icon_3.svg';
import ourValuesIcon4 from '../images/our_values_icon_4.svg';
import ourValuesIcon5 from '../images/our_values_icon_5.svg';
import ourValuesIcon6 from '../images/our_values_icon_6.svg';
import aboutImg from '../images/header-capsule-text-mini.svg';
import bottom3CardMini from '../images/bottom-col-3-card.png';
import Application from '../components/application/Application';
import headerOilDropLeft from '../images/header oil drop left.png';
import headerOilDropRight from '../images/header oil drop right.svg';
import headerOilDropCenter from '../images/header oil drop centre.svg';
import CustomReactPlayer from '../components/CustomReactPlayer/CustomReactPlayer';
import { fetchCategories } from '../http';
import ReactPlayer from 'react-player';
import axios from 'axios';
import '../sass/flickitySlider.scss';
import '../sass/header.scss';
import { fetchPartners } from '../http';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [popupData, setPopupData] = useState(null);
  const [selectedPlacemark, setSelectedPlacemark] = useState(null);

  const [partnersData, setPartnersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categoriesData, setCategoriesData] = useState([]);

  const fetchData = async () => {
    const categories = await fetchCategories();
    setCategoriesData(categories);

    const data = await fetchPartners();
    setPartnersData(data);
  };

  function getCategoryLink(name) {
    const category = categoriesData.find(
      item =>
        item.title && item.title.toLowerCase().includes(name.toLowerCase())
    );
    return category?.id || null;
  }
  const { t } = useTranslation();
  useEffect(() => {
    (async () => {
      try {
        await fetchData();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();

    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);
  const [url, setUrl] = useState('');

  const lang = localStorage.getItem('language') || 'ru';

  useEffect(() => {
    axios
      .get(`https://api.homescare.uz/${lang}/others/api/v1/catalog-video/`)
      .then(function (response) {
        setUrl(response.data[0].video);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, [lang]);

  const CustomReactPlayer = ({ url, playing, playsinline, muted }) => {
    return (
      <ReactPlayer
        url={url}
        playing={playing}       // Автозапуск
        muted={muted}           // Отключение звука
        playsinline={playsinline} // Inline-режим
        controls={true}         // Отображение элементов управления
        width="100%"
        height="100%"
      />
    );
  };

  console.log(categoriesData)

  return (
    <>
      <div className="home text-white">
        <header className={`header ${isVisible ? 'animatedHeader' : ''}`}>
          <div className="container">
            <Navbar active={menuActive} setActive={setMenuActive} />
            <section className="header-info">
              <div className="row">
                <div className="col-lg-7 col-md-12">
                  <h1>
                    NOBEL
                    <span className="header-capsule d-flex align-items-center">
                      <img
                        className={`animatedBox ${isVisible ? 'appear' : ''}`}
                        src={capsule}
                        alt=""
                      />
                      <span className="header-text_style">TRADE</span>
                    </span>
                  </h1>
                  <p
                    className={`subtitle animatedBox ${
                      isVisible ? 'appear' : ''
                    }`}
                  >
                    {t('home.com_trade')}
                  </p>
                </div>
                <div className="col-lg-5 col-md-12">
                  <div className="home__card">
                    <img
                      className={`imgLeft ${
                        isVisible ? 'animatedImgLeft' : ''
                      }`}
                      src={headerOilDropLeft}
                      alt=""
                    />
                  </div>
                  <img
                    className={`imgCenter ${
                      isVisible ? 'animatedImgCenter' : ''
                    }`}
                    src={headerOilDropCenter}
                    alt=""
                  />
                  <img
                    className={`imgRight ${
                      isVisible ? 'animatedImgRight' : ''
                    }`}
                    src={headerOilDropRight}
                    alt=""
                  />
                </div>
              </div>
            </section>
          </div>
        </header>
        <div className="about">
          <section className="main container">
            <h3 className={`title`}>
              <span className="about-capsule" data-aos="fade-up">
                {t('home.about')}
              </span>
              <img
                className="about-img d-flex align-items-center"
                src={aboutImg}
                alt=""
              />
            </h3>
            <p
              className="subtitle"
              data-aos="fade-up"
              style={{ marginLeft: '2%' }}
            >
              {t('home.for_us')}
            </p>
            <div className="video-player" style={{ padding: '20px' }}>
              <CustomReactPlayer url={url} playing={true} playsinline muted={true} />
            </div>
            <h2>
              <span className="rectengle-img">
                <img
                  src={rectengleImg}
                  alt=""
                  data-aos="fade-right"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                />
              </span>
              NOBEL TRADE
              <br></br>
              <p className="cat2" style={{ letterSpacing: 'normal' }}>
                {t('home.catalog')}
              </p>
            </h2>
            {/* <p className="subtitle">
                            Основана в 2009 году и в настоящее время в компании работают 150
                            человек.
                            <br />
                            Дистрибуционная сеть компании NOBEL TRADE состоит из 12 филиалов,
                            со своими офисами
                            <br />и складами, в 12 областях страны.
                        </p> */}
            <Flickity
              className={'carousel'}
              elementType={'div'}
              options={{ initialIndex: 0 }}
              disableImagesLoaded={false}
              reloadOnUpdate
              static
            >
              {/* {`carded me-4`} */}
              <div className="carousel-cell">
                <div className="carousel-overlay">
                  <Link
                    to="/catalog#category-4"
                  >
                    <img className={`carded me-4`} src={carouselCard1} alt="" />
                    <div className="carousel-text">{t('home.food1')}</div>
                  </Link>
                </div>
              </div>
              <div className="carousel-cell">
                <div className="carousel-overlay">
                  <Link
                    to="/catalog#category-1"
                  >
                    <img className={`carded me-4`} src={oilCard2} alt="" />
                    <div className="carousel-text">{t('home.food2')}</div>
                  </Link>
                </div>
              </div>
              <div className="carousel-cell">
                <div className="carousel-overlay">
                  <Link
                    to="/catalog#category-2"
                  >
                    <img className={`carded me-4`} src={top5Card} alt="" />
                    <div className="carousel-text">{t('home.food3')}</div>
                  </Link>
                </div>
              </div>
              <div className="carousel-cell">
                <div className="carousel-overlay">
                  <Link
                    to="/catalog#category-5"
                  >
                    <img className={`carded me-4`} src={bottom5Card} alt="" />
                    <div className="carousel-text">{t('home.food4')}</div>
                  </Link>
                </div>
              </div>
              <div className="carousel-cell">
                <div className="carousel-overlay">
                  <Link
                    to="/catalog#category-4"
                  >
                    <img className={`carded me-4`} src={top3CardMain} alt="" />
                    <div className="carousel-text">{t('home.food5')}</div>
                  </Link>
                </div>
              </div>
              <div className="carousel-cell">
                <div className="carousel-overlay">
                  <Link
                    to="/catalog#category-3"
                  >
                    <img
                      className={`carded me-4`}
                      src={bottom3CardMini}
                      alt=""
                    />
                    <div className="carousel-text">{t('home.food6')}</div>
                  </Link>
                </div>
              </div>
            </Flickity>
            <div className="partnors row">
              <div className="col-lg-3" data-aos="zoom-out-right">
                <div className="col-12 __card mb-3 pe-2">
                  <Link
                    to="/catalog#category-4"
                  >
                    <img className="card1 carded" src={oilCard} alt="" />
                    <span
                      style={{
                        paddingLeft: '10px',
                      }}
                      className="card__text"
                    >
                      {t('home.food1')}
                    </span>
                  </Link>
                </div>
                <div className="col-12 __card">
                  <Link
                    to="/catalog#category-1"
                  >
                    <img className="card1 carded" src={oilCard2} alt="" />
                    <span className="card__text">{t('home.food2')}</span>
                  </Link>
                </div>
              </div>
              <div className="col-lg-5" data-aos="zoom-out-right">
                <div className="col-12 __card">
                  <Link
                    to="/catalog#category-2"
                  >
                    <img className="card2 carded" src={top5Card} alt="" />
                    <span className="card__text">{t('home.food3')}</span>
                  </Link>
                </div>
                <div className="col-12 __card">
                  <Link
                    to="/catalog#category-5"
                  >
                    <img
                      className="card2 card3 carded"
                      src={bottom5Card}
                      alt=""
                    />
                    <span className="card__text">{t('home.food4')}</span>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3" data-aos="zoom-out-right">
                <div className="col-12 __card">
                  <Link
                    to="/catalog#category-4"
                  >
                    <img className="card4 carded" src={top3CardMain} alt="" />
                    <span className="card__text">{t('home.food5')}</span>
                  </Link>
                </div>
                <div className="col-12 __card">
                  <Link
                    to="/catalog#category-3"
                  >
                    <img
                      className="card5 carded"
                      src={bottom3CardMini}
                      alt=""
                    />
                    <span className="card__text">{t('home.food6')}</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="our_values my-5">
              <div
                className="d-flex justify-content-center align-items-center gap-2"
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
              >
                <h3 className="our_values_h3">{t('home.nash_sen')}</h3>
                <img
                  className="our_values_img d-flex align-items-center"
                  src={aboutImg}
                  alt=""
                />
              </div>
              <div className="text-center">
                <div
                  className="row row-cols-2 row-cols-lg-3"
                  data-aos="fade-right"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <div className="col p-0 m-0">
                    <img
                      src={ourValuesIcon1}
                      alt="icon"
                      className="our_values_icon"
                    />
                    <p className="our_values_p">{t('home.guarante')}</p>
                  </div>
                  <div className="col">
                    <img
                      src={ourValuesIcon2}
                      alt="icon"
                      className="our_values_icon"
                    />
                    <p className="our_values_p">{t('home.solve')}</p>
                  </div>
                  <div className="col">
                    <img
                      src={ourValuesIcon3}
                      alt="icon"
                      className="our_values_icon"
                    />
                    <p className="our_values_p">{t('home.big')}</p>
                  </div>
                  <div className="col">
                    <img
                      src={ourValuesIcon4}
                      alt="icon"
                      className="our_values_icon"
                    />
                    <p className="our_values_p">{t('home.ots')}</p>
                  </div>
                  <div className="col">
                    <img
                      src={ourValuesIcon5}
                      alt="icon"
                      className="our_values_icon"
                    />
                    <p className="our_values_p">{t('home.done')}</p>
                  </div>
                  <div className="col">
                    <img
                      src={ourValuesIcon6}
                      alt="icon"
                      className="our_values_icon"
                    />
                    <p className="our_values_p">{t('home.help')}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Men yozishni tugatgan kod */}
          </section>
          {/* <section className="about-us">
            <div className="row">
              <div className="col-lg-4" data-aos="zoom-in">
                <div className="card-about">
                  <h3>15 лет</h3>
                  <p className="subtitle">
                    успешного опыта
                    <br /> на мировом рынке
                  </p>
                  <img src="{years15}" alt="" />
                </div>
              </div>
              <div className="col-lg-4" data-aos="zoom-in">
                <div className="card-about">
                  <h4>12 филиалов</h4>
                  <p className="subtitle">
                    со своими складамии <br /> офисами в 12 областях страны
                  </p>
                  <img src="{uzbekistanMap}" alt="" />
                </div>
              </div>
              <div className="col-lg-4" data-aos="zoom-in">
                <div className="card-about">
                  <h3>8000</h3>
                  <p className="subtitle">
                    торговых точек
                    <br /> достигает активная клиентская база
                  </p>
                  <img src="{oil8000}" alt="" />
                </div>
              </div>
              <div className="col-lg-12 " data-aos="zoom-in">
                <div className="card-about d-flex justify-content-between py-4">
                  <div className="col-lg-6 col-md-12">
                    <img className="h-100" src="{sunFlower}" alt="" />
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <img className={`blackSeed`} src="{blackSeeds}" alt="" />
                    <p className="subtitle">
                      суммарная производственная мощностьпредприятий компаний
                    </p>
                    <h3 className="title">365 000 тонн в год</h3>
                    <p className="subtitle">переработки семян подсолнуха</p>
                    <img
                      className={`blackSeed-media`}
                      src="{blackSeeds}"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          <section className="partners">
            <div className="partners-page container">
              <h2>
                <span className="rectengle-img" data-aos="fade-right">
                  {t('home.partner')}
                </span>
                <img src={rectengleImg} alt="" data-aos="fade-right" />
              </h2>
              <div className="row">
                <div className="col-lg-12">
                  <div className="partners--grid">
                    {partnersData?.map((item, index) => (
                      <img key={index} src={item?.image} alt="" />
                    ))}
                  </div>
                </div>
              </div>
              <h3>{t('home.dosh')}</h3>
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="partners-card d-flex justify-content-center align-items-center">
                    <img src={cardImg1} alt="" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 ">
                  <div className="partners-card d-flex justify-content-center align-items-center">
                    <img src={cardImg2} alt="" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="partners-card d-flex justify-content-center align-items-center">
                    <h2 style={{ fontSize: '60px', fontFamily: 'sans-serif' }}>
                      Rimado
                    </h2>
                  </div>
                </div>
              </div>
              <Application />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default CustomReactPlayer;