import React from "react";
import { Link } from "react-router-dom"; // Import Link component
import "../styles/css/Home.css"; // Import Home styles
import promo1 from "../assets/icons/promo1.png"; 
import promo2 from "../assets/icons/promo2.png"; 
import promo3 from "../assets/icons/promo3.png"; 
import product1 from "../assets/icons/product1.png";
import product2 from "../assets/icons/product2.png";
import product3 from "../assets/icons/product.png";
import product4 from "../assets/icons/product4.png";


const Home = () => {
    return (
        <>
            <div className="homepage-content">
                {/* Carrusel de Promociones */}
                <section className="categories">
                    <h2>Looking for something?</h2>
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search..."
                        />
                        <Link to="/scan" className="goToScan">
                            Scan an article
                        </Link>
                    </div>
                </section>
                <section className="carousel">
                    <div className="carousel__item">
                        <img src={promo1} alt="Promo 1" className="image"/>
                    </div>
                    <div className="carousel__item">
                        <img src={promo2} alt="Promo 2" className="image"/>
                    </div>
                    <div className="carousel__item">
                        <img src={promo3} alt="Promo 3" className="image"/>
                    </div>
                </section>

                {/* Sección de Categorías */}
                <section className="categories">
                    <h2>Favourite categories</h2>
                    <div className="category-grid">
                        <div className="category-card">Electronic</div>
                        <div className="category-card">Fashion</div>
                        <div className="category-card">Home</div>
                        <div className="category-card">Toys</div>
                    </div>
                </section>

                {/* Sección de Productos Destacados */}
                <section className="featured-products">
                    <h2>Features products</h2>
                    <div className="product-grid">
                        <div className="product-card">
                            <div className="product-image2">
                                <img src={product1} alt="Product 1" className="image"/>
                            </div>
                            <h3>Stuhrling Legacy Watch</h3>
                            <p>$3,921.1</p>
                            <Link to="https://www.liverpool.com.mx/tienda/pdp/reloj-stuhrling-legacy-para-hombre-3921.1/1084016353" className="goToScan" >
                                See Details
                            </Link>
                        </div>
                        <div className="product-card">
                            <div className="product-image2">
                                <img src={product2} alt="Product 2" className="image"/>
                            </div>
                            <h3>GUESS Eco Gloriana</h3>
                            <p>$1,290</p>
                            <Link to="https://www.liverpool.com.mx/tienda/pdp/cartera-guess-eco-gloriana-para-mujer/1159932569" className="goToScan" >
                                See Details
                            </Link>
                        
                        </div>
                        <div className="product-card">
                            <div className="product-image2">
                                <img src={product3} alt="Product 3" className="image"/>
                            </div>
                            <h3>Koblenz Kitchen Magic CKM-750 EIN</h3>
                            <p>$1,979</p>
                            <Link to="https://www.liverpool.com.mx/tienda/pdp/cafetera-espresso-koblenz-kitchen-magic-ckm-750-ein/1107617694" className="goToScan" >
                                See Details
                            </Link>
                        
                        </div>
                        <div className="product-card">
                            <div className="product-image2">
                                <img src={product4} alt="Product 4" className="image"/>
                            </div>
                            <h3>Mr Fix Bombay Living Room</h3>
                            <p>$12,800</p>
                            <Link to="https://www.liverpool.com.mx/tienda/pdp/sala-modular-derecha-mr-fix-bombay-de-poli%C3%A9ster/99974974561" className="goToScan" >
                                See Details
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;
