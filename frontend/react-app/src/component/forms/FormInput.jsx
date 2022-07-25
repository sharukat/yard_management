import "./FormInput.css";

const FormInput = (props) => {
    const { id, label, value, name, type, onChange, errorMessage, placeholder, readOnly, labelClassName, inputClassName } = props;
    return (
        <div className="formInput">
            <label className={labelClassName}>{label}</label>
            <input id={id} value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly} name={name} type={type} className={inputClassName}/> 
            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;

