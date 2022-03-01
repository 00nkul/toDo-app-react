import { useState, useEffect } from 'react'
import './App.css'

function App() {

    const [toDo, setToDo] = useState([]);
    const [type, setType] = useState('📚')
    const [currTask, setCurrTask] = useState('');

    function Add() {
        setToDo(toDo => [...toDo, { 'title': currTask, 'type': type }])
        setCurrTask('')
    }

    function deleteAll() {
        localStorage.setItem('tasks', ([]))
        setToDo([])
    }

    useEffect(() => {
        if (localStorage.getItem('tasks')) {
            setToDo(JSON.parse(localStorage.getItem('tasks')))
        }
    }, []);



    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(toDo))
    }, [toDo]);


    return (
        <>
            <div className='container' >
                <h1 className='text-center mt-5'> ✨✨ To Do App ✨✨ </h1>

                <div className="row">
                    <div className="col-md-6 mt-5">
                        <h3 className="text-center">Add Tasks</h3>

                        <div className="mb-3 mt-4">
                            <input type="text" className="form-control" onChange={(e) => { setCurrTask(e.target.value) }} value={currTask} />
                        </div>

                        <select className="form-select mb-3" onChange={(e) => { setType(e.target.value) }} aria-label="Default select example">
                            <option value="📚"> Genral 📚 </option>
                            <option value="🎒">Study 🎒</option>
                            <option value="🏡">Home 🏡</option>
                            <option value="👦">Self 👦</option>
                        </select>

                        {/* <h3> {type} </h3> */}
                        <div className="d-grid gap-2">
                            <button className='btn btn-success mt-2' onClick={Add}  >Add</button>
                            <button className="btn btn-danger mt-2" onClick={deleteAll} >Delte all Tasks</button>
                        </div>
                    </div>

                    <div className="col-md-6 ">
                        <h3 className="text-center mt-5 mb-5">Here are yours tasks that need to be completed</h3>
                        <ul>
                            {
                                toDo.map((task) => {

                                    let cardCls = ''
                                    switch (task.type) {
                                        case '📚':
                                            cardCls = 'genral'
                                            break;
                                        case '🎒':
                                            cardCls = 'study'
                                            break;
                                        case '🏡':
                                            cardCls = 'home'
                                            break
                                        case '👦':
                                            cardCls = 'self'
                                            break

                                    }
                                    return (
                                        <div className={`task-card ${cardCls} `} >
                                            <li key={task} className='ms-2' >
                                                {task.type + " " + task.title}
                                            </li>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App