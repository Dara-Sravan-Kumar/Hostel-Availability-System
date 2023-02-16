import React from 'react'
import './css/Pricing.css'
import Footer from '../Footer'

const Pricing = () => {
    return (
        <React.Fragment>
         <center>     
            
         <div className="row border mb-6">
            
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 mb-5 shadow">
             <section className="content-container">
                <center><h2>Types of Rooms Available</h2></center>
        <div className="columns">
                <ul className="price">
                    <li className="col-header">Deluxe</li>
                    <li className="grey">Rs. 1,50,000 / year</li>
                    
                </ul>
                </div>

                <div className="columns">
                <ul className="price">
                    <li className="col-header" style={{backgroundColor:'#37387a'}}>AC</li>
                    <li className="grey">Rs 1,20,000 / year</li>
                
                    
                </ul>
                </div>

                <div className="columns">
                <ul className="price">
                    <li className="col-header">Non AC</li>
                    <li className="grey">Rs 90,000 / year</li>
                   
                </ul>
            </div>
            </section></div></div></center> 
            
        </React.Fragment>
    )
}

export default Pricing;