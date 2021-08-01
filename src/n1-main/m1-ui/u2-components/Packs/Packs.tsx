import s from "./Packs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {CardPacksDataType} from "../../../../n3-dall/api/api_cards";
import {useEffect} from "react";
import {setCards} from "./cards-reducer";
import SuperButton from "../../u3-common/Super-Components/c2-SuperButton/SuperButton";

export const Packs = () => {

    const dispatch = useDispatch();
    const cards = useSelector<AppRootStateType, Array<CardPacksDataType>>(state => state.cards.cardPacks)

    useEffect(() => {
        dispatch(setCards)
    }, [])

    const copyCards = cards.map(c => {

        const time = c.created.slice(11,-8)
        return (
            <tr>
                <td>{c.user_name}</td>
                <td>{c.name}</td>
                <td>{c.cardsCount}</td>
                <td>{time}</td>
                <td> <SuperButton>View</SuperButton> </td>
                <td> <SuperButton>Train</SuperButton> </td>
                <td> <SuperButton>Update</SuperButton> </td>
                <td> <SuperButton>Delete</SuperButton> </td>
            </tr>
        )
    })

    return (
        <div className={s.packsContainer}>
            <table>
                <thead className={s.packsHeader}>
                    <tr>
                        <th>username</th>
                        <th>name</th>
                        <th>count</th>
                        <th>time</th>
                        <th>cards</th>
                        <th>train</th>
                        <th/>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {copyCards}
                </tbody>
            </table>
        </div>
    )
}