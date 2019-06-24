import {ErrorHandler,NgModule} from "@angular/core";
import {CommonErrorHandler} from "./exception.handler";


@NgModule({
    providers: [
        {
            provide: ErrorHandler,
            useClass: CommonErrorHandler
        }
     ]
})

export class CommonErrorModule {}