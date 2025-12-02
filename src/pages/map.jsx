import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import capsuleMini from "../images/header-capsule-text-mini.svg";
// import cardImg1 from "../partnersImg/17.png";
// import cardImg2 from "../partnersImg/18.png";

import Application from "../components/application/Application";
import Footer from "../components/footer/Footer";
import { fetchPartners } from "../http";
import "../sass/ourPartners.scss";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

const OurPartners = () => {
  const [popupData, setPopupData] = useState(null);
  const [selectedPlacemark, setSelectedPlacemark] = useState(null);

  const [partnersData, setPartnersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const data = await fetchPartners();
      setPartnersData(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return null;
  }

  const handlePlacemarkClick = (city) => {
    setPopupData(city);
  };
  return (
    <>
      <div className="partners">
        <div className="header">
          <Navbar />
          <h1>
            НАШИ ПАРТНЕРЫ <img src={capsuleMini} alt="" />
          </h1>
          <div className="partners-logo d-flex justify-content-between align-items-center flex-wrap"></div>
          <div className="row row-partners">
            {partnersData?.map((item, index) => (
              <div className="partner-card-main">
                <div className="partners-card">
                  <img width={150} src={item?.image} alt="" />
                </div>
              </div>
            ))}
          </div>
          <h2 className="title">ДОЧЕРНИЕ КОМПАНИИ</h2>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="partners-card d-flex justify-content-center align-items-center">
                {/* <img src={cardImg1} alt="" /> */}
              </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
              <div className="partners-card d-flex justify-content-center align-items-center">
                {/* <img src={cardImg2} alt="" /> */}
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="partners-card">
                {/* <img src={cardImg2} alt="" /> */}
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", height: "100vh" }}>
          <YMaps>
            <Map
              defaultState={{ center: [38.269644, 67.915327], zoom: 9 }}
              style={{ width: "100%", height: "100%" }}
            >
              <Placemark
                geometry={[38.269644, 67.915327]}
                properties={{
                  iconContent: "948349734",
                  hintContent: "Ну давай уже тащи",
                }}
                options={{
                  preset: "islands#blackStretchyIcon",
                  draggable: true,
                }}
              />
            </Map>
          </YMaps>
        </div>

        <section className="partners-application">
          <Application />
        </section>
        <Footer />
      </div>
    </>
  );
  // AIzaSyDN2ax9ydRmCnQBoMZAoHha9AM69UC9EDo
};

export default OurPartners;
