import { render } from '@testing-library/angular';
import { MovimientoComponent } from './movimiento.component';
import { MovimientoService } from '../../services/movimiento.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('MovimientoComponent (Jest)', () => {
  const mockService = {
    getMovimientos: jest.fn().mockReturnValue(of([])),
    registrarMovimiento: jest.fn()
  };

  it('should render and call getMovimientos()', async () => {
    await render(MovimientoComponent, {
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{ provide: MovimientoService, useValue: mockService }]
    });
    expect(mockService.getMovimientos).toHaveBeenCalled();
  });
});
