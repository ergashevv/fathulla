import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import capsuleMini from '../images/header-capsule-text-mini.svg';
import headerFactory from '../images/home_screen.png';
import callCenter from '../images/Call center photo.png';
import partners from '../images/partners.png';
import advantagesSectionTruck from '../images/truck.png';
import advantagesRectangle from '../images/squre-elemrnt.svg';
import arrow from '../images/arrow-top-right-large.svg';
import '../sass/advantages.scss';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import Employes from '../components/employes';
import EmployesTeam from '../components/employes/index2';
import Footer from '../components/footer/Footer';
import Application from '../components/application/Application';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';
import Fathulla from '../images/fathulla.png';

const Advantages = () => {
  const { t } = useTranslation();
  const location = useLocation(); // Получаем текущий путь
  const isAboutCompanyPage = location.pathname === '/aboutCompany'; // Определяем, находится ли пользователь на странице AboutCompany
  const locations = [
    {
      location: [40.975396, 71.583766],
      phone: '(93)5992020',
      name: 'Namangan',
      youtubeLink: 'https://yandex.uz/maps/?ll=71.583822%2C40.975297&mode=search&sll=71.583766%2C40.975396&text=40.975396%2C71.583766&z=18.84'
    },
    {
      location: [42.422404, 59.647782],
      phone: '(90)8251441',
      name: 'Nukus',
      youtubeLink: 'https://yandex.uz/maps/10337/nukus/?ll=59.655065%2C42.407205&mode=search&sll=59.647782%2C42.422404&text=42.422404%2C59.647782&z=14.21'
    },
    {
      location: [39.756663, 64.456699],
      phone: '(90)4250767',
      name: 'Buxoro',
      youtubeLink: 'https://yandex.uz/maps/10330/bukhara/?ll=64.458905%2C39.757490&mode=search&sll=64.456699%2C39.756663&text=39.756663%2C64.456699&z=17.2'
    },
    {
      location: [38.819071, 65.790009],
      phone: '(90)4250767',
      name: 'Qarshi',
      youtubeLink: 'https://yandex.uz/maps/10331/karshi/?ll=65.790275%2C38.819458&mode=search&sll=65.790009%2C38.819071&text=38.819071%2C65.790009&z=17.12'
    },
    {
      location: [41.53457, 60.653157],
      phone: '(95)9393222',
      name: 'Xorazm',
      youtubeLink: 'https://yandex.uz/maps/21105/urgench/?ll=60.653814%2C41.534471&mode=search&sll=60.653157%2C41.534570&text=41.534570%2C60.653157&z=18'
    },
    {
      location: [39.686573, 66.946523],
      phone: '(91)4920700',
      name: 'Samarqand',
      youtubeLink: 'https://yandex.uz/maps/10334/samarkand/?ll=66.946527%2C39.686485&mode=search&sll=66.946523%2C39.686573&text=39.686573%2C66.946523&z=19.1'
    },
    {
      location: [40.811896, 72.352687],
      phone: '(93)4428525',
      name: 'Andijon',
      youtubeLink: 'https://yandex.uz/maps/10329/andijan/?ll=72.352887%2C40.812307&mode=search&sll=72.352687%2C40.811896&text=40.811896%2C72.352687&z=19.26'
    },
    {
      location: [41.418503, 69.195115],
      phone: '(99)2400550',
      name: 'Keles',
      youtubeLink: 'https://yandex.uz/maps/?ll=69.195627%2C41.418582&mode=search&sll=69.195115%2C41.418503&text=41.418503%2C69.195115&z=19.16'
    },
    {
      location: [38.269644, 67.915327],
      phone: '(99)2400550',
      name: 'Denov',
      youtubeLink: 'https://yandex.uz/maps/?ll=69.195627%2C41.418582&mode=search&sll=69.195115%2C41.418503&text=41.418503%2C69.195115&z=19.16'
    },
  ];
  return (
    <>
      <div className="advantages">
        <div className="container">
          <Navbar className={isAboutCompanyPage ? 'hidden-navbar' : ''} />
        </div>
        <header className="header" style={{ width: '100%' }}>
          <div className="zero-two">
            <h1>
              <span data-aos="zoom-in">{t('about.misson')}</span>
              <img data-aos="fade-right" src={capsuleMini} alt="" /> <br />
            </h1>
            <p
              className="subtitle"
              data-aos="zoom-in"
             
            >
              {t('about.data_vozmojt')}
            </p>
            <div className="row">
              <div className="col-lg-12" data-aos="zoom-in-up">
                <img src={headerFactory} alt="" />
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="container">
            <p className="subtitle">
              {t('about.company_nobel_trade')}
            </p>
            <div className="companies-info" data-aos="zoom-in">
              <h2 className="title">{t('about.nobel_trade')}</h2>
              <p className="companies-subtitle">{t('about.company_sochet')}</p>
              <h3>{t('about.skorost_kachestva')}</h3>
            </div>
            <div className="row">
              <div className="col-lg-6 text-left" data-aos="zoom-out-left">
                <h4>
                  {t('about.sobs')} <br />
                  {t('about.call_center')} <img src={capsuleMini} alt="" />
                </h4>
                <p className="subtitle">{t('about.pozovlyat_company')}</p>
              </div>
              <div className="col-lg-6" data-aos="zoom-out-right">
                <img className="half-img" src={callCenter} alt="" />
              </div>
              <div
                className="col-lg-6 title-show text-right mt-5 "
                data-aos="zoom-out-right"
              >
                <h4 className="">
                  {t('about.nashey')}
                  <br />
                  <img src={capsuleMini} alt="" />
                  {t('about.our_company')}
                </h4>
                <p className="subtitle">{t('about.company_nobel')}</p>
              </div>
              <div className="col-lg-6 mt-5" data-aos="zoom-out-left">
                <img className="half-img" src={partners} alt="" />
              </div>
              <div
                className="col-lg-6 title-hide text-right mt-5 "
                data-aos="zoom-out-right"
              >
                <h4 className="">
                  {t('about.nashey')}
                  <br />
                  <img src={capsuleMini} alt="" />
                  {t('about.our_company')}
                </h4>
                <p className="subtitle">{t('about.company_nobel')}</p>
              </div>
              {/* <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '50px',
                }}
                className="photos-containers"
              >
                <div className="left-sections">
                  <h3 style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      style={{ fontSize: '57px', color: '#fff' }}
                      data-aos="zoom-in"
                    >
                      {t('about.company_nobel_log')}{' '}
                    </span>
                    <img src={capsuleMini} alt="" />
                    <br />
                    {/* <span data-aos="zoom-in" style={{display: 'none'}}>{t("about.com")}</span> 
                  </h3>
                  <p className="subtitle">{t('about.kotoriy_doxot')}</p>
                 
                </div>
                <div className="right-sections">
                  <img
                    style={{
                      borderRadius: '12px',
                    }}
                    src={Fathulla}
                    alt=""
                  />
                </div>
              </div> */}
              <br></br>
              <div className="col-lg-6 text-left" data-aos="zoom-out-left">
                <br></br>
                <h4>
                  {t('about.company_nobel_log')}<img src={capsuleMini} style={{marginLeft: "6px"}}  alt="" />
                  
                </h4>
                <br></br>
                <p className="subtitle">{t('about.kotoriy_doxot')}</p>
              </div>
              <br></br>
              <div className="col-lg-6" data-aos="zoom-out-right">
                <br></br>
                <img className="half-img" src={Fathulla} alt="" />
              </div>
            </div>
          </div>
        </main>
        <section>
          <div className="container" style={{ paddingTop: '50px' }}>
          <span
                      style={{ fontSize: '57px', fontWeight: "600",  color: '#fff' }}
                      data-aos="zoom-in"
                    >
                      {t('about.logistic_text')}{' '}
                    </span>
            <p className="subtitle">{t('about.nobel_logistik')}</p>
            <p className="subtitle">{t('about.uje_bole')}</p>
            <p className="subtitle">{t('about.nashi_part')}</p>
            <p className="subtitle">{t('about.mi_je')}</p>
            <p className="subtitle">{t('about.poprobuy')}</p>
            <div
              style={{
                position: 'relative',
              }}
              className="_advantages"
            >
              <img
                className="advantages-truck"
                src={advantagesSectionTruck}
                alt=""
                data-aos="zoom-in-up"
              />
              <a
                className="_advantages-link"
                href="https://www.nobellogistics.uz/"
                target="_blank"
              >
                {t('about.uzn')}
                <span className="_advantages-arrow">
                  <img src={arrow} alt="arrow" />
                </span>
              </a>
            </div>

            {/* <h3 className="workers">
              <span
                style={{
                  textTransform: "uppercase",
                }}
                data-aos="zoom-in"
              >
                {t("about.ruko")} <br />
                NOBEL TRADE{" "}
              </span>
              <img src={capsuleMini} alt="" data-aos="fade-right" />
            </h3> */}
            <p
              style={{
                color: 'white',
                marginBottom: '0',
                paddingBottom: '20px',
                fontSize: '21px',
              }}
            ></p>
            {/* <div className="container mb-5 pb-5">
              <Employes />
            </div> */}
          </div>
          <div className="container">
            {/* <h3 className="workers ">
              <span data-aos="zoom-in">
                {t("about.sotrudnik")} <br />
                NOBEL TRADE{" "}
              </span>
              <img src={capsuleMini} alt="" data-aos="fade-right" />
            </h3> */}
            <p
              style={{
                color: 'white',
                marginBottom: '0',
                paddingBottom: '20px',
                fontSize: '21px',
              }}
            ></p>
          </div>
          {/* <div className="container mb-5 pb-5">
          <EmployesTeam />
        </div> */}
        </section>
        <div></div>
        <section>
          <div className="container">
            <h3 className="workers">
              <span data-aos="zoom-in">
                {t('about.nashi')} {''}
              </span>

              <img
                className="rectangle"
                src={advantagesRectangle}
                alt=""
                data-aos="fade-right"
              />

<p
              style={{
                color: 'white',
                marginBottom: '0',
                paddingBottom: '20px',
              
              }}
            >
              {t('about.osnoviy')}
            </p>
            </h3>
         
          </div>
        {/* Обновляем только секцию с картой */}
        <div className="container">
          <YMaps>
            <Map
              defaultState={{ center: [38.269644, 67.915327], zoom: 6 }}
              className="map"
              style={{
                width: '100%',
                borderRadius: '10px',
                height: '700px',
                margin: '0 auto',
              }}
            >
              {locations?.map((item, key) => (
                <Placemark
                  key={key}
                  geometry={item.location}
                  properties={{
                    iconContent: item.name,
                    hintContent: `Нажмите, чтобы перейти на YouTube канал ${item.name}`,
                    balloonContent: `
                      <div style="text-align: center;">
                        <p><strong>${item.name}</strong></p>
                        <p>Телефон: ${item.phone}</p>
                      </div>
                    `
                  }}
                  options={{
                    preset: 'islands#redStretchyIcon',
                    openBalloonOnClick: false // Отключаем стандартный баллон
                  }}
                  onClick={() => {
                    console.log(`Clicked on marker: ${item.name}`);
                    console.log(`Opening link: ${item.youtubeLink}`);
                    // Прямое открытие ссылки при клике на маркер
                    if (item.youtubeLink) {
                      try {
                        window.open(item.youtubeLink, '_blank', 'noopener,noreferrer');
                      } catch (error) {
                        console.error('Error opening link:', error);
                        // Резервный вариант, если первый не сработал
                        const link = document.createElement('a');
                        link.href = item.youtubeLink;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }
                    }
                  }}
                  modules={['geoObject.addon.balloon']}
                />
              ))}
            </Map>
            <br />
            <br />
          </YMaps>
        </div>
        </section>

        <div className="application-part">
          <Application />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Advantages;
