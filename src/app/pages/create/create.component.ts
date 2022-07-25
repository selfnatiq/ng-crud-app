import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/interfaces/person';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  personSubscription: Subscription = new Subscription();
  person: Person = { name: '', location: '' };

  constructor(private readonly http: HttpService, private router: Router) {}

  ngOnInit(): void {}

  async savePerson(person: Person) {
    this.personSubscription = this.http
      .post<Person[]>('/people', [person])
      .subscribe((data) => {
        if (data.length > 0) {
          this.router.navigate(['/people']);
          return;
        }

        console.error('Error saving person', data);
      });
  }

  ngOnDestroy(): void {
    this.personSubscription.unsubscribe();
  }
}
