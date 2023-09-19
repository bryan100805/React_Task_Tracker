import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";

//Parsing in boolean/number type values need to be wrapped in {}
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  //Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    //Adding a new task to existing list of tasks
    setTasks([...tasks, data]);

    //UI assign random id to task
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  //Delete Task
  const deleteTask = async (id) => {
    //backend
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    //UI
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = async (id) => {
    //backend
    const taskToToggle = await fetchTask(id);
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updateTask),
    });

    const data = await res.json();

    //UI
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            //path is for the url
            path="/"
            //What is element for?
            //It is used to render a React element.
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Tasks To Show"
                )}
              </>
            }
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/task/:id" element={<TaskDetails />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

/* //Class based component
//Functional components cannot have "state" within them. 
So if your component needs to have a state, then go for
class based components. Refer Creating Components for more information.

import React from 'react';
import Header from './components/Header';

class App extends React.Component {	
  render(){
    return <h1>Hello World</h1>
  }
}

//React.createClass()
const SecondComponent = React.createClass({	
  render: function(){
    return(
      <div>{this.props.content}</div>
    );
  )
})

class ThirdComponent extends React.Component {
  render(){
    return(
      <div>{this.props.content}</div>
    );
  }
}
*/

export default App;
