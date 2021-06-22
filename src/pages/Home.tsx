import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import logInImg from '../assets/images/log-in.svg'

import styles from '../styles/auth.module.scss'

export function Home(){
    return (
        <div className={styles.container}>
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo.</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div>
                    <img src={logoImg} alt="Letmeask" />
                    <button>
                        <img src={googleIconImg} alt="Logo do Google" />
                        <span>Crie sua sala com o Google</span>
                    </button>
                    <div className={styles.separator}> ou entre em uma sala</div>
                    <form action="" >
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                        />
                        <button 
                            type="submit"
                        >
                            <img src={logInImg} alt="" />
                            Entrar na sala
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}