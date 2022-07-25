import axios from 'axios';
import { useState } from "react";
import { useFormik } from 'formik';
import { Grid } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// Local imports:
import "./ContainerReservation.css";
import FormLabel from "../../component/forms/FormLabel";
import FormInput from "../../component/forms/FormInput";
import SelectInput from "../../component/forms/SelectInput";
import SearchInput from "../../component/forms/SearchInput";
import {headers, conditionOptions, statusOptions} from "../../component/forms/constValues";


const ContainerReservation = () => {


    const currentDate = new Date();

    const {values, setValues, handleChange, resetForm} = useFormik({
        initialValues: {
            container_id: '',
            serial_no: '',
            date_in: '',
            type: '',
            size: '',
            condition: '',
            customer: '',
            consignee: '',
            ex_vessel: '',
            reserved_to: '',
            reservation_date: '',
            reserved_on: '',
            out_tran:false,
            rsv:false,
        },
    });

    const handleCheck = (e) => {
        e.preventDefault();

        if (values.container_id === ''| values.serial_no === '') {
        toast.error("Required fields cannot be empty.");
        }
        else {
        const url = 'http://127.0.0.1:8000/application/reservation_check/?container_id='+ values.container_id +'&serial_no='+ values.serial_no;
        return axios.get(url, {headers: headers})
            .then(res => {
            const container_details = res.data;

            console.log(container_details);

            if(container_details === "Container does not exist"){
                toast.error("Container does not exist."); 
                setTimeout(() => {
                    resetForm();
                }, 5000);
            }
            else if(container_details === "Container is already out"){
                toast.error("Container is already out"); 
                setTimeout(() => {
                    resetForm();
                }, 5000);
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

                        if (container_details[0]['out_tran']===false && container_details[0]['rsv']===false){
                            setValues({
                                container_id: container_details[0]['container_id'],
                                serial_no: container_details[0]['serial_no'],
                                date_in: container_details[0]['date_in'],
                                type: container_details[0]['type'],
                                size: container_details[0]['size'],
                                condition: container_details[0]['condition'],
                                customer: container_details[0]['customer'],
                                consignee: container_details[0]['consignee'],
                                ex_vessel: container_details[0]['ex_vessel'],
                                out_tran: container_details[0]['out_tran'],
                                reserved_to: '',
                                reservation_date: '',
                                reserved_on: '',

                            });
                        }
                        else{
                            setValues({
                                container_id: container_details[0]['container_id'],
                                serial_no: container_details[0]['serial_no'],
                                date_in: container_details[0]['date_in'],
                                type: container_details[0]['type'],
                                size: container_details[0]['size'],
                                condition: container_details[0]['condition'],
                                customer: container_details[0]['customer'],
                                consignee: container_details[0]['consignee'],
                                ex_vessel: container_details[0]['ex_vessel'],
                                out_tran: container_details[0]['out_tran'],
                                reserved_to: container_details[0]['reserved_to'],
                                reservation_date: container_details[0]['reservation_date'],
                                reserved_on: container_details[0]['reserved_on'],
                                rsv: container_details[0]['rsv'],

                            });
                        }
                    });               
                });
                return container_details[0];
            }
            });
        }
        
    }


    const handleReserve = (e) => {
        e.preventDefault();
        
        if(values.rsv == true){
          toast.error("Container already reserved");
        }
        else{
            try {
                const url = "http://127.0.0.1:8000/application/reserve/"
                let res = fetch(url,{
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({
                        container_id: values.container_id,
                        serial_no: values.serial_no,
                        reserved_to: values.reserved_to,
                        reservation_date: values.reservation_date,
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
      }

    return (
        <div className="containerReservation">
            <h2 className="title">Container Reservation</h2>

            <Grid container>
                <Grid item md={2.8}>
                    <FormInput id="container_id" label="Container" value={values.container_id} onChange={handleChange}/>
                </Grid>
                <Grid item md={1}>
                    <FormInput id="serial_no" label="Serial" value={values.serial_no} onChange={handleChange}/>
                </Grid>
                <Grid item md={1}>
                    <button type="submit" onClick={handleCheck} className="buttonCheck">Check</button> 
                </Grid>
            </Grid>

            <div className="containerRsvp_box">
                <Grid container spacing={3}>
                        <Grid item md={7}>
                            <div className='box_border'>
                                
                                {/* Row 01 */}
                                <Grid container>
                                    <Grid item md={2.5}>
                                        <FormLabel heading="Date" value={values.date_in}/>
                                    </Grid>
                                    <Grid item md={2.5}>
                                        <FormLabel heading="Type" value={values.type}/>
                                    </Grid>
                                    <Grid item md={7}>
                                        <FormLabel heading="Consignee" value={values.consignee}/>
                                    </Grid>
                                    

                                </Grid>

                                {/* Row 02 */}
                                <Grid container>
                                    <Grid item md={2.5}>
                                        <FormLabel heading="Size" value={values.size}/>
                                    </Grid>
                                    <Grid item md={2.5}>
                                        <FormLabel heading="Condition" value={values.condition}/>
                                    </Grid>
                                    <Grid item md={7}>
                                        <FormLabel heading="Ex. Vessel" value={values.ex_vessel}/>
                                    </Grid>
                                </Grid>

                                {/* Row 03 */}
                                <Grid item md={12}>
                                        <FormLabel heading="Customer" value={values.customer}/>
                                </Grid>
                            </div>
                        </Grid>


                        <Grid item md={5}>
                            {/* Row 01 */}
                            <Grid item md={12}>
                                <div className="rectangle_heading">
                                    <h3 className="boxHeading">Reservation</h3>
                                </div>
                            </Grid>

                            {/* Row 02 */}
                            <Grid item md={12}>  
                                <FormInput 
                                    id="reserved_to" 
                                    label="Reserved To" 
                                    labelClassName="labelOut"
                                    value={values.reserved_to} 
                                    onChange={handleChange}
                                    placeholder={values.rsv == true ? values.reserved_to : null} 
                                    readOnly={values.rsv == true}
                                /> 
                            </Grid>

                            {/* Row 03 */}
                            <Grid container>   
                                <Grid item md={6}>  
                                    <FormInput 
                                        id="reservation_date" 
                                        label="Reservations Date"
                                        type="date"
                                        labelClassName="labelOut"
                                        value={values.reservation_date} 
                                        onChange={handleChange}
                                        placeholder={values.rsv === true ? values.reservation_date : null} 
                                        readOnly={values.rsv === true}
                                    /> 
                                </Grid>

                                <Grid item md={6}>
                                    {values.rsv === true ? <FormLabel heading="Reserved On" value={values.reserved_on}/> : null}
                                </Grid>
                                 
                            </Grid>
                            <button type="submit" onClick={handleReserve} className="buttonReserve">Reserve</button>
                            <ToastContainer /> 
                        </Grid>
                </Grid>
            </div>
        </div>
    );

}

export default ContainerReservation;