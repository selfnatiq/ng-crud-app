import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Person } from 'src/app/interfaces/person';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit, OnDestroy {
  people: Person[] = [];
  peopleSubscription: Subscription = new Subscription();

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople() {
    this.peopleSubscription = this.http
      .get<Person[]>('/people?select=*')
      .subscribe((data) => (this.people = data));
  }

  deletePerson(id: string) {
    this.peopleSubscription = this.http
      .delete('/people?id=eq.' + id)
      .subscribe({
        next: () => {
          this.people = this.people.filter((person) => person.id !== id);
        },
        error: (err) => console.error(err),
      });
  }

  ngOnDestroy() {
    this.peopleSubscription.unsubscribe();
  }
}
