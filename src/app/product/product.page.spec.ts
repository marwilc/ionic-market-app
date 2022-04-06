import {
    ComponentFixture,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProductPage } from './product.page';

describe('ProductPage', () => {
    const slideOpts = {
        initialSlide: 0,
        speed: 400,
    };
    let component: ProductPage;
    let fixture: ComponentFixture<ProductPage>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ProductPage],
                imports: [IonicModule.forRoot()],
            }).compileComponents();

            fixture = TestBed.createComponent(ProductPage);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
