import { Trash } from "react-bootstrap-icons";

function TaskItem(props){
  return (
    <div className="row my-5">
      <div className="col-1">
        <input type="checkbox" value="" id="flexCheckChecked" checked />
      </div>
      <div className="col-7">
        <input
          type="text"
          className="form-control  border-0  bg-transparent rounded px-3"
          readOnly
          value="Buy groceries for next week"
          title="Buy groceries for next week"
        />
      </div>
      <div className="col-3">
        <h6>25 Sep 2022</h6>
      </div>
      <div className="col-1">
        <Trash />
      </div>
    </div>
  );
};

export default TaskItem;
