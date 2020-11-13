import { Component, OnInit } from '@angular/core';
import { Animal } from '@cms-interfaces';
import { RootState } from '@cms-ngrx/reducers';
import { select, Store } from '@ngrx/store';
import { selectAll } from 'libs/ngrx/src/lib/reducers/src/animals.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'cms-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit {

  constructor(private store: Store<RootState>) { }

  public animals$: Observable<Animal[]>;
  public selectedAnimal: Animal;

  ngOnInit(): void {
    // console.error("HELLO");
    
    this.animals$ = this.store.pipe(select(selectAll));

    // this.animals$.subscribe(animals => {
    //   animals.forEach(animal => console.error(animal)
    //   )
    // })

    // this.store.pipe(select(selectEntities)).subscribe(all => console.error("entities",all))
    // this.store.pipe(select(selectAll)).subscribe(all => console.error('all',all))
    // this.store.pipe(select(selectTotal)).subscribe(all => console.error('total',all))
  }

  public selectAnimal(animal: Animal){
    this.selectedAnimal = animal;
    console.error(this.selectedAnimal);
    
  }

}
