import { render, screen } from '@testing-library/angular';
import { ClienteComponent } from './cliente.component';
import { ClienteService } from '../../services/cliente.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ClienteComponent (Jest)', () => {
  const mockService = {
    getClientes: jest.fn().mockReturnValue(of([]))
  };

  beforeEach(async () => {
    await render(ClienteComponent, {
      imports: [HttpClientTestingModule],
      providers: [{ provide: ClienteService, useValue: mockService }]
    });
  });

  it('should render and call getClientes()', () => {
    expect(mockService.getClientes).toHaveBeenCalled();
  });
});
