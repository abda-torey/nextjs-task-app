import classes from './MainPage.module.css';

const MainPage = (props) => {
    return <div className={classes.wrapper}>
        {props.children}
    </div>
}

export default MainPage;