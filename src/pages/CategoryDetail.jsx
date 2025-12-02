import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/navbar/Navbar';
import Application from '../components/application/Application';
import Footer from '../components/footer/Footer';
import CatalogProductCard from '../components/CatalogProductCard/CatalogProductCard';
import { fetchCategories, fetchProducts } from '../http';
import { useLocation } from 'react-router-dom';
import Flickity from 'react-flickity-component';
import capsuleMini from '../images/header-capsule-text-mini.svg';
import carouselCard1 from '../images/carousel-card1.png';
import carouselCard2 from '../images/carousel-card2.png';
import carouselCard3 from '../images/carousel-card3.png';
import carouselCard4 from '../images/carousel-card4.png';
import categoryImage from '../images/catalog4-col-7.png';
import partner1 from '../partnersImg/1.png';
import partner2 from '../partnersImg/2.png';
import partner3 from '../partnersImg/3.png';
import partner4 from '../partnersImg/4.png';
import partner5 from '../partnersImg/5.png';
import partner6 from '../partnersImg/6.png';
import '../sass/categoryDetail.scss';
import '../sass/flickitySlider.scss';

const CategoryDetail = () => {
  const location = useLocation();
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default to category 4 (Сухое молоко/Сыворотка)
  const categoryId = 4;

  // Carousel images
  const carouselImages = [
    {
      imgPath: carouselCard1,
      label: 'Product Image 1'
    },
    {
      imgPath: carouselCard2,
      label: 'Product Image 2'
    },
    {
      imgPath: carouselCard3,
      label: 'Product Image 3'
    },
    {
      imgPath: carouselCard4,
      label: 'Product Image 4'
    }
  ];

  // Partner logos - using 5-6 logos
  const partnerLogos = [
    { id: 1, image: partner1 },
    { id: 2, image: partner2 },
    { id: 3, image: partner3 },
    { id: 4, image: partner4 },
    { id: 5, image: partner5 },
    { id: 6, image: partner6 }
  ];

  const flickityOptions = {
    initialIndex: 1,
    wrapAround: true,
    autoPlay: 3000,
    pauseAutoPlayOnHover: true,
    pageDots: true,
    prevNextButtons: true,
  };

  const fetchData = async () => {
    try {
      const [categories, products] = await Promise.all([
        fetchCategories(),
        fetchProducts(),
      ]);
      setCategoriesData(categories);
      setProductsData(products);
      filterProductsByCategory(categoryId, products, categories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const filterProductsByCategory = (catId, products, categories) => {
    const selectedCategory = categories.find(item => item.id === catId);
    if (!selectedCategory) return;

    const categoryTitle = selectedCategory.title;
    const filtered = products.filter(product =>
      product.category?.some(categoryItem => categoryItem.title === categoryTitle)
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedCategory = useMemo(() => {
    return categoriesData.find(item => item.id === categoryId);
  }, [categoriesData, categoryId]);

  if (loading) {
    return null;
  }

  return (
    <>
      <div style={{ overflow: 'hidden' }} className="category-detail text-white">
        {/* Hero Carousel Section */}
        <div className="category-hero">
          <div className="category-hero__main">
            <header className="header">
              <div className="container">
                <Navbar />
              </div>
            </header>

            <div className="hero-carousel">
              <Flickity
                className={'carousel category-carousel'}
                elementType={'div'}
                options={flickityOptions}
                disableImagesLoaded={false}
                reloadOnUpdate
                static
              >
                {carouselImages.map((image, index) => (
                  <div key={index} className="carousel-cell category-carousel-cell">
                    <img 
                      className="carousel-image" 
                      src={image.imgPath} 
                      alt={image.label} 
                    />
                  </div>
                ))}
              </Flickity>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="category-sections">
          <section className="category-info-section">
            <br />
            <br />

            {/* About-style Section */}
            <div className="container my-5">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <h1 className="category-title mb-4">
                    {selectedCategory?.title || 'СУХОЕ МОЛОКО/СЫВОРОТКА'}
                  </h1>
                  <p className="category-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  {selectedCategory?.description && (
                    <p className="category-description mt-3">
                      {selectedCategory.description}
                    </p>
                  )}
                </div>
                <div className="col-lg-6">
                  <div className="category-image-wrapper">
                    <img 
                      src={categoryImage} 
                      alt="Category" 
                      className="category-image"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Cards Section */}
            <div className="container my-5">
              <div className="product__list">
                <CatalogProductCard data={filteredProducts} />
              </div>
            </div>

            <br />
            <br />
            <br />

            {/* Our Partners Section */}
            <div className="category-partners">
              <h3 className="partners-title">
                <span className="about-capsule" data-aos="fade-up">
                  НАШИ ПАРТНЕРЫ
                </span>
              </h3>
              <br />
              <div className="partners-container">
                <div className="partners--grid2">
                  {partnerLogos.map((partner) => (
                    <div key={partner.id} className="brand-card">
                      <img src={partner.image} alt={`Partner ${partner.id}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="category-application pt-3">
          <Application />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CategoryDetail;
