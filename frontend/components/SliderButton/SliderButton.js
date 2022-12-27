import { useRef, useState } from "react";
import { images } from "../../constant"

function SliderButton() {

  const slide = [
    'collectibles',
    'membership',
    'ticketing',
    'animation',
    'arts',
    'IRL art',
    'Trading Cards',
    'Music',
    'Memes'
  ];

  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);

  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };

  return (
    <>
    <div className='grid'>

      <div className='flex my-16 gap-6'>
        <div
            onClick={() => {
              handleHorizantalScroll(elementRef.current, 25, 100, -10);
            }}
            disabled={arrowDisable}
          >
            <img src={images.arrow} />
        </div>

        <div className='flex mx-10 gap-6 overflow-x-hidden w-full -translate-y-2' ref={elementRef}>
            {slide.map((slide) => 
              <div className=' w-1/5 flex-nowrap flex-none p-2 rounded-full bg-white text-orange-600 py-3 text-center border-2 border-orange-600'>
                {slide}
              </div>
            )}
        </div>

        <div
          onClick={() => {
            handleHorizantalScroll(elementRef.current, 25, 100, 10);
          }}
        >
          <img className="rotate-180" src={images.arrow} />
        </div>
      </div>

    </div>
    </>
  )
}

export default SliderButton 
