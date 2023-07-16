import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public users: any=[];
  public fullName: string='';
  public role!: string;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService) { }

  ngOnInit() {
    this.api.getUsers().subscribe(res=>{
      this.users = res;
    });

    this.userStore.getFullnameFromStore().subscribe(val=>{
      const fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe(role=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role=role || roleFromToken;
    })
  }

  logout(){
    this.auth.signOut();
  }

}
