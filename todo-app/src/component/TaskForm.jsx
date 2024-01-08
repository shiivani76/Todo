import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import TaskContext from '../Context/TaskContext';




function TaskForm(props) {
    const init = {
        title: "",
        description: "",
        duedate: ""
    }

    const [formData, setFormData] = useState(init);
    const { message, setMessage, user } = useContext(AuthContext);
    const { saveTask, isCreated, updateTask } = useContext(TaskContext);
    const { isUpdate, data, updateCancel, closeBtn, isPopup } = props;

    useEffect(() => {
        if (data && isUpdate) {
            setFormData(data);
        }
    }, [data, isUpdate])

    useEffect(() => {
        setMessage("");
    },)

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (user) {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                userId: user.id,
                modifiedOn: Date()
            }))
        }
    }
    const onCreate = (e) => {
        e.preventDefault();
        saveTask(formData);
    }

    const onUpdate = (e) => {
        e.preventDefault();
        updateTask(formData);
    }

    const onCancel = (e) => {
        e.preventDefault();
        if(isPopup) {
            closeBtn.current.click();
        } else {
        setUpdate(false);
        setFormData(init);
        }

        

    }

    useEffect(() => {
        if (isCreated) {
            setFormData(init);
        }
    }, [isCreated])


    return (
        <div className='w-50'>
            <h3 className='text-white'>{isUpdate ? "Update Task" : "Create Task"}</h3>

            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className='form-label'>Title</label>
                            <input type="text" className='form-control' name='title' onChange={handleChange} value={formData?.title} />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' name="description" onChange={handleChange} value={formData?.description}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Date</label>
                            <input type="datetime-local" className='form-control' name='duedate' onChange={handleChange} value={formData?.duedate} />
                        </div>

                        <p className='mb-2'>{message}</p>

                        {
                            isUpdate ?
                                <>
                                    <button className='btn btn-primary' onClick={onUpdate}>Update Task</button>
                                    <button className='btn btn-warning ms-2' onClick={onCancel}>Cancel</button>
                                </>
                                :
                                <button className='btn btn-primary' onClick={onCreate}>Create Task</button>
                        }


                    </form>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;