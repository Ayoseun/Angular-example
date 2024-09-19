import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orokiipay-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  cartItems = [
    { imageUrl: 'https://picsum.photos/200/300', name: 'Brown Modern Chair', quantity: 2, price: 77.99 },
    { imageUrl: 'https://picsum.photos/200/300', name: 'Table Lamp with 3 Pears', quantity: 1, price: 43.99 },
    { imageUrl: 'https://picsum.photos/200/300', name: '3-Piece Table Set', quantity: 1, price: 39.99 }
  ];

  tax = 10.00;
  discount = 32.39;
  discountCode = 'winter25';
  discountPercentage = 25;
  total = 1190.57;

  isCheckoutVisible = false;
  private scriptLoaded: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {}


  showCheckoutScript() {
    this.isCheckoutVisible = true;
    if (!this.scriptLoaded) {
      this.loadWidgetScript();
    }
  }

  private loadWidgetScript(): void {
    // Create script element
    const script = this.renderer.createElement('script');
    script.src = 'https://ayoseun.github.io/k-pay/bundle.js'; // Replace with the actual URL of the widget script
    script.async = true;
    script.onload = () => {
      // Initialize the widget
      const container = this.el.nativeElement.querySelector('#widget-container');
      const widget = (window as any).OrokiipayWidget.createWidget(this.total.toString()); // Access the global widget object
      container.appendChild(widget);
      this.scriptLoaded = true;
    };
    this.renderer.appendChild(document.body, script);
  }
}