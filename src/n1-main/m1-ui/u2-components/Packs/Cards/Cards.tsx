import c from './Cards.module.css';
import SuperButton from "../../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/store/redux-store";
import {StatusType} from "../../../u1-app/app-reducer";
import {useEffect, useState} from "react";
import {Toaster} from "react-hot-toast";
import {Preloader} from "../../../u3-common/Super-Components/c7-Preloader/Preloader";
import {NavLink, useParams} from "react-router-dom";
import {getCards} from './cards-reducer';
import {CardDataType} from '../../../../../n3-dall/api/api_cards';
import {CreateCardModalWindow} from "../../../u3-common/ModalWindow/CreateCards/CreateCardModalWindow";

export const Cards = () => {

    const dispatch = useDispatch()
    const [activeModalAdd, setActiveModalAdd] = useState(false)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const cards = useSelector<AppRootStateType, Array<CardDataType>>(state => state.cards.cards)
    const userCardID = useSelector<AppRootStateType, string>(state => state.cards.cards[0]?.user_id)
    const userLoginID = useSelector<AppRootStateType, string>(state => state.login.profile._id)
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        dispatch(getCards(id))
    }, [dispatch, id])

    const openModalWindow = () => {
        setActiveModalAdd(true)
    }

    const copyCards = cards.map(el => {
            const update = new Date(el.updated).toLocaleDateString(['ban', 'id'])
            return <tbody key={el._id}>
            <tr>
                <td>{el.question}</td>
                <td>{el.answer}</td>
                <td>{update}</td>
                <td>{el.grade}</td>
                <td>
                    {userLoginID !== el.user_id
                        ? null
                        : <>
                            <span
                                style={{fontSize:'1.1em'}}
                                className={c.link}
                                onClick={() => alert('delete')}>
                        🧺
                    </span>
                            <span
                                style={{fontSize:'1.1em'}}
                                className={c.link}
                                onClick={() => alert('update')}>
                        🔄
                    </span>
                        </>
                    }
                </td>
            </tr>
            </tbody>
        }
    )

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


            <SuperButton
                className={c.addCardButton}
                onClick={openModalWindow}
                disabled={status === "loading" || userCardID !== userLoginID}>Add Card
            </SuperButton>

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
        </div>
    )
}