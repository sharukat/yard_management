import "./SelectInput.css";
import Select from 'react-select'

const SelectInput = (props) => {
    const { label, options, onChange, value } = props;
    return (
        <div className='selectInput'>
            <label>{label}</label>
            <Select
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