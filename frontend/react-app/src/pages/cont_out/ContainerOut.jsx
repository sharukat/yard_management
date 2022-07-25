
import React from 'react';
import axios from 'axios';
import { useState } from "react";
import { useFormik } from 'formik';
import { Grid } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// Local imports:
import "./ContainerOut.css";
import FormLabel from "../../component/forms/FormLabel";
import FormInput from "../../component/forms/FormInput";
import SelectInput from "../../component/forms/SelectInput";
import SearchInput from "../../component/forms/SearchInput";
import {headers, conditionOptions, statusOptions} from "../../component/forms/constValues";

const ContainerOut = () => {

    const {values, setValues, handleChange, resetForm} = useFormik({
        initialValues: {
            containerId: '',
            serialNo: '',
            date_in: '',
            type: '',
            size: '',
            condition: '',
            customer: '',
            consignee: '',
            ex_vessel: '',
            arr_date: '',
            rel_order: "",
            shipper: "",
            vehicle_out: "",
            p_location: "",
            c_location: "",
            reference: "",
            driver: "",
            nic: "",
            date_out: "",
            time_out: "",
            status_out: "",
            condition_out: "",
            to_vessel: "",
            out_tran:false,
        },

    });


    const handleCheck = (e) => {
        e.preventDefault();

        if (values.containerId === ''| values.serialNo === '') {
        toast.error("Required fields cannot be empty.");
        }
        else {
        const url = 'http://127.0.0.1:8000/application/container_check/?container_id='+ values.containerId +'&serial_no='+ values.serialNo;
        return axios.get(url, {headers: headers})
            .then(res => {
            const container_details = res.data;
            console.log(container_details);

            if(container_details === "Container does not exist"){
                toast.error("Container does not exist."); 
            }
            else{
                axios.get('http://127.0.0.1:8000/application/get_vessel/?vessel='+ container_details[0]['ex_vessel'], {headers: headers})
                .then(res => {
                    const vessel_name = res.data;
                    container_details[0]['ex_vessel'] = container_details[0]['ex_vessel'] + ' - ' + vessel_name;

                    axios.get('http://127.0.0.1:8000/application/get_customer/?customer='+ container_details[0]['customer'], {headers: headers})
                    .then(res => {
                        const customer_name = res.data;
                        container_details[0]['customer'] = container_details[0]['customer'] + ' - ' + customer_name;
                        // setContainer(container_details[0]);

                        if (container_details[0]['out_tran']===false){
                            setValues({
                                containerId: container_details[0]['container_id'],
                                serialNo: container_details[0]['serial_no'],
                                date_in: container_details[0]['date_in'],
                                type: container_details[0]['type'],
                                size: container_details[0]['size'],
                                condition: container_details[0]['condition'],
                                customer: container_details[0]['customer'],
                                consignee: container_details[0]['consignee'],
                                ex_vessel: container_details[0]['ex_vessel'],
                                arr_date: container_details[0]['arr_date'],
                                rel_order: "",
                                shipper: "",
                                vehicle_out: "",
                                p_location: "",
                                c_location: "",
                                reference: "",
                                driver: "",
                                nic: "",
                                date_out: "",
                                time_out: "",
                                status_out: "",
                                condition_out: "",
                                to_vessel: "",
                                out_tran: container_details[0]['out_tran'],

                            });
                        }
                        else{
                            setValues({
                                containerId: container_details[0]['container_id'],
                                serialNo: container_details[0]['serial_no'],
                                date_in: container_details[0]['date_in'],
                                type: container_details[0]['type'],
                                size: container_details[0]['size'],
                                condition: container_details[0]['condition'],
                                customer: container_details[0]['customer'],
                                consignee: container_details[0]['consignee'],
                                ex_vessel: container_details[0]['ex_vessel'],
                                arr_date: container_details[0]['arr_date'],
                                rel_order: container_details[0]['rel_order'],
                                shipper: container_details[0]['shipper'],
                                vehicle_out: container_details[0]['vehicle_out'],
                                p_location: container_details[0]['p_location'],
                                c_location: container_details[0]['c_location'],
                                reference: container_details[0]['reference'],
                                driver: container_details[0]['driver'],
                                nic: container_details[0]['nic'],
                                date_out: container_details[0]['date_out'],
                                time_out: container_details[0]['time_out'],
                                status_out: container_details[0]['status_out'],
                                condition_out: container_details[0]['condition_out'],
                                to_vessel: container_details[0]['to_vessel'],
                                out_tran: container_details[0]['out_tran'],
                            });
                        }
                    });               
                });
                return container_details[0];
            }
            });
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(values.out_tran == true){
          toast.error("Container already out");
        }
        else{
            try {
                const url = "http://127.0.0.1:8000/application/container_out/"
                let res = fetch(url,{
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({
                        container_id: values.containerId,
                        serial_no: values.serialNo,
                        rel_order: values.rel_order,
                        shipper: values.shipper,
                        vehicle_out: values.vehicle_out,
                        p_location: values.p_location,
                        c_location: values.c_location,
                        reference: values.reference,
                        driver: values.driver,
                        nic: values.nic,
                        status_out: selectedStatusValue.value,
                        condition_out: selectedCurrentCondValue.value,
                        to_vessel: selectedValueA.vessel,
                        }),
                });
                res.then(res => res.json())
                .then(data => {
                console.log(data.status)
                if(data == "Success"){
                    toast.success("Submission successful")
                    
                }
                else{
                    toast.error("Submission failed")
                } 
                });
                console.log(values);
            } 
    
            catch (error) {
                console.log(error);
            }  
        }

        resetForm();
        setValueA("");
        setSelectedValueA("");
        setSelectedStatusValue("");
        setCurrentSelectedCondValue("");
      }

    // ======================================== To Vessel ==================================================
    const [inputValueA, setValueA] = useState('');
    const [selectedValueA, setSelectedValueA] = useState(null);

    // handle To Vessel input change event
    const handleInputChangeA = value => {setValueA(value);};

    // handle To Vessel selection
    const handleChangeA = value => {setSelectedValueA(value);}

    const fetchVessels = () => {
        const url = 'http://127.0.0.1:8000/application/vessels/?vessel=' + inputValueA;
        
        return axios.get(url, {headers: headers})
            .then(res => {
                const vessels = res.data;
                console.log(vessels);
                return vessels;
            });
    }

    // ======================================== Status ==================================================
  
    const [selectedStatusValue, setSelectedStatusValue] = useState('');
    const handleChangeStatus = value => {setSelectedStatusValue(value);}


    // ======================================== Conditions ==================================================

    const [selectedCurrentCondValue, setCurrentSelectedCondValue] = useState('');
    const handleChangeCurrentCond = value => {setCurrentSelectedCondValue(value);}

    return (
        <div className="containerOut">
            <h2 className="title">Container Outbound</h2>
            
            <Grid container>
                <Grid item md={2.8}>
                    <FormInput id="containerId" label="Container" value={values.containerId} onChange={handleChange}/>
                </Grid>
                <Grid item md={1}>
                    <FormInput id="serialNo" label="Serial" value={values.serialNo} onChange={handleChange}/>
                </Grid>
                <Grid item md={1}>
                    <button type="submit" onClick={handleCheck} className="buttonCheck">Check</button> 
                </Grid>
            </Grid>

            

            <div className="containerOut_box">
                <Grid container spacing={3}>
                    <Grid item md={5}>

                        {/* Row 01 */}
                        <Grid item md={12}>
                            <div className="rectangle_heading">
                                <h3 className="boxHeading">Inbound</h3>
                            </div>
                        </Grid>

                        {/* Row 02 */}
                        <Grid container>
                            <Grid item md={4.5}>
                                <FormLabel heading="Date" value={values.date_in}/>
                            </Grid>
                            <Grid item md={2.5}>
                                <FormLabel heading="Type" value={values.type}/>
                            </Grid>
                            <Grid item md={2.5}>
                                <FormLabel heading="Size" value={values.size}/>
                            </Grid>
                            <Grid item md={2.5}>
                                <FormLabel heading="Condition" value={values.condition}/>
                            </Grid>
                        </Grid>

                        {/* Row 04 */}
                        <Grid item md={12}>
                            <FormLabel heading="Customer" value={values.customer}/>
                        </Grid>

                        {/* Row 05 */}
                        <Grid item md={12}>
                            <FormLabel heading="Consignee" value={values.consignee}/>
                        </Grid>

                        {/* Row 06 */}
                        <Grid container>
                            <Grid item md={8.5}>
                                <FormLabel heading="Ex-Vessel" value={values.ex_vessel}/>
                            </Grid>
                            <Grid item md={3.5}>
                                <FormLabel heading="Arrival Date" value={values.arr_date}/>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid item md={7}>
                        <Grid item md={12}>
                            <div className="rectangle_heading2">
                                <h3 className="boxHeading">Outbound</h3>
                            </div>
                        </Grid>
                        
                        {/* Row 01 */}
                        <Grid container>
                            <Grid item md={3}>  
                                <FormInput 
                                    id="rel_order" 
                                    label="Release Order" 
                                    labelClassName="labelOut"
                                    value={values.rel_order} 
                                    onChange={handleChange}
                                    placeholder={values.out_tran == true ? values.rel_order : null} 
                                    readOnly={values.out_tran == true}
                                /> 
                            </Grid>
                            <Grid item md={2}>
                                <FormInput 
                                    id="vehicle_out" 
                                    label="Vehicle Out" 
                                    labelClassName="labelOut"
                                    value={values.vehicle_out} 
                                    onChange={handleChange}
                                    placeholder={values.out_tran == true ? values.vehicle_out : null} 
                                    readOnly={values.out_tran == true}
                                />
                            </Grid>
                            <Grid item md={2}>
                                <SelectInput
                                    id="status_out" 
                                    label="Status Out"
                                    labelClass="labelOut"
                                    options={statusOptions}
                                    value={selectedStatusValue}
                                    onChange={handleChangeStatus}
                                    placeholder={values.out_tran == true ? values.status_out : "Select"} 
                                    isDisabled={values.out_tran == true ? true : false}

                                />
                            </Grid>
                            <Grid item md={2.2}>
                                <SelectInput
                                    id="condition_out" 
                                    label="Condition Out"
                                    labelClass="labelOut"
                                    options={conditionOptions}
                                    value={selectedCurrentCondValue}
                                    onChange={handleChangeCurrentCond}
                                    placeholder={values.out_tran == true ? values.condition_out : "Select"} 
                                    isDisabled={values.out_tran == true ? true : false}

                                />
                            </Grid>
                            <Grid item md={2.8}>
                                <FormInput 
                                    id='reference' 
                                    label='Reference No.'
                                    labelClassName="labelOut" 
                                    value={values.reference}
                                    onChange={handleChange} 
                                    placeholder={values.out_tran == true ? values.reference : null}  
                                    readOnly={values.out_tran == true}
                                />                            
                            </Grid>
                        </Grid>

                        {/* Row 02 */}
                        <Grid container>
                            <Grid item md={7}>
                                <FormInput 
                                    id='shipper' 
                                    label='Shipper' 
                                    labelClassName="labelOut"
                                    value={values.shipper}
                                    onChange={handleChange} 
                                    placeholder={values.out_tran == true ? values.shipper : null}  
                                    readOnly={values.out_tran == true}
                                />
                            </Grid>
                            <Grid item md={3}>
                                <FormInput 
                                    id='driver' 
                                    label='Driver' 
                                    labelClassName="labelOut"
                                    value={values.driver}
                                    onChange={handleChange} 
                                    placeholder={values.out_tran == true ? values.driver : null}  
                                    readOnly={values.out_tran == true}
                                /> 
                            </Grid>
                            <Grid item md={2}>
                                <FormInput 
                                    id='nic' 
                                    label='NIC' 
                                    labelClassName="labelOut"
                                    value={values.nic}
                                    onChange={handleChange} 
                                    placeholder={values.out_tran == true ? values.nic : null}  
                                    readOnly={values.out_tran == true}
                                /> 
                            </Grid>
                            
                        </Grid>

                        {/* Row 03 */}
                        <Grid container>
                            <Grid item md={7}>
                            <SearchInput 
                                label="To Vessel" 
                                labelClass="labelOut"
                                value={selectedValueA} 
                                getOptionLabel={e => e.vessel + ' - '+e.name}
                                getOptionValue={e => e.id} 
                                loadOptions={inputValueA.length >2 ? fetchVessels : null} 
                                onInputChange={handleInputChangeA} 
                                onChange={handleChangeA}
                                placeholder= {values.out_tran == true ? values.to_vessel: "Type more than 2 characters to search"} 
                                isDisabled={values.out_tran == true ? true : false}
                                />
                            </Grid>
                            <Grid item md={5}>
                                {values.out_tran == true ? 
                                <Grid container spacing={0}>
                                    <Grid item md={6}>
                                        <FormLabel heading="Date Out" value={values.date_out}/>
                                    </Grid>
                                    <Grid item md={6}>
                                        <FormLabel heading="Time Out" value={values.time_out}/>
                                    </Grid>
                                </Grid> 
                            : null}

                            </Grid>
                        </Grid>

                        {/* Row 04 */}
                        <Grid container>
                            <Grid item md={3.5}>
                                <FormInput 
                                    id='p_location' 
                                    label='Previous Location' 
                                    labelClassName="labelOut"
                                    value={values.p_location}
                                    onChange={handleChange} 
                                    placeholder={values.out_tran == true ? values.p_location : null}  
                                    readOnly={values.out_tran == true}
                                /> 
                            </Grid>
                            <Grid item md={3.5}>
                                <FormInput 
                                    id='c_location' 
                                    label='Current Location' 
                                    labelClassName="labelOut"
                                    value={values.c_location}
                                    onChange={handleChange} 
                                    placeholder={values.out_tran == true ? values.c_location : null}  
                                    readOnly={values.out_tran == true}
                                /> 
                            </Grid>
                            
                        </Grid>

                        {/* Row 06 */}
                        <Grid container>
                            
                            
                        </Grid>
                    </Grid>
                </Grid>
            </div>

            <button type="submit" onClick={handleSubmit} className="buttonSubmit">Submit</button>
            <ToastContainer /> 

        </div>
    );

}


export default ContainerOut;