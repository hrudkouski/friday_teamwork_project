import {MouseEvent,} from "react";
import s from "../ModalWindow.module.css";
import {useDispatch} from "react-redux";
import SuperButton from "../../Super-Components/c2-SuperButton/SuperButton";
import {deleteCard} from "../../../u2-components/Packs/Cards/cards-reducer";

type CreatePacksType = {
    activeModalDelete: boolean
    setActive: (active: boolean) => void
    cardID: string
    packID: string
}

export const DeleteCardModalWindow = (props: CreatePacksType) => {

    const dispatch = useDispatch();

    const deleteCardHandler = () => {
        dispatch(deleteCard(props.cardID, props.packID))
        props.setActive(false)
    }

    const resetCardsHandler = () => props.setActive(false)
    const activeModalHandler = () => props.setActive(false)
    const stopActiveModal = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()

    return (
        <div className={s.modalContainer} onClick={activeModalHandler}>
            <div className={s.modalContent} onClick={stopActiveModal}>
                <div className={s.title}>Are you sure to delete this card?</div>
                <div className={s.allButton}>
                    <SuperButton
                        type={"submit"}
                        onClick={deleteCardHandler}>
                        YES</SuperButton>
                    <SuperButton
                        type={"submit"}
                        onClick={resetCardsHandler}>
                        NO</SuperButton>
                </div>
            </div>
        </div>
    )
}