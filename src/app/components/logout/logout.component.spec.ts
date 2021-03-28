import { LogoutComponent } from './logout.component';

fdescribe('LogoutComponent', () => {
  let component: LogoutComponent;

  beforeEach(() => {
    component = new LogoutComponent();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
