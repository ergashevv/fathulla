import React, { useState } from 'react';
import arrow from '../../images/arrow-top-right-large.svg';
import ApplicationModal from '../modals/applicationModal/ApplicationModal';
import './application.scss';
import { useTranslation } from 'react-i18next';

const Application = ({ companyName = 'NOBEL TRADE' }) => {
  const [applicationModalActive, setApplicationModal] = useState(false);
  const { t } = useTranslation();
  const openModal = () => {
    setApplicationModal(true);

    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <div className="application container">
        <div className="be-partners">
          <p className="subtitle">
            {t('about.stanov')}
            <br /> {t('about.raz')}
          </p>
          <button
            className="button-lg btn open-btn"
            onClick={() => openModal()}
          >
            {t('settings.req')} <img src={arrow} alt="" />
          </button>
        </div>
        <p className="main-text">{companyName}</p>
        <button className="button-md btn open-btn" onClick={() => openModal()}>
          {t('settings.req')} <img src={arrow} alt="" />
        </button>
        <div className="pb-5"></div>
      </div>
      <ApplicationModal
        active={applicationModalActive}
        setActive={setApplicationModal}
      />
    </>
  );
};
export default Application;
