import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/interfaces/person';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  id: string = '';
  routerSubscription: Subscription = new Subscription();
  person: Person = { name: '', location: '' };
  oldPerson: Person = this.person;
  personSubscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.getPerson();
  }

  getPerson() {
    this.personSubscription = this.http
      .get<Person[]>('/people?select=*&id=eq.' + this.id)
      .subscribe((data) => {
        this.person = data[0];
        this.oldPerson = { ...this.person };
      });
  }

  updatePerson(person: Person) {
    this.personSubscription = this.http
      .patch<Person>('/people?id=eq.' + person.id, {
        name: person.name,
        location: person.location,
      })
      .subscribe({
        next: (res) => {
          if (res) this.router.navigate(['/people']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
