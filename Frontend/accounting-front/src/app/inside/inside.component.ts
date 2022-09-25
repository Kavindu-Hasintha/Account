import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AnyForUntypedForms } from '@angular/forms';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.css']
})
export class InsideComponent implements OnInit {

  constructor(private service:AppServiceService) { }

  userID: any;
  salesdata: any;
  sumSalesData: any;
  costofsales: any;
  sumCost: any;
  otherincome: any;
  sumOther: any;
  administrative: any;
  sumAdministrative: any;
  salesDis: any;
  sumSalesDis: any;
  financial: any;
  sumFinancial: any;

  nca: any;
  sumnca: any;
  ca: any;
  sumca: any;
  equity: any;
  sumequity: any;
  ncl: any;
  sumncl: any;
  cl: any;
  sumcl: any;
  
  ngOnInit(): void {
  }

  getUserID() {
    this.userID = this.service.getID();
    console.log('inside userID = ', this.userID);
  }

  oci2 = new FormGroup({
    'Year' : new FormControl('', Validators.required),
    'CoChoose': new FormControl('', Validators.required),
    'CoName': new FormControl('', Validators.required),
    'CoValue': new FormControl('') 
  });

  getValue2() {
    this.getUserID();
    var valuearr = [this.userID];

    if(this.oci2.valid){

      if(this.oci2.value.CoValue == "" || this.oci2.value.CoValue == null) {
        this.oci2.value.CoValue = 0;
      }

      valuearr.push(this.oci2.value.Year);
      valuearr.push(this.oci2.value.CoChoose);
      valuearr.push(this.oci2.value.CoName);
      valuearr.push(this.oci2.value.CoValue);

      console.log(valuearr);
      this.service.addPLValues(valuearr).subscribe((res: any) => {
        console.log(res, 'res = >');
        this.oci2.reset();
        
        if(res.data == -1) {
          alert("User ID is undefined! Please Log In again!");
        }
        else if(res.data == 0) {
          alert(res.message);
        }
        else if(res.data == 1) {
          alert(res.message);
        }
      });

    }
    else {
      alert("Please fill year, section, and name!");
    }
  }

  ocinet = new FormGroup({
    'Year' : new FormControl('', Validators.required)
  });

  getNetProfit() {
    this.getUserID();
    var valuearr = [this.userID];

    if(this.ocinet.valid) {
      valuearr.push(this.ocinet.value.Year);
      console.log(valuearr);
      this.ocinet.reset();
      this.service.getSales(valuearr).subscribe((res: any) => {
        this.sumSalesData = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumSalesData += res.data[i].valu;
        }
        this.salesdata = res.data;
      });
      this.service.getCostOfSales(valuearr).subscribe((res: any) => {
        this.sumCost = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumCost += res.data[i].valu;
        }
        this.costofsales = res.data;
      });
      this.service.getOtherIncome(valuearr).subscribe((res: any) => {
        this.sumOther = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumOther += res.data[i].valu;
        }
        this.otherincome = res.data;
      });
      this.service.getAdministrative(valuearr).subscribe((res: any) => {
        this.sumAdministrative = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumAdministrative += res.data[i].valu;
        }
        this.administrative = res.data;
      });
      this.service.getSalesDis(valuearr).subscribe((res: any) => {
        this.sumSalesDis = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumSalesDis += res.data[i].valu;
        }
        this.salesDis = res.data;
      });
      this.service.getFinanicail(valuearr).subscribe((res: any) => {
        this.sumFinancial = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumFinancial += res.data[i].valu;
        }
        this.financial = res.data;
      });
    }
    else {
      alert("Please enter the year!");
    }
  }


  // SFP

  sfpa = new FormGroup({
    'sYear' : new FormControl('', Validators.required),
    'sfpChoose': new FormControl('', Validators.required),
    'sName': new FormControl('', Validators.required),
    'sValue': new FormControl('')
  });

  getValueSFPA() {
    this.getUserID();
    var valuesfp = [this.userID];

    console.log(this.sfpa.value);

    if(this.sfpa.valid){

      if(this.sfpa.value.sValue == "" || this.sfpa.value.sValue == null) {
        this.sfpa.value.sValue = 0;
      }

      valuesfp.push(this.sfpa.value.sYear);
      valuesfp.push(this.sfpa.value.sfpChoose);
      valuesfp.push(this.sfpa.value.sName);
      valuesfp.push(this.sfpa.value.sValue);

      console.log(valuesfp);
      this.service.addSFPValues(valuesfp).subscribe((res: any) => {
        console.log(res, 'res = >');
        this.sfpa.reset();
        
        if(res.data == -1) {
          alert("User ID is undefined! Please Log In again!");
        }
        else if(res.data == 0) {
          alert(res.message);
        }
        else if(res.data == 1) {
          alert(res.message);
        }
      });

    }
    else {
      alert("Please fill year, section, and name!");
    }
  }

  tael = new FormGroup({
    'Year' : new FormControl('', Validators.required)
  });

  getTotalAEL() {
    this.getUserID();
    var valuearr = [this.userID];

    if(this.tael.valid) {
      valuearr.push(this.tael.value.Year);
      console.log(valuearr);
      this.tael.reset();

      this.service.getSales(valuearr).subscribe((res: any) => {
        this.sumSalesData = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumSalesData += res.data[i].valu;
        }
        this.salesdata = res.data;
      });

      this.service.getCostOfSales(valuearr).subscribe((res: any) => {
        this.sumCost = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumCost += res.data[i].valu;
        }
        this.costofsales = res.data;
      });

      this.service.getOtherIncome(valuearr).subscribe((res: any) => {
        this.sumOther = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumOther += res.data[i].valu;
        }
        this.otherincome = res.data;
      });

      this.service.getAdministrative(valuearr).subscribe((res: any) => {
        this.sumAdministrative = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumAdministrative += res.data[i].valu;
        }
        this.administrative = res.data;
      });

      this.service.getSalesDis(valuearr).subscribe((res: any) => {
        this.sumSalesDis = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumSalesDis += res.data[i].valu;
        }
        this.salesDis = res.data;
      });

      this.service.getFinanicail(valuearr).subscribe((res: any) => {
        this.sumFinancial = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumFinancial += res.data[i].valu;
        }
        this.financial = res.data;
      });

      this.service.getNonCurrentAssets(valuearr).subscribe((res: any) => {
        this.sumnca = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumnca += res.data[i].valu;
        }
        this.nca = res.data;
      });

      this.service.getCurrentAssets(valuearr).subscribe((res: any) => {
        this.sumca = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumca += res.data[i].valu;
        }
        this.ca = res.data;
      });

      this.service.getEquity(valuearr).subscribe((res: any) => {
        this.sumequity = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumequity += res.data[i].valu;
        }
        this.equity = res.data;
      });

      this.service.getNonCurrentLiabilities(valuearr).subscribe((res: any) => {
        this.sumncl = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumncl += res.data[i].valu;
        }
        this.ncl = res.data;
      });

      this.service.getCurrentLiabilites(valuearr).subscribe((res: any) => {
        this.sumcl = 0;
        for(let i=0; i<res.data.length; i++) {
          this.sumcl += res.data[i].valu;
        }
        this.cl = res.data;
      });

    }
    else {
      alert("Please enter the year!");
    }
  }
}
