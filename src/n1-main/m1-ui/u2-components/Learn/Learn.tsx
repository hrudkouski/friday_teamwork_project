import React, {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {CardDataType} from "../../../../n3-dall/api/api_cards";
import {getCards, updateGrade} from "../Packs/Cards/cards-reducer";
import SuperButton from "../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import s from "./Learn.module.css";
import c from "../Packs/Cards/Cards.module.css";
import {StatusType} from "../../u1-app/app-reducer";
import {Preloader} from "../../u3-common/Super-Components/c7-Preloader/Preloader";
import {Toaster} from "react-hot-toast";

export const Learn = () => {

    const {id} = useParams<{ id: string }>()

    const dispatch = useDispatch()

    const cards = useSelector<AppRootStateType, Array<CardDataType>>(state => state.cards.cards)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

    const [currentQuestion, setQuestion] = useState(0)
    const [answer, setAnswer] = useState(false)
    const [stop, setStop] = useState(false)
    const [grade, setGrade] = useState(0)

    useEffect(() => {
        dispatch(getCards(id))
    }, [dispatch, id])

    const nextQuestion = () => {
        if (cards.length != currentQuestion + 1) {
            setQuestion(currentQuestion + 1)
        } else {
            setStop(true)
        }
        dispatch(updateGrade(grade, cards[currentQuestion]._id))
        setAnswer(false)
        setGrade(0)
    }

    const setAnswerHandler = () => {
        setAnswer(true)
    }

    const rollbackHandler = () => {
        setQuestion(0)
        setStop(false)
    }


    return (
        <>
            <div><Toaster/></div>
            {status === "loading" && <Preloader/>}
            <div className={c.backLink}>
                <NavLink
                    className={c.link}
                    to={'/packList'}>
                    🔙Go to Packs
                </NavLink>
            </div>
            {
                cards.length === 0
                    ? <div className={c.titleNoCards}>
                        <span className={c.monkey}>🐒</span>
                        <span>Oops...</span>
                        <span>There are no cards in this pack...</span>
                    </div>
                    : <div className={s.learnContainer}>
                        {stop
                            ? <div className={s.infoBlock}>
                                <div>The questions are over</div>
                                <SuperButton onClick={rollbackHandler}>Start over</SuperButton>
                            </div>
                            : <>
                                <div className={s.question}>
                                    {cards[currentQuestion]?.question}
                                </div>

                                <SuperButton onClick={setAnswerHandler} disabled={answer}>CHECK</SuperButton>

                                {answer && (
                                    <div className={s.block}>
                                        <div>{cards[currentQuestion]?.answer}</div>
                                        <div className={s.butContainer}>
                                            {grades.map((el, i) => {
                                                const settingGrades = () => {
                                                    setGrade(i + 1)
                                                }
                                                return (
                                                    <SuperButton key={i + 1}
                                                                 onClick={settingGrades}
                                                                 disabled={i + 1 === grade}
                                                                 className={s.but}>
                                                        {el}
                                                    </SuperButton>
                                                )
                                            })}
                                        </div>
                                        <SuperButton onClick={nextQuestion}>NEXT</SuperButton>
                                    </div>
                                )}
                            </>
                        }
                    </div>
            }
        </>

    )
}

