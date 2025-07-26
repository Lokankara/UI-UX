// Routes
const routes: Routes = [
    { path: 'post/:id', component: PostComponent },
  ];

// In the component
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
}


  