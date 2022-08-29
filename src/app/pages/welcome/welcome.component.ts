import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  id = 0;
  title = 'interface';
  familyId = 0;
  isVisible: boolean = false;
  listIsLoading: boolean = false;
  validateForm!: FormGroup;
  list: Array<{ id: number; type: number; width: number; height: number }> = [];
  result:any = null;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private resourceService: ResourceService, private router: Router) {}

  ngOnInit(): void {
    if(!localStorage.getItem('connected')) {
      this.router.navigate(['/login'])
    }
    this.validateForm = this.fb.group({
      height: [null, [Validators.required]],
      width: [null, [Validators.required]]
    });
  }

  addToList(id: number) {
    this.familyId = id;
    this.isVisible = true;
  }

  handleOk() {
    let data = null
    if (this.validateForm.valid) {
      this.listIsLoading = true;
      data = {
        id:this.id,
        type:this.familyId,
        width:parseInt(this.validateForm.value.width),
        height:parseInt(this.validateForm.value.height),
      }
      this.list.push(data);
      console.log(this.list)
      this.isVisible = false;
      this.validateForm.reset();
      this.id ++;
      setTimeout(() => {
        this.listIsLoading = false;
      }, 500);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel() {
    this.isVisible = false;
    this.validateForm.reset();
  }

  edit(id: number) {

  }

  remove(id: number) {

  }

  calculeFront() {
    if(this.list.length > 0) {
      this.loading = true;
      let data67103 = this.resourceService.calcule67103(this.list);
      let data67104 = this.resourceService.calcule67104(this.list);
      let data67105 = this.resourceService.calcule67105(this.list);
      let data67106 = this.resourceService.calcule67106(this.list);
      let data40402 = this.resourceService.calcule40402(this.list);
      let data40404 = this.resourceService.calcule40404(this.list);
      let data40112 = this.resourceService.calcule40112(this.list);
      // let data67114 = this.resourceService.calcule67114(this.list);

      let result = {
        famille67: {
          result103: data67103,
          result104: data67104,
          result105: data67105,
          result106: data67106,
          // result114: data67114
        },
        famille40: {
          result402: data40402,
          result404: data40404,
          result112: data40112
        }
      }
      console.log(this.loading);
      setTimeout(() => {
        this.loading = false;
        console.log(this.loading);
        this.result = result;
        console.log(this.result);
        console.log(this.result.length);
      }, 1000);
    }
  }

}
