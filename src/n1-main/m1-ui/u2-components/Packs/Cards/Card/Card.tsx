import c from './../Cards.module.css';
import {useSelector} from "react-redux";
import React, {useState} from "react";
import {CardDataType} from '../../../../../../n3-dall/api/api_cards';
import {AppRootStateType} from '../../../../../m2-bll/store/redux-store';
import {DeleteCardModalWindow} from "../../../../u3-common/ModalWindow/DeleteCard/DeleteCardModalWindow";
import {UpdateCardModalWindow} from "../../../../u3-common/ModalWindow/UpdateCard/UpdateCardModalWindow";
import {StatusType} from "../../../../u1-app/app-reducer";

type CardPropsType = {
    card: CardDataType
    packID: string
}

export const Card: React.FC<CardPropsType> = (
    {
        card,
        packID
    }) => {

    const [activeDeleteCardModal, setActiveDeleteCardModal] = useState(false)
    const [activeUpdateCardModal, setActiveUpdateCardModal] = useState(false)
    const userLoginID = useSelector<AppRootStateType, string>(state => state.login.profile._id)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)

    const update = new Date(card.updated).toLocaleDateString(['ban', 'id'])

    const openDeleteCardModalWindow = () => setActiveDeleteCardModal(true)
    const openUpdateCardModalWindow = () => setActiveUpdateCardModal(true)

    return (
        <>
            {activeDeleteCardModal &&
            <DeleteCardModalWindow
                activeModalDelete={activeDeleteCardModal}
                cardID={card._id}
                packID={packID}
                setActive={setActiveDeleteCardModal}
            />}

            {activeUpdateCardModal &&
            <UpdateCardModalWindow
                activeModalUpdate={activeUpdateCardModal}
                setActive={setActiveUpdateCardModal}
                cardID={card._id}
                packID={packID}
                answer={card.answer}
                question={card.question}
            />}

            <tr>
                <td>{card.question}</td>
                <td>{card.answer}</td>
                <td>{update}</td>
                <td>{card.grade.toFixed(0)}</td>
                <td>
                    {userLoginID !== card.user_id
                        ? null
                        : <>
                            <button
                                className={c.link}
                                disabled={status === "loading"}
                                onClick={openDeleteCardModalWindow}>
                                🧺
                            </button>
                            <button
                                className={c.link}
                                disabled={status === "loading"}
                                onClick={openUpdateCardModalWindow}>
                                🔄
                            </button>
                        </>
                    }
                </td>
            </tr>
        </>
    )
}