import s from "./Packs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {CardPacksDataType} from "../../../../n3-dall/api/api_cards";
import {useEffect, useState} from "react";
import SuperButton from "../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import {setCurrentPageAC, setIdAC, setPackNameAC, setPacks} from "./packs-reducer";
import {StatusType} from "../../u1-app/app-reducer";
import {Preloader} from "../../u3-common/Super-Components/c7-Preloader/Preloader";
import {Pack} from "./Pack/Pack";
import {Toaster} from "react-hot-toast";
import {CreatePackModalWindow} from "../../u3-common/ModalWindow/CreatePacks/CreatePackModalWindow";
import {PaginationComponent} from "../../u3-common/Pagination/Pagination";
import SuperInputText from "../../u3-common/Super-Components/c1-SuperInputText/SuperInputText";
import {Slider} from "../../u3-common/Super-Components/c8-SuperSlider/Slider";

export const Packs = () => {

    const dispatch = useDispatch();
    const packs = useSelector<AppRootStateType, Array<CardPacksDataType>>(state => state.packs.cardPacks)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const packsPerPage = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const name = useSelector<AppRootStateType, string>(state => state.packs.name)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const userLoginID = useSelector<AppRootStateType, string>(state => state.login.profile._id)
    const totalPages = Math.ceil(cardPacksTotalCount / packsPerPage)

    const [activeModalAdd, setActiveModalAdd] = useState(false)
    const [inputValue, setInputValue] = useState(name)
    const [isMyPack, setIsMyPack] = useState(false)

    useEffect(() => {
        dispatch(setPacks())
    }, [dispatch, page])

    const openModalWindow = () => {
        setActiveModalAdd(true)
    }

    const allPacks = () => {
        setIsMyPack(false)
        dispatch(setIdAC(''))
        dispatch(setPacks())
    }

    const myPacks = () => {
        setIsMyPack(true)
        dispatch(setIdAC(userLoginID))
        dispatch(setPacks())
    }

    const inputValueSet = (value: string) => {
        setInputValue(value)
    }

    const search = () => {
        console.log('Search request ' + inputValue)
        dispatch(setPackNameAC(inputValue))
        dispatch(setPacks())

        setInputValue('')
        //send search request to the server 
    }

    const copyPacks = packs.map(c => {
        return (
            <tr key={c._id}>
                <Pack pack={c}/>
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

            <div className={s.navContainer}>

                <div className={s.searchContainer}>
                    <SuperInputText onChangeText={inputValueSet}
                                    placeholder='search packs'
                                    className={s.searchInput}
                                    value={inputValue}
                    />
                    <SuperButton onClick={search} disabled={status === "loading"}>SEARCH</SuperButton>
                </div>


                <div className={s.allMyPacks}>
                    <SuperButton onClick={allPacks} disabled={status === "loading" || !isMyPack}>
                        All PACKS</SuperButton>
                    <SuperButton onClick={myPacks} disabled={status === "loading" || isMyPack}>
                        MY PACKS</SuperButton>
                </div>

                <SuperButton onClick={openModalWindow} disabled={status === "loading"}>ADD PACK</SuperButton>

                <Slider/>
            </div>

            <table>
                <thead className={s.packsHeader}>
                <tr>
                    <th>username</th>
                    <th>name</th>
                    <th>count</th>
                    <th>time</th>
                    <th>cards</th>
                    <th>learn</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>
                {copyPacks}
                </tbody>
            </table>

            {
                cardPacksTotalCount < 5
                    ? null
                    : <PaginationComponent
                        handlePageChange={handlePageChange}
                        totalPages={totalPages}/>
            }

        </div>
    )
}