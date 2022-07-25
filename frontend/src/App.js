import { useState } from "react";
import {
  Button
} from "reactstrap";

import axios from "axios";
const url = "http://localhost:8000"


//const paramsglobal= [];


const paramslist = []
const checkedservices = [];
const List = []
var paramsl = []


let maps = new Map();

function displayParams(p) {
  console.log("paramsssssss - " + p.data.params + " - " + p.data.service_name)
  
  paramslist.push(p.data.params)
  console.log(paramslist)
}

function displaynew(res) {
  console.log("resp" + res)
}

//function displayParams(p) {
//  if (p.data.service_name == "kk"){
//    console.log("paramsssssss"+p.data.params)
//  }
//  console.log(p.data.service_name +"--"+p.data.params)
//}

var services = ["Lambda", "Kinesis", "S3"]
export default function App() {
  const [checkedState, setCheckedState] = useState(
    new Array(services.length).fill(false)
  );
  //const state = { values: [] };
  var updatedCheckedState = [];



  //const refreshList = () => {
  //  console.log("ok")
  //};

  const AddToDb = async () => {

    let formField = new FormData()
    console.log(JSON.stringify(maps))
    console.log(paramsl.join("<#>"))
    for (var i = 0; i < paramsl.length; i++) {
      formField.append('arr[]', paramsl[i]);
    }
    axios
    .post(url + "/api/servstatic", JSON.stringify(maps))
    .then(res => console.log(res))
    .catch(error => console.err(error))
  }



  const handleOnChange = (position) => {
    updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const [values, setValues] = useState("");

  const handleInputChange = (i, e, index) => {
    const { value } = i.target.value;
    setValues({
      ...values,
      [e]: value,
    })
    console.log(checkedservices[index]+"</>"+value+"!"+i.target.value)
    
    //console.log(maps[1].service_name)
    //e: nom param
    //console.log("e"+e)
    //console.log("i"+i)
    //console.log (i.target.value)
    //paramsl.push(i.target.value)
    paramsl[index] = i.target.value
    //maps.set(e,i.target.value)
    var param_value = i.target.value
    var param_name = e
    maps[index] = {service_name : checkedservices[index] , params : {param_name , param_value}}
    console.log("listis " + paramsl)
    console.log("index "+index)
    console.log("nomserv " + checkedservices[index])


    // axios
    //  .post(url+"/api/servstatic", checkedservices[index])
    // .then((res) => console.log(res))
    // .catch((err) => console.log(err));
    // fetch('http://localhost:8000/servstatic', {
    //method: 'POST', //or your desired method here
    // body: JSON.stringify(paramslist)[]
    //})





  };



  //const [message, setMessage] = useState('');

  //const handleChange = (i,e) => {


  // setMessage(i.target.value);

  // console.log('value is:', i.target.value);
  // };


  const getServiceParms = () => {

    for (let i = 0; i < checkedState.length; i++) {
      if (checkedState[i]) {
        checkedservices.push(services[i])
      }
    }
    console.log('checked services  are :' + checkedservices)
    for (let i = 0; i < checkedservices.length; i++) {
      console.log("i : " + i)
      console.log(checkedservices[i])
      axios
        .get(url + "/api/servstaticName/" + checkedservices[i])
        .then((res) => displayParams(res))
        .catch((err) => console.log(err));
    }
  }

  return (

    <div className="App">

      <h3> Select services </h3>
      <ul className="service-list">
        {services.map((service, index) => (
          <li key={index}>
            <div className="service-list-item">
              <div className="left-section">
                <input
                  type="checkbox"
                  id={`custom-checkbox-{index}`}
                  name={service}
                  value={service}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                />
                <label htmlFor={`custom-checkbox-{index}`}>{service}</label>
              </div>
            </div>
          </li>
        ))}

      </ul>

      <Button
        color="success"
        onClick={() => getServiceParms()}
      >
        Next
      </Button>


      <ul>

        {paramslist.map((value, index) => {
          return (
            <label>{value} {checkedservices[index]}
              <input type="text" key={index} onChange={(e) => handleInputChange(e, value, index)} ></input>
            </label>)
        })}
        
      </ul>

      <Button
        color="success"
        onClick={() => AddToDb()}
      >
        ADD TO DATABASE
      </Button>
      
    </div>
  );
}