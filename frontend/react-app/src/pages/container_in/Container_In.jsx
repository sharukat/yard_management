import FormInput from "../../component/forms/FormInput";
import "./Container_In.css";
import { useState, useEffect, useCallback } from "react";
import { Grid } from "@mui/material";
import axios from 'axios';
import SearchInput from "../../component/forms/SearchInput";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Container_In = () => {

    let currentDate = new Date();
    const token = 'Token' + ' 0ed599e1dd6fdb32cd11e3d4cc8620fc7971a1a0d0170627d42f2aabee8cd961';
    
    const [values, setValues] = useState({
        containerNumber: "",
        serialNumber: "",
        containerType: "",
        containerSize: "",
        containerStatus: "",
        containerCondition: "",
        consignee: "",
        dateIn: "",
        vehicleIn: "",
    });

    // ==================================================================================================================
    // Vessel select useStates
    const [items, setItems] = useState([]);
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
    }

    const fetchVessels = () => {
        const url = 'http://127.0.0.1:8000/application/vessels/?vessel=' + inputValue;
        const headers = {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
        return axios.get(url, {headers: headers})
            .then(res => {
                const vessels = res.data;
                console.log(vessels);
                return vessels;
            });
    }
    // ==================================================================================================================

    // Customer select useStates
    const [customers, setCustomers] = useState([]);
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

    const fetchCustomers = () => {
        const url = 'http://127.0.0.1:8000/application/customers/?customer=' + customerInputValue;
        const headers = {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
        return axios.get(url, {headers: headers})
            .then(res => {
                const customers = res.data;
                console.log(customers);
                return customers;
            });
    }
    
    
    // ==================================================================================================================

    const inputContainer = [
        {id:1, label: "Container", name: "containerNumber", type: "text",},
    ]

    const inputSerial = [
        {id:1, label: "Serial", name: "serialNumber", type: "text",},

    ]
    const inputsColumnA = [
        {id:1, label: "Consignee", name: "consignee", type: "text",},
        {id:2, label: "Vehicle", name: "vehicleIn", type: "text",},
    ]

    const inputsColumnB = [
        {id:1, label: "Type", name: "containerType", type: "text",},
        {id:2, label: "Size", name: "containerSize", type: "text",},
        {id:3, label: "Status", name: "containerStatus", type: "text",},
        {id:4, label: "Condition", name: "containerCondition", type: "text",},
    ]

    const inputsColumnC = [
        {id:1, label: "Date In", name: "dateIn", type: "date", placeholder: currentDate.toLocaleDateString('en-US'),},
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

        if (values.containerNumber === "" || values.serialNumber === "" || values.containerType === "" || values.containerSize === "") {
            toast.error("Required fields cannot be empty.");
            console.log("Required fields cannot be empty.");
            
        }
        else {
            try {
                let res = fetch("http://127.0.0.1:8000/application/container_in/",{
                    method: "POST",
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        container_id: values.containerNumber,
                        serial_no: values.serialNumber,
                        type: values.containerType,
                        size: values.containerSize,
                        status: values.containerStatus,
                        condition: values.containerCondition,
                        customer: customerSelectedValue.customer == null ? customerSelectedValue : customerSelectedValue.customer,
                        consignee: values.consignee,
                        vehicle_in: values.vehicleIn,
                        ex_vessel: selectedValue.vessel == null ? selectedValue : selectedValue.vessel,
                        }),
                });

                //let resJson = await res.json();
                if (res.status === 200) {
                    console.log("Successful");
                }
                else{
                    console.log("Failed");
                }

                toast.success("Submission successful.");
                
                
            } catch (error) {
                console.log(error);
            }   
        }
        

    };

    const onChange = (e) => {
        setValues({...values,[e.target.name]: e.target.value,});
    };

    return (
        <div className="container_in">
            <h2 className="title">Container Inbound</h2>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={8}>
                                {inputContainer.map(input => (
                                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                                ))}
                            </Grid>
                            <Grid item xs={4}>
                                {inputSerial.map(input => (
                                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                                ))}

                            </Grid>

                        </Grid>
                        <Grid item xs={12}>
                            <SearchInput 
                            label="Customer" 
                            cacheOptions
                            defaultOptions 
                            value={customerSelectedValue} 
                            getOptionLabel={e => e.customer + ' - '+e.name}
                            getOptionValue={e => e.id} 
                            loadOptions={customerInputValue.length >2 ? fetchCustomers : null} 
                            onInputChange={handleCustomerInputChange} 
                            onChange={handleCustomerChange}
                            placeholder="Search customer"
                            />

                            {inputsColumnA.map(input => (
                                <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                            ))},
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container>
                            {inputsColumnB.map(input => (
                                <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                            ))}
                        </Grid>
                        <Grid item xs={9.7}>
                            <SearchInput 
                            label="Ex. Vessel" 
                            cacheOptions
                            defaultOptions 
                            value={selectedValue} 
                            getOptionLabel={e => e.vessel + ' - '+e.name}
                            getOptionValue={e => e.id} 
                            loadOptions={inputValue.length >2 ? fetchVessels : null} 
                            onInputChange={handleInputChange} 
                            onChange={handleChange}
                            placeholder="Search vessel"
                            />

                        </Grid>
                        <Grid container>
                            {inputsColumnC.map(input => (
                                <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} readOnly='readOnly'/>
                            ))}  
                        </Grid> 
                    </Grid>
                </Grid>
                <button type="submit" onClick={handleSubmit}>Submit</button> 
                <ToastContainer />    
            </form>
        </div>
    );
};

export default Container_In;
