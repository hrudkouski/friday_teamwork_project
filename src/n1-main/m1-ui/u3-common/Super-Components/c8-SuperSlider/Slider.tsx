import s from './Slider.module.css' 

export const Slider = () =>{

    let sliderOne = document.getElementById('slider-1');
    let sliderTwo = document.getElementById('slider-2');
    let displayValOne = document.getElementById("range1");
    let displayValTwo = document.getElementById("range2");
    let minGap = 5;

    const slideOne = () => {
        //@ts-ignore
        if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap ){
            //@ts-ignore
            sliderOne.value = parseInt(sliderTwo.value) - minGap
        }
        //@ts-ignore
        displayValOne.textContent = sliderOne.value
    }
    const slideTwo = () => {
        //@ts-ignore
        if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap ){
            //@ts-ignore
            sliderTwo.value = parseInt(sliderOne.value) + minGap
        }
        //@ts-ignore
        displayValTwo.textContent = sliderTwo.value 
    }


    return <>


        <div className={s.wrapper}>

            <div className={s.values}>

                <span id="range1">
                    0
                </span>
                <span> - </span>
                <span id="range2">
                    100
                </span>
            </div>

            <div className={s.container}>
                <div className={s.sliderTrack}></div>
                <input type="range" min="0" max="100"  id="slider-1" onInput={() => slideOne()}/>
                <input type="range" min="0" max="100" id="slider-2" onInput={() => slideTwo()}/>
            </div>

        </div>



        {/* <div className={s.multiRangeSlider}>
            
        <input type="range" id="inputLeft" min="0" max="50" value="20"/>
        <input type="range" id="inputRight" min="0" max="50" value="40"/>

            <div className={s.slider}>
                <div className={s.track}></div>
                <div className={s.range}></div>
                <div className={s.thumbLeft}></div>
                <div className={s.thumbRight}></div>

            </div>
        </div> */}

    </>
}
