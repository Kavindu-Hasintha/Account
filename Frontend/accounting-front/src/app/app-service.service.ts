import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http : HttpClient) {}

  userID: any;
  setID(id: any) {
    this.userID = id;
    console.log("App-service user id = ", this.userID);
  }
  getID() {
    return this.userID;
  }

  getData() {
    return this.http.get('/api/getData');
  }

  // Login
  loginData(data: any) {
    console.log('app-ss', data);
    return this.http.post('/api/login', data);
  }

  // Signup
  signupData(data: any) {
    console.log('Signup, app-ss =>', data);
    return this.http.post('/api/signup', data);
  }

  // Add P&L values
  addPLValues(data: any) {
    console.log("P&L values APP => ", data);
    return this.http.post('/api/addplvalues', data);
  }

  // Add SFP values
  addSFPValues(data: any) {
    return this.http.post('/api/addsfpvalues', data);
  }

  // Get Sales
  getSales(data: any) {
    return this.http.post('/api/getSales', data);
  }

  // Get Cost Of Sales
  getCostOfSales(data: any) {
    return this.http.post('/api/getCostOfSales', data);
  }

  // Get Other Income
  getOtherIncome(data: any) {
    return this.http.post('/api/getOtherIncome', data);
  }

  // Get Administrative Ex
  getAdministrative(data: any) {
    return this.http.post('/api/getAdministrative', data);
  }

  // Get Sales Dis Ex
  getSalesDis(data: any) {
    return this.http.post('/api/getSalesDis', data);
  }

  // Get Financial Ex
  getFinanicail(data: any) {
    return this.http.post('/api/getFinancial', data);
  }

  // Get Non-current Assets
  getNonCurrentAssets(data: any) {
    return this.http.post('/api/getNCA', data);
  }

  // Get current Assets
  getCurrentAssets(data: any) {
    return this.http.post('/api/getCA', data);
  }

  // Get Equity
  getEquity(data: any) {
    return this.http.post('/api/getE', data);
  }

  // Get Non-current Liabilities
  getNonCurrentLiabilities(data: any) {
    return this.http.post('/api/getNCL', data);
  }

  // Get current Liabilities
  getCurrentLiabilites(data: any) {
    return this.http.post('/api/getCL', data);
  }

}