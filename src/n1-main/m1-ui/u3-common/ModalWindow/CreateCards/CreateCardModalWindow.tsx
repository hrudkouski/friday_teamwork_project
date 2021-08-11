import {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";
import s from "../ModalWindow.module.css";
import {useDispatch} from "react-redux";
import SuperInputText from "../../Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Super-Components/c2-SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/store/redux-store";
import {createCard} from "../../../u2-components/Packs/Cards/cards-reducer";

type CreatePacksType = {
    activeModalAdd: boolean
    setActive: (active: boolean) => void
}

export const CreateCardModalWindow = (props: CreatePacksType) => {

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const cardsPackID = useSelector<AppRootStateType, string>(state => state.packs.packCardsId)

    const dispatch = useDispatch();

    const createCardsHandler = () => {
        dispatch(createCard(cardsPackID, question, answer))
        props.setActive(false)
    }

    const onPressEnterAddCard = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') createCardsHandler();
    }

    const changeTitleQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const changeTitleAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const activeModalHandler = () => props.setActive(false)
    const stopActiveModal = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()

    return (
        <div className={s.modalContainer} onClick={activeModalHandler}>
            <div className={s.modalContent} onClick={stopActiveModal}>
                <div className={s.title}>Please, enter the question and the answer of the card</div>
                <SuperInputText type="text"
                                placeholder='question'
                                required
                                value={question}
                                onChange={changeTitleQuestionHandler}
                                onKeyPress={onPressEnterAddCard}
                                autoFocus/>
                <SuperInputText type="text"
                                required
                                placeholder='answer'
                                value={answer}
                                onChange={changeTitleAnswerHandler}
                                onKeyPress={onPressEnterAddCard}
                                autoFocus/>
                <SuperButton
                    type={"submit"}
                    onClick={createCardsHandler}>
                    OK </SuperButton>
            </div>
        </div>
    )
}