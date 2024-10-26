import React from "react";
import { Link } from "react-router-dom"; // Import Link component
import "../styles/css/Home.css"; // Import Home styles

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
                    <div className="carousel__item">Promo 1</div>
                    <div className="carousel__item">Promo 2</div>
                    <div className="carousel__item">Promo 3</div>
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
                            <div className="product-image">Image 1</div>
                            <h3>Product 1</h3>
                            <p>Brief description.</p>
                            <button>See Details</button>
                        </div>
                        <div className="product-card">
                            <div className="product-image">Image 2</div>
                            <h3>Product 2</h3>
                            <p>Brief description.</p>
                            <button>See Details</button>
                        </div>
                        <div className="product-card">
                            <div className="product-image">Image 3</div>
                            <h3>Product 3</h3>
                            <p>Brief description.</p>
                            <button>See Details</button>
                        </div>
                        <div className="product-card">
                            <div className="product-image">Image 4</div>
                            <h3>Product 4</h3>
                            <p>Brief description.</p>
                            <button>See Details</button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;
