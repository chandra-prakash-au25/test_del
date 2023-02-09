import React from 'react'
import './login.css';
import { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';
const Home = () => {


  console.log(localStorage.getItem("dataKey"))
  const [source,setSource]=useState('')
  const [dest,setDest]=useState('')
  const [adult,setAdult]=useState('')
  const [child,setChild]=useState('')
  const [date,setDate]=useState('')
  const [retrn,setReturn]=useState('')
  const [city,setCity]=useState({})
  const [datas,setdataS]=useState('')

  const handleClick=(e)=>{
    const ids=city_id()
    console.log(ids[0],ids[1])
    const supplierIds=s_get_id(ids[0],ids[1])
    const data={
        "segments": {
            "ONEWAY" : {
                "sectorInfo": {"src":{"id":ids[0]},"dest":{"id":ids[1]},"date":date},
                "supplierIds": supplierIds
            },
            "RETURN" : {
                "sectorInfo": {"src":{"id":ids[1]},"dest":{"id":ids[0]},"date":date},
                "supplierIds":supplierIds
            }
        },
    
        "paxCount": {
            "adt": adult,
            "chd": child
        },
        "api": "JOURNEY",
        "senior": false,
        "isReturn": retrn
    
    }
    axios.post('/apiv2/bus/bus-search?authToken=a71fbcc0-b89f-ae9b-b998-a771b3b4a24f&__xreq__=true',data
    ).then((response) => {
      console.log(response.data)
    }).catch((err)=>{
      console.log(err)
    });
    e.preventDefault();
  }
  const s_get_id=(s_id,d_id)=>{
    var result;
    const data={
      "segments": {
          "ONEWAY" : {
              "sectorInfo":{"src":{"id":s_id},"dest":{"id":d_id},"date":date}
          }
      },
      "paxCount": {
          "adt": adult,
          "chd": child
      }
  }
    axios.post('/apiv2/bus/bus-search-supplier-list?authToken=a71fbcc0-b89f-ae9b-b998-a771b3b4a24f&__xreq__=true',data
    ).then((response) => {
      //console.log(response.data.suppliers['ONEWAY'])
      result=response.data.suppliers['ONEWAY']
      return result
    }).catch((err)=>{
      console.log(err)
    });
    
  }
  const city_id=()=>{
    var s_id=''
    var d_id=''
    console.log(city)
    for (const key in city) {
     
      if(city[key]==source){
        s_id=key
      }
      if(city[key]==dest){
        d_id=key
      }
  }
  return([s_id,d_id])
  }

  const Seat_map=()=>{

    axios.post('/apiv2/bus/bus-seatmap?authToken=a71fbcc0-b89f-ae9b-b998-a771b3b4a24f&__xreq__=true',{data:'5b4c1c14-c5e9-4fab-a0dc-88cad0bcab7c@@5de3bc75-483e-4dca-ad40-60af8de680af_ONE WAY'}
    ).then((response) => {
    console.log(response.data,"map called")
    }).catch((err)=>{
      console.log(err)
    });

  }

  const Ticket_review=()=>{
    const data={
      "keys": [
          "d541bbfd-efdb-4dc5-86aa-b0d7e9543dba@@a0d97410-6669-4486-bf2c-47d11edfe059_ONEWAY"
          ],
      "reviewJourneys": {
          "ONEWAY" : {
              "seats": [
              {
                  "seatNo": "7"
                  }
              ],
              "busStops": {
                  "pick": {
                      "id": 10163
                      },
                  "drop": {
                      "id": 1486
                      }
                  }
             }
      }
      }	
      
    axios.post('/apiv2/bus/bus-review?authToken=a71fbcc0-b89f-ae9b-b998-a771b3b4a24f&__xreq__=true',data
    ).then((response) => {
    console.log(response.data,"ticket review called")
    }).catch((err)=>{
      console.log(err)
    });
  }

  const Ticket_block=()=>{
    const data={
      "itinKey": "FMN0007BFWG",
    "identity": {
        "type": "AADHAR",
        "number": "123abc"
        },
    "mobile": "9898989898",
    "email": "test1902@gmail.com",
    "blockReq": {
        "ONEWAY" : {
            "travellers": [
            {			
                "title": "Mr", "name": "test", "age": "22", "seat": {
                    "seatNo": "1"    
                    }
                },
            {
                "title": "Mr", "name": "amit", "age": "25", "seat": {
                    "seatNo": "7"
                    }
                } 			
            ],
          "stops": {
              "pick": {
                  "id": 10163, "name": "Mehidhipatnam"
                  },
              "drop": {
                  "id": 1486,
                  "name": "hebbal"
                  }
              }
          }
      }
    }
    axios.post('/apiv2/bus/bus-blocking?authToken=a71fbcc0-b89f-ae9b-b998-a771b3b4a24f&__xreq__=true',data
    ).then((response) => {
    console.log(response.data,"ticket blockrd api called")
    }).catch((err)=>{
      console.log(err)
    });
  }
  const Ticket_book=()=>{
    const data={
      "itinKey": "FMNJB1INGSZW0",
      "deliveryData": {
          "mobile": "9898989898",
          "email": "test1902@gmail.com"
          },
      "productType": "BUS",
      "payment": {
          "paymentMode": "Deposit",
          "paymentSubType": "99",
          "productType": "BUS"
          }
      }
      axios.post('/apiv2/bus/book?authToken=a71fbcc0-b89f-ae9b-b998-a771b3b4a24f&__xreq__=true',data
      ).then((response) => {
      console.log(response.data,"ticket blooked")
      }).catch((err)=>{
        console.log(err)
      });

  }
  const Ticket_C_policy=()=>{
   const data={
    "key": "2d4213b0-e439-4489-a6a2-4c5d11d6b650@@526b89dd-dbee-4154-8b83-7ff4d617dd37_ONEWAY"
   }
    
    axios.post('/apiv2/bus/bus-cancellation-policy?authToken= a71fbcc0-b89f-ae9b-b998-a771b3b4a24f&__xreq__=true',data
    ).then((response) => {
    console.log(response.data,"ticket cancel policy")
    }).catch((err)=>{
      console.log(err)
    });
  }
  const Ticket_cancel=()=>{
    const data={
      "productType":"BUS",
      "reviewRequest":{
         "referenceNo":"FMN00078LKC",
         "segments":{
            "ONEWAY":{
               "orderItemId":1594,
               "cancelType":"PARTIAL",
               "seats":[
                  {
                     "seatNo":"3"
                  }
               ]
            },
            "RETURN":{
               "orderItemId":1595,
               "cancelType":"FULL",
               "seats":[
                  {
                     "seatNo":"A2"
                  },
                  {
                     "seatNo":"B2"
                  }
               ]
            }
         }
      }
   }
     
     axios.post('/apiv2/booking/cancellation/review/true?authToken=a71fbcc0-b89f-ae9b-b998-a771b3b4a24f&requestSource=NODE_B2C&__xreq__=true',data
     ).then((response) => {
     console.log(response.data,"ticket blooked")
     }).catch((err)=>{
       console.log(err)
     });
   }
  useEffect(() => {
    axios.get('/apiv2/bus/bus-city-list'
    ).then((response) => {
      setCity(response.data.responseData)

    }).catch((err)=>{
      console.log(err)
    });
  },[]);
  return (
    <div>
      <div className='nav'>
        <div  className='nav-items'><input  type="text" placeholder='From'
        onChange={(e)=>setSource(e.target.value)}></input></div>
        <div  className='nav-items'><input  type="text" placeholder='Destination'
        onChange={(e)=>setDest(e.target.value)}></input></div>
        <div  className='nav-items'><input  type="text" placeholder='Childrens'
        onChange={(e)=>setChild(e.target.value)}></input></div>
        <div  className='nav-items'><input  type="text" placeholder='Adult'
        onChange={(e)=>setAdult(e.target.value)}></input></div>
        <div  className='nav-items'><input  type="text" placeholder='Date:2023-02-10'
        onChange={(e)=>setDate(e.target.value)}></input></div>
        <div  className='nav-items'><input  type="text" placeholder='return true'
        onChange={(e)=>setReturn(e.target.value)}></input></div>
        <div  className='nav-items'><button className='button' onClick={handleClick}>SEARCH</button></div>
      </div>
      <div className='container'>
        <div className='d-flex'>
        <button className='btn btn-primary' onClick={Seat_map}> GET SEAT MAP</button>
        <button className='btn btn-primary' onClick={Ticket_review}>Ticket review</button>
        <button className='btn btn-danger' onClick={Ticket_block}>Block ticket</button>
        <button className='btn btn-primary' onClick={Ticket_book}>Book ticket</button>
        <button className='btn btn-danger' onClick={Ticket_cancel}>Ticket cancel</button>
        <button className='btn btn-primary' onClick={Ticket_C_policy}>Ticket cancel policy</button>
        </div>
      </div>
    </div>
  )
}

export default Home