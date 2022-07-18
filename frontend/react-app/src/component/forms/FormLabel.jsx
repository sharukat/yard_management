import "./FormLabel.css";
import { Grid } from "@mui/material";

const FormLabel = (props) => {
    const { heading, value, classTitle, classValue } = props;
    return (
        <div className='formLabel'>
            <div className={classTitle}>{heading}</div>
            <div className="middle">:</div>
            <div className={classValue}>{value}</div> 
        </div>
    );
};

export default FormLabel;