import classes from './addTask.module.css';

function SortTask(props){
  function sortChangeHandler(e){
    const selectedtext = e.target.options[e.target.value].text;

    props.onSelect(selectedtext);
    
  }
    return (
        <div className="col-md-3">
            
        <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            defaultValue = {'DEFAULT'}
            onChange = {sortChangeHandler}
          >
            <option value = "DEFAULT" disabled>Sort</option>
            <option value="1">Newest</option>
            <option value="2">Oldest</option>
           
          </select>
          
        </div>
    )
}

export default SortTask;