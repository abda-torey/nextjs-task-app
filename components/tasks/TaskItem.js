import { Router, Trash } from "react-bootstrap-icons";
import moment from 'moment';
import { useRef } from "react";
import { useRouter } from "next/router";





function TaskItem(props){

  const checkedRef = useRef();
  const router = useRouter();
  const isChecked = props.isChecked;
  

  

  // console.log(checkedRef.current.checked);

  async function checkBoxHandler(e){
    const isChecked = e.target.checked;
  
    const taskId = props.id;
    
    

    const response = await fetch('/api/tasks/updateChekbox',{
      method: 'PATCH',
      body : JSON.stringify({taskId,isChecked}),
      headers : {
        'Content-Type':'application/json'
      }
    });

    const data = await response.json();
    if(!response.ok){
      console.log(data.error)
    }

    router.replace(router.asPath);

    console.log(data);

  }

  

  return (
    <div className="row my-5">

      <div className="col-1 mt-2">
        <input type="checkbox" defaultChecked = {props.isChecked} id="flexCheckChecked" onChange={checkBoxHandler}/>
      </div>
      <div className="col-7">
        <input
          type="text"
          className="form-control  border-0  bg-transparent rounded px-3"
          readOnly
          value={props.taskTitle}
          title="Buy groceries for next week"
        />
      </div>
      <div className="col-3">
        <h6>{ moment(props.taskDate).format('Do MMM YYYY')}</h6>
      </div>
      <div className="col-1">
        <Trash />
      </div>
    </div>
  );
};

export default TaskItem;
