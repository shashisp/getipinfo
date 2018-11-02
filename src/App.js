import React, { Component } from 'react';

import './App.css';


class App extends Component {

 constructor(props) {
    super(props);

    this.state = {
      query: '',
      ip: {},
      error: null
    }

  }


  componentDidMount() {
    fetch("https://ip.nf/me.json")
    .then(response => response.json())
    .then(json => {
      const ip = json.ip;
      this.setState({ip});
      this.setState({query:ip.ip});
      console.log(this.state);
    })
  }
  

  search(){
    const BASE_URL = 'https://ip.nf/'

    const validate = require('ip-validator');

    if(validate.ipv4(this.state.query))
    {

    const FETCH_URL = BASE_URL +  this.state.query +'.json'


    fetch(FETCH_URL, {
      method: 'GET'
    })

    .then(response => response.json())
    .then(json => {
      const ip = json.ip;
      this.setState({ip});
      this.setState({query:ip.ip});

    });

    }
    else{
    this.setState({error: 'Invalid IP'});      
    }



  }





  render() {
    return (
      <div className="App">

             <div style={{marginTop: 50}}>
                <h3>GET IP info</h3>
                <form>
                    <div className="form-group">
                        <label>IP Address:  </label>
                        {this.state.error}
                        <input type="text" value={this.state.query}
                          onChange={event => {this.setState({query: event.target.value})}}
                         className="form-control"/>
                    </div>

                    <div className="form-group">
                        <input type="button" onClick={() => this.search()} value="Get Info" className="btn btn-primary"/>
                    </div>
                </form>

                <p> IP: {this.state.ip.ip} </p>
                <p> ASN: {this.state.ip.asn} </p>
                <p> City: {this.state.ip.city} </p>
                <p> country code: {this.state.ip.country} </p>
                <p> Lat: {this.state.ip.latitude} </p>
                <p> long: {this.state.ip.longitude} </p>
                <p> Postcode: {this.state.ip.post_code} </p>
            </div>

      </div>
    );
  }
}

export default App;
