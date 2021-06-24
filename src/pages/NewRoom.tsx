import { FormEvent, useState } from 'react'
import { Button } from '../components/Button'

import {database} from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import logInImg from '../assets/images/log-in.svg'

import { Link, useHistory } from 'react-router-dom'

import '../styles/newRoom.scss'
import { useAuth } from '../components/hooks/useAuth'

export default function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const [room, setRoom] = useState('');

    async function submitCreateRoom(event: FormEvent){
        event.preventDefault();
        
        if(room.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: room,
            authorId: user?.id
        });
        const { key } = firebaseRoom;

        history.push(`/rooms/${key}`)

    }

    return(
        <div className="container">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo.</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div>
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={(e) => submitCreateRoom(e)} >
                        <input 
                            value={room}
                            onChange={e => setRoom(e.target.value)}
                            type="text" 
                            placeholder="nome da sala"
                        />
                        <Button 
                            type="submit"
                        >
                            <img src={logInImg} alt="icon" />
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}