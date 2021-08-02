import {CardPacksDataType} from "../../../../../n3-dall/api/api_cards";
import {ChangeEvent, useState} from "react";
import SuperButton from "../../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import SuperInputText from "../../../u3-common/Super-Components/c1-SuperInputText/SuperInputText";

type PackPropsType = {
    pack: CardPacksDataType
    deletePacks: (id: string) => void
    updatePacks: (id: string, title: string) => void
}

export const Pack = (props: PackPropsType) => {

    const [updateValue, setUpdateValue] = useState(props.pack.name)

    const time = props.pack.created.slice(11, -8)
    const deletePacksHandler = () => {
        props.deletePacks(props.pack._id)
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateValue(e.currentTarget.value)
    }

    const updateTitleHandler = () => {
        props.updatePacks(props.pack._id, updateValue)
    }

    return (
        <>
            <td>{props.pack.user_name}</td>
            <td>{props.pack.name}</td>
            <td>{props.pack.cardsCount}</td>
            <td>{time}</td>
            <td><SuperButton>View</SuperButton></td>
            <td><SuperButton>Train</SuperButton></td>
            <td>
                <SuperButton onClick={updateTitleHandler}
                             disabled={props.pack.entityStatus === "loading"}>Update</SuperButton>
                <SuperInputText value={updateValue}
                                disabled={props.pack.entityStatus === "loading"}
                                onChange={changeTitleHandler}/>
            </td>
            <td>
                <SuperButton onClick={deletePacksHandler}
                             disabled={props.pack.entityStatus === "loading"}>Delete
                </SuperButton>
            </td>
        </>
    )
}