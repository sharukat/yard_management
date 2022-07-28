import axios from 'axios';
import { useState } from "react";
import { useFormik } from 'formik';
import { Grid } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// Local imports:
import "./CustomerReports.css";
import FormLabel from "../../component/forms/FormLabel";
import FormInput from "../../component/forms/FormInput";
import SelectInput from "../../component/forms/SelectInput";
import SearchInput from "../../component/forms/SearchInput";
import {headers} from "../../component/forms/constValues";

const reportOptions = [
    {value: "1", label: "Daily Stock Report"},
    {value: "2", label: "Daily Inward Report"},
    {value: "3", label: "Overdue Report"},
]



const CustomerReports = () => {

    const {values, setValues, handleChange, resetForm} = useFormik({
        initialValues: {
            customer: '',
            date: '',
        },
    
    });

    // Report Select
    const [selectedReportValue, setselectedReportValue] = useState('');
    const handleChangeReport = value => {setselectedReportValue(value);}

    // ========================================== Customer ============================================================

    // Customer select useStates
    const [customerInputValue, setCustomerInputValue] = useState('');
    const [customerSelectedValue, setCustomerSelectedValue] = useState(null);

    // handle input change event
    const handleCustomerInputChange = value => {
        setCustomerInputValue(value);
    };

    // handle selection
    const handleCustomerChange = value => {
        setCustomerSelectedValue(value);
    };

    const fetchCustomers = (customerInputValue) => {
        const url = 'http://127.0.0.1:8000/application/customers/?customer=' + customerInputValue;
        return axios.get(url, {headers: headers})
            .then(res => {
                const customers = res.data;
                console.log(customers);
                return customers;
    });}

    

    


    return (

        <div className="customerReports">
            <h2 className="title">Reports</h2>

            <Grid container>
                <Grid item md={2.5}>
                    <SelectInput
                        id="report_options" 
                        label="Report Type"
                        options={reportOptions}
                        value={selectedReportValue}
                        onChange={handleChangeReport}
                        placeholder={"Select report type"} 
                    />
                </Grid>
                <Grid item md={4}>
                    <SearchInput 
                        label="Customer" 
                        value={customerSelectedValue} 
                        getOptionLabel={e => e.customer + ' - '+e.name}
                        getOptionValue={e => e.id} 
                        loadOptions={customerInputValue.length >2 ? fetchCustomers : null} 
                        onInputChange={handleCustomerInputChange} 
                        onChange={handleCustomerChange}
                        placeholder="Search customer"
                    />                
                </Grid>
                <Grid item md={1.5}>
                    <FormInput 
                        id="date" 
                        label="Date" 
                        value={values.date} 
                        onChange={handleChange} 
                        type='date'
                        inputClassName="dateInput"
                        />
                </Grid>
                <Grid item md={2}>
                    <button type="submit" className="report">View Report</button> 
                </Grid>
                <Grid item md={1}>
                    <button type="submit" className="buttonCheck">Clear</button> 
                </Grid>
            </Grid>

        </div>
    );

}

export default CustomerReports;