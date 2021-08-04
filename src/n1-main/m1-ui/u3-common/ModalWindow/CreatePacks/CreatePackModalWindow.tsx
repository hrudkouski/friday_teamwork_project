import {ChangeEvent, MouseEvent, useState} from "react";
import s from "../ModalWindow.module.css";
import {useDispatch} from "react-redux";
import SuperInputText from "../../Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Super-Components/c2-SuperButton/SuperButton";
import {createPacks} from "../../../u2-components/Packs/packs-reducer";

type CreatePacksType = {
    activeModalAdd: boolean
    setActive: (active: boolean) => void
}

export const CreatePackModalWindow = (props: CreatePacksType) => {

    const [title, setTitle] = useState('')

    const dispatch = useDispatch();

    const createCardsHandler = () => {
        dispatch(createPacks(title))
        if (title !== '') {
            setTitle('')
        }
        props.setActive(false)
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activeModalHandler = () => props.setActive(false)
    const stopActiveModal = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()

    return (
        <div className={s.modalContainer} onClick={activeModalHandler}>
            <div className={s.modalContent} onClick={stopActiveModal}>
                <div className={s.title}>Please, enter the name of the pack</div>
                <SuperInputText type="text"
                                value={title}
                                onChange={changeTitleHandler}
                                autoFocus/>
                <SuperButton type={"submit"} onClick={createCardsHandler}>OK</SuperButton>
            </div>
        </div>
    )
}