import { useState, useEffect } from 'react'
import './App.css'

function App() {

    const [toDo, setToDo] = useState([]);
    const [type, setType] = useState('📚')
    const [currTask, setCurrTask] = useState('');

    var updateId = -1
    var updateType = ''
    var upTask = ''

    const [upId, setUpId] = useState(-1)

    function Add() {
        setToDo(toDo => [...toDo, { 'title': currTask, 'type': type, 'id': toDo.length }])
        setCurrTask('')
    }

    function deleteAll() {
        localStorage.setItem('tasks', ([]))
        setToDo([])
    }

    function deleteTask(id) {
        // alert(id)

        const temp = [...toDo]

        temp.map((task, index) => {
            if (id == task.id) {
                temp.splice(index, 1)
                setToDo(temp)
            }
        })
    }

    function updateTask(id, title, type) {
        setCurrTask(title)
        setType(type)

        console.log('id-> ' + id + ' title-> ' + title + ' type-> ' + type)
        // updateId = id
        // upTask = title
        // updateType = type

        setUpId(id)
        // console.log('up wala id-> ' + updateId + ' title-> ' + upTask + ' type-> ' + updateType)

        // let temp = [...task]

        // temp.map( (task , index) =>{
        //     if(id == task.id){
        //         // temp.splice(index , 1)
        //         // setToDo(temp)
        //         temp[index].task = currTask
        //         temp[index].type = type

        //         setToDo(temp)
        //     }
        // })
    }

    function taskUpdate() {
        let temp = [...toDo]
        let id = upId
        temp.map( (task , index) =>{
            if(id == task.id){
                // temp.splice(index , 1)
                // setToDo(temp)
                temp[index].title = currTask

                console.log(currTask)
                temp[index].type = type

                setToDo(temp)
            }
        })
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
                            <input type="text" placeholder='Add task' className="form-control" onChange={(e) => { setCurrTask(e.target.value) }} value={currTask} />
                        </div>

                        <select className="form-select mb-3" onChange={(e) => { setType(e.target.value) }} aria-label="Default select example" value={type}>
                            <option value="📚"> Genral 📚 </option>
                            <option value="🎒">Study 🎒</option>
                            <option value="🏡">Home 🏡</option>
                            <option value="👦">Self 👦</option>
                        </select>

                        {/* <h3> {type} </h3> */}
                        <div className="d-grid gap-2">
                            <button className='btn btn-success mt-2' onClick={Add}  >Add</button>
                            <button className="btn btn-primary mt-2" onClick={taskUpdate} >Update Task</button>
                            <button className="btn btn-danger mt-2" onClick={deleteAll} >Delte all Tasks</button>
                        </div>
                    </div>

                    <div className="col-md-6 ">
                        <h3 className="text-center mt-5 mb-5">Here are yours tasks that need to be completed</h3>
                        <div>
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
                                            <h3 key={task} className='ms-2' >
                                                <i className="fas fa-trash icon" onClick={() => { deleteTask(task.id) }}></i> {" "}
                                                <i className="fas fa-pen-square icon" onClick={() => { updateTask(task.id, task.title, task.type) }} ></i>
                                                {task.type + " " + task.title} {" "}
                                            </h3>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App