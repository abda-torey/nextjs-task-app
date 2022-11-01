import { Router, Trash } from "react-bootstrap-icons";
import moment from "moment";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./TaskItem.module.css";

function TaskItem(props) {
  const checkedRef = useRef();
  const router = useRouter();
  const [isDeleteing, setIsDeleting] = useState(false);
  const isChecked = props.isChecked;

  // console.log(checkedRef.current.checked);

  async function checkBoxHandler(e) {
    const isChecked = e.target.checked;

    const taskId = props.id;

    const response = await fetch("/api/tasks/updateChekbox", {
      method: "PATCH",
      body: JSON.stringify({ taskId, isChecked }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      console.log(data.error);
    }

    router.replace(router.asPath);

    console.log(data);
  }
  async function deleteHandler() {
    const taskId = props.id;
    setIsDeleting(true);
    const response = await fetch("/api/tasks/deleteTask", {
      method: "DELETE",
      body: JSON.stringify({ taskId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
    }
    setIsDeleting(false);
    console.log(data);
    router.replace(router.asPath);
  }

  return (
    <div className="row my-5">
      <div className="col-1 mt-2">
        <input
          type="checkbox"
          defaultChecked={props.isChecked}
          id="flexCheckChecked"
          onChange={checkBoxHandler}
        />
      </div>
      <div className="col-7 ">
        <input
          type="text"
          className={!isChecked ? classes.input : classes.taskDone}
          readOnly
          value={props.taskTitle}
          title="Buy groceries for next week"
        />
      </div>
      <div className="col-3">
        <h6>{moment(props.taskDate).format("Do MMM YYYY")}</h6>
      </div>
      {isDeleteing && (
        <div className="col-1">
          <div className="spinner-border spinner-border-sm text-danger " role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      {!isDeleteing && (
        <div className="col-1">
          <Trash onClick={deleteHandler} className={classes.trash} />
        </div>
      )}
    </div>
  );
}

export default TaskItem;
