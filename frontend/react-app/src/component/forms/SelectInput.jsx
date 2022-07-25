import "./SelectInput.css";
import Select from 'react-select'

const SelectInput = (props) => {
    const { label, options, onChange, value, labelClass, key, placeholder, isDisabled } = props;
    
    const defaultValue = (options, value) =>{
        return options ? options.find(option=>option.value === value): "";
    }
    
    return (
        <div className="selectInput">
            <label className={labelClass}>{label}</label>
            <Select
                key={key}
                options={options}
                onChange={onChange}
                value={value}
                className="react-select"
                placeholder={placeholder}
                isDisabled={isDisabled}
            /> 
        </div>
    );
};

export default SelectInput;