// Dispatch Action and select state
import { Store, select } from '@ngrx/store';
import { loadProducts } from './product.actions';
import { selectAllProducts } from './product.selectors';

constructor(private store: Store) {}

ngOnInit() {
  this.store.dispatch(loadProducts()); // Dispatches the loadProducts action on component initialization
  this.products$ = this.store.pipe(select(selectAllProducts)); // Subscribes to the product list in the state
}
