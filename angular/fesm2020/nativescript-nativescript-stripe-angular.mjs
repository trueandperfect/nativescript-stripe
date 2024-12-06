import * as i0 from '@angular/core';
import { Directive, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { CreditCardView } from '@triniwiz/nativescript-stripe';

class CreditCardViewDirective {
}
CreditCardViewDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CreditCardViewDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
CreditCardViewDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: CreditCardViewDirective, selector: "CreditCardView", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CreditCardViewDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: "CreditCardView"
                }]
        }] });
const DIRECTIVES = CreditCardViewDirective;

registerElement("CreditCardView", () => CreditCardView);
class CreditCardViewModule {
}
CreditCardViewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CreditCardViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CreditCardViewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: CreditCardViewModule, declarations: [DIRECTIVES], exports: [DIRECTIVES] });
CreditCardViewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CreditCardViewModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CreditCardViewModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DIRECTIVES],
                    exports: [DIRECTIVES],
                    schemas: [NO_ERRORS_SCHEMA]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CreditCardViewDirective, CreditCardViewModule, DIRECTIVES };
//# sourceMappingURL=nativescript-nativescript-stripe-angular.mjs.map
