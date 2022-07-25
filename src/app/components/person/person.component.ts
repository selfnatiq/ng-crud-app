import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  @Input() person: Person = { name: '', location: '' };
  @Output() deletePersonEvent = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  editPerson(id: string) {
    this.router.navigate(['/person/edit/' + id]);
  }

  deletePerson(id: string) {
    this.deletePersonEvent.emit(id);
  }
}
