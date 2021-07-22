import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import s from '../../../h4/common/c3-SuperCheckbox/SuperCheckbox.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: string[]
    onChangeOption?: (option: string) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeOption && onChangeOption(e.currentTarget.value)
    }


    const mappedOptions: JSX.Element[] = options ? options.map((el, i) => ( // map options with key
        <label key={`${name}-${i}`}>
            <input
                type={'radio'}
                name={name}
                checked={el === value}
                value={el}
                onChange={onChangeCallback}
                className={s.checkbox}
                {...restProps}
            />
            {el}
        </label>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}

export default SuperRadio
