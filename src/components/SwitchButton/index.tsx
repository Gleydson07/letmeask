import {TiWeatherNight, TiWeatherSunny} from 'react-icons/ti'

import '../../styles/switch.scss'
import { useTheme } from '../hooks/useTheme';

export function SwitchButton(){
    const { theme, handleToogleTheme } = useTheme();
    return (
        <button className={`switch ${theme === "light" ? "switch-dark" : ''}`} onClick={() => handleToogleTheme()}>
            {theme==="light" ? (<TiWeatherNight/>) : (<TiWeatherSunny/>)}
        </button>
    )
}