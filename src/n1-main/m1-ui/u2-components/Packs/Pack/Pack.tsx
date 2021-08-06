import {CardPacksDataType} from "../../../../../n3-dall/api/api_cards";
import {useState} from "react";
import SuperButton from "../../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import {UpdatePacksModalWindow} from "../../../u3-common/ModalWindow/UpdatePacks/UpdatePacksModalWindow";
import s from "./Pack.module.css"

type PackPropsType = {
    pack: CardPacksDataType
    deletePacks: (id: string) => void
}

export const Pack = (props: PackPropsType) => {

    const [activeModal, setActiveModal] = useState(false)

    const time = props.pack.created.slice(11, -8)
    const deletePacksHandler = () => {
        props.deletePacks(props.pack._id)
    }

    const openModalWindow = () => {
        setActiveModal(true)
    }

    return (
        <>

            <td>{props.pack.user_name}</td>
            <td>{props.pack.name}</td>
            <td>{props.pack.cardsCount}</td>
            <td>{time}</td>
            <td><SuperButton>View</SuperButton></td>
            <td><SuperButton>Train</SuperButton></td>
            <td>
                <SuperButton onClick={openModalWindow}
                             disabled={props.pack.entityStatus === "loading"}>
                    Update
                </SuperButton>
            </td>
            <td>
                <SuperButton onClick={deletePacksHandler}
                             disabled={props.pack.entityStatus === "loading"}>Delete
                </SuperButton>
            </td>
            {activeModal && <UpdatePacksModalWindow activeModalUpdate={activeModal}
                                                    id={props.pack._id}
                                                    setActive={setActiveModal}
            />}
        </>

    )
}