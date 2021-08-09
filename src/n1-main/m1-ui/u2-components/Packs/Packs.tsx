import s from "./Packs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {CardPacksDataType} from "../../../../n3-dall/api/api_cards";
import {useEffect, useState} from "react";
import SuperButton from "../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import {deletePacks, setCurrentPageAC, setPacks} from "./packs-reducer";
import {StatusType} from "../../u1-app/app-reducer";
import {Preloader} from "../../u3-common/Super-Components/c7-Preloader/Preloader";
import {Pack} from "./Pack/Pack";
import {Toaster} from "react-hot-toast";
import {CreatePackModalWindow} from "../../u3-common/ModalWindow/CreatePacks/CreatePackModalWindow";
import {PaginationComponent} from "../../u3-common/Pagination/Pagination";

export const Packs = () => {

    const [activeModalAdd, setActiveModalAdd] = useState(false)

    const dispatch = useDispatch();
    const packs = useSelector<AppRootStateType, Array<CardPacksDataType>>(state => state.packs.cardPacks)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const packsPerPage = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const totalPages = Math.ceil(cardPacksTotalCount / packsPerPage)

    useEffect(() => {
        dispatch(setPacks())
    }, [dispatch, page])

    const openModalWindow = () => {
        setActiveModalAdd(true)
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

    const handlePageChange = (e: { selected: number }) => {
        const selectedPage = e.selected + 1;
        dispatch(setCurrentPageAC(selectedPage))
    };

    return (
        <div className={s.packsContainer}>
            <div><Toaster/></div>
            {status === "loading" && <Preloader/>}
            {activeModalAdd && <CreatePackModalWindow activeModalAdd={activeModalAdd} setActive={setActiveModalAdd}/>}

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

            <PaginationComponent
                handlePageChange={handlePageChange}
                totalPages={totalPages}/>
        </div>
    )
}