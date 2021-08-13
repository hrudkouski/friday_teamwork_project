import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setMinCardsCount, setMaxCardsCount } from '../../../u2-components/Packs/packs-reducer';
import s from './Slider.module.css' 


export const Slider = () =>{

    const MAX_CARDS_NUMBER = 24;
    const dispatch = useDispatch();

    const [leftSliderValue, setLeftSliderValue] = useState(0)
    const [rightSliderValue, setRightSliderValue] = useState(MAX_CARDS_NUMBER)

    window.onload = function() {
        slideOne();
        slideTwo();
    }
    
    let sliderOne = document.getElementById('slider-1');
    let sliderTwo = document.getElementById('slider-2');
    let displayValOne = document.getElementById("range1");
    let displayValTwo = document.getElementById("range2");
    let minGap = 0;
    let sliderTrack = document.getElementById("sliderTrack")
    
    const sliderMaxValue = MAX_CARDS_NUMBER
    let percent1 = 0
    let percent2 = 0

    const slideOne = () => {
        //@ts-ignore
        if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap ){
            //@ts-ignore
            sliderOne.value = parseInt(sliderTwo.value) - minGap
        }
        //@ts-ignore
        displayValOne.textContent = sliderOne.value;
        //@ts-ignore
        setLeftSliderValue(sliderOne.value)
        //@ts-ignore
        dispatch(setMinCardsCount(sliderOne.value))
        fillColor();
    }
    const slideTwo = () => {
        //@ts-ignore
        if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap ){
            //@ts-ignore
            sliderTwo.value = parseInt(sliderOne.value) + minGap
        }
        //@ts-ignore
        displayValTwo.textContent = sliderTwo.value;
        //@ts-ignore
        setRightSliderValue(sliderTwo.value)
        //@ts-ignore
        dispatch(setMaxCardsCount(sliderTwo.value))
        fillColor();
    }

    const fillColor = () => {
        //@ts-ignore
        percent1 = (sliderOne.value/ sliderMaxValue) * 100;
        //@ts-ignore
        percent2 = (sliderTwo.value/ sliderMaxValue) * 100;

        //@ts-ignore
        sliderTrack.style.background = `linear-gradient(to right, #90aede ${percent1}% ,#ffc300 ${percent1}%, #ffc300 ${percent2}%, #90aede ${percent2}%)`;        
    }

    return <>


        <div className={s.wrapper}>

            <div className={s.values}>

                <span id="range1">
                    0
                </span>
                <span> - </span>
                <span id="range2">
                    {sliderMaxValue}
                </span>
            </div>

            <div className={s.container}>
                <div className={s.sliderTrack} id="sliderTrack"></div>
                <input type="range" min="0" max={sliderMaxValue} value={leftSliderValue} id="slider-1" onInput={() => slideOne()}/>
                <input type="range" min="0" max={sliderMaxValue} value={rightSliderValue} id="slider-2" onInput={() => slideTwo()}/>
                </div>

        </div>

    </>
}
