import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import exitBtn from '../../../images/exit-btn.svg';
import { toastError, toastSuccess } from '../../../utils/toastAlert';
import './aboutModal.scss';

const AboutModal = ({ modalActive, setModalActive }) => {
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, watch, reset } = useForm();
  const [vacanciesData, setVacanciesData] = useState([]);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(
          `https://api.homescare.uz/${i18n.language}/vacancy/api/v1/vacancies/`
        );
        setVacanciesData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchVacancies();
  }, [i18n.language]);

  const closeModal = () => {
    setModalActive(false);
    document.body.style.overflow = 'auto';
  };

  const onSubmit = async data => {
    const { fname, lname, desc, vacancies } = data;
    const selectedVacancies = vacancies
      ? Object.keys(vacancies).filter(key => vacancies[key])
      : [];

    const txt = `<b>ФИО:</b> ${fname}\n<b>Номер Телефона:</b> ${lname}\n<b>Коментарий:</b> ${desc}\n<b>Профессия:</b> ${selectedVacancies.join(
      ', '
    )}`;
    const token = '6870733564:AAH4GKZRjTXUQZ1-ndFry1R-I2SBMEjkcdI';
    const chat_id = '-1002108902387';

    try {
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id,
        text: txt,
        parse_mode: 'HTML',
      });
      toastSuccess(t('modalMenu.title'));
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      console.error('Error sending message:', error);
      toastError(error.message);
    }
  };

  const selectedVacancies = watch('vacancies') || {};
  const selectedVacancyNames = Object.keys(selectedVacancies)
    .filter(key => selectedVacancies[key])
    .join(', ');

  return (
    <div
      className={modalActive ? 'active modal' : 'modal'}
      onClick={closeModal}
    >
      <div
        className="modal-dialog nodal-info"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content modal-height">
          <div className="modal-body">
            <h5>{t('settings.footerM')}</h5>
            <img
              className="exit-btn"
              src={exitBtn}
              alt="Close"
              onClick={closeModal}
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={'form-about'}
              action=""
              id="formID"
            >
              <Accordion className={'accordion-position'}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {t('form2.vacancyType')}: {selectedVacancyNames}
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="list-group">
                    {vacanciesData.map(vacancy => (
                      <li className="list-group-item">
                        <input
                          className="form-check-input me-1"
                          type="checkbox"
                          id={`vacancy-${vacancy.id}`}
                          {...register(`vacancies.${vacancy.title}`)}
                          defaultChecked={
                            watch(`vacancies.${vacancy.title}`) || false
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`vacancy-${vacancy.id}`}
                        >
                          {vacancy.title}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
              <input
                className={`modal-form-info modal-absolute form-control`}
                type="text"
                placeholder={t('form2.namePlaceholder')}
                {...register('fname', { required: true })}
              />
              <input
                className={`modal-form-phoneNumber modal-form-info form-control`}
                type="number"
                placeholder={t('form2.phonePlaceholder')}
                {...register('lname', { required: true })}
              />
              <textarea
                className={`modal-form-textarea form-control`}
                rows="4"
                placeholder={t('form2.commentPlaceholder')}
                {...register('desc', { required: true })}
              ></textarea>
              <button className="modal-form-btn btn" type="submit">
                {t('form2.submitButton')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
