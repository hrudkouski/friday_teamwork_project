import s from "./Packs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {CardPacksDataType} from "../../../../n3-dall/api/api_cards";
import {ChangeEvent, useEffect, useState} from "react";
import SuperButton from "../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import {deletePacks, setCurrentPageAC, setPackNameAC, setPacks} from "./packs-reducer";
import {StatusType} from "../../u1-app/app-reducer";
import {Preloader} from "../../u3-common/Super-Components/c7-Preloader/Preloader";
import {Pack} from "./Pack/Pack";
import {Toaster} from "react-hot-toast";
import {CreatePackModalWindow} from "../../u3-common/ModalWindow/CreatePacks/CreatePackModalWindow";
import {PaginationComponent} from "../../u3-common/Pagination/Pagination";
import SuperInputText from "../../u3-common/Super-Components/c1-SuperInputText/SuperInputText";

export const Packs = () => {

    const dispatch = useDispatch();
    const packs = useSelector<AppRootStateType, Array<CardPacksDataType>>(state => state.packs.cardPacks)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const packsPerPage = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const name = useSelector<AppRootStateType, string>(state => state.packs.name)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const totalPages = Math.ceil(cardPacksTotalCount / packsPerPage)
 
    const [activeModalAdd, setActiveModalAdd] = useState(false)
    const [inputValue, setInputValue] = useState(name)

    console.log('Packs ' + name)

    useEffect(() => {
        dispatch(setPacks())
    }, [dispatch])

    const openModalWindow = () => {
        setActiveModalAdd(true)
    }

    const allPacks = () => {
        console.log('All packs')
    }
    const myPacks = () => {
        console.log('My packs')
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
        dispatch(setPacks())
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
                    <SuperButton onClick={allPacks} disabled={status === "loading"}>All PACKS</SuperButton>
                    <SuperButton onClick={myPacks} disabled={status === "loading"}>MY PACKS</SuperButton>    
                </div>

                <SuperButton onClick={openModalWindow} disabled={status === "loading"}>ADD PACK</SuperButton>
            </div>

            

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