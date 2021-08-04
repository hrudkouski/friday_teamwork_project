import {ChangeEvent, MouseEvent, useState} from "react";
import s from "../ModalWindow.module.css";
import {useDispatch} from "react-redux";
import SuperInputText from "../../Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Super-Components/c2-SuperButton/SuperButton";
import {updatePacks} from "../../../u2-components/Packs/packs-reducer";

type UpdatePacksType = {
    activeModalUpdate: boolean
    setActive: (active: boolean) => void
    id: string
}

export const UpdatePacksModalWindow = (props: UpdatePacksType) => {

    const [title, setTitle] = useState('')

    const dispatch = useDispatch();

    const updatePackHandler = () => {
        dispatch(updatePacks(props.id, title))
        if (title !== '') {
            setTitle('')
        }
        props.setActive(false)
    }

    const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activeModalHandler = () => props.setActive(false)
    const stopActiveModal = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()

    return (
        <div className={s.modalContainer} onClick={activeModalHandler}>
            <div className={s.modalContent} onClick={stopActiveModal}>
                <div className={s.title}>Please, update name of pack</div>
                <SuperInputText type="text"
                                value={title}
                                onChange={updateTitleHandler}
                                autoFocus/>
                <SuperButton type={"submit"} onClick={updatePackHandler}>OK</SuperButton>
            </div>
        </div>
    )
}