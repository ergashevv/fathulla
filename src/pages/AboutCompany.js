import React from "react";
import Navbar from "../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import headerArrow from "../images/aboutCompany-header-arrow.svg";
import carouselCard1 from "../images/carousel-about-card1.png";
import carouselCard2 from "../images/carousel-about-card2.png";
import carouselCard3 from "../images/carousel-about-card3.png";
import carouselCard4 from "../images/carousel-about-card4.png";
import Flickity from "react-flickity-component";
import capsuleMini from "../images/header-capsule-text-mini.svg";
import charityImg from "../images/charity-img.png";
import keyValues1 from "../images/key-values-img1.png";
import keyValues2 from "../images/key-values-img2.png";
import keyValues3 from "../images/key-values-img3.png";
import keyValues4 from "../images/key-values-img4.png";
import Application from "../components/application/Application";
import Footer from "../components/footer/Footer";
import supportBg from "../images/support-bg.png";
import "../sass/aboutCompany.scss";
import { useTranslation } from "react-i18next";


const AboutCompany = () => {
  const location = useLocation(); // Получаем текущий путь
  const isAboutCompanyPage = location.pathname === "/aboutCompany"; // Определяем, находится ли пользователь на странице AboutCompany
  const flickityOtions = {
    initialIndex: 1,
  };
  const { t } = useTranslation()
  return (
    <>
      <div className="aboutCompany">
        <header className="header">
          <Navbar className={isAboutCompanyPage ? "about-company-navbar" : ""} />
          <h1>
            <span className="title">
              NOBEL <span className="about-company-info">О КОМПАНИИ</span>
            </span>
            <span className="bottom-title">
              <img src={headerArrow} alt="" /> TRADE
            </span>
          </h1>
          <p className="subtitle ">О КОМПАНИИ21</p>
        </header>
        <section className="slider-item">
          <p className="slider-subtitle">
            NOBEL TRADE – это ведущая компания, основанная в 2009 году,
            специализирующаяся в поставке разнообразных продуктов на рынок
            Узбекистана. Она стала ключевым поставщиком сухого молока,
            сыворотки, крахмала, кукурузного и картофельного крахмала, какао,
            различных круп, а также патоки кукурузы. Несмотря на свое молодое
            направление в бизнесе, NOBEL TRADE уже успела заслужить доверие
            многих клиентов в Узбекистане, благодаря стратегическому подходу к
            качеству и надежности предоставляемых продуктов.
          </p>
          <Flickity
            className={"carousel"}
            elementType={"div"}
            options={flickityOtions}
            disableImagesLoaded={false}
            reloadOnUpdate
            static
          >
            <img className={`carded me-5`} src={carouselCard1} alt="" />
            <img className={`carded me-5`} src={carouselCard2} alt="" />
            <img className={`carded me-5`} src={carouselCard3} alt="" />
            <img className={`carded me-5`} src={carouselCard4} alt="" />
          </Flickity>
        </section>
        <main className="main">
          <div className="about-command">
            <h2 className="title">
              БОЛЬШАЯ КОМАНДА СПЕЦИАЛИСТОВ
              <img src={capsuleMini} alt="" />
            </h2>
            <p className="subtitle">
              В настоящее время в компании активно трудятся более 150
              высококвалифицированных специалистов, создавая эффективное и
              профессиональное рабочее сообщество. Компания стремится привлекать
              талантливых и преданных сотрудников, которые разделяют ее ценности
              и стремятся к общей миссии – предоставление качественных
              продуктов, соответствующих потребностям рынка.
            </p>
            <p className="subtitle">
              Основной актив NOBEL TRADE – это разветвленная дистрибуционная
              сеть, включающая 12 филиалов с офисами и складами, охватывающих
              все 12 областей страны. Эта обширная инфраструктура позволяет
              компании обеспечивать оперативные и своевременные поставки своей
              продукции по всей территории Узбекистана, эффективно удовлетворяя
              потребности клиентов.
            </p>
            <div className="map">
              <p className="experience">15 ЛЕТ ОПЫТА</p>
              <p className="branches">12 ФИЛИАЛОВ</p>
              <p className="areas">В 12 ОБЛАСТЯХ</p>
              <p className="retail-points">8000 ТОРГОВЫХ ТОЧЕК</p>
            </div>
            <div className="charity">
              <h2 className="title">
                ПОДДЕРЖКА БЛАГОТВОРИТЕЛЬНЫХ ПРОЕКТОВ
                <img src={capsuleMini} alt="" />
              </h2>
              <div className="subtitle">
                NOBEL TRADE не только ориентирована на коммерческий успех, но и
                вкладывает усилия в социальную ответственность. Компания активно
                участвует в инициативах по устойчивому развитию, поддерживает
                благотворительные проекты и содействует развитию местных
                сообществ.
              </div>
              <img src={supportBg} alt="" />
            </div>
            <div className="key-values">
              <h2 className="title">
                КЛЮЧЕВЫЕ ЦЕННОСТИ
                <img src={capsuleMini} alt="" />
              </h2>
              <p className="subtitle">
                Ключевые ценности NOBEL TRADE включают в себя стремление к
                постоянному совершенствованию, инновационный подход к бизнесу,
                ответственность перед клиентами и обязательства перед обществом.
                Компания активно внедряет передовые технологии и методы, чтобы
                быть в лидирующем положении на рынке и предлагать своим клиентам
                современные и конкурентоспособные продукты.
              </p>
              <div className="row">
                <div className="col-lg-12">
                  <img src={keyValues1} alt="" />
                </div>
                <div className="col-lg-6">
                  <img src={keyValues2} alt="" />
                </div>
                <div className="col-lg-6">
                  <img className={"img-adaptive"} src={keyValues3} alt="" />
                </div>
                <div className="col-lg-12">
                  <img src={keyValues4} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "100px", height: "100vh" }}></div>
          <Application />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutCompany;

const locations = [
  {
    location: [40.975396, 71.583766],
    phone: "(93)5992020",
    name: "Namangan",
  },
  {
    location: [42.422404, 59.647782],
    phone: "(90)8251441",
    name: "Nukus",
  },
  {
    location: [39.756663, 64.456699],
    phone: "(90)4250767",
    name: "Buxoro",
  },
  {
    location: [38.819071, 65.790009],
    phone: "(90)4250767",
    name: "Qarshi",
  },
  {
    location: [41.53457, 60.653157],
    phone: "(95)9393222",
    name: "Xorazm",
  },
  {
    location: [39.686573, 66.946523],
    phone: "(91)4920700",
    name: "Samarqand",
  },
  {
    location: [40.811896, 72.352687],
    phone: "(93)4428525",
    name: "Andijon",
  },
  {
    location: [41.418503, 69.195115],
    phone: "(99)2400550",
    name: "Keles",
  },
  {
    location: [38.269644, 67.915327],
    phone: "(99)2400550",
    name: "Denov",
  },
];
