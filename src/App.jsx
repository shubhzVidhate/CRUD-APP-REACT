import { useState } from 'react';
import toast from 'react-hot-toast';

function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    
    if( editIndex !== null ){
      const updateTaskItem  = [...tasks];
      updateTaskItem[editIndex] = task;
      setTasks(updateTaskItem);
      setEditIndex(null);
      setTask('');
      toast.success('Task updated successfully!');  
    }else{
      setTasks([...tasks, task.toLowerCase()]);
      toast.success('Task Added successfully!');  
      setTask('');
      setEditIndex(null);
    }
  };


  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter( (item,ind) => ind !== index);
    console.log(newTasks);
    setTasks(newTasks);
    setEditIndex(null);
    toast.error('Task deleted successfully!');
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setTask([tasks[index]]);
  };

  return (
    
    <div className='mx-auto w-100 my-5 border-2 border-green-600'>
      <div className='mb-4 text-2xl font-bold'>
        <h1 className='bg-green-600 text-white py-3 px-3'> CRUD APP</h1>
      </div>
      
      <form onSubmit={handleAdd}>
       <div className='flex justify-center items-center mb-5 mx-3 gap-1'>
         <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className='border-1 border-green-600 rounded-sm py-2 px-2 w-100'
        />
        <button type="submit" className='bg-green-600 text-white p-2 rounded-sm px-3'>    
          {editIndex !== null ? 'UPDATE' : 'ADD'}
        </button>
       </div>
      </form>

      <div className=' px-2 py-2  w-100'>
        {tasks.map((task, index) => (
          <div
            key={index} 
            className='flex justify-between items-center border-1 border-green-600 rounded-sm px-3 py-2 mb-2'
          >
            {task.toUpperCase()}
            <div className='flex justify-between items-center gap-1'>
              <button onClick={() => handleEditTask(index)} className='bg-green-600 text-white p-1 rounded-sm px-2 hover:bg-green-700'>
                EDIT
              </button>
              <button onClick={() => handleDeleteTask(index)} className='bg-red-600 text-white p-1 rounded-sm px-2 hover:bg-red-700'>
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;