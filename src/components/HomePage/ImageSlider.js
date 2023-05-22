import React, {useState} from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SportImage1 from 'E:/Programs/VSCode/React/SportMaps-Front-end/src/components/images/homePage/gallery/august-phlieger.jpg';
import SportImage2 from 'E:/Programs/VSCode/React/SportMaps-Front-end/src/components/images/homePage/gallery/felipe-giacometti.jpg';
import SportImage3 from 'E:/Programs/VSCode/React/SportMaps-Front-end/src/components/images/homePage/gallery/joe-neric.jpg';
import SportImage4 from 'E:/Programs/VSCode/React/SportMaps-Front-end/src/components/images/homePage/gallery/markus-spiske.jpg';
import SportImage5 from 'E:/Programs/VSCode/React/SportMaps-Front-end/src/components/images/homePage/gallery/matthieu-petiard.jpg';
import SportImage6 from 'E:/Programs/VSCode/React/SportMaps-Front-end/src/components/images/homePage/gallery/thomas-serer.jpg';
import SportImage7 from 'E:/Programs/VSCode/React/SportMaps-Front-end/src/components/images/homePage/gallery/vienna-reyes.jpg';
import SportImage8 from 'E:/Programs/VSCode/React/SportMaps-Front-end/src/components/images/homePage/gallery/zachary-kadolph.jpg';

const SliderData = [
  {
    image: SportImage1
  },
  {
    image: SportImage2
  },
  { 
    image: SportImage3
  },
  { 
    image: SportImage4
  },
  {
    image: SportImage5
  },
  {
    image: SportImage6
  },
  {
    image: SportImage7
  },
  {
    image: SportImage8
  }
];

const ImageSlider = () => {
const [current, setCurrent] = useState(0);
const length = SliderData.length;

const nextSlide = () => {
  setCurrent(current === length - 1 ? 0 : current + 1);
};

const prevSlide = () => {
  setCurrent(current === 0 ? length - 1 : current - 1);
};

if (!Array.isArray(SliderData) || SliderData.length <= 0) {
  return null;
}

return (
  <section className='slider'>
    <ArrowBackIosIcon className='left-arrow' fontSize='large' onClick={prevSlide} />
    <ArrowForwardIosIcon className='right-arrow' fontSize='large' onClick={nextSlide} />
    {SliderData.map((slide, index) => {
      return (
        <div
          className={index === current ? 'slide active' : 'slide'}
          key={index}
        >
          {index === current && (
            <img src={slide.image} alt='SportImage' className='image' />
          )}
        </div>
      );
    })}
  </section>
);
};
  
export default ImageSlider;