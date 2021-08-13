import c from './../Cards.module.css';
import {useSelector} from "react-redux";
import React, {useState} from "react";
import {CardDataType} from '../../../../../../n3-dall/api/api_cards';
import {AppRootStateType} from '../../../../../m2-bll/store/redux-store';
import {DeleteCardModalWindow} from "../../../../u3-common/ModalWindow/DeleteCard/DeleteCardModalWindow";

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
    const userLoginID = useSelector<AppRootStateType, string>(state => state.login.profile._id)

    const update = new Date(card.updated).toLocaleDateString(['ban', 'id'])

    const openDeleteCardModalWindow = () => setActiveDeleteCardModal(true)

    return (
        <>
            {activeDeleteCardModal &&
            <DeleteCardModalWindow
                activeModalDelete={activeDeleteCardModal}
                cardID={card._id}
                packID={packID}
                setActive={setActiveDeleteCardModal}
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
                            <span
                                style={{fontSize: '1.2em'}}
                                className={c.link}
                                onClick={openDeleteCardModalWindow}>
                        🧺
                    </span>
                            <span
                                style={{fontSize: '1.2em'}}
                                className={c.link}
                                onClick={() => alert(card._id)}>
                        🔄
                    </span>
                        </>
                    }
                </td>
            </tr>
        </>
    )
}