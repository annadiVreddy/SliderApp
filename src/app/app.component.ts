import { Component, OnInit } from '@angular/core';
import { MemberServiceService } from './member-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './bootstrap.min.css']
})
export class AppComponent implements OnInit {
  allMembers:any = [];
  filteredMembers:any;
  initialVal=1;
  min = 1;
  max = 3;
  sliderDisabled = true;

  constructor(private memberServiceService : MemberServiceService){}

  ngOnInit(){ this.getMembers();}

  onChange(event){
    this.initialVal = event;
    if(event == 1){
      this.getFilteredMembers('Active');
    }else if(event ==2){
      this.getFilteredMembers('Expired');
    }else{
      this.getFilteredMembers('Future');
    }
  }

  getMembers () {
    this.memberServiceService.getMemberData().subscribe(
      data => {
        this.allMembers = data; 
        this.getFilteredMembers('all');       
      });
  }

  getFilteredMembers(status){
    this.filteredMembers = [];
    if(status !== 'all'){
      for(var i=0; i<this.allMembers.length; i++){
        if(status == this.allMembers[i].status){
          this.filteredMembers.push(this.allMembers[i]);
        } 
      } 
    }else{
      this.filteredMembers = this.allMembers;
    }
  }

  switchFilter(){
    this.sliderDisabled = !this.sliderDisabled;
    
    if(this.sliderDisabled){
      this.getFilteredMembers('all')
    }else{
      this.onChange(this.initialVal);
    }
  }

}
