import FormInput from "../../component/forms/FormInput";
import "./Container_Out.css";
import { useState } from "react";
import { Grid } from "@mui/material";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import FormLabel from "../../component/forms/FormLabel";
import SelectInput from "../../component/forms/SelectInput";
import SearchInput from "../../component/forms/SearchInput";
import {headers, conditionOptions, statusOptions} from "../../component/forms/constValues";

const Container_Out = () => {

  const initialValues = {
    containerNumber: "",
    serialNumber: "",
  }

  let currentDate = new Date();
  

  const initialOutValues = {
    releaseOrderNo: "",
    shipper: "",
    vehicleOut: "",
    previousLocation: "",
    currentLocation: "",
    referenceNo: "",
    driverName: "",
    nic: "",
  }



  const [values, setValues] = useState(initialValues);
  const [outValues, setOutValues] = useState(initialOutValues);

  const inputsContainer = [{id:1, label:"Container", name:"containerNumber", type:"text"},]
  const inputsSerial = [{id:1, label:"Serial", name:"serialNumber", type:"text"},]

  const r1c1= [{id:1, label:"Release Order", name:"releaseOrderNo", type:"text"},]
  const r1c2= [{id:1, label:"Vehicle Out", name:"vehicleOut", type:"text"},]
  
  const r2c1 = [{id:1, label:"Shipper", name:"shipper", type:"text"},]
  const r2c2 = [{id:1, label:"Reference No", name:"referenceNo", type:"text"},]

  const r4c1 = [{id:1, label:"Previous Location", name:"previousLocation", type:"text"},]
  const r4c2 = [{id:1, label:"Current Location", name:"currentLocation", type:"text"},]

  const r5c1 = [{id:1, label:"Driver Name", name:"driverName", type:"text"},]
  const r5c2 = [{id:1, label:"NIC", name:"nic", type:"text"},]



  const [container, setContainer] = useState('');

  const handleCheck = (e) => {
    e.preventDefault();

    if (values.containerNumber === ''| values.serialNumber === '') {
      toast.error("Required fields cannot be empty.");
    }
    else {
      const url = 'http://127.0.0.1:8000/application/container_check/?container_id='+ values.containerNumber +'&serial_no='+ values.serialNumber;
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
                    setContainer(container_details[0]);
                  });
                
            });
            

            return container_details[0];
          }
        });
    }

  }

  const onChange = (e) => {
    setValues({...values,[e.target.name]: e.target.value,});
    setOutValues({...outValues,[e.target.name]: e.target.value,});
  };

  // ======================================== To Vessel ==================================================
  const [inputValueA, setValueA] = useState('');
  const [selectedValueA, setSelectedValueA] = useState(null);

  // handle To Vessel input change event
  const handleInputChangeA = value => {setValueA(value);};

  // handle To Vessel selection
  const handleChangeA = value => {setSelectedValueA(value);}

  const fetchVesselsA = () => {
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


  // =========================================================================================================

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(container['out_tran'] == true){
      toast.error("Container already out");
    }
    else{
      try {
        const url = "http://127.0.0.1:8000/application/container_out/"
        let res = fetch(url,{
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                container_id: values.containerNumber,
                serial_no: values.serialNumber,
                rel_order: outValues.releaseOrderNo,
                shipper: outValues.shipper,
                vehicle_out: outValues.vehicleOut,
                p_location: outValues.previousLocation,
                c_location: outValues.currentLocation,
                reference: outValues.referenceNo,
                driver: outValues.driverName,
                nic: outValues.nic,
                status_out: selectedStatusValue.value,
                condition_out: selectedCurrentCondValue.value,
                to_vessel: selectedValueA.vessel,
                date_out: outValues.date_out,
                time_out: outValues.time_out
                
                }),
        });
        res.then(res => res.json())
        .then(data => {
          console.log(data)
          if(data == "Success"){
            toast.success("Submission successful")
          }
          else{
            toast.error("Submission failed")
          } 
        })

      } catch (error) {
          console.log(error);
      } 

      setTimeout(() => {}, 2000);
      document.getElementById("contInForm").reset();
      

      


    }
    // document.getElementById("contInForm").reset();
    setContainer('');
    setValues('');
    // setOutValues(outValues.releaseOrderNo = '', outValues.shipper = '', outValues.vehicleOut = '', outValues.previousLocation = '', outValues.currentLocation = '', outValues.referenceNo = '', outValues.driverName = '', outValues.nic = '', outValues.date_out = '', outValues.time_out = '');
    // setValueA("");
    // setSelectedValueA("");
    // setSelectedStatusValue("");
    // setCurrentSelectedCondValue("");
    // setSelectedStatusValue("");

    // console.log("Values:",values);
    // console.log("Out Values:",outValues);
    // console.log("Selected Value:",selectedValueA);
    // console.log("Status Value:",selectedStatusValue);
    // console.log("Condition Value:",selectedCurrentCondValue);
  }


  return (
    <div className="container_out">
      <h2 className="title">Container Outbound</h2>
      <form onSubmit={handleSubmit} id="contInForm">
        <Grid container>
          <Grid item md={2.8}>
            {inputsContainer.map(input => (
              <FormInput key={input.id} {...input} values={values[input.name]} onChange={onChange} className="formInputPage2" labelClassName="label" />
            ))}
          </Grid>
          <Grid item md={1}>

            {inputsSerial.map(input => (
              <FormInput key={input.id} {...input} values={values[input.name]} onChange={onChange} className="formInputPage2" />

            ))}
          </Grid>
          <Grid item md={1}>
            <button type="submit" onClick={handleCheck} className="buttonCheck">Check</button> 
          </Grid>
        </Grid>
      </form>
      
      <div className="container_in_box">
        <Grid container spacing={2}>

          {/* =========================================Grid Column 01 ========================================= */}
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
                <FormLabel heading="Date" value={container['date_in']}/>
              </Grid>
              <Grid item md={2.5}>
                <FormLabel heading="Type" value={container['type']}/>
              </Grid>
              <Grid item md={2.5}>
                <FormLabel heading="Size" value={container['size']}/>
              </Grid>
              <Grid item md={2.5}>
                <FormLabel heading="Condition" value={container['condition']}/>
              </Grid>
            </Grid>
            

            {/* Row 04 */}
            <Grid item md={12}>
              <FormLabel heading="Customer" value={container['customer']}/>
            </Grid>

            {/* Row 05 */}
            <Grid item md={12}>
              <FormLabel heading="Consignee" value={container['consignee']}/>
            </Grid>

            {/* Row 06 */}
            <Grid container>
              <Grid item md={8.5}>
                <FormLabel heading="Ex-Vessel" value={container['ex_vessel']}/>
              </Grid>
              <Grid item md={3.5}>
                <FormLabel heading="Arrival Date" value={container['arr_date']}/>
              </Grid>
            </Grid>
            
          </Grid>

          {/* =========================================Grid Column 02 ========================================= */}
          <Grid item md={7}>

            {/* Row 01 */}
            <Grid item md={12}>
              <div className="rectangle_heading2">
                <h3 className="boxHeading">Outbound</h3>
              </div>
            </Grid>

            {/* Row 02 */}
            <Grid container>
              <Grid item md={4}>
                {r1c1.map(input => (
                  <FormInput key={input.id} {...input} values={outValues[input.name]} onChange={onChange} labelClassName="labelOut" placeholder={container['out_tran'] == true ? container['rel_order'] : null} readOnly={container['out_tran'] == true}/> 
                ))}
              </Grid>
              <Grid item md={3}>
                {r1c2.map(input => (
                  <FormInput key={input.id} {...input} values={outValues[input.name]} onChange={onChange} labelClassName="labelOut" placeholder={container['out_tran'] == true ? container['vehicle_out'] : null} readOnly={container['out_tran'] == true}/> 
                ))}
              </Grid>
              <Grid item md={2.5}>
                <SelectInput key={statusOptions.key} options={statusOptions} label="Status Out" onChange={handleChangeStatus} 
                value={selectedStatusValue} className="selectInput" labelClass="labelOut" placeholder= {container['out_tran'] == true ? container['status_out'] : null} isDisabled={container['out_tran'] == true ? true : false}/>
              </Grid>
              <Grid item md={2.5}>
                <SelectInput key={conditionOptions.key} options={conditionOptions} label="Condition Out" onChange={handleChangeCurrentCond} 
                value={selectedCurrentCondValue} labelClass="labelOut" placeholder= {container['out_tran'] == true ? container['condition_out'] : null} isDisabled={container['out_tran'] == true ? true : false}/>

              </Grid>
              
            </Grid>

            
            {/* Row 03 */}
            <Grid container>
              <Grid item md={8}>
                {r2c1.map(input => (
                  <FormInput key={input.id} {...input} values={outValues[input.name]} onChange={onChange} labelClassName="labelOut" placeholder={container['out_tran'] == true ? container['shipper'] : null} readOnly={container['out_tran'] == true}/> ))}
              </Grid>
              <Grid item md={4}>
                {r2c2.map(input => (
                  <FormInput key={input.id} {...input} values={outValues[input.name]} onChange={onChange} labelClassName="labelOut" placeholder={container['out_tran'] == true ? container['reference'] : null} readOnly={container['out_tran'] == true}/> ))}
              </Grid>
            </Grid>
            
            <Grid item md={12}>
              <SearchInput 
                label="To Vessel" 
                labelClass="labelOut"
                value={selectedValueA} 
                getOptionLabel={e => e.vessel + ' - '+e.name}
                getOptionValue={e => e.id} 
                loadOptions={inputValueA.length >2 ? fetchVesselsA : null} 
                onInputChange={handleInputChangeA} 
                onChange={handleChangeA}
                placeholder= {container['out_tran'] == true ? container['to_vessel'] : "Type more than 2 characters to search"} 
                isDisabled={container['out_tran'] == true ? true : false}
                />
            </Grid>

            <Grid container>
              <Grid item md={6}>
                {r4c1.map(input => (   
                  <FormInput key={input.id} {...input} values={outValues[input.name]} onChange={onChange} labelClassName="labelOut" placeholder={container['out_tran'] == true ? container['p_location'] : null} readOnly={container['out_tran'] == true}/>
                ))}
              </Grid>
              <Grid item md={6}>
                {r4c2.map(input => (   
                  <FormInput key={input.id} {...input} values={outValues[input.name]} onChange={onChange} labelClassName="labelOut" placeholder={container['out_tran'] == true ? container['c_location'] : null} readOnly={container['out_tran'] == true}/>
                ))}
              </Grid>
            </Grid>
            
            <Grid container>
              <Grid item md={8}>
                {r5c1.map(input => (
                  <FormInput key={input.id} {...input} values={outValues[input.name]} onChange={onChange} labelClassName="labelOut" placeholder={container['out_tran'] == true ? container['driver'] : null} readOnly={container['out_tran'] == true}/> ))}
              </Grid>
              <Grid item md={4}>
                {r5c2.map(input => (
                  <FormInput key={input.id} {...input} values={outValues[input.name]} onChange={onChange} labelClassName="labelOut" placeholder={container['out_tran'] == true ? container['nic'] : null} readOnly={container['out_tran'] == true}/> ))}
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </div>
      <button type="submit" onClick={handleSubmit} className="buttonSubmit">Submit</button>
      <ToastContainer /> 
    </div>
  )
}

export default Container_Out;