import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface SliderContainerProps {
  width: number;
  height: number;
}
const SliderContainer = styled.div`
  position: relative;
  height: ${(props: SliderContainerProps) => props.height}px;
  width: ${(props: SliderContainerProps) => props.width}px;
  margin: 3em auto;
  overflow: hidden;

  .dot {
    cursor: pointer;
    height: 10px;
    width: 10px;
    margin: 0 5px;
    background-color: #c4c4c4;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }

  .active,
  .dot:hover {
    background-color: var(--brand-color);
  }

  /* Fading animation */
`;

interface SliderContentProps {
  translate: any;
  width: number;
  transition: number;
}
const SliderContent = styled.div`
  transform: translateX(-${(props: SliderContentProps) => props.translate}px);
  transition: transform ease-out
    ${(props: SliderContentProps) => props.transition}s;
  height: 100%;
  width: ${(props: any) => props.width}px;
  display: flex;
`;
interface SlideProps {
  content: string;
}
const Slide = styled.div`
  height: 100%;
  width: 100%;
  display: block;
  //background-image: url('${(props: SlideProps) => props.content}');
  text-align: center;
  `;

const Dots = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
const Caption = styled.p`
  font-size: 1.25em;
  text-align: center;
  margin: 1em;
`;
const SlideImg = styled.img`
  width: 60%;
  height: 270px;
  object-fit: contain;
`;
interface sliderProps {
  images: string[];
  captions: string[];
}
interface SliderProps {
  height: number;
  width: number;
  sliderProps: sliderProps;
}

/**
 * @function Slider
 */
const Slider = function(props: SliderProps) {
  const { width, height, sliderProps } = props;
  const { images, captions } = sliderProps;
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45,
  });

  const { translate, transition } = state;
  useEffect(function() {
    setInterval(function() {
      nextSlide();
    }, 5000);
  }, []);

  const nextSlide = () => {
    setState(state => {
      if (state.activeIndex === images.length - 1) {
        return {
          ...state,
          translate: 0,
          activeIndex: 0,
        };
      } else {
        return {
          ...state,
          activeIndex: state.activeIndex + 1,
          translate: (state.activeIndex + 1) * width,
        };
      }
    });
  };
  // use it later if needed
  // const prevSlide = () => {
  //   setState(state => {
  //     if (state.activeIndex === 0) {
  //       return {
  //         ...state,
  //         translate: (images.length - 1) * width,
  //         activeIndex: images.length - 1,
  //       };
  //     } else {
  //       return {
  //         ...state,
  //         activeIndex: state.activeIndex - 1,
  //         translate: (state.activeIndex - 1) * width,
  //       };
  //     }
  //   });
  // };

  const onDotClick = (index: number) => {
    setState({
      ...state,
      activeIndex: index,
      translate: index * width,
    });
  };

  const isActiveClass = (index: number) => {
    const { activeIndex } = state;
    if (index === activeIndex) {
      return 'dot active';
    } else {
      return 'dot';
    }
  };

  return (
    <SliderContainer width={width} height={height}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={width * images.length}
      >
        {images.map((slide, i) => (
          <Slide key={slide + i} content={slide}>
            <SlideImg src={slide} />
            <Caption>{captions[i]}</Caption>
          </Slide>
        ))}
      </SliderContent>
      <Dots>
        {images.map((slide, index) => (
          <span
            key={slide + index}
            className={isActiveClass(index)}
            onClick={() => onDotClick(index)}
          ></span>
        ))}
      </Dots>
    </SliderContainer>
  );
};

export default Slider;
