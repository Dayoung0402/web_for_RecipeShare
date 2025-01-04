import {ChangeEvent,KeyboardEvent, forwardRef} from 'react';
import './style.css';
import React from 'react';

//          interface: InputBox 컴포넌트 Properties          //
interface Props {
    label : string;
    type: 'text' | 'password';
    placeholder: string;
    error: boolean;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    icon? : 'eye-light-off-icon' | 'eye-light-on-icon';

    onButtonClick?: () => void;

    message?: string;

    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

//          component: InputBox 컴포넌트          //
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    
    //          state: properties          //
    const{label, type, placeholder,value, error, icon, message} = props;
    const{onChange, onButtonClick,onKeyDown} = props;

    //          event hadler:input 값 변경 이벤트 처리 함수          //
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(!onKeyDown) return;
        onKeyDown(event);
    };
    
    
    //          reder : InputBox 컴포넌트          //
    return(
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
                <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler} />
                {onButtonClick !== undefined && 
                    <div className='icon-button' onClick={onButtonClick}>
                        {icon !== undefined && <div className={'icon ${icon}'} /> }
                    </div>
                }
            </div>
            {message !== undefined && (<div className='inputbox-message'>{message}</div>)}
            <div className='inputbox-message'></div>
        </div>
    )

});

export default InputBox;