import { render } from '@testing-library/angular';
import { CuentaComponent } from './cuenta.component';
import { CuentaService } from '../../services/cuenta.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('CuentaComponent (Jest)', () => {
  const mockService = {
    getCuentas: jest.fn().mockReturnValue(of([])),
    create: jest.fn()
  };

  it('should render and call getCuentas()', async () => {
    await render(CuentaComponent, {
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{ provide: CuentaService, useValue: mockService }]
    });
    expect(mockService.getCuentas).toHaveBeenCalled();
  });
});
