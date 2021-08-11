import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private readonly apiService: ApiService) { }

  private readonly categoryUrl = environment.backendApi + '/categories';

  public allCategories(): Observable<Category[]> {
    return this.apiService.get(this.categoryUrl);
  }
}
