import { useParams, useHistory } from 'react-router-dom'

import { useRoom } from '../components/hooks/useRoom'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'
import { SwitchButton } from '../components/SwitchButton'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import { IoExitOutline } from 'react-icons/io5'

import '../styles/room.scss'
import { database } from '../services/firebase'
import { useAuth } from '../components/hooks/useAuth'

type RoomParams = {
    id: string
}

export default function AdminRoom(){
    const {signOut} = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions} = useRoom(roomId);

    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        });
    }

    async function handleHighlightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        });
    }

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push(`/rooms/new`);
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <SwitchButton />
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                        <button className="user-exit" onClick={() => signOut()}>
                            <IoExitOutline/>
                        </button>
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
                        isAnswered={question.isAnswered}
                        isHighlighted={question.isHighlighted}
                    >
                        {!question.isAnswered  && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                >
                                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleHighlightQuestion(question.id)}
                                >
                                    <img src={answerImg} alt="Destacar pergunta" />
                                </button>
                            </>
                        )}

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