import FormInput from "../../component/forms/FormInput";
import "./Container_In.css";
import { useState } from "react";
import { Grid } from "@mui/material";
import axios from 'axios';
import SearchInput from "../../component/forms/SearchInput";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select'
import SelectInput from "../../component/forms/SelectInput";
import {headers, conditionOptions, statusOptions, reserveOptions, sizeOptions} from "../../component/forms/constValues";

// ==================================================================================================================

const Container_In = () => {

    let currentDate = new Date();

    const initialValues = {
        containerNumber: "",
        serialNumber: "",
        containerType: "",
        containerSize: "",
        containerStatus: "",
        blNumber: "",
        reserve: "",
        currentCondition: "",
        previousCondition: "",
        consignee: "",
        dateIn: "",
        vehicleIn: "",
        arrivalDate: "",
        voyage: "",
        specialCode: "",
        previousLocation: "",
        currentLocation: "",
    }
    
    const [values, setValues] = useState(initialValues);

    // ==================================================================================================================
    // Vessel select useStates

    const [inputValueA, setValueA] = useState('');
    const [selectedValueA, setSelectedValueA] = useState(null);

    const [inputValueB, setValueB] = useState('');
    const [selectedValueB, setSelectedValueB] = useState(null);

    // handle Ex Vessel input change event
    const handleInputChangeA = value => {
        setValueA(value);
    };

    // handle Ex Vessel selection
    const handleChangeA = value => {
        setSelectedValueA(value);
    }

    // handle Vessel input change event
    const handleInputChangeB = value => {
        setValueB(value);
    };

    // handle Vessel selection
    const handleChangeB = value => {
        setSelectedValueB(value);
    }

    const fetchVesselsA = () => {
        const url = 'http://127.0.0.1:8000/application/vessels/?vessel=' + inputValueA;
        
        return axios.get(url, {headers: headers})
            .then(res => {
                const vessels = res.data;
                console.log(vessels);
                return vessels;
            });
    }

    const fetchVesselsB = () => {
        const url = 'http://127.0.0.1:8000/application/vessels/?vessel=' + inputValueB;

        return axios.get(url, {headers: headers})
            .then(res => {
                const vessels = res.data;
                console.log(vessels);
                return vessels;
            });
    }
    // ==================================================================================================================
    
    // Size Select
    const [selectedSizeValue, setSelectedSizeValue] = useState('');
    const handleChangeSize = value => {setSelectedSizeValue(value);}

    // Previous Condition Select
    const [selectedPreviousCondValue, setPreviousSelectedCondValue] = useState('');
    const handleChangePreviousCond = value => {setPreviousSelectedCondValue(value);}

    // Current Condition Select
    const [selectedCurrentCondValue, setCurrentSelectedCondValue] = useState('');
    const handleChangeCurrentCond = value => {setCurrentSelectedCondValue(value);}

    // Reserve Select
    const [selectedReserveValue, setSelectedReserveValue] = useState('');
    const handleChangeReserve = value => {setSelectedReserveValue(value);}

    // Status Select
    const [selectedStatusValue, setSelectedStatusValue] = useState('');
    const handleChangeStatus = value => {setSelectedStatusValue(value);}


    // ==================================================================================================================

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

    const fetchCustomers = () => {
        const url = 'http://127.0.0.1:8000/application/customers/?customer=' + customerInputValue;
        return axios.get(url, {headers: headers})
            .then(res => {
                const customers = res.data;
                console.log(customers);
                return customers;
            });
    }
    
    
    // ==================================================================================================================

    const inputContainer = [{id:1, label: "Container", name: "containerNumber", type: "text",},]

    const inputSerial = [{id:1, label: "Serial", name: "serialNumber", type: "text",},]

    const inputsColumnA = [
        {id:1, label: "Consignee", name: "consignee", type: "text",},
        {id:4, label: "Previous Location", name: "previousLocation", type: "text",},
        {id:5, label: "Current Location", name: "currentLocation", type: "text",},
    ]

    const inputsColumnB = [{id:1, label: "Type", name: "containerType", type: "text",},]
    const inputsColumnC = [{id:1, label: "Date In", name: "dateIn", type: "date", placeholder: currentDate.toLocaleDateString('en-US'),}, ] 
    const inputsColumnD = [{id:2, label: "Arrival Date", name: "arrivalDate", type: "text",},]
    const inputsColumnE = [{id:3, label: "Special Code", name: "specialCode", type: "text",},]
    const inputsColumnF = [{id:4, label: "Voyage", name: "voyage", type: "text",},]

    const inputsColumnBL = [{id:2, label: "B/L Number", name: "blNumber", type: "text",},]

    const inputsColumnVehicle = [{id:3, label: "Vehicle", name: "vehicleIn", type: "text",},]


    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.containerNumber === "" || values.serialNumber === "" || values.containerType === "" || selectedSizeValue === "") {
            toast.error("Required fields cannot be empty."); 
            setTimeout(() => {}, 3000);
            document.getElementById("contInForm").reset();
            

            setValues(initialValues);
            setValueA("");
            setValueB("");
            setSelectedValueA("");
            setSelectedValueB("");
            setSelectedSizeValue("");
            setPreviousSelectedCondValue("");
            setCurrentSelectedCondValue("");
            setSelectedReserveValue("");
            setSelectedStatusValue("");
            setCustomerSelectedValue("");
            setCustomerInputValue("");
            }
        else {
            try {
                const url = "http://127.0.0.1:8000/application/container_in/"
                let res = fetch(url,{
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({
                        container_id: values.containerNumber,
                        serial_no: values.serialNumber,
                        type: values.containerType,
                        size: selectedSizeValue.value,
                        status: selectedStatusValue.value,
                        condition: selectedCurrentCondValue.value,
                        rsv: selectedReserveValue.value,
                        customer: customerSelectedValue.customer == null ? customerSelectedValue : customerSelectedValue.customer,
                        consignee: values.consignee,
                        vehicle_in: values.vehicleIn,
                        ex_vessel: selectedValueA.vessel == null ? selectedValueA : selectedValueA.vessel,
                        s_code: values.specialCode,
                        arr_date: values.arrivalDate,
                        
                        vessel: selectedValueB.vessel == null ? selectedValueB : selectedValueB.vessel,
                        p_location: values.previousLocation,
                        c_location: values.currentLocation,
                        p_condition: selectedPreviousCondValue.value,
                        voyage: values.voyage,
                        bl_number: values.blNumber,
                        
                        }),
                });
                toast.success("Submission successful.");  
                setTimeout(() => {}, 3000);
                document.getElementById("contInForm").reset();
                

                setValues(initialValues);
                setValueA("");
                setValueB("");
                setSelectedValueA("");
                setSelectedValueB("");
                setSelectedSizeValue("");
                setPreviousSelectedCondValue("");
                setCurrentSelectedCondValue("");
                setSelectedReserveValue("");
                setSelectedStatusValue("");
                setCustomerSelectedValue("");
                setCustomerInputValue("");
                     
                
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
            <form onSubmit={handleSubmit} id="contInForm">
                <Grid container spacing={1}>
                    <Grid item md={6}>
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
                        <Grid item className="grid-col2">
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

                            {inputsColumnA.map(input => (
                                <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                            ))}

                            <Grid container >
                                <Grid item xs={8}>
                                    {inputsColumnBL.map(input => (
                                        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                                    ))}
                                </Grid>
                                <Grid item xs={4}>
                                    {inputsColumnVehicle.map(input => (
                                        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                                    ))}
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item md={6}>
                        <Grid container>
                            <Grid item md={4}>
                                {inputsColumnB.map(input => (
                                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                                ))}
                            </Grid>
                            <Grid item md={4}>
                                <SelectInput options={statusOptions} label="Status" onChange={handleChangeStatus} value={selectedStatusValue} />
                            </Grid>
                            <Grid item md={4}>
                                <SelectInput options={sizeOptions} label="Size" onChange={handleChangeSize} value={selectedSizeValue} />    
                            </Grid>
                            <Grid item md={4}>
                                <SelectInput options={conditionOptions} label="P. Condition" onChange={handleChangePreviousCond} value={selectedPreviousCondValue} />
                            </Grid>
                            <Grid item md={4}>
                                <SelectInput options={conditionOptions} label="Condition" onChange={handleChangeCurrentCond} value={selectedCurrentCondValue} />
                            </Grid>
                            <Grid item md={4}>
                                <SelectInput options={reserveOptions} label="Reserve" onChange={handleChangeReserve} value={selectedReserveValue} />
                            </Grid>
                            

                        </Grid>
                        <Grid item xs={12}>
                            <SearchInput 
                            label="Ex. Vessel" 
                            value={selectedValueA} 
                            getOptionLabel={e => e.vessel + ' - '+e.name}
                            getOptionValue={e => e.id} 
                            loadOptions={inputValueA.length >2 ? fetchVesselsA : null} 
                            onInputChange={handleInputChangeA} 
                            onChange={handleChangeA}
                            placeholder="Type more than 2 characters to search"
                            />

                            <SearchInput 
                            label="Vessel" 
                            value={selectedValueB} 
                            getOptionLabel={e => e.vessel + ' - '+e.name}
                            getOptionValue={e => e.id} 
                            loadOptions={inputValueB.length >2 ? fetchVesselsB : null} 
                            onInputChange={handleInputChangeB} 
                            onChange={handleChangeB}
                            placeholder="Type more than 2 characters to search"
                            />

                        </Grid>

                        <Grid container>
                            <Grid item md={3}>
                                {inputsColumnC.map(input => (
                                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} readOnly='readOnly' type="text" />
                                ))} 
                            </Grid>
                            <Grid item md={3}>
                                {inputsColumnD.map(input => (
                                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} type="date" />
                                ))} 
                            </Grid>
                            <Grid item md={3}>
                                {inputsColumnE.map(input => (
                                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} type="text" />
                                ))}
                            </Grid>
                            <Grid item md={3}>
                                {inputsColumnF.map(input => (
                                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} type="text" />
                                ))}
                            </Grid>
                             
                        </Grid>
                        
                         
                        
                    </Grid>
                </Grid>
                <button type="submit" onClick={handleSubmit} className="buttonSubmit">Submit</button> 
                <ToastContainer />    
            </form>
        </div>
    );
};

export default Container_In;
