import {Response, Request} from 'express';
import Contato from 'src/models/Contato';
import { getRepository } from 'typeorm';
import Controller from '../interface/Controller';

export default class ContatoController implements Controller<Request, Response> {
  async index(request: Request, response: Response){
    try {
      const repository = getRepository(Contato);
      const contatos = await repository.find();

      return response.status(200).json({
        contatos
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async show(request: Request, response: Response){
    try {
      const repository = getRepository(Contato);
      const contato = await repository.find({where: request.params});

      return response.status(200).json({
        contato
      })

    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async stored(request: Request, response: Response){
    try {
      const repository = getRepository(Contato);
      const contato = await repository.save(request.body);

      return response.status(201).json({
        contato
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async update(request: Request, response: Response){
    try {
      const repository = getRepository(Contato);
      const contato = await repository.update(request.params, request.body);

      return response.status(200).json({
        contato
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async delete(request: Request, response: Response){
    try {
      const repository = getRepository(Contato);
      const contato = await repository.delete(request.params);

      return response.status(200).json({
        contato
      })

    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }
}
