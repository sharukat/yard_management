import axios from 'axios';
import React from "react";
import { Grid } from "@mui/material";
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// Local imports:
import "./ContainerStatus.css";
import FormLabel from "../../component/forms/FormLabel";
import FormInput from "../../component/forms/FormInput";
import SelectInput from "../../component/forms/SelectInput";
import SearchInput from "../../component/forms/SearchInput";
import {headers} from "../../component/forms/constValues";
import { check } from '../../component/forms/functions';

const ContainerStatus = () => {

    const {values, setValues, handleChange, resetForm} = useFormik({
        initialValues: {
            // ================= Container In Values ======================
            container_id: '',
            serial_no: '',
            date_in: '',
            time_in: '',
            type: '',
            size: '',
            status: '',
            condition: '',
            vehicle_in: '',
            customer: '',
            consignee: '',
            ex_vessel: '',
            // ================= Container Out Values =====================
            shipper: "",
            vehicle_out: "",
            reference: "",
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

        if (values.container_id === ''| values.serial_no === '') {
        toast.error("Required fields cannot be empty.");
        }
        else {
        const url = 'http://127.0.0.1:8000/application/checkStatus/?container_id='+ values.container_id +'&serial_no='+ values.serial_no;
        return axios.get(url, {headers: headers})
            .then(res => {
            const container_details = res.data;

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
                                // ================= Container In Values ======================
                                container_id: container_details[0]['container_id'],
                                serial_no: container_details[0]['serial_no'],
                                date_in: container_details[0]['date_in'],
                                time_in: container_details[0]['time_in'],
                                type: container_details[0]['type'],
                                size: container_details[0]['size'],
                                status: container_details[0]['status'],
                                condition: container_details[0]['condition'],
                                customer: container_details[0]['customer'],
                                consignee: container_details[0]['consignee'],
                                ex_vessel: container_details[0]['ex_vessel'],
                                vehicle_in: container_details[0]['vehicle_in'],

                                // ================= Container Out Values =====================
                                shipper: "",
                                vehicle_out: "",
                                reference: "",
                                date_out: "",
                                time_out: "",
                                status_out: "",
                                condition_out: "",
                                to_vessel: "",
                                out_tran: container_details[0]['out_tran'],

                            });
                        }
                        else{
                            axios.get('http://127.0.0.1:8000/application/get_vessel/?vessel='+ container_details[0]['to_vessel'], {headers: headers})
                                .then(res => {
                                    const vessel_name = res.data;
                                    container_details[0]['to_vessel'] = container_details[0]['to_vessel'] + ' - ' + vessel_name;
                                setValues({
                                    // ================= Container In Values ======================
                                    container_id: container_details[0]['container_id'],
                                    serial_no: container_details[0]['serial_no'],
                                    date_in: container_details[0]['date_in'],
                                    time_in: container_details[0]['time_in'],
                                    type: container_details[0]['type'],
                                    size: container_details[0]['size'],
                                    status: container_details[0]['status'],
                                    condition: container_details[0]['condition'],
                                    customer: container_details[0]['customer'],
                                    consignee: container_details[0]['consignee'],
                                    ex_vessel: container_details[0]['ex_vessel'],
                                    vehicle_in: container_details[0]['vehicle_in'],

                                    // ================= Container Out Values =====================
                                    shipper: container_details[0]['shipper'],
                                    vehicle_out: container_details[0]['vehicle_out'],
                                    reference: container_details[0]['reference'],
                                    date_out: container_details[0]['date_out'],
                                    time_out: container_details[0]['time_out'],
                                    status_out: container_details[0]['status_out'],
                                    condition_out: container_details[0]['condition_out'],
                                    to_vessel: container_details[0]['to_vessel'],
                                    out_tran: container_details[0]['out_tran'],
                                });
                            });
                        }
                    });               
                });
                return container_details[0];
            }
            });
        }
    }

    return (
        <div className="containerStatus">
            <h2 className="title">Container Status</h2>

            <Grid container>
                <Grid item md={2.8}>
                    <FormInput id="container_id" label="Container" value={values.container_id} onChange={handleChange}/>
                </Grid>
                <Grid item md={1}>
                    <FormInput id="serial_no" label="Serial" value={values.serial_no} onChange={handleChange}/>
                </Grid>
                <Grid item md={1}>
                    <button 
                        type="submit" 
                        onClick={handleCheck} 
                        className="buttonCheck">Check</button> 
                </Grid>
                <Grid item md={1}>
                    <button 
                        type="submit" 
                        onClick={resetForm} 
                        className="buttonCheck">Clear</button> 
                </Grid>
            </Grid>

            <h3 className='subHeading'>Container Inbound Details</h3>

            <div className="containerStatus_box">
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <div className='box_border'>
                            
                            {/* Row 01 */}
                            <Grid container>
                                <Grid item md={1.5}>
                                    <FormLabel heading="Date In" value={values.date_in}/>
                                </Grid>
                                <Grid item md={1.5}>
                                    <FormLabel heading="Time In" value={values.time_in}/>
                                </Grid>
                                <Grid item md={1.5}>
                                    <FormLabel heading="Type" value={values.type}/>
                                </Grid>
                                <Grid item md={1.5}>
                                    <FormLabel heading="Size" value={values.size}/>
                                </Grid>
                                <Grid item md={1.5}>
                                    <FormLabel heading="Status" value={values.status}/>
                                </Grid>
                                <Grid item md={1.5}>
                                    <FormLabel heading="Condition" value={values.condition}/>
                                </Grid>
                                <Grid item md={3}>
                                    <FormLabel heading="Consignee" value={values.consignee}/>
                                </Grid>
                                

                            </Grid>

                            {/* Row 02 */}
                            <Grid container>
                                <Grid item md={6}>
                                        <FormLabel heading="Customer" value={values.customer}/>
                                </Grid>
                                
                                <Grid item md={4.5}>
                                    <FormLabel heading="Ex. Vessel" value={values.ex_vessel}/>
                                </Grid>
                                <Grid item md={1.5}>
                                    <FormLabel heading="Vehicle In" value={values.vehicle_in}/>
                                </Grid>
                            </Grid>
                            
                        </div>
                    </Grid>
                </Grid>
            </div>

            <h3 className='subHeading'>Container Outbound Details</h3>

            <div className="containerStatus_box">
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <div className='box_border'>
                            
                            {/* Row 01 */}
                            <Grid container>
                                <Grid item md={1.5}>
                                    <FormLabel heading="Date Out" value={values.date_out}/>
                                </Grid>
                                <Grid item md={1.5}>
                                    <FormLabel heading="Date Out" value={values.time_out}/>
                                </Grid>
                                <Grid item md={1.5}>
                                    <FormLabel heading="Status Out" value={values.status_out}/>
                                </Grid>
                                <Grid item md={1.5}>
                                    <FormLabel heading="Condition Out" value={values.condition_out}/>
                                </Grid>
                                <Grid item md={6}>
                                    <FormLabel heading="To Vessel" value={values.to_vessel}/>
                                </Grid>
                            </Grid>

                            {/* Row 02 */}
                            <Grid container>
                                <Grid item md={2}>
                                    <FormLabel heading="Vehicle Out" value={values.vehicle_out}/>
                                </Grid>
                                <Grid item md={4}>
                                    <FormLabel heading="Reference" value={values.reference}/>
                                </Grid>
                                
                                <Grid item md={6}>
                                    <FormLabel heading="Shipper" value={values.shipper}/>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <ToastContainer /> 
        </div>
    );
}

export default ContainerStatus;