import React, { useContext, useReducer } from 'react';
import TaskContext from '../Context/TaskContext';
import { formatDate } from '../Helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Popup from '../component/Popup';

const reducer = (state,action) => {
    switch (action.type) {
        case "view":return{actionType:"view", data: action.payload }
        case "edit":return{actionType:"edit", data: action.payload }
        case "delete":return{actionType:"delete", data: action.payload }
        default: return state;
    }
}

function TaskList(props) {

    const { allTasks } = useContext(TaskContext);
    const [state, dispatch] = useReducer(reducer, null);
    return (
        <div className='container py-5'>
            <div className='bg-primary p-4'>
                <table className='table table-dark'>
                    <thead>
                        <tr>
                            <th>sr.No.</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>DueDate</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                allTasks?.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{formatDate(item.duedate)}</td>
                                        <td>
                                            <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=> dispatch({ type: "view" , payload: item })}> <FontAwesomeIcon  icon={faEye} /> </span>
                                            <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=> dispatch({ type: "edit" , payload: item })}> <FontAwesomeIcon  icon={faPenToSquare} /> </span>
                                            <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal"  onClick={()=> dispatch({ type: "delete" , payload: item })}> <FontAwesomeIcon  icon={faTrash} /> </span>
                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>
                   
                </table>

            </div>

            <div className='modal' tabIndex=" -1" id='task-modal'>
                <div className='modal-dialog'>
            {
                state ?
            <Popup actionType={state.actionType} data={state.data} /> : ""
            }
            </div>
            </div>

        </div>
    );
}

export default TaskList;







