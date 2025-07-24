const routes: Routes = [
    { 
      path: 'dashboard', 
      component: DashboardComponent, 
      children: [
        { path: 'profile', component: ProfileComponent },
        { path: 'settings', component: SettingsComponent },
      ] 
    },
  ];
  