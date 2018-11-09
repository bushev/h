import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventService } from '../../services/event.service';
// import set = Reflect.set;
// declare const Mazemap;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  public events = [];

  constructor(
    public navCtrl: NavController,
    private eventService: EventService
    ) {
    // setTimeout(() => {
    //   let myMap = new Mazemap.Map({container: 'mazemap-container'});
    //
    //   myMap.on('click', function(e){
    //     myMap.flyTo({center:e.lngLat, zoom: 18});
    //   });
    // }, 1000);
  }

  public async ngOnInit() {
    await this.getEvent();
  }

  public async getEvent() {
    await this.eventService.getEvents()
      .subscribe(
        data => {
          this.events = data;
        },
        error => {
          // this.toastr.error('TEST FAIL');
        });
  }

  public getCardBg(event) {
    if (event.images[0]) {
      return {
        background: `url("${event.images[0]}")`
        }
    } else {
      return {
        "background-color": '#3e3e3e',
      };
    }
  }
}
