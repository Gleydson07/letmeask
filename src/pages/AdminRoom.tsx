import { useParams } from 'react-router-dom'

import { useAuth } from '../components/hooks/useAuth'
import { useRoom } from '../components/hooks/useRoom'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

import logoImg from '../assets/images/logo.svg'

import '../styles/room.scss'
import { database } from '../services/firebase'

type RoomParams = {
    id: string
}

export default function AdminRoom(){
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions} = useRoom(roomId)

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                {questions.map(question => (
                    <Question 
                        key={question.id}
                        content={question.content}
                        author={question.author}
                    />
                ))}
            </main>
        </div>
    )
}