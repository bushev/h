import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import set = Reflect.set;
// declare const Mazemap;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    // setTimeout(() => {
    //   let myMap = new Mazemap.Map({container: 'mazemap-container'});
    //
    //   myMap.on('click', function(e){
    //     myMap.flyTo({center:e.lngLat, zoom: 18});
    //   });
    // }, 1000);
  }
}
