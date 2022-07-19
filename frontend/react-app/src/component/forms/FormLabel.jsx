import "./FormLabel.css";

const FormLabel = (props) => {
    const { heading, value, classValue, title } = props;
    return (
        <div className='formLabel'>
            <div className="heading">{heading}</div>
            <div className="labelBorder">{value}</div> 
        </div>
    );
};

export default FormLabel;