import { Button } from '../components/Button'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import logInImg from '../assets/images/log-in.svg'

import { Link } from 'react-router-dom'

import '../styles/newRoom.scss'

export default function NewRoom() {
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
                    <form action="" >
                        <input 
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