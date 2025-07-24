import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from './product.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from './product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts), // Listens for the loadProducts action
      mergeMap(() =>
        this.productService.getProducts().pipe( // Calls the service to fetch products
          map(products => loadProductsSuccess({ products })), // Dispatches success if products are loaded
          catchError(error => of(loadProductsFailure({ error }))) // Dispatches failure if an error occurs
        )
      )
    )
  );

  constructor(private actions$: Actions, private productService: ProductService) {}
}
