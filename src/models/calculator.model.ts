import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';

export class CalculatorModel implements ICalculatorModel {
  private _buffer: string = '';
  private _operator: OperatorKeys | null = null;
  private _operand1: number | null = null;
  private _operand2: number | null = null;
  private _result: number | null = null;

  public pressNumericKey(key: NumericKeys): void {
    this._buffer += key; 
  }

  public pressOperatorKey(key: OperatorKeys): void {
    if (this._buffer) {
      if (this._result !== null) {
        
        this._operand1 = this._result;
        this._result = null; 
      } else if (this._operand1 === null) {
        this._operand1 = parseFloat(this._buffer); 
      } else {
        this._operand2 = parseFloat(this._buffer); 
        this._calculateResult(); 
        this._operand1 = this._result; 
      }
      this._buffer = ''; 
      this._operator = key; 
    }
  }

  public pressActionKey(key: ActionKeys): void {
    if (key === ActionKeys.EQUALS && this._operator !== null && this._buffer) {
      this._operand2 = parseFloat(this._buffer); 
      this._calculateResult(); 
      this._operator = null; 
    }
  }

  public display(): string {
    return this._result !== null ? this._result.toString() : this._buffer;
  }

  private _calculateResult(): void {
    if (this._operand1 !== null && this._operand2 !== null) {
      switch (this._operator) {
        case OperatorKeys.ADD:
          this._result = this._operand1 + this._operand2;
          break;
        case OperatorKeys.SUBTRACT:
          this._result = this._operand1 - this._operand2;
          break;
        case OperatorKeys.MULTIPLY:
          this._result = this._operand1 * this._operand2;
          break;
        case OperatorKeys.DIVIDE:
          this._result = this._operand1 / this._operand2;
          break;
        default:
          throw new Error('Unknown operator');
      }
      this._buffer = ''; 
    }
  }
}