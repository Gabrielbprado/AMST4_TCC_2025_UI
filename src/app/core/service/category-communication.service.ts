import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryCommunicationService {
  private categorySource = new BehaviorSubject<number>(0);  // Valor inicial é 0
  category$ = this.categorySource.asObservable();  // Observable para outros componentes se inscreverem

  setCategory(categoryId: number): void {
    this.categorySource.next(categoryId);  // Atualiza o valor
  }
}
