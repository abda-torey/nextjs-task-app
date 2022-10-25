import { useState, useRef, forwardRef } from "react";
import { Calendar2, Pencil, Trash } from "react-bootstrap-icons";
import { Form, InputGroup, Button, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import FilterTask from "./FilterTask";
import SortTask from "./SortTask";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./addTask.module.css";
import { getSession } from "next-auth/react";

async function addData(taskName, taskDate, userEmail) {
  const response = await fetch("/api/tasks/addTask", {
    method: "POST",
    body: JSON.stringify({ taskName, taskDate, userEmail }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "could not add task");
  }

  return data;
}

function AddTask(props) {
  const [startDate, setStartDate] = useState(new Date());
  const taskInputRef = useRef();
  const [isLoading, setisLoading] = useState(false);
  const CalendarInput = forwardRef(({ value, onClick }, ref) => (
    <Calendar2 onClick={onClick} ref={ref} />
  ));

  async function submitHandler() {
    setisLoading(true);
    console.log(startDate);
    console.log(taskInputRef.current.value);
    const session = await getSession();

    const email = session.user.email;
    try {
      const response = await addData(
        taskInputRef.current.value,
        startDate,
        email
      );
      setisLoading(false);
      console.log(response);
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  }

  return (
    <section>
      <div className="container">
        <div className="row m-1 p-3">
          <div className="col col-11 mx-auto">
            <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
              <div className="col">
                <input
                  className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                  type="text"
                  placeholder="Add new .."
                  ref={taskInputRef}
                />
              </div>
              <div className="col-auto m-0 px-2 d-flex align-items-center w-">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  startDate={startDate}
                  customInput={<CalendarInput />}
                />
              </div>
              <div className="col-auto px-0 mx-0 mr-2">
                {!isLoading && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitHandler}
                  >
                    Add
                  </button>
                )}

                {isLoading && 
                  <button type="button" className="btn btn-primary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </button>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 mx-4 my-4 border-black-25 border-bottom"></div>

        <div className="row justify-content-center justify-content-lg-end gx-3 gy-5">
          <FilterTask />
          <SortTask />
        </div>
      </div>
    </section>
  );
}
export default AddTask;
