
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sharedConstants } from 'src/app/shared/sharedConstants';
import {Observable} from "rxjs";
import {User} from "../class/user";

@Injectable({
  providedIn: 'root'
})

export class ResourceService {

  defaultSize: number = 6500;
  coupureEppaisseur: number = 4;

  constructor(private http: HttpClient) { }

  calculer(data:any) {
    return this.http.post(sharedConstants.API_ENDPOINT+'rapport/', data);
  }
  getRapport() {
    return this.http.get(sharedConstants.API_ENDPOINT+'rapport');
  }
  deleteRapport(id: number) {
    return this.http.delete(sharedConstants.API_ENDPOINT+'rapport/' + id);
  }
  getById (id: number){
    return this.http.get(sharedConstants.API_ENDPOINT+'rapport/' + id);
  }
  updateRapport (id: number, data: any){
    return this.http.put(sharedConstants.API_ENDPOINT+'rapport/' + id, data);
  }

  getUser (): Observable<User[]>{
    return this.http.get<User[]>(sharedConstants.API_ENDPOINT+'users');
  }


  calcule67103(list:Array<{ id: number; type: number; width: number; height: number }>) {
    let piecesList = new Array;

    list.forEach(elem => {
      if(elem.type == 67) {
        piecesList.push(elem.width+70);
        piecesList.push(elem.width+70);
        piecesList.push(elem.height+70);
        piecesList.push(elem.height+70);
      }
    });

    let processData = this.process(piecesList);

    let data = {
      nbrBars : processData.nbrBars,
      piecesList : piecesList,
      dechetsList : processData.dechetsList
    }

    return data;
  }

  calcule67104(list:Array<{ id: number; type: number; width: number; height: number }>) {
    let piecesList = new Array;

    list.forEach(elem => {
      if(elem.type == 67) {
        piecesList.push(elem.height-64);
        piecesList.push(elem.height-64);
      }
    });

    let processData = this.process(piecesList);

    let data = {
      nbrBars : processData.nbrBars,
      piecesList : piecesList,
      dechetsList : processData.dechetsList
    }

    return data;
  }

  calcule67105(list:Array<{ id: number; type: number; width: number; height: number }>) {
    let piecesList = new Array;

    list.forEach(elem => {
      if(elem.type == 67) {
        piecesList.push(elem.height-64);
        piecesList.push(elem.height-64);
      }
    });

    let processData = this.process(piecesList);

    let data = {
      nbrBars : processData.nbrBars,
      piecesList : piecesList,
      dechetsList : processData.dechetsList
    }

    return data;
  }

  calcule67106(list:Array<{ id: number; type: number; width: number; height: number }>) {
    let piecesList = new Array;

    list.forEach(elem => {
      if(elem.type == 67) {
        piecesList.push((elem.width-156)/2);
        piecesList.push((elem.width-156)/2);
        piecesList.push((elem.width-156)/2);
        piecesList.push((elem.width-156)/2);
      }
    });

    let processData = this.process(piecesList);

    let data = {
      nbrBars : processData.nbrBars,
      piecesList : piecesList,
      dechetsList : processData.dechetsList
    }

    return data;
  }

  calcule67114(list:Array<{ id: number; type: number; width: number; height: number }>) {
    let piecesList = new Array;

    list.forEach(elem => {
      if(elem.type == 67) {
        piecesList.push(elem.width*4);
        piecesList.push(elem.height*4);
      }
    });

    let processData = this.process(piecesList);

    let data = {
      nbrBars : processData.nbrBars,
      piecesList : piecesList,
      dechetsList : processData.dechetsList
    }

    return data;
  }

  calcule40402(list:Array<{ id: number; type: number; width: number; height: number }>) {
    let piecesList = new Array;

    list.forEach(elem => {
      if(elem.type == 40) {
        piecesList.push(elem.width+70);
        piecesList.push(elem.width+70);
        piecesList.push(elem.height+70);
        piecesList.push(elem.height+70);
      }
    });

    let processData = this.process(piecesList);

    let data = {
      nbrBars : processData.nbrBars,
      piecesList : piecesList,
      dechetsList : processData.dechetsList
    }

    return data;
  }

  calcule40404(list:Array<{ id: number; type: number; width: number; height: number }>) {
    let piecesList = new Array;

    list.forEach(elem => {
      if(elem.type == 40) {
        piecesList.push((elem.width-46)/2);
        piecesList.push((elem.width-46)/2);
        piecesList.push((elem.height-42)/2);
        piecesList.push((elem.height-42)/2);
      }
    });

    let processData = this.process(piecesList);

    let data = {
      nbrBars : processData.nbrBars,
      piecesList : piecesList,
      dechetsList : processData.dechetsList
    }

    return data;
  }

  calcule40112(list:Array<{ id: number; type: number; width: number; height: number }>) {
    let piecesList = new Array;

    list.forEach(elem => {
      if(elem.type == 40) {
        piecesList.push(elem.height-55);
        piecesList.push(elem.height-55);
      }
    });

    let processData = this.process(piecesList);

    let data = {
      nbrBars : processData.nbrBars,
      piecesList : piecesList,
      dechetsList : processData.dechetsList
    }

    return data;
  }

  process(list:any) {
    let dechetsList = new Array;
    let nbrBars = 0;

    list.sort(function(a: any, b: any){return b - a});
    list.forEach(( piece: any ) => {
      if( dechetsList.length > 0 ) {
        dechetsList.sort(function(a, b) {return a - b});
        let closestDechetValue = 0
        closestDechetValue = this.closestSupValue( dechetsList, piece, closestDechetValue );
        if( closestDechetValue > 0 ) {
          let nvDechet = closestDechetValue - ( piece + this.coupureEppaisseur );
          dechetsList.splice( dechetsList.indexOf( closestDechetValue ), 1 );
          dechetsList.push( nvDechet );
        } else {
          nbrBars ++;
          let nvDechet = this.defaultSize - (piece + this.coupureEppaisseur );
          dechetsList.push( nvDechet );
        }
      } else {
        if( piece <= this.defaultSize ) {
          nbrBars ++;
          let dechet = this.defaultSize - ( piece + this.coupureEppaisseur );
          dechetsList.push( dechet );
        }
      }
    })

    return {
      nbrBars: nbrBars,
      dechetsList: dechetsList
    }
  }

  closestSupValue(array:any, goal:any, isclosest:any) {
    array.sort(function(a:any, b:any){return a - b});
    array.forEach((val:any) => {
      if(val>=goal) {
        if(isclosest == 0) {
          isclosest = val;
        }
      }
    })
    return isclosest;
  }
}
