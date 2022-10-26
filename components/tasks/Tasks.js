import Card from "../Layout/Card";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import Layout from "../layout/Layout";

const Tasks = (props) => {
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
            {props.userTasks.map((userTask) => (
              <TaskItem
                key = {userTask._id}
                id = {userTask._id}
                taskTitle={userTask.task}
                taskDate={userTask.date}
                isChecked={userTask.checked}
              />
            ))}
          </div>
        </Card>
      </Layout>
    );s
  }
};

export default Tasks;
