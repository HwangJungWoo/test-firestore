import { Injectable } from '@angular/core';
import { Firestore ,collectionData, docData, addDoc } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { map, Observable } from 'rxjs';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore,

  ) { }

  // relatimeDatabse 로 변경하면
  // const noteRef = this.databse.ref('note');
  // noteRef.on('value', (snapshot: any) => {
  //   데이터 변경사항 처리
  // });
  // Firestore에서 데이터베이스를 사용하여 문서 컬렉션(collection)에서 데이터를 가져오는 JavaScript 코드입니다
  // 즉, 이 코드는 Firestore에서 'note' 컬렉션에서 데이터를 가져와 관찰 가능한 Observable을 반환합니다. 
  // 이를 통해 코드가 데이터베이스에서 발생하는 변경 사항을 자동으로 처리할 수 있습니다.
  getNotes() {
    // irestore 인스턴스에서 'note'라는 이름의 컬렉션을 참조하는 noteRef 변수를 만듭니다. 
    // 이 변수는 나중에 컬렉션에서 데이터를 가져오는 데 사용됩니다.
    const noteRef = collection(this.firestore, 'notes');
    // collectionData() 함수를 호출하여 noteRef에서 가져온 데이터를 반환합니다.
    // 이 함수는 Firebase SDK에 내장된 함수 중 하나로, 
    // collectionData() 함수는 쿼리 결과에 대한 실시간 업데이트를 지원하는 Observables를 반환합니다. 
    // 이는 Firebase에서 발생하는 데이터 변경 사항을 자동으로 수신하고 효율적으로 처리할 수 있게 해줍니다.
    return collectionData(noteRef);
  }


  // idField 프로퍼티를 사용하여 문서 ID를 지정할 수 있습니다.
  // 이 코드에서 collectionData() 함수의 첫 번째 매개변수로 noteRef를 전달하고, 
  // 두 번째 매개변수로 { idField: 'id' } 객체를 전달하여 notes 컬렉션에서 모든 문서를 
  // 가져와서 Observables를 반환하고, 각 문서에 id 필드를 추가합니다. 
  // 이렇게 함으로써 notes 컬렉션의 문서를 Observable 배열로 반환하며, 각 문서에는 id 필드가 포함됩니다.
  getNotesAddID() {
    const noteRef = collection(this.firestore, 'notes');
    return collectionData(noteRef, { idField: 'id' });
  }

  // 제공되는 모델에 따른 받아오는 데이터 포맷을 맞춤
  getNotesByOservable(): Observable<Note[]> {
    const noteRef = collection(this.firestore, 'notes');
    return collectionData(noteRef, { idField: 'id' }) as Observable<Note[]>;
  }

  // 문서 id 를 이용해서 해당값만 가져옴
  // Firestore에서 id 파라미터에 해당하는 'notes' 컬렉션의 단일 문서 데이터를 
  // 가져와서 Observable<Note[]> 타입으로 반환합니다.
  /*
  getNotesById(id: string): Observable<Note[]> {
    const noteRef = this.database.ref(`notes/${id}`);
    return new Observable((observer) => {
      noteRef.once('value', (snapshot) => {
        const data = snapshot.val();
        observer.next(data);
      });
    });
  }
  */
  getNoteById(id: string): Observable<Note> {
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note>;
  }

  addNote(note: Note) {
    const notesRef = collection(this.firestore, `notes`);
    return addDoc(notesRef, note);
  }

  deleteNote(note: Note) {
    const notesDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(notesDocRef);
  }

  updateNote(note: Note) {
    const notesDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(notesDocRef, { title: note.title, text: note.text });
  }
} 
