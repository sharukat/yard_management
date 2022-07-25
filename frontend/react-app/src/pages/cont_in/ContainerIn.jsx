import React from 'react';
import axios from 'axios';
import { useState } from "react";
import { useFormik } from 'formik';
import { Grid } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// Local imports:
import "./ContainerIn.css";
import FormLabel from "../../component/forms/FormLabel";
import FormInput from "../../component/forms/FormInput";
import SelectInput from "../../component/forms/SelectInput";
import SearchInput from "../../component/forms/SearchInput";
import {headers, conditionOptions, statusOptions, reserveOptions, sizeOptions} from "../../component/forms/constValues";

const ContainerIn = () => {

    let currentDate = new Date();

    const {values, setValues, handleChange, resetForm} = useFormik({
        initialValues: {
            container_id: '',
            serial_no: '',
            type: '',
            consignee: '',
            p_location: "",
            c_location: "",
            bl_number: "",
            vehicle_in: "",
            arr_date: '',
            s_code: '',
            voyage: '',
            date_in: currentDate.toLocaleDateString('en-CA'),
        },

    });

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

    const fetchCustomers = () => {
        const url = 'http://127.0.0.1:8000/application/customers/?customer=' + customerInputValue;
        return axios.get(url, {headers: headers})
            .then(res => {
                const customers = res.data;
                console.log(customers);
                return customers;
            });
    }

    // =========================================== Vessels ============================================================
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

    // ===================================== Selections =============================================================
    
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
    // const [selectedReserveValue, setSelectedReserveValue] = useState('');
    // const handleChangeReserve = value => {setSelectedReserveValue(value);}

    // Status Select
    const [selectedStatusValue, setSelectedStatusValue] = useState('');
    const handleChangeStatus = value => {setSelectedStatusValue(value);}


    // ====================================== Form Submit ===========================================================

    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.containerNumber === "" || values.serialNumber === "" || values.containerType === "" || selectedSizeValue === "") {
            toast.error("Required fields cannot be empty."); 
        }
        else {
            try {
                const url = "http://127.0.0.1:8000/application/container_in/"
                let res = fetch(url,{
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({
                        container_id: values.container_id,
                        serial_no: values.serial_no,
                        type: values.type,
                        size: selectedSizeValue.value,
                        status: selectedStatusValue.value,
                        condition: selectedCurrentCondValue.value,
                        // rsv: selectedReserveValue.value,
                        customer: customerSelectedValue.customer == null ? customerSelectedValue : customerSelectedValue.customer,
                        consignee: values.consignee,
                        vehicle_in: values.vehicle_in,
                        ex_vessel: selectedValueA.vessel == null ? selectedValueA : selectedValueA.vessel,
                        s_code: values.s_code,
                        arr_date: values.arr_date,
                        vessel: selectedValueB.vessel == null ? selectedValueB : selectedValueB.vessel,
                        p_location: values.p_location,
                        c_location: values.c_location,
                        p_condition: selectedPreviousCondValue.value,
                        voyage: values.voyage,
                        bl_number: values.bl_number,
                        
                        }),
                });
                toast.success("Submission successful.");   
            } catch (error) {
                console.log(error);
            }   
        }

        // ======== Reset Form ===========
        resetForm();
        setValueA("");
        setValueB("");
        setSelectedValueA("");
        setSelectedValueB("");
        setSelectedSizeValue("");
        setPreviousSelectedCondValue("");
        setCurrentSelectedCondValue("");
        // setSelectedReserveValue("");
        setSelectedStatusValue("");
        setCustomerSelectedValue("");
        setCustomerInputValue("");
    };

    return (
        <div className="containerIn">
            <h2 className="title">Container Inbound</h2>
            <form onSubmit={handleSubmit} id="contInForm">
                <Grid container spacing={4}>

                    {/* ========================== Column 01 ========================== */}
                    <Grid item md={6}>

                        {/* ========================== Row 01 ========================== */}
                        <Grid container>
                            <Grid item xs={8}>
                                <FormInput 
                                    id='container_id' 
                                    label='Container ID' 
                                    value={values.container_id}
                                    onChange={handleChange} 
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormInput 
                                    id='serial_no' 
                                    label='Serial' 
                                    value={values.serial_no}
                                    onChange={handleChange} 
                                />
                            </Grid>
                        </Grid>

                        {/* ========================== Row 02 ========================== */}
                        <Grid item xs={12}>
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

                        {/* ========================== Row 03 ========================== */}
                        <Grid item xs={12}>
                            <FormInput 
                                id='consignee' 
                                label='Consignee' 
                                value={values.consignee}
                                onChange={handleChange} 
                            />
                        </Grid>

                        {/* ========================== Row 04 ========================== */}
                        <Grid container>
                            <Grid item xs={6}>
                                <FormInput 
                                    id='p_location' 
                                    label='Previous Location' 
                                    value={values.p_location}
                                    onChange={handleChange} 
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormInput 
                                    id='c_location' 
                                    label='Current Location' 
                                    value={values.c_location}
                                    onChange={handleChange} 
                                />
                            </Grid>
                        </Grid>

                        {/* ========================== Row 05 ========================== */}
                        <Grid container>
                            <Grid item xs={8}>
                                <FormInput 
                                    id='bl_number' 
                                    label='BL Number' 
                                    value={values.bl_number}
                                    onChange={handleChange} 
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormInput 
                                    id='vehicle_in' 
                                    label='Vehicle Number' 
                                    value={values.vehicle_in}
                                    onChange={handleChange} 
                                />
                            </Grid>
                        </Grid>
                    </Grid>


                    {/* ========================== Column 02 ========================== */}
                    <Grid item md={6}>

                        {/* ========================== Row 01 ========================== */}
                        <Grid container>
                            <Grid item md={2.4}>
                                <FormInput 
                                    id='type' 
                                    label='Type' 
                                    value={values.type}
                                    onChange={handleChange} 
                                />
                            </Grid>
                            <Grid item md={2.4}>
                                <SelectInput 
                                    options={statusOptions} 
                                    label="Status" 
                                    onChange={handleChangeStatus} 
                                    value={selectedStatusValue} 
                                />
                            </Grid>
                            <Grid item md={2.4}>
                                <SelectInput 
                                    options={sizeOptions} 
                                    label="Size" 
                                    onChange={handleChangeSize} 
                                    value={selectedSizeValue} 
                                />    
                            </Grid>
                            <Grid item md={2.4}>
                                <SelectInput 
                                    options={conditionOptions} 
                                    label="P. Condition" 
                                    onChange={handleChangePreviousCond} 
                                    value={selectedPreviousCondValue} 
                                />
                            </Grid>
                            <Grid item md={2.4}>
                                <SelectInput 
                                    options={conditionOptions} 
                                    label="Condition" 
                                    onChange={handleChangeCurrentCond} 
                                    value={selectedCurrentCondValue} 
                                />
                            </Grid>
                        </Grid>

                        {/* ========================== Row 02 ========================== */}
                        {/* <Grid container> */}
                            
                            {/* <Grid item md={4}>
                                <SelectInput 
                                    options={reserveOptions} 
                                    label="Reserve" 
                                    onChange={handleChangeReserve} 
                                    value={selectedReserveValue} 
                                />
                            </Grid> */}
                        {/* </Grid> */}

                        {/* ========================== Row 03 ========================== */}
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
                        </Grid>

                        {/* ========================== Row 04 ========================== */}
                        <Grid item xs={12}>
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

                        {/* ========================== Row 05 ========================== */}
                        <Grid container>
                            <Grid item md={3}>
                                <FormInput 
                                    id='date_in' 
                                    label='Date In' 
                                    value={values.date_in}
                                    onChange={handleChange} 
                                    readOnly='readOnly'
                                />
                            </Grid>
                            <Grid item md={3}>
                                <FormInput 
                                    id='arr_date' 
                                    label='Arrival Date' 
                                    value={values.arr_date}
                                    onChange={handleChange} 
                                    type='date'
                                />
                            </Grid>
                            <Grid item md={3}>
                                <FormInput 
                                    id='s_code' 
                                    label='Special Code' 
                                    value={values.s_code}
                                    onChange={handleChange} 
                                />
                            </Grid>
                            <Grid item md={3}>
                                <FormInput 
                                    id='voyage' 
                                    label='Voyage' 
                                    value={values.voyage}
                                    onChange={handleChange} 
                                />
                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>
                <button type="submit" onClick={handleSubmit} className="buttonSubmit">Submit</button> 
                <ToastContainer />    
            </form>
        </div>
    );
}

export default ContainerIn;