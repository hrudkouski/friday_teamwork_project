import {useState} from "react";
import SuperInputText from "../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../n1-main/m1-ui/u3-common/Super-Components/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../n1-main/m1-ui/u3-common/Super-Components/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../n1-main/m1-ui/u3-common/Super-Components/c5-SuperSelect/SuperSelect";

const arr = ['x', 'y', 'z']


export const Test = () => {
    const [value, setValue] = useState<string>('')
    const [selections, onChangeOption] = useState(arr[1])

    return (
        <>
            <SuperInputText/>
            <SuperCheckbox/>
            <SuperButton>
                Click here
            </SuperButton>
            <SuperEditableSpan
                value={value}
                onChangeText={setValue}
                spanProps={{children: value ? undefined : 'enter text...'}}
            />
            <SuperSelect
                options={arr}
                value={selections}
                onChangeOption={onChangeOption}
            />
        </>
    )
}