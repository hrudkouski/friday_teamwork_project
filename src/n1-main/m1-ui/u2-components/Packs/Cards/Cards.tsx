import c from './Cards.module.css';
import SuperButton from "../../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/store/redux-store";
import {StatusType} from "../../../u1-app/app-reducer";
import {useEffect, useState} from "react";
import {Toaster} from "react-hot-toast";
import {Preloader} from "../../../u3-common/Super-Components/c7-Preloader/Preloader";
import {NavLink, useParams} from "react-router-dom";
import {getCards, setCardsCurrentPageAC} from './cards-reducer';
import {CardDataType} from '../../../../../n3-dall/api/api_cards';
import {CreateCardModalWindow} from "../../../u3-common/ModalWindow/CreateCard/CreateCardModalWindow";
import {Card} from "./Card/Card";
import {PaginationComponent} from "../../../u3-common/Pagination/Pagination";

export const Cards = () => {

    const dispatch = useDispatch()
    const [activeModalAdd, setActiveModalAdd] = useState(false)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const cards = useSelector<AppRootStateType, Array<CardDataType>>(state => state.cards.cards)

    const userCardID = useSelector<AppRootStateType, string>(state => state.cards.cards[0]?.user_id)
    const userLoginID = useSelector<AppRootStateType, string>(state => state.login.profile._id)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const packsPerPage = useSelector<AppRootStateType, number>(state => state.cards.pageCount)
    const totalPages = Math.ceil(cardsTotalCount / packsPerPage)
    const page = useSelector<AppRootStateType, number>(state => state.cards.page)
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        dispatch(getCards(id))
    }, [dispatch, id, page])

    const openModalWindow = () => setActiveModalAdd(true)

    const copyCards = cards.map(el => <tbody key={el._id}>
    <Card card={el} packID={id}/>
    </tbody>)

    const handlePageChange = (e: { selected: number }) => {
        const selectedPage = e.selected + 1;
        dispatch(setCardsCurrentPageAC(selectedPage))
    };

    return (
        <div className={c.cards}>
            <div><Toaster/></div>
            {status === "loading" && <Preloader/>}

            {activeModalAdd && <CreateCardModalWindow
                activeModalAdd={activeModalAdd}
                setActive={setActiveModalAdd}
            />}

            <div className={c.backLink}>
                <NavLink
                    className={c.link}
                    to={'/packList'}>
                    🔙Go to Packs
                </NavLink>
            </div>

            <h2>Cards</h2>

            {
                userCardID !== userLoginID
                    ? null
                    : <SuperButton
                        className={c.addCardButton}
                        onClick={openModalWindow}
                        disabled={status === "loading"}>Add Card
                    </SuperButton>
            }

            {
                !cards.length
                    ? <div className={c.titleNoCards}>
                        <span className={c.monkey}>🐒</span>
                        <span>Oops...</span>
                        <span>There are no cards in this pack...</span>
                    </div>
                    : <table>
                        <thead>
                        <tr>
                            <th>QUESTION</th>
                            <th>ANSWER</th>
                            <th>LAST UPDATE</th>
                            <th>GRADE</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>
                        {copyCards}
                    </table>
            }

            {
                cardsTotalCount < 5
                    ? null
                    : <PaginationComponent
                        handlePageChange={handlePageChange}
                        totalPages={totalPages}/>
            }
        </div>
    )
}