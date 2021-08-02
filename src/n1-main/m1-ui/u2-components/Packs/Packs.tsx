import s from "./Packs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {CardPacksDataType} from "../../../../n3-dall/api/api_cards";
import {ChangeEvent, useEffect, useState} from "react";
import SuperButton from "../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import SuperInputText from "../../u3-common/Super-Components/c1-SuperInputText/SuperInputText";
import {createPacks, deletePacks, setPacks, updatePacks} from "./packs-reducer";
import {StatusType} from "../../u1-app/app-reducer";
import {Preloader} from "../../u3-common/Super-Components/c7-Preloader/Preloader";
import {Pack} from "./Pack/Pack";

export const Packs = () => {

    const [title, setTitle] = useState('')

    const dispatch = useDispatch();
    const packs = useSelector<AppRootStateType, Array<CardPacksDataType>>(state => state.packs.cardPacks)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)

    useEffect(() => {
        dispatch(setPacks)
    }, [])

    const createCardsHandler = () => {
        dispatch(createPacks(title))
        if(title !== '') {
            setTitle('')
        }
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const deletePack = (id: string) => {
        dispatch(deletePacks(id))
    }

    const updateTitleHandler = (id: string, title: string) => {
        dispatch(updatePacks(id, title))
    }

    const copyPacks = packs.map(c => {
        return (
            <tr key={c._id}>
                <Pack updatePacks={updateTitleHandler} deletePacks={deletePack} pack={c}/>
            </tr>
        )
    })

    return (
        <div className={s.packsContainer}>
            {status === "loading" && <Preloader/>}

            <SuperInputText value={title} onChange={changeTitleHandler}/>
            <SuperButton onClick={createCardsHandler} disabled={status === "loading"}>Add Cards</SuperButton>

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
                    {copyPacks}
                </tbody>
            </table>
        </div>
    )
}