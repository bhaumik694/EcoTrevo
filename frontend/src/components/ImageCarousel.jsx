import React, { useState, useEffect } from 'react';
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.png'
import image3 from '../assets/image3.png'

const images = [
    image1,
    image2,
    image3,
];

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden z-0">
            <div
                className="flex transition-transform duration-1000"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="min-w-full h-screen bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                ))}
            </div>
            <div className="overlay absolute inset-0 bg-black bg-opacity-50">
            </div>
        </div>
    );
};

export default ImageCarousel;
