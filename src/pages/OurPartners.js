import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import capsuleMini from "../images/header-capsule-text-mini.svg";
import cardImg1 from "../partnersImg/17.png";
import cardImg2 from "../partnersImg/18.png";
import { useLocation } from "react-router-dom";

import Application from "../components/application/Application";
import Footer from "../components/footer/Footer";
import { fetchPartners } from "../http";
import "../sass/ourPartners.scss";

const OurPartners = () => {
  const location = useLocation(); 
  console.log(location)
  const ourPartnersPage = location.pathname === "/ourPartners";
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

  // const locations = [
  //   {
  //     location: [40.975396, 71.583766],
  //     phone: "(93)5992020",
  //     name: "Namangan",
  //   },
  //   {
  //     location: [42.422404, 59.647782],
  //     phone: "(90)8251441",
  //     name: "Nukus",
  //   },
  //   {
  //     location: [39.756663, 64.456699],
  //     phone: "(90)4250767",
  //     name: "Buxoro",
  //   },
  //   {
  //     location: [38.819071, 65.790009],
  //     phone: "(90)4250767",
  //     name: "Qarshi",
  //   },
  //   {
  //     location: [41.53457, 60.653157],
  //     phone: "(95)9393222",
  //     name: "Xorazm",
  //   },
  //   {
  //     location: [39.686573, 66.946523],
  //     phone: "(91)4920700",
  //     name: "Samarqand",
  //   },
  //   {
  //     location: [40.811896, 72.352687],
  //     phone: "(93)4428525",
  //     name: "Andijon",
  //   },
  //   {
  //     location: [41.418503, 69.195115],
  //     phone: "(99)2400550",
  //     name: "Keles",
  //   },
  //   {
  //     location: [38.269644, 67.915327],
  //     phone: "(99)2400550",
  //     name: "Denov",
  //   },
  // ];

  return (
    <>
      <div className="partners">
        <div className="header">
            <Navbar className={ourPartnersPage ? "hidden-partners-navbar" : ""} />
            <div className="container zero-two"> 
            <h1>
              НАШИ ПАРТНЕРЫ <img src={capsuleMini} alt="" />
            </h1>
            <div className="partners-logo d-flex justify-content-between align-items-center flex-wrap"></div>
            <div className="partners--grid">
              {partnersData?.map((item, index) => (
                <img width={150} src={item?.image} alt="" />
              ))}
            </div>
            {/* <h2 className="title">ДОЧЕРНИЕ КОМПАНИИ</h2> */}
            <div className="row">
            
            </div>
          </div>
        </div>
        <br></br>
      
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
