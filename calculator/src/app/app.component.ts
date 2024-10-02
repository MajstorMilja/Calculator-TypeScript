import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed styleUrls spelling
})
export class AppComponent {
  title = 'calculator';

  currentInput: string = ''; // Store the current number input
  previousInput: string = ''; // Store the previous number input
  operator: string = ''; // Store the current operator

  // Function to handle number input
  handleNumClick(num: string): void {
    this.currentInput += num;
    this.updateViewer(this.currentInput);
  }

  // Function to handle operator click
  handleOperatorClick(ops: string): void {
    if (this.currentInput === '') return; // Don't allow operator without a number

    if (this.previousInput && this.currentInput && this.operator) {
      // If there's already an operation pending, calculate the result
      this.calculate();
    }

    this.operator = ops; // Store the operator
    this.previousInput = this.currentInput; // Move current input to previous
    this.currentInput = ''; // Reset current input
  }

  // Function to handle equals click
  handleEqualsClick(): void {
    if (this.currentInput && this.previousInput && this.operator) {
      this.calculate();
    }
  }

  // Function to handle clear button
  handleClearClick(): void {
    this.currentInput = '';
    this.previousInput = '';
    this.operator = '';
    this.updateViewer('0');
  }

  // Function to calculate the result
  calculate(): void {
    const prev = parseFloat(this.previousInput);
    const curr = parseFloat(this.currentInput);

    let result: number = 0;

    switch (this.operator) {
      case 'plus':
        result = prev + curr;
        break;
      case 'minus':
        result = prev - curr;
        break;
      case 'times':
        result = prev * curr;
        break;
      case 'divided by':
        result = prev / curr;
        break;
    }

    this.currentInput = result.toString();
    this.previousInput = '';
    this.operator = '';

    this.updateViewer(this.currentInput);
  }

  // Function to update the calculator display
  updateViewer(value: string): void {
    const viewer = document.getElementById('viewer');
    if (viewer) {
      viewer.textContent = value;
    }
}
}