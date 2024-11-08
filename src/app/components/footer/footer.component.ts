import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service2';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, pawOutline, pencilOutline, qrCodeOutline, schoolOutline, gridOutline } from 'ionicons/icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,     // Allows usage of common Angular directives
    FormsModule,      // Allows usage of forms
    TranslateModule,  // Allows usage of translate pipe
    IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon
  ]
})
export class FooterComponent implements OnInit {
  
  componenteSeleccionada: string = 'codigoqr';
  
  @Output() footerClick = new EventEmitter<string>();
  selectedButton = 'welcome';

  constructor(private authService: AuthService) {
    addIcons({ homeOutline, schoolOutline, pencilOutline, gridOutline, qrCodeOutline, pawOutline });
  }

  ngOnInit() {
    // Initialize `componenteSeleccionada` from AuthService or use a default
    this.authService.componenteSeleccionada.subscribe(value => {
      this.componenteSeleccionada = value;
    });

    // Set initial component based on current page or navigation state if needed
    this.authService.componenteSeleccionada.next(this.componenteSeleccionada);
  }

  cambiarComponente($event: any) {
    this.componenteSeleccionada = $event.detail.value;
    this.authService.componenteSeleccionada.next(this.componenteSeleccionada);
  }

  sendClickEvent($event: any) {
    this.footerClick.emit(this.selectedButton);
  }
}
