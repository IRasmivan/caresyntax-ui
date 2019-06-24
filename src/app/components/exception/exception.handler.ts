import{ErrorHandler} from "@angular/core";
import{NgModule} from "@angular/core";


export class CommonErrorHandler implements ErrorHandler {
	private latesterror:any;
    // do something with the exception
    call(error: any, stackTrace: any = null, reason: any = null) {

    }

    // To handle the known errors.
    public handleError( error: any ): void {
        this.latesterror=error;
	
    }
	
	 // To handle the HTTP errors.
	public handleHTTPError(res:Response){
        
		this.latesterror=res.status;
	
    }

}