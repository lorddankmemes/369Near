import { useRef, useState } from "react";
import { images } from "../../constant"
import slideOption from "../../data/filter/slideOption.json";

function SliderButton() {

  const [slideSelected, setSlideSelected] = useState("");

  const filteredNft = () => {
    if (slideSelected === "collectibles") {
      const filteredPrice = test.result.sort((a, b) => a.onsale_current_price - b.onsale_current_price);
      return filteredPrice;

    }  else if (slideSelected === "membership") {
      const filteredPrice = test.result.sort((a, b) => b.onsale_current_price - a.onsale_current_price);
      return filteredPrice;

    } else if (slideSelected === "arts") {
      const filteredRecent = test.result.sort((a, b) => new Date(b.sale_collectibles.createdAt) - new Date(a.sale_collectibles.createdAt));
      return filteredRecent;

    } else {
      return test.result;
    }
  };

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
            {slideOption.map((slide, i) => 
              <div 
                key={i}
                className=' w-1/5 flex-nowrap flex-none p-2 rounded-full bg-white text-orange-600 py-3 text-center border-2 border-orange-600 hover:bg-orange-600 hover:text-white'
                onChange={(e) => setSlideSelected(e.target.value)}
                value={slideSelected}      
              >
                <div value={slide.value} key={i}>
                {slide.label}
                </div>
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
