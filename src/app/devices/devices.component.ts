import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  amount = 'active';
  bodyText: string;
  constructor() { }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
  }
  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545');
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
  }
  login() {

  }

}
