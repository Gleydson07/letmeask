import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../components/hooks/useAuth'
import { Button } from '../components/Button'

import {database} from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import logInImg from '../assets/images/log-in.svg'


import '../styles/home.scss'

export function Home(){
    const { user, signInWithGoogle } = useAuth();
    const history = useHistory();
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle();
        }        
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();
        if(roomCode.trim() === ''){
            return
        }
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists');
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room already closed.');
            return
        }

        history.push(`/rooms/${roomCode}`)        
    }

    return (
        <div className="container">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo.</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button
                        className="create-room"
                        onClick={handleCreateRoom}
                    >
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator"> ou entre em uma sala</div>
                    <form onSubmit={(e) => handleJoinRoom(e)} >
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                        />
                        <Button 
                            type="submit"
                        >
                            <img src={logInImg} alt="" />
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}