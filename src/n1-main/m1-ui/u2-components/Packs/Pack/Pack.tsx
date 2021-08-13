import {CardPacksDataType} from "../../../../../n3-dall/api/api_cards";
import React, {useState} from "react";
import SuperButton from "../../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import {UpdatePacksModalWindow} from "../../../u3-common/ModalWindow/UpdatePack/UpdatePacksModalWindow";
import {NavLink} from "react-router-dom";
import p from './Pack.module.css';
import {PATH} from "../../../u4-routes/Routes";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/store/redux-store";
import {DeletePackModalWindow} from "../../../u3-common/ModalWindow/DeletePack/DeletePackModalWindow";

type PackPropsType = {
    pack: CardPacksDataType
}

export const Pack = (props: PackPropsType) => {

    const userLoginID = useSelector<AppRootStateType, string>(state => state.login.profile._id)

    const [activeModal, setActiveModal] = useState(false)
    const [activeDeletePackModal, setActiveDeletePackModal] = useState(false)

    let date = new Date(props.pack.created);

    let formatter = new Intl.DateTimeFormat("ru", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    });

    const time = formatter.format(date);

    const openUpdateModalWindow = () => setActiveModal(true)

    const openDeleteModalWindow = () => setActiveDeletePackModal(true)


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

                {
                    userLoginID !== props.pack.user_id
                        ? null
                        : <>
                      <button
                    className={p.Button}
                    onClick={openUpdateModalWindow}
                    disabled={props.pack.entityStatus === "loading"}
                    >⚙️</button>

                      <button
                    className={p.Button}
                    onClick={openDeleteModalWindow}
                    disabled={props.pack.entityStatus === "loading"}
                    >🧨</button>
                        </>
                }

            </td>

            {activeModal && <UpdatePacksModalWindow
                activeModalUpdate={activeModal}
                name={props.pack.name}
                id={props.pack._id}
                setActive={setActiveModal}/>}

            {activeDeletePackModal && <DeletePackModalWindow
                activeModalDelete={activeDeletePackModal}
                packID={props.pack._id}
                setActive={setActiveDeletePackModal}/>}
        </>
    )
}