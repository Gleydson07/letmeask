import {ButtonHTMLAttributes} from 'react'
import styles from './button.module.scss'

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: IButtonProps){
    return (
        <button className={styles.button} {...props}/>
    )
}