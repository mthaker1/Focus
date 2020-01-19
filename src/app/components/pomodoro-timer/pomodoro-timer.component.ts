import { Component, OnInit } from '@angular/core';
import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';


@Component({
  selector: 'app-pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html',
  styleUrls: ['./pomodoro-timer.component.css']
})
export class PomodoroTimerComponent implements OnInit {

  timeMode: string;
  minutesInPomodoro: number = 25;
  minutesInShortBreak: number = 1;
  minutesInLongBreak: number = 15;


  secondsInMinute: number = 60;
  timeSetInSeconds: number;
  currMinuteTime: number;
  currSecondTime: number;
  currMinuteTimeString: string;
  currSecondTimeString: string;
  interval;
  isTimerActive: boolean;


  constructor(private _pushNotificationService: PushNotificationService) { 
  }

  ngOnInit() {
    this.timeSetInSeconds = this.minutesInPomodoro * this.secondsInMinute; 
    this.currMinuteTime = Math.floor(this.timeSetInSeconds / 60);
    this.currSecondTime = this.timeSetInSeconds%60;
    this.currMinuteTimeString = this.convertNumberToTimeString(this.currMinuteTime);
    this.currSecondTimeString = this.convertNumberToTimeString(this.currSecondTime);
    this.timeMode = "pomodoro";
    this.isTimerActive = false;
    this._pushNotificationService.requestPermission();
  }


  notifyUser() {
    const title = 'Timer has been completed';
    const options = new PushNotificationOptions();
    options.body = '';
 
    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 3000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
    (err) => {
         console.log(err);
    });
  }

  clearIntervalTimer(){
    clearInterval(this.interval);
    this.isTimerActive = false;
  }


  convertNumberToTimeString(timeVal: number){
    if(timeVal >= 0 && timeVal <= 9){
      return  "0" + timeVal.toString();
    }
    else{
      return timeVal.toString();
    }
  }


  setMode(newMode: string){
    
    if(this.timeMode != newMode){
      this.clearIntervalTimer();
      this.timeMode = newMode;
      if(this.timeMode=="pomodoro"){
        this.timeSetInSeconds = this.minutesInPomodoro * this.secondsInMinute; 
      }
      else if(this.timeMode=="shortBreak"){
        this.timeSetInSeconds = this.minutesInShortBreak * this.secondsInMinute;
      }
      else if(this.timeMode == "longBreak"){
        this.timeSetInSeconds = this.minutesInLongBreak * this.secondsInMinute;
      }
      
      this.currMinuteTime = Math.floor(this.timeSetInSeconds / 60);
      this.currSecondTime = this.timeSetInSeconds%60;
      this.currMinuteTimeString = this.convertNumberToTimeString(this.currMinuteTime);
      this.currSecondTimeString = this.convertNumberToTimeString(this.currSecondTime);
    }
  }



  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeSetInSeconds > 0) {
        this.timeSetInSeconds--;
        this.currMinuteTime = Math.floor(this.timeSetInSeconds/60);
        this.currSecondTime = this.timeSetInSeconds%60;
        this.currMinuteTimeString = this.convertNumberToTimeString(this.currMinuteTime);
        this.currSecondTimeString = this.convertNumberToTimeString(this.currSecondTime);
      } else {
        this.timeSetInSeconds = 0;
        this.currMinuteTime = 0;
        this.currSecondTime = 0;
        this.currMinuteTimeString = this.convertNumberToTimeString(this.currMinuteTime);
        this.currSecondTimeString = this.convertNumberToTimeString(this.currSecondTime);
        this.notifyUser();
        clearInterval(this.interval);
      }
    },1000)
  }

  stopTimer(){
    this.clearIntervalTimer();
  }

  resetTimer(){
    this.clearIntervalTimer();

    if(this.timeMode=="pomodoro"){
      this.timeSetInSeconds = this.minutesInPomodoro * this.secondsInMinute; 
    }
    else if(this.timeMode=="shortBreak"){
      this.timeSetInSeconds = this.minutesInShortBreak * this.secondsInMinute;
    }
    else if(this.timeMode == "longBreak"){
      this.timeSetInSeconds = this.minutesInShortBreak * this.secondsInMinute;
    }

    this.currMinuteTime = Math.floor(this.timeSetInSeconds / 60);
    this.currSecondTime = this.timeSetInSeconds%60;
    this.currMinuteTimeString = this.convertNumberToTimeString(this.currMinuteTime);
    this.currSecondTimeString = this.convertNumberToTimeString(this.currSecondTime);
  }



}
