import React, { useEffect, useState } from 'react';
import './applicationModal.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import exitBtn from '../../../images/exit-btn.svg';
import axios from 'axios';
import { toastSuccess } from '../../../utils/toastAlert';
import { useTranslation } from 'react-i18next';
const ApplicationModal = ({ active, setActive }) => {
  const { t } = useTranslation();
  const closeModal = () => {
    setActive(false);

    document.body.style.overflow = 'auto';
  };
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = event => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    // Если чекбокс выбран, добавляем его значение в массив выбранных категорий
    // Если чекбокс снят, удаляем его значение из массива
    if (isChecked) {
      setSelectedCategories(prevState => [...prevState, value]);
    } else {
      setSelectedCategories(prevState =>
        prevState.filter(category => category !== value)
      );
    }
  };

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    desc: '',
    email: '',
    company: '',
    radio_button1: '',
    radio_button2: '',
    radio_button3: '',
    radio_button4: '',
    radio_button5: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault(); // Prevents native form submission

    // Ensure all required fields are valid before proceeding
    const {
      fname,
      lname,
      desc,
      radio_button1,
      radio_button2,
      radio_button3,
      radio_button4,
      radio_button5,
      company,
      email,
    } = formData;
    try {
      const token = '6870733564:AAH4GKZRjTXUQZ1-ndFry1R-I2SBMEjkcdI';
      const chat_id = '-1002108902387';
      await axios.post(
        'https://api.telegram.org/bot' + token + '/sendMessage',
        {
          chat_id: chat_id,
          text: `ФИО: ${fname}
Номер Телефона: ${lname}
Коментарий: ${desc}
Продукт: ${radio_button1} ${radio_button2} ${radio_button3} ${radio_button4} ${radio_button5}
Название компании: ${company}
Email: ${email}
          `,
        }
      );
      toastSuccess('Заявка отправлена');
      setActive(false);
    } catch (error) {
      toastSuccess(error.message);
    }
  };
  return (
    <>
      <div
        className={active ? 'active modal' : 'modal'}
        onClick={() => closeModal()}
      >
        <div
          className="application-dialog modal-dialog"
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="application-body modal-body">
              <h5 className={`form-modal-title`}>{t('settings.footerM')}</h5>
              <img
                className="exit-btn"
                src={exitBtn}
                alt=""
                onClick={() => closeModal()}
              />
              <form
                className={'application-form'}
                action=""
                onSubmit={handleSubmit}
              >
                <Accordion className={'application-accordion'}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    {t('form.selectedCategories')}:{' '}
                    {selectedCategories.join(' ')}
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <input
                          className="form-check-input me-1"
                          type="checkbox"
                          value={t('form.oil')}
                          id="firstCheckbox"
                          name="radio_button1"
                          onChange={event => {
                            handleCheckboxChange(event);
                            handleChange(event);
                          }}
                          checked={selectedCategories.includes(t('form.oil'))}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="firstCheckbox"
                        >
                          {t('form.oil')}
                        </label>
                      </li>
                      <li className="list-group-item">
                        <input
                          className="form-check-input me-1"
                          type="checkbox"
                          value={t('form.fat')}
                          id="secondCheckbox"
                          name="radio_button2"
                          onChange={event => {
                            handleCheckboxChange(event);
                            handleChange(event);
                          }}
                          checked={selectedCategories.includes(t('form.fat'))}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="secondCheckbox"
                        >
                          {t('form.fat')}
                        </label>
                      </li>
                      <li className="list-group-item">
                        <input
                          className="form-check-input me-1"
                          type="checkbox"
                          value={t('form.dryMilk')}
                          id="thirdCheckbox"
                          name="radio_button3"
                          onChange={event => {
                            handleCheckboxChange(event);
                            handleChange(event);
                          }}
                          checked={selectedCategories.includes(
                            t('form.dryMilk')
                          )}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="thirdCheckbox"
                        >
                          {t('form.dryMilk')}
                        </label>
                      </li>
                      <li className="list-group-item">
                        <input
                          className="form-check-input me-1"
                          type="checkbox"
                          value={t('form.starch')}
                          id="fourthCheckbox"
                          name="radio_button4"
                          onChange={event => {
                            handleCheckboxChange(event);
                            handleChange(event);
                          }}
                          checked={selectedCategories.includes(
                            t('form.starch')
                          )}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="fourthCheckbox"
                        >
                          {t('form.starch')}
                        </label>
                      </li>
                      <li className="list-group-item">
                        <input
                          className="form-check-input me-1"
                          type="checkbox"
                          value={t('form.buckwheatRice')}
                          id="fifthCheckbox"
                          name="radio_button5"
                          onChange={event => {
                            handleCheckboxChange(event);
                            handleChange(event);
                          }}
                          checked={selectedCategories.includes(
                            t('form.buckwheatRice')
                          )}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="fifthCheckbox"
                        >
                          {t('form.buckwheatRice')}
                        </label>
                      </li>
                    </ul>
                  </AccordionDetails>
                </Accordion>

                <input
                  className={`modal-form-info modal-absolute form-control`}
                  type="text"
                  placeholder={t('form.namePlaceholder')}
                  id="fname"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
                <input
                  className={`modal-form-phoneNumber modal-form-info form-control`}
                  type="number"
                  placeholder={t('form.phonePlaceholder')}
                  id="lname"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  required
                />
                <input
                  className={`modal-form-company modal-form-info form-control`}
                  type="text"
                  placeholder={t('form.companyPlaceholder')}
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
                <input
                  className={`modal-form-email modal-form-info form-control`}
                  type="email"
                  placeholder={t('form.emailPlaceholder')}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  className={`modal-form-textarea modal-form-info form-control`}
                  cols="30"
                  rows="10"
                  placeholder={t('form.commentPlaceholder')}
                  id="desc"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  required
                ></textarea>
                <div
                  className="d-grid"
                  style={{
                    margin: '20px 0',
                    width: '100%',
                    padding: '10px 0',
                  }}
                >
                  <button onClick={handleSubmit} className={`modal-form-btn btn`}>
                    {t('form.submitButton')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationModal;
