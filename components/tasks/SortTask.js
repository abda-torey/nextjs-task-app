import classes from './addTask.module.css';

function SortTask(props){
    return (
        <div className="col-md-3">
            
        <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
          >
            <option value = "0" selected>Sort</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          
        </div>
    )
}

export default SortTask;