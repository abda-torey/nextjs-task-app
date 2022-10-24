import Card from "../Layout/Card";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import Layout from "../layout/Layout";

const Tasks = (props) => {
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
       <TaskItem />
      </div>
    </Card>
    </Layout>
  );
};

export default Tasks;
