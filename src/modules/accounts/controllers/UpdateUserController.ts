import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserUseCase } from '@modules/accounts/useCases/UpdateUserUseCase';

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password, phone, cep } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
      phone,
      cep,
    });

    return response.status(200).send();
  }
}
