import "./FormInput.css";

const FormInput = (props) => {
    const { label, name, type, value, onChange, errorMessage, placeholder, readOnly } = props;
    return (
        <div className='formInput'>
            <label>{label}</label>
            <input onChange={onChange} placeholder={placeholder} readOnly={readOnly} name={name}/> 
            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;

