import {ChangeEvent, MouseEvent, useState} from "react";
import s from "../ModalWindow.module.css";
import {useDispatch} from "react-redux";
import SuperInputText from "../../Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Super-Components/c2-SuperButton/SuperButton";
import {updateCard} from "../../../u2-components/Packs/Cards/cards-reducer";

type UpdatePacksType = {
    activeModalUpdate: boolean
    setActive: (active: boolean) => void
    cardID: string
    packID: string
    answer: string
    question: string
}

export const UpdateCardModalWindow = (props: UpdatePacksType) => {

    const [answer, setAnswer] = useState(props.answer)
    const [question, setQuestion] = useState(props.question)

    const dispatch = useDispatch();

    const updateCardHandler = () => {
        dispatch(updateCard(props.packID, props.cardID, question, answer))
        if (question !== '') {
            setQuestion('')
        }
        props.setActive(false)
    }

    const updateQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const updateAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const activeModalHandler = () => props.setActive(false)
    const stopActiveModal = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()

    return (
        <div className={s.modalContainer} onClick={activeModalHandler}>
            <div className={s.modalContent} onClick={stopActiveModal}>
                <div className={s.title}>Please, update this card</div>
                <SuperInputText type="text"
                                value={question}
                                placeholder={'question'}
                                onChange={updateQuestionHandler}
                                autoFocus/>
                <SuperInputText type="text"
                                value={answer}
                                placeholder={'answer'}
                                onChange={updateAnswerHandler}
                                autoFocus/>
                <SuperButton
                    type={"submit"}
                    onClick={updateCardHandler}>
                    OK
                </SuperButton>
            </div>
        </div>
    )
}