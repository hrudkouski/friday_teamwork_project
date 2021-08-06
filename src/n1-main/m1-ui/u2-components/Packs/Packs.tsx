import s from "./Packs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {CardPacksDataType} from "../../../../n3-dall/api/api_cards";
import {useEffect, useState} from "react";
import SuperButton from "../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import {deletePacks, setPacks} from "./packs-reducer";
import {StatusType} from "../../u1-app/app-reducer";
import {Preloader} from "../../u3-common/Super-Components/c7-Preloader/Preloader";
import {Pack} from "./Pack/Pack";
import {Toaster} from "react-hot-toast";
import {Redirect} from "react-router-dom";
import {CreatePackModalWindow} from "../../u3-common/ModalWindow/CreatePacks/CreatePackModalWindow";

export const Packs = () => {

    const [activeModalAdd, setActiveModalAdd] = useState(false)

    const dispatch = useDispatch();
    const packs = useSelector<AppRootStateType, Array<CardPacksDataType>>(state => state.packs.cardPacks)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)


    useEffect(() => {
        dispatch(setPacks)
    }, [dispatch])

    const openModalWindow = () => {
        setActiveModalAdd(true)
    }

    const createPacks = (title: string) => {
        dispatch(createPacks(title))
    }

    const deletePack = (id: string) => {
        dispatch(deletePacks(id))
    }

    const copyPacks = packs.map(c => {

        return (
            <tr key={c._id}>
                <Pack deletePacks={deletePack}
                      pack={c}/>
            </tr>
        )
    })

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.packsContainer}>
            <div><Toaster/></div>
            {status === "loading" && <Preloader/>}
            {activeModalAdd && <CreatePackModalWindow activeModalAdd={activeModalAdd}
                                                      setActive={setActiveModalAdd}
            />}

            <SuperButton onClick={openModalWindow} disabled={status === "loading"}>Add Cards</SuperButton>

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