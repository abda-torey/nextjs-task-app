import classes from "./addtask.module.css";
function FilterTask(props){

  function selectChangeHandler(e){
    
    const selectedtext = e.target.options[e.target.value].text;

    props.onSelect(selectedtext);
  }

  return (
    <div className="col-md-3 form-inline">
      <select
        className="form-select"
        id="floatingSelect"
        aria-label="Floating label select example"
        onChange={selectChangeHandler}
        defaultValue = {'DEFAULT'}
      >
        <option value="DEFAULT" disabled>Filter</option>
        <option value="1">Show All Tasks</option>
        <option value="2">Active Tasks</option>
        <option value="3">Completed tasks</option>
      </select>
    </div>
  );
};

export default FilterTask;
