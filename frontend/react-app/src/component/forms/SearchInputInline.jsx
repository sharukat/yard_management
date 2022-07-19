import "./SearchInputInline.css";
import AsyncSelect from 'react-select/async';
import { borderRadius } from "@mui/system";

const SearchInputInline = (props) => {
    const customStyles = {
        control: (base, state) => ({
            ...base,
            borderRadius: "5px",
            height: 20,
        }),
    }

    const { label, loadOptions, getOptionLabel, value, onInputChange, onChange, getOptionValue, placeholder, labelClass } = props;
    return (
        <div className='searchInputInline'>
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

export default SearchInputInline;
