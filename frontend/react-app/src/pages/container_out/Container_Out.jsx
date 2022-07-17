import FormInput from "../../component/forms/FormInput";
import "./Container_Out.css";
import { useState } from "react";
import { Grid } from "@mui/material";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

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
          <h3 className="boxHeading">Container Inbound</h3>
        </div>
        <div className="rectangle">
          <h3 className="boxHeading">Container Outbound</h3>
        </div>
      </div>
    </div>
  )
}

export default Container_Out;