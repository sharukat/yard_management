import "./SearchInput.css";
import AsyncSelect from 'react-select/async';
import { borderRadius } from "@mui/system";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const SearchInput = (props) => {
    const { label, loadOptions, getOptionLabel, value, onInputChange, onChange, getOptionValue, placeholder, labelClass, isDisabled } = props;
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
            isDisabled = {isDisabled}
            
        

            /> 
        </div>
    );
};

export default SearchInput;
