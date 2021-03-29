import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  private timer: any;
  private date = new Date();
  
  public show: boolean = true;
  public disabled: boolean = false;
  public animate: boolean = false;
  @ViewChild("idAudio") idAudio: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  increment(type: 'H' | 'M' | 'S') {
    if (type === 'H') {
      if (this.hours >= 99) return;
      this.hours += 1;
    }
    else if (type === 'M') {
      if (this.minutes >= 59) return;
      this.minutes += 1;
    }
    else {
      if (this.seconds >= 59) return;
      this.seconds += 1;
    }
  }
  decrement(type: 'H' | 'M' | 'S') {
    if (type === 'H') {
      if (this.hours <= 0) return;
      this.hours -= 1;
    }
    else if (type === 'M') {
      if (this.minutes <= 0) return;
      this.minutes -= 1;
    }
    else {
      if (this.seconds <= 0) return;
      this.seconds -= 1;
    }
  }
  /* getValues() {
    this.date.setHours(this.hours);
    this.date.setMinutes(this.minutes);
    this.date.setSeconds(this.seconds);
    this.date.setMilliseconds(0);     //init value 0
    //console.log(this.date.getTime())
  }
 */
  updateTimer() {
    this.date.setHours(this.hours);
    this.date.setMinutes(this.minutes);
    this.date.setSeconds(this.seconds);
    this.date.setMilliseconds(0);
    const time = this.date.getTime();
    this.date.setTime(time - 1000);  //---

    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();

    if (this.date.getHours() === 0 &&
      this.date.getMinutes() === 0 &&
      this.date.getSeconds() === 0) {
      //stop interval
      clearInterval(this.timer);
      this.idAudio.nativeElement.play();
      this.animate = true;
      setTimeout(() => {
        this.stop();
        this.idAudio.nativeElement.load();
      }, 5000);

    }
  }

  start() {
    if (this.hours > 0 || this.minutes > 0 || this.seconds > 0) {

      this.disabled = true;
      this.show = false;  //hide btn + and -
      this.updateTimer();

      if(this.seconds > 0){
        this.timer = setInterval(() => {
          this.updateTimer();
        }, 1000);
      }     
    }
  }

  stop() {    
    this.disabled = false;
    this.show = true;
    this.animate = false;
    clearInterval(this.timer);
    this.idAudio.nativeElement.load();
  }

  reset() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.stop();
  }

}
