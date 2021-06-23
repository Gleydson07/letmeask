import { useHistory } from 'react-router-dom'

import { auth, firebase } from '../services/firebase'

import { Button } from '../components/Button'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import logInImg from '../assets/images/log-in.svg'

import '../styles/home.scss'
import { useAuth } from '../components/context/AuthContext'

export function Home(){
    const { user, signInWithGoogle } = useAuth();
    const history = useHistory();

    async function handleCreateRoom(){
        if(!user){
            signInWithGoogle();
        }

        history.push('/rooms/new')
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
                        onClick={signInWithGoogle}
                    >
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator"> ou entre em uma sala</div>
                    <form action="" >
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
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