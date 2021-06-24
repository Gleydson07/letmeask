import { FormEvent, useState } from 'react'
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

export default function Room(){
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions} = useRoom(roomId)
    const [newQuestion, setNewQuestion] = useState('');

    async function handleSendNewQuestion(event: FormEvent){
        event.preventDefault();

        if(newQuestion.trim() === ""){
            return
        }

        if(!user){
            throw new Error("You must be logged in")
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        };
        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId}/>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={(e) => handleSendNewQuestion(e)}>
                    <textarea 
                        placeholder=" O que você quer perguntar?"
                        onChange={(e) => setNewQuestion(e.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
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