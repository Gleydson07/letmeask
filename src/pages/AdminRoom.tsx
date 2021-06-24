import { useParams, useHistory } from 'react-router-dom'

import { useRoom } from '../components/hooks/useRoom'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import '../styles/room.scss'
import { database } from '../services/firebase'

type RoomParams = {
    id: string
}

export default function AdminRoom(){
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions} = useRoom(roomId);
    const history = useHistory()

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push(`/`);
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
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
                    >
                        <button
                            type="button"
                            onClick={() => handleDeleteQuestion(question.id)}
                        >
                            <img src={deleteImg} alt="Remover pergunta" />
                        </button>
                    </Question>
                ))}
            </main>
        </div>
    )
}