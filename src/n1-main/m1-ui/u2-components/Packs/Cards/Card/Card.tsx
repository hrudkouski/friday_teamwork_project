import c from './../Cards.module.css';
import {useSelector} from "react-redux";
import React from "react";
import {CardDataType} from '../../../../../../n3-dall/api/api_cards';
import {AppRootStateType} from '../../../../../m2-bll/store/redux-store';

type CardPropsType = {
    card: CardDataType
}

export const Card: React.FC<CardPropsType> = (
    {card}) => {

    const userLoginID = useSelector<AppRootStateType, string>(state => state.login.profile._id)

    const update = new Date(card.updated).toLocaleDateString(['ban', 'id'])

    return (
        <>
            <tr>
                <td>{card.question}</td>
                <td>{card.answer}</td>
                <td>{update}</td>
                <td>{card.grade}</td>
                <td>
                    {userLoginID !== card.user_id
                        ? null
                        : <>
                            <span
                                style={{fontSize: '1.2em'}}
                                className={c.link}
                                onClick={() => alert('delete')}>
                        🧺
                    </span>
                            <span
                                style={{fontSize: '1.2em'}}
                                className={c.link}
                                onClick={() => alert('update')}>
                        🔄
                    </span>
                        </>
                    }
                </td>
            </tr>
        </>
    )
}