import React, { Component } from 'react'
import axios from 'axios'
import './data.css'
import Block from './block'

class data extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data : null,
             err: null,
             country: 'World',
             countries: null
        }
        this.getRequest = this.getRequest.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);
    }

    getRequest(countryName){
        var link = 'https://covid19.mathdro.id/api';
        if(countryName!=''){
            link = link + '/countries/'+countryName
        }
        axios.get(link, true)
          .then(response =>{
              this.setState({
                  data: response.data
              })
          })
          .catch(error =>{
              console.log(error)
              this.setState({
                  err: error
              })
          })
    }

    buttonHandler(){
        const value = document.getElementById('input').value;
        console.log(value)
        this.getRequest(value)
        this.setState({
            country: value
        })
    }

    componentDidMount(){
        //https://covid19.mathdro.id/api/countries/India
        this.getRequest('')
        var link = 'https://covid19.mathdro.id/api/countries';
        axios.get(link, true)
          .then(response =>{
              this.setState({
                  countries: response.data.countries
              })
              console.log(this.state.countries)
          })
          .catch(error =>{
              console.log(error)
              this.setState({
                  err: error
              })
          })
    }
    
    render() {
        const data = this.state.data;
        const countries = this.state.countries;
        if(data==null || countries==null) {
            return <div>Something Went Wrong</div>
        }
        console.log(data)
        const confirmed =  data.confirmed.value
        const recovered = data.recovered.value
        const deaths = data.deaths.value
        const inf = ['Infected', 'Number of active cases']
        const rec = ['Recovered', 'Number of recovered cases']
        const dea = ['Deaths', 'Number of deaths caused']
        var time = data.lastUpdate
        return (
            <>
            <h2>In {this.state.country}</h2>
            <div className="section">
                <Block obj={confirmed} 
                des={inf} time={time} color="gray"/>
                <Block obj={recovered} 
                des={rec} time={time} color="green"/>
                <Block obj={deaths} 
                des={dea} time={time} color="red"/>
            </div>
            <div>
                <select onChange={this.buttonHandler} id="input">
                    {this.state.countries.map(country => (
                    <option value={country.name}>{country.name}</option>))}
                </select>
            </div>
            </>
        )
    }
}

export default data
