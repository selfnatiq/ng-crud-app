import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/interfaces/person';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
})
export class PersonFormComponent implements OnInit {
  @Input() person: Person = { name: '', location: '' };
  @Output() submitEvent = new EventEmitter<Person>();

  constructor() {}

  ngOnInit(): void {}

  submitPerson(person: Person) {
    this.submitEvent.emit(person);
  }
}
