import { of } from 'rxjs';
import { Category } from '../../models/category.model';
import { CategoriesService } from './categories.service';

describe('Category ervice', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let heroService: CategoriesService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    heroService = new CategoriesService(httpClientSpy as any);
  });

  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    const expectedCategories: Category[] = [
      { id: 1, categoryName: 'Men', subCategory: '' },
      { id: 2, categoryName: 'Women', subCategory: '' },
      { id: 3, categoryName: 'Kids', subCategory: '' },
    ];

    httpClientSpy.get.and.returnValue(of(expectedCategories));

    heroService.allCategories().subscribe((categories) => {
      expect(categories).toEqual(expectedCategories, 'expected categories');
      done();
    }, done.fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
