import Carousel from 'react-bootstrap/Carousel';
import imgArray from '../utils/assets.utils';

function ImgCarousel() {
  return (
    <Carousel interval={2500} variant="dark" fade>
      {imgArray.map((item,index)=>{
        return (
          <Carousel.Item key={index.toString()}>
        <img
          className="d-block w-100"
          style={{height:"400px"}}
          src={item.src}
          alt={item.alt}
        />
        <Carousel.Caption>
          {/* <h3 >{item.alt}</h3> */}
          <p style={{color:"#808080"}}>{item.alt}</p>
        </Carousel.Caption>
      </Carousel.Item>
        )
      })}
      
    </Carousel>
  );
}

export default ImgCarousel;