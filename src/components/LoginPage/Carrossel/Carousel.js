import React, { useEffect } from 'react';
import './Carousel.css';

import image1 from '../../../imgs/img1.jpg';
import image2 from '../../../imgs/img2.jpg';
import image3 from '../../../imgs/img3.jpg';
import image4 from '../../../imgs/img4.jpg';
import image5 from '../../../imgs/img5.jpg';
import image6 from '../../../imgs/img6.jpg';

const images = [image1, image2, image3, image4, image5, image6];

const Carousel = () => {
  useEffect(() => {
    const carouselTrack = document.getElementById('carousel-track');

    // Duplica as imagens para criar a continuidade infinita
    const imagesToDisplay = [...images, ...images];

    imagesToDisplay.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = image;
      carouselTrack.appendChild(imgElement);
    });
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-track" id="carousel-track">
        {/* As imagens serão adicionadas dinamicamente */}
      </div>
    </div>
  );
};

export default Carousel;
