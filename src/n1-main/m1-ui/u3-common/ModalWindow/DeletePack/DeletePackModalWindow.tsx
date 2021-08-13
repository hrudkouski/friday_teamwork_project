import {MouseEvent,} from "react";
import s from "../ModalWindow.module.css";
import {useDispatch} from "react-redux";
import SuperButton from "../../Super-Components/c2-SuperButton/SuperButton";
import {deletePacks} from "../../../u2-components/Packs/packs-reducer";

type CreatePacksType = {
    activeModalDelete: boolean
    setActive: (active: boolean) => void
    packID: string
}

export const DeletePackModalWindow = (props: CreatePacksType) => {

    const dispatch = useDispatch();

    const deletePackHandler = () => {
        dispatch(deletePacks(props.packID))
        props.setActive(false)
    }

    const resetPackHandler = () => props.setActive(false)
    const activeModalHandler = () => props.setActive(false)
    const stopActiveModal = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()

    return (
        <div className={s.modalContainer} onClick={activeModalHandler}>
            <div className={s.modalContent} onClick={stopActiveModal}>
                <div className={s.title}>Are you sure to delete this pack?</div>
                <div className={s.allButton}>
                    <SuperButton
                        type={"submit"}
                        onClick={deletePackHandler}>
                        YES</SuperButton>
                    <SuperButton
                        red
                        type={"submit"}
                        onClick={resetPackHandler}>
                        NO</SuperButton>
                </div>

            </div>
        </div>
    )
}