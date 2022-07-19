import "./SearchInput.css";
import AsyncSelect from 'react-select/async';
import { borderRadius } from "@mui/system";

const SearchInput = (props) => {
    const { label, loadOptions, getOptionLabel, value, onInputChange, onChange, getOptionValue, placeholder, labelClass } = props;
    return (
        <div className='searchInput'>
            <label className={labelClass}>{label}</label>
            <AsyncSelect 
            cacheOptions
            defaultOptions
            value={value}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            loadOptions={loadOptions}
            onInputChange={onInputChange}
            onChange={onChange}
            className="react-select"
            placeholder={placeholder}
        

            /> 
        </div>
    );
};

export default SearchInput;
