import Card from "../Layout/Card";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import Layout from "../layout/Layout";
import FilterTask from "./FilterTask";
import SortTask from "./SortTask";
import { useState } from "react";

const Tasks = (props) => {
  const [filterState, setFilterState] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [sortState, setSortState] = useState(false);
  const [sortValue, setSortValue] = useState("");

  function filtertHandler(val) {
    if (val) {
      setFilterState(true);
      setFilterValue(val);
    }
  }

  function sortHandler(val){
    if(val){
      console.log(val)
      setSortState(true);
      setSortValue(val)
    }

  }
  if (props.userTasks.length === 0) {
    return (
      <Layout>
        <Card>
          <div className="container">
            <div className="row m-1 p-4">
              <div className="col">
                <div className="p-1 h2 text-primary text-center mx-auto display-inline-block">
                  <u>No Tasks</u>
                </div>
              </div>
            </div>
            <AddTask />
          </div>
        </Card>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Card>
          <div className="container">
            <div className="row m-1 p-4">
              <div className="col">
                <div className="p-1 h2 text-primary text-center mx-auto display-inline-block">
                  <u>My Tasks</u>
                </div>
              </div>
            </div>
            <AddTask />
            <div className="p-2 mx-4 my-4 border-black-25 border-bottom"></div>

            <div className="row justify-content-center justify-content-lg-end gx-3 gy-5">
              <FilterTask onSelect={filtertHandler} />
              <SortTask onSelect = {sortHandler} />
            </div>

            {filterState &&
              props.userTasks
                .filter((userTask) =>
                  filterValue === "Active Tasks"
                    ? userTask.checked === false
                    : filterValue === "Completed tasks"
                    ? userTask.checked === true
                    : userTask
                )
                .map((filteredTask) => (
                  <TaskItem
                    key={filteredTask._id}
                    id={filteredTask._id}
                    taskTitle={filteredTask.task}
                    taskDate={filteredTask.date}
                    isChecked={filteredTask.checked}
                  />
                ))}

            {!filterState &&
              props.userTasks.map((userTask) => (
                <TaskItem
                  key={userTask._id}
                  id={userTask._id}
                  taskTitle={userTask.task}
                  taskDate={userTask.date}
                  isChecked={userTask.checked}
                />
              ))}
          </div>
        </Card>
      </Layout>
    );
    s;
  }
};

export default Tasks;
