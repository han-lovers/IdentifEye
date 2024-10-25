import React from "react";
import { Link } from "react-router-dom"; // Import Link component
import "../styles/css/Home.css"; // Import Home styles

const Home = () => {
    return (
        <>
            <div className="homepage-content">
                {/* Carrusel de Promociones */}
                <section className="categories">
                    <h2>¿Buscas algo?</h2>
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Buscar..."
                        />
                        <Link to="/scan" className="goToScan">
                            Escanea un objeto
                        </Link>
                    </div>
                </section>
                <section className="carousel">
                    <div className="carousel__item">Promoción 1</div>
                    <div className="carousel__item">Promoción 2</div>
                    <div className="carousel__item">Promoción 3</div>
                </section>

                {/* Sección de Categorías */}
                <section className="categories">
                    <h2>Categorías Populares</h2>
                    <div className="category-grid">
                        <div className="category-card">Electrónica</div>
                        <div className="category-card">Moda</div>
                        <div className="category-card">Hogar</div>
                        <div className="category-card">Juguetes</div>
                    </div>
                </section>

                {/* Sección de Productos Destacados */}
                <section className="featured-products">
                    <h2>Productos Destacados</h2>
                    <div className="product-grid">
                        <div className="product-card">
                            <div className="product-image">Imagen 1</div>
                            <h3>Producto 1</h3>
                            <p>Descripción breve del producto 1.</p>
                            <button>Ver Detalles</button>
                        </div>
                        <div className="product-card">
                            <div className="product-image">Imagen 2</div>
                            <h3>Producto 2</h3>
                            <p>Descripción breve del producto 2.</p>
                            <button>Ver Detalles</button>
                        </div>
                        <div className="product-card">
                            <div className="product-image">Imagen 3</div>
                            <h3>Producto 3</h3>
                            <p>Descripción breve del producto 3.</p>
                            <button>Ver Detalles</button>
                        </div>
                        <div className="product-card">
                            <div className="product-image">Imagen 4</div>
                            <h3>Producto 4</h3>
                            <p>Descripción breve del producto 4.</p>
                            <button>Ver Detalles</button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;
