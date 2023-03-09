import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DataService } from '../services/data.service';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  notes: any = [];

  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
  ) {
    this.dataService.getNotesByOservable().subscribe(res => {
      console.log(res);
      this.notes = res;    
    })
  }

  async openNote(note: Note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id }, // 객체를 사용하여 모달 페이지로 데이터를 전달
      breakpoints: [0, 0.5, 0.8], // 배열을 사용하여 모달이 표시되는 화면 크기에 따라 다른 스타일을 적용
      initialBreakpoint: 0.5 // 모달이 처음 표시될 때 적용할 기본 화면 크기를 설정, 모달이 화면의 50%만 차지하는 스타일이 적용
    });
    modal.present();
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        { 
          name: 'name', 
          placeholder: '이름을 입력하세요',
          type: 'text',
        },
        { 
          name: 'text', 
          placeholder: '직업을 입력하세요',
          type: 'textarea',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.addNote({
              title: res.title,
              text: res.text
            });
          }
        }      
      ]
    });

    await alert.present();

  }

}
