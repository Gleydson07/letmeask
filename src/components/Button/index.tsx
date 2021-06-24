import {ButtonHTMLAttributes} from 'react'
import '../../styles/button.scss'

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
}

export function Button({isOutlined = false, ...props}: IButtonProps){
    return (
        <button 
            className={`button ${isOutlined ? 'outlined' : ''}`} 
            {...props}
        />
    )
}