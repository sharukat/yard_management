import FormInput from "../../component/forms/FormInput";
import "./Container_Out.css";
import { useState } from "react";
import { Grid } from "@mui/material";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import FormLabel from "../../component/forms/FormLabel";

const Container_Out = () => {

  const initialValues = {
    containerNumber: "",
    serialNumber: "",
  }
  const [values, setValues] = useState(initialValues);
  const inputsContainer = [
    {id:1, label:"Container", name:"containerNumber", type:"text"},
  ]
  const inputsSerial = [
    {id:2, label:"Serial", name:"serialNumber", type:"text"},
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    setValues({...values,[e.target.name]: e.target.value,});
  };

  return (
    <div className="container_out">
      <h2 className="title">Container Outbound</h2>
      <form onSubmit={handleSubmit} id="contInForm">
        <Grid container>
          <Grid item md={3.2}>
            {inputsContainer.map(input => (
              <FormInput key={input.id} {...input} values={values[input.name]} onChange={onChange} className="formInputPage2" labelClassName="label" />
            ))}
          </Grid>
          <Grid item md={1.8}>

            {inputsSerial.map(input => (
              <FormInput 
              key={input.id} 
              {...input} 
              values={values[input.name]} 
              onChange={onChange} 
              className="formInputPage2" 
              labelClassName="label" 
              inputClassName="inputBox"
              />

            ))}
          </Grid>
          <Grid item md={0.8}>
            <button type="submit" onClick={handleSubmit} className="buttonCheck">Check</button> 
          </Grid>  
        </Grid>
      </form>
      <div className="container_in_box">
        <div className="rectangle">

          <div className="rectangle_heading">
            <h3 className="boxHeading">Inbound</h3>
          </div>
          <div className="boxContent">
            <FormLabel heading="Date" value="22/10/2022" classTitle="t1" classValue="v1"/>
            <FormLabel heading="Type" value="HC" classTitle="t2" classValue="v3"/>
            <FormLabel heading="Size" value="20" classTitle="t2" classValue="v3"/>
          </div>
          <div className="boxContent">
            <FormLabel heading="Condition" value="DM" classTitle="t1" classValue="v3"/>
          </div>
          <div className="boxContent">
            <FormLabel heading="Customer" value="HPAG" classTitle="t1" classValue="v2"/>
          </div>
          <div className="boxContent">
            <FormLabel heading="Consignee" value="TRICO" classTitle="t1" classValue="v2"/>
          </div>
          <div className="boxContent">
            <FormLabel heading="Ex-Vessel" value="AQ8" classTitle="t1" classValue="v2"/>
          </div>
          <div className="boxContent">
            <FormLabel heading="Arrival Date" value="13/07/2022" classTitle="t1" classValue="v1"/>
          </div>
        </div>

        <div className="rectangle">
          <div className="rectangle_heading">
            <h3 className="boxHeading">Outbound</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container_Out;