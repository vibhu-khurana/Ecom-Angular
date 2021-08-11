import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HOME } from 'src/app/core/constants/home.constant';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/category/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navBurger') navbarCategory?: ElementRef;
  @ViewChild('navMenu') navMenu?: ElementRef;

  public searchedKeyword: string = '';
  public categories!: Category[];
  public readonly CONSTANTS = HOME;

  constructor(private readonly router: Router,
    private readonly cateoryService: CategoriesService) { }

  public ngOnInit(): void {
    this.cateoryService.allCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  public onSearchTermChange(): void {
    this.router.navigateByUrl('search?search_query=' + this.searchedKeyword);
  }

  public toggleNavbar() {
    this.navbarCategory?.nativeElement.classList.toggle('is-active');
    this.navMenu?.nativeElement.classList.toggle('is-active');
  }

  public shopByCategory(categoryName: string): void {
    this.router.navigateByUrl('shop?categoryName=' + categoryName);
  }

  public shopBySubCategory(categoryName: string, subCategory: string): void {
    this.router.navigateByUrl('shop?categoryName=' + categoryName + '&subCategory=' + subCategory);
  }

  //Log out/Logged in login to be implemented
  public logOut(): void { }

  public isLoggedIn(): boolean { return false; }

}
