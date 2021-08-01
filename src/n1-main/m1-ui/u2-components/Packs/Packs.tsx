import s from "./Packs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {CardPacksDataType} from "../../../../n3-dall/api/api_cards";
import {ChangeEvent, useEffect, useState} from "react";
import SuperButton from "../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import SuperInputText from "../../u3-common/Super-Components/c1-SuperInputText/SuperInputText";
import {createPacks, deletePacks, setPacks} from "./packs-reducer";

export const Packs = () => {

    const [title, setTitle] = useState('')

    const dispatch = useDispatch();
    const cards = useSelector<AppRootStateType, Array<CardPacksDataType>>(state => state.cards.cardPacks)

    useEffect(() => {
        dispatch(setPacks)
    }, [])

    const createCardsHandler = () => {
        dispatch(createPacks(title))
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const copyCards = cards.map(c => {

        const time = c.created.slice(11, -8)
        const deletePacksHandler = () => {
            dispatch(deletePacks(c._id))
        }
        return (
            <tr key={c._id}>
                <td>{c.user_name}</td>
                <td>{c.name}</td>
                <td>{c.cardsCount}</td>
                <td>{time}</td>
                <td><SuperButton>View</SuperButton></td>
                <td><SuperButton>Train</SuperButton></td>
                <td><SuperButton>Update</SuperButton></td>
                <td><SuperButton onClick={deletePacksHandler}>Delete</SuperButton></td>
            </tr>
        )
    })

    return (
        <div className={s.packsContainer}>
            <SuperInputText value={title} onChange={changeTitleHandler}/>
            <SuperButton onClick={createCardsHandler}>Add Cards</SuperButton>

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