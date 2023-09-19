import { useState, useEffect } from "react";
import {
  useParams,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Button from "./Button";

const TaskDetails = () => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  const [error, setError] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:5000/tasks/${params.id}`);
        const data = await res.json();

        if (res.status === 404) {
          navigate("/");
        }

        if (data) {
          setTask(data);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTask();
  }, [params.id]);

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <p>{pathname}</p>
      <h1>{task.text}</h1>
      <p>{task.day}</p>
      <Button
        onClick={() => {
          // navigate("/") same as navigate(-1)
          navigate(-1);
        }}
        text="Go Back"
      />
    </div>
  );
};

export default TaskDetails;
