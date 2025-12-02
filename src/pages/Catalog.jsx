import React, { useState, useEffect, useContext, useMemo } from 'react';
import Navbar from '../components/navbar/Navbar';
import capsuleMini from '../images/header-capsule-text-mini.svg';
import Application from '../components/application/Application';
import Footer from '../components/footer/Footer';
import catalogBgVideo from '../video/cat_video.mp4';
import CatalogProductCard from '../components/CatalogProductCard/CatalogProductCard';
import closeBtn from '../images/Close.svg';
import { fetchCategories, fetchProducts, fetchCategoriesFull } from '../http';
import { useLocation } from 'react-router-dom';

import '../sass/katalog.scss';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import CatalogCarusel from '../components/catalogCarusel';
import { Tab, Tabs } from '@mui/material';
import { HashContext } from '../components/HashProvider';
import { Link } from 'react-router-dom';
import ProductCardItem from '../components/CatalogProductCard/ProductCardItem';
import { useTranslation } from 'react-i18next';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

const Catalog = () => {
  const location = useLocation();
  const ourPartnersPage = location.pathname === '/catalog';
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  const { t } = useTranslation();

  // =================================================================

  const [categoriesData, setCategoriesData] = useState([]);
  //const [fullCategoriesData, setFullCategoriesData] = useState([]);

  const [value, setValue] = useState(1);

  const [ID, setID] = useState(1);
  const [productsData, setProductsData] = useState([]);
  const [sunflowerOil, setSunflowerOil] = useState([]);
  const [vegetableOil, setVegetableOil] = useState([]);
  const [sunflowerMeal, setSunflowerMeal] = useState([]);
  const { hash } = useContext(HashContext);
  const [cottonOil, setCottonOil] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const [categories, products] = await Promise.all([
      fetchCategories(),
      //fetchCategoriesFull(),
      fetchProducts(),
    ]);
    setCategoriesData(categories);
    //setFullCategoriesData(categories_full);
    setProductsData(products);
    fetchMainTitles(products);

    setLoading(false);
    scrollIntoViewById();
  };

  const selectedCategory = useMemo(() => {
    return categoriesData.find(item => item.id === value);
  }, [value, categoriesData]);

  useEffect(() => {
    fetchData();
  }, []);

  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.homescare.uz/ru/products/api/v1/categories/"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setCategories(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.homescare.uz/ru/others/api/v1/brands/'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBrands(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchMainTitles = async products => {
    try {
      // Фильтрация карточек по категории "Овощное масло"
      const vegetableOilCards = products.filter(product =>
        product.category?.some(
          category =>
            category?.title === 'VEGETABLE OIL' ||
            category?.title === 'РАСТИТЕЛЬНОЕ МАСЛО' ||
            category?.title === "O'SIMLIK MOYI"
        )
      );
      const sunflowerMealCards = products.filter(product =>
        product.category?.some(
          category =>
            category?.title === 'SUNFLOWER MEAL' ||
            category?.title === 'ПОДСОЛНЕЧНОЕ МАСЛО' ||
            category?.title === 'KUNGABOQAR YOGI'
        )
      );
      const cottonOilCards = products.filter(product =>
        product.category?.some(
          category =>
            category?.title === 'COTTON OIL' ||
            category?.title === 'ХЛОПКОВОЕМАСЛО' ||
            category?.title === 'PAXTA YOGI'
        )
      );
      const sunflowerMealData = products.filter(product =>
        product.category?.some(
          category =>
            category?.title === 'SUNFLOWER MEAL' ||
            category?.title === 'ПОДСОЛНЕЧНЫЙШРОТ' ||
            category?.title === 'KUNGABOQAR YOGI'
        )
      );
      setSunflowerOil(sunflowerMealCards);
      setVegetableOil(vegetableOilCards);
      setCottonOil(cottonOilCards);
      setSunflowerMeal(sunflowerMealData);
    } catch (error) {
      console.error('Error fetching main titles:', error);
    }
  };

  const CustomExpandIcon = () => {
    return <img src={closeBtn} alt="Custom Icon" />;
  };

  const scrollToSection = id => {
    const section = document.getElementById(`targetSectionId${id}`);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Function to extract the number from the fragment
    const extractCategoryFromHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#category-')) {
        const categoryNumber = hash.split('-')[1];
        setValue(+categoryNumber);
        setID(+categoryNumber);
      }
    };

    // Extract category on initial render
    extractCategoryFromHash();

    // Optionally, add a hash change listener if the hash might change without a page reload
    window.addEventListener('hashchange', extractCategoryFromHash);

    // Cleanup event listener
    return () =>
      window.removeEventListener('hashchange', extractCategoryFromHash);
  }, [hash]);

  const scrollIntoViewById = () => {
    setTimeout(() => {
      const secEl = document.getElementById('category_box');
      console.log(secEl);

      if (secEl) {
        secEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
    /* const element = document.getElementById(`category-${id}`);
    if (!element) {
      setTimeout(() => {
        const secEl = document.getElementById(`category-${id}`);
        if (secEl) {
          secEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    } */
  };

  useEffect(() => {
    if (ID) {
      const newHash = window.location.hash;
      if (newHash) {
        setValue(ID);
        scrollIntoViewById();
      }
    }
  }, [ID, hash]);

  if (loading) null;

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  // console.log("productsData", productsData);
  //console.log("categoriesData", categoriesData);

  const productsTitleList = {
    ru: {
      1: 'Масло',
      2: 'Какао',
      3: 'Крахмалл/Патока',
      4: 'СУХОЕ МОЛОКО/СЫВОРОТКА',
      5: 'Крупы',
      6: 'Жир',
      7: 'Кормовой продукты',
    },
    uz: {
      1: 'Yog',
      2: 'Kakao',
      3: 'Kraxmal/relaslar',
      4: 'QURUT SUT/ZARDOB',
      5: 'Don',
      6: 'Jir',
      7: 'Кормовой продукты',
    },
    eng: {
      1: 'Fat',
      2: 'Cocoa',
      3: 'Starch/Mrelasses',
      4: 'POWDERED MILK/WHEY',
      5: 'Cereals',
      6: 'Flat',
      7: 'Кормовой продукты',
    },
  };

  const language = localStorage.getItem('language');

  const [productsTitle, setProductsTitle] = useState(productsTitleList.ru);

  //console.log('productsTitle', productsTitle)

  useEffect(() => {
    if (language === 'ru') {
      setProductsTitle(productsTitleList.ru);
    }
    if (language === 'uz') {
      setProductsTitle(productsTitleList.uz);
    }
    if (language === 'en') {
      setProductsTitle(productsTitleList.eng);
    }
  }, [language]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [result, setResult] = useState('Масло');

  useEffect(() => {
    if (!Array.isArray(productsData) || productsData.length === 0) {
      console.error('productsData is not an array or is empty');
      return;
    }

    // Функция для фильтрации продуктов
    const filterProducts = name => {
      // Для каждого объекта в productsData
      const filtered = productsData
        .map(item => item.category) // Извлекаем массив category
        .flat() // Разворачиваем массив массивов в один массив
        .filter(categoryItem => categoryItem.title === name); // Фильтруем по title

      // Возвращаем полный объект из исходного массива
      const filteredFullObjects = productsData.filter(item =>
        item.category.some(categoryItem => categoryItem.title === name)
      );

      return filteredFullObjects;
    };

    switch (ID) {
      case 1:
        setResult(productsTitle[1]);
        break;
      case 2:
        setResult(productsTitle[2]);
        break;
      case 3:
        setResult(productsTitle[3]);
        break;
      case 4:
        setResult(productsTitle[4]);
        break;
      case 5:
        setResult(productsTitle[5]);
        break;
      case 6:
        setResult(productsTitle[6]);
        break;
      case 7:
        setResult(productsTitle[7]);
        break;

      default:
        setResult('');
        break;
    }

    // Выполняем фильтрацию и обновляем состояние
    setFilteredProducts(filterProducts(result));
  }, [productsData, ID, result]);

  return (
    <>
      <div style={{ overflow: 'hidden' }} className="catalog text-white">
        <div className="video_cat">
          <div className="catalog__main">
            <header className="header">
              <div className="container">
                <Navbar
                  className={ourPartnersPage ? 'hidden-katalog-navbar' : ''}
                />
              </div>
            </header>

            <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                webkit-playsinline 
                x5-playsinline
              >
                <source src={catalogBgVideo} type="video/mp4" />
              </video>

            {/* <h1 style={{marginTop:"6%"}}>NObel trade</h1> */}
            {/* <div className="catalog__main--item">
              <img
                className="pl-2 mb-1"
                src={capsuleMini}
                alt=""
                data-aos="fade-right"
              />
              <p>
               Здоровье человека зависит не только от того, что он ест, но и от того, что его окружает, как и где он живет.
              </p>
            </div> */}
          </div>
        </div>

        <div className="catalog-sections">
          <section className="catalog-info-section">
            <br />
            <br />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'transparent !important',
                borderRadius: '30px',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  bgcolor: 'black',
                  flexGrow: 1,
                  maxWidth: { xs: 320, sm: 900 },
                  color: 'white',
                }}
              >
                <Tabs
                  value={value}
                  onChange={(_, newVal) => setValue(newVal)}
                  variant="scrollable"
                  scrollButtons
                  aria-label="visible arrows tabs example"
                  sx={{ color: 'white' }}
                >
                  {categoriesData?.map(({ id, title }) => (
                    <Tab
                      key={id}
                      label={title}
                      value={id}
                      sx={{ color: 'white', fontWeight: 700 }}
                      onClick={() => setID(id)}
                    />
                  ))}
                </Tabs>
              </Box>
            </Box>
            <div id="category_box" className="main-catalog container my-4">
              {selectedCategory && selectedCategory?.title && (
                <h1 className="text-uppercase mb-4">
                  {selectedCategory.title}
                </h1>
              )}
              {selectedCategory && selectedCategory?.description && (
                <p>{selectedCategory.description}</p>
              )}
              <div className="product__list">
                <CatalogProductCard data={filteredProducts} />
              </div>
            </div>

            {
              // categoriesData?.find(({ id }) => id === ID)?.subcategories
              //   ? console.log("categoriesData", categoriesData)
              //   : ""
              // return (
              //   <div
              //     key={index}
              //     className="catalog-info-section-top container"
              //     id={`category-${ID}`}
              //   >
              //     <h2 className="title pt-5 pb-3">
              //       {item?.subcategory}
              //       <img
              //         className="pl-2 mb-1"
              //         src={capsuleMini}
              //         alt=""
              //         data-aos="fade-right"
              //         style={{
              //           marginLeft: "10px",
              //         }}
              //       />
              //     </h2>
              //     <p className="subtitle pb-3" data-aos="zoom-in">
              //       {item?.description}
              //     </p>
              //     <div className="product__list">
              //       <CatalogProductCard
              //         data={
              //           item?.products ||
              //           categoriesData?.find(({ id }) => id === ID)?.products
              //         }
              //       />
              //     </div>
              //     <div className="main-catalog container">
              //       <div className="product__list">
              //         <CatalogProductCard data={item?.products} />
              //       </div>
              //     </div>
              //   </div>
              // );
            }
            <br />
            <br />
            <br></br>
            <br></br>
            <br></br>
            <div className="catalog-brands">
              <h3
                className={`title`}
                style={{ fontSize: '2.1rem', letterSpacing: '-1px' }}
              >
                <span className="about-capsule" data-aos="fade-up">
                  {t('settings.brand')}
                </span>
              </h3>
              <br></br>
              <div className="partenrs">
                <div className="partners-logo d-flex justify-content-between align-items-center flex-wrap"></div>
                <div className="partners--grid2">
                  {brands?.map((i, k) => (
                    <div key={i.id} className="brand-card">
                      <Link to={i?.link}>
                        <img src={i?.image} alt="" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="catalog-application pt-3 ">
          <Application />
        </div>

        <Footer />
      </div>
    </>
  );
};
export default Catalog;
