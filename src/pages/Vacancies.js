import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import "../sass/vacancies.scss";
import capsuleImg from "../images/header-capsule-text-mini.svg";
import arrowImg from "../images/arrow-top-right-large.svg";
import Footer from "../components/footer/Footer";
import AboutModal from "../components/modals/aboutModal/AboutModal";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Vacancies = () => {
  const location = useLocation();
  const ourVacPage = location.pathname === "/vacancies";
  const [aboutModal, setAboutModal] = useState(false);
  const [vacanciesData, setVacanciesData] = useState([]);
  const { t, i18n } = useTranslation();

  const fetchVacancies = (language) => {
    const url = `https://api.homescare.uz/${language}/vacancy/api/v1/vacancies/`;
    console.log("Fetching data from URL:", url);

    axios
      .get(url)
      .then((response) => {
        console.log("Data fetched successfully:", response.data);
        setVacanciesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchVacancies(i18n.language);
  }, [i18n.language]);

  const handleChangeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
  };

  return (
    <>
      <div className="vacancies">
        <header className="header">
          <div className="container">
            <Navbar
              className={ourVacPage ? "hidden-vac-navbar" : ""}
              onChangeLanguage={handleChangeLanguage}
            />
            <div className="header-title">
              <h1>
                <span>NOBEL</span>{" "}
                <span className="justify-content-end">TRADE</span>
              </h1>
              <p>{t("vacancy.vash_shans")}</p>
            </div>
            <p className="header-subtitle">{t("vacancy.nash_uspex")}</p>
          </div>
        </header>

        <div className="vacancies-type">
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#000",
              marginLeft: "5%",
              marginTop: "100px",
            }}
          >
            <h2 className="title">{t("vacancy.vaka")}</h2>{" "}
            <img src={capsuleImg} alt="" />
          </div>

          {vacanciesData.length > 0 ? (
            vacanciesData.map((item, index) => (
              <div key={index} className="vacancies-marketing mt-5 qwerty">
                <div className="marketing-title">
                  <h2>
                    <span>{item.title}</span>
                  </h2>
                </div>
                <div className="marketing-subtitle">
                  <p>{item.description}</p>
                  <img className={"bg-marketing"} src={item.image} alt="" />
                  <div className="marketing-vacancy">
                    <div
                      className="marketing-btn"
                      onClick={() => setAboutModal(true)}
                    >
                      <span>
                        {t("settings.send")} <br />
                        {t("settings.data")}
                        <img src={arrowImg} alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
              }}
            >
              <h2 style={{ color: "#fff" }}>
                {t("vacancy.no_vacancies")} {/* Добавь перевод этой строки в файлы локализации */}
              </h2>
            </div>
          )}
        </div>

        <main className="main"></main>
        <AboutModal modalActive={aboutModal} setModalActive={setAboutModal} />
        <Footer />
      </div>
    </>
  );
};

export default Vacancies;
