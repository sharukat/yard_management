import "./SelectInput.css";
import Select from 'react-select'

const SelectInput = (props) => {
    const { label, options, onChange, value, labelClass, key } = props;
    return (
        <div className="selectInput">
            <label className={labelClass}>{label}</label>
            <Select
            key={key}
            options={options}
            onChange={onChange}
            value={value}
            className="react-select"
            placeholder="Select"
            /> 
        </div>
    );
};

export default SelectInput;