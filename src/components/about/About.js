import React from "react";
import "./about.scss";
import aboutImg from "../images/header-capsule-text-mini.svg";
import card1 from "../images/img-in-col-4.jpg";
import card2 from "../images/img-in-col-5.jpg";
import rectengleImg from "../images/squre-elemrnt.svg";
import videoPlayer from "../images/videoplayer.png";

const About = () => {
  return (
    <>
      <div className="about">
        <section className="main">
          <h3 className="title">
            О КОМПАНИИ
            <span className="about-capsule">
              <img className="about-img" src={aboutImg} alt="" />
            </span>
          </h3>
          <p className="subtitle">
            NOBEL TRADE является ключевым поставщиком Сухого Молока, Сыворотки,
            <br />
            Крахмала,Кукурузного и Картофельного крахмала, какао, различные
            крупы а также Патоки кукуруза на рынок Узбекистана. <br /> Это
            молодое направление в бизнесе Компании, но за короткое время мы уже
            успели завоевать доверие многих клиентов в Узбекистане.
          </p>
          <div className="row">
            <div className="col-lg-4">
              <img className="card1 carded" src="" alt="" />
            </div>
            <div className="col-lg-5">
              <div className="col-12">
                <img className="card2 carded" src={card2} alt="" />
              </div>
              <div className="col-12">
                <img className="card2 card3 carded" src={card2} alt="" />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="col-12">
                <img className="card4 carded" src={card1} alt="" />
              </div>
              <div className="col-12">
                <img className="card5 carded" src="" alt="" />
              </div>
            </div>
          </div>
          <h2>
            <span className="rectengle-img">
              <img src={rectengleImg} alt="" />
            </span>
            NOBEL TRADE
          </h2>
          <p className="subtitle">
            Основана в 2009 году и в настоящее время в компании работают 150
            человек.
            <br />
            Дистрибуционная сеть компании NOBEL TRADE состоит из 12 филиалов, со
            своими офисами
            <br />и складами, в 12 областях страны.
          </p>
          <img className="videoplayer" src={videoPlayer} alt="" />
        </section>
        <section className="about-us">
          <div className="row">
            <div className="col-lg-4">
              <div className="card-about"></div>
            </div>
            <div className="col-lg-4">
              <div className="card-about"></div>
            </div>
            <div className="col-lg-4">
              <div className="card-about"></div>
            </div>
            <div className="col-lg-12">
              <div className="card-about crad-fill"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
