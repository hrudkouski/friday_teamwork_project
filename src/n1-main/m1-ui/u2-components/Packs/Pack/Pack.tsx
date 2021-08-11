import {CardPacksDataType} from "../../../../../n3-dall/api/api_cards";
import {useState} from "react";
import SuperButton from "../../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import {UpdatePacksModalWindow} from "../../../u3-common/ModalWindow/UpdatePacks/UpdatePacksModalWindow";
import {NavLink} from "react-router-dom";
import p from './Pack.module.css';
import {PATH} from "../../../u4-routes/Routes";

type PackPropsType = {
    pack: CardPacksDataType
    deletePacks: (id: string) => void
}

export const Pack = (props: PackPropsType) => {

    const [activeModal, setActiveModal] = useState(false)

    let date = new Date(props.pack.created);

    let formatter = new Intl.DateTimeFormat("ru", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    });

    const time = formatter.format(date);

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
            <td>
                <NavLink
                    className={p.link}
                    to={PATH.CARDS + `/${props.pack._id}`}>
                    👓
                </NavLink>
            </td>
            <td>
                <NavLink
                    className={p.link}
                    to={PATH.LEARN + `/${props.pack._id}`}>
                    🎓
                </NavLink>
            </td>
            <td>
                <SuperButton
                    onClick={openModalWindow}
                    disabled={props.pack.entityStatus === "loading"}>
                    🔄
                </SuperButton>
            </td>
            <td>
                <SuperButton
                    onClick={deletePacksHandler}
                    disabled={props.pack.entityStatus === "loading"}>
                    🧺
                </SuperButton>
            </td>
            {activeModal && <UpdatePacksModalWindow activeModalUpdate={activeModal}
                                                    id={props.pack._id}
                                                    setActive={setActiveModal}/>}
        </>
    )
}