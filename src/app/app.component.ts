import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: ["./app.component.css"]
})
export class AppComponent {
  title = "Rasmivan CareSyntax";
  public titleHead: any = "";
  constructor(private router: Router) {
    this.router.navigate(["/menuPage"]);
  }
}