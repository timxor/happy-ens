import React, { Component } from 'react'
import EnsRelayContract from '../build/contracts/EnsRelay.json'
import getWeb3 from './utils/getWeb3'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Connect } from 'uport-connect'
import Web3 from 'web3'
const ENS = require('ethereum-ens');

import { Input, Label, Grid, Rail, Segment} from 'semantic-ui-react';

import './App.css';


const styles = {
  main: {
    textAlign: 'center',
    fontFamily: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
  },
  submit:{
    margin: '20px'
  },
  content: {
    margin: '20px'
  },
  title: {

  }
}

class App extends Component {
  constructor(props) {
    super(props)
    const self = this;
    self.state = {
      storageValue: 0,
      web3: null,
      account: '',
      EnsRelay:null
    };
    self.handleChange = self.handleChange.bind(self);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      console.log('Injected web3 detected.');
      this.setState({account: web3.eth.accounts[0]})
    } else {
      const uport = new Connect('happyENS');
      uport.requestCredentials().then((credentials)=>{
        // this.setState({credentials: credentials});
        // console.log(credentials);
        this.setState({account: credentials.address})
      });
    }

    /*
    getWeb3
    .then(results => {
      console.log("results", results);

      this.setState({
        web3: results.web3,
        account: results.web3.eth.accounts[0]
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')

    })
    */
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */



    const contract = require('truffle-contract')
    const EnsRelay = contract(EnsRelayContract)
    EnsRelay.setProvider(this.state.web3.currentProvider)
    // console.log(EnsRelay.at('0xae475c515df11b1b7760a2a9325c92da144baecf'))
    this.setState({EnsRelay : EnsRelay})
    // Declaring this for later so we can chain functions on SimpleStorage.
    // var EnsRelayInstance
    //
    // // Get accounts.
    // this.state.web3.eth.getAccounts((error, accounts) => {
    //   simpleStorage.deployed().then((instance) => {
    //     EnsRelayInstance = instance
    //
    //     // Stores a given value, 5 by default.
    //     return simpleStorageInstance.set(5, {from: accounts[0]})
    //   }).then((result) => {
    //     // Get the value from the contract to prove it worked.
    //     return simpleStorageInstance.get.call(accounts[0])
    //   }).then((result) => {
    //     // Update state with the result.
    //     return this.setState({ storageValue: result.c[0] })
    //   })
    // })
  }

  handleChange(event){
    this.setState({[event.target.id]: event.target.value});
    //console.log(event.target.value);
  }

  setDomain(){
    console.log(this.state.domainName);
    console.log(this.state.web3.eth.accounts[0]);
    const ens = new ENS(this.state.web3);
    console.log(ens);
    var ensOwner = ens.owner(this.state.domainName + '.eth')
    .then((address) => {
      console.log(address);
    })
    console.log(ensOwner === this.state.web3.eth.accounts[0])
    //check to see if owner matches web3.eth.accounts[0]
    if (ensOwner === this.state.web3.eth.accounts[0]) {
      // store the ensAddress to a struct with the owner and ipfsHash
      var EnsRelayInstance

      // Get accounts.
      this.state.web3.eth.getAccounts((error, accounts) => {
        this.state.EnsRelay.at('0xae475c515df11b1b7760a2a9325c92da144baecf').then((instance) => {
          EnsRelayInstance = instance

          // Stores a given value, 5 by default.
          return EnsRelayInstance.set(this.state.domainName, this.state.ipfsHash,{from: accounts[0]})
        }).then((result) => {
          console.log(result)
          // Get the value from the contract to prove it worked.
          return EnsRelayInstance.get(this.state.domainName, {from: accounts[0]})
        }).then((result) => {

          // Update state with the result.
          return result
        })
      })
    }
  }

  checkDomain(){
    console.log(this.state.getDomainName);
    var EnsRelayInstance
    this.state.EnsRelay.at('0xae475c515df11b1b7760a2a9325c92da144baecf').then((instance) => {
      EnsRelayInstance = instance

      // Gets the IPFS Hash stored at that domainName
      return EnsRelayInstance.get(this.state.getDomainName, {from: this.state.web3.eth.accounts[0]})
    }).then((result) => {
      console.log(result)
    })
  }

  render() {
    return (
      <div style={styles.main}>
        <h1><img src='https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg'  height='3%' width='3%'/>
          {this.state.account}
        </h1>
        <h1 className='fancy'>HAPPY - ENS</h1>
        <TextField
          hintText="ethereum"
          floatingLabelText="ENS"
          type="text"
          id="domainName"
          onChange={this.handleChange}
        />
        <Label>.eth</Label>
        <br />
        <TextField
          hintText="QmYDb8vr7GvxbbbirgJuU2TmZk2YbscAhxwRZ6D4hmVojB"
          floatingLabelText="IPFS Hash"
          type="text"
          id="ipfsHash"
          onChange={this.handleChange}
        />
        <br />
        <div style={styles.submit}>
          <RaisedButton label="Submit" primary={true} onClick={this.setDomain.bind(this)}/>
        </div>
        <h2 className='fancy'>ENS Hash</h2>
        <div style={styles.content}>
          <TextField
            hintText="ethereum"
            floatingLabelText="ENS"
            type="text"
            id="getDomainName"
            onChange={this.handleChange}
          />
          <Label>.eth</Label>
          <br />
          <div style={styles.submit}>
            <RaisedButton label="Get Hash" primary={true} onClick={this.checkDomain.bind(this)}/>
          </div>
        </div>

      </div>
    );
  }
}

export default App
