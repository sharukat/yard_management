import "./FormInput.css";

const FormInput = (props) => {
    const { label, name, type, value, onChange, errorMessage, placeholder, readOnly, className, labelClassName, inputClassName } = props;
    return (
        <div className={className}>
            <label className={labelClassName}>{label}</label>
            <input onChange={onChange} placeholder={placeholder} readOnly={readOnly} name={name} type={type} className={inputClassName}/> 
            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;

