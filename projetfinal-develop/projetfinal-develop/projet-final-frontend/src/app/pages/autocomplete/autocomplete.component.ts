import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent  implements OnInit {
  myControl = new FormControl();
  // tslint:disable-next-line: max-line-length
  options: string[] = ['nesrine.limayem@talan.com', 'hajer.zouari@talan.com', 'amal.bouabid@talan.com','mouna.makni@talan.com','akram.zitouni@talan.com','bacem.belhabel@talan.com','mouez.khdhiri@talan.com'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}

