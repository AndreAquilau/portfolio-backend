import {Response, Request} from 'express';
import Projeto from 'src/models/Projeto';
import { getRepository } from 'typeorm';
import Controller from '../interface/Controller';

export default class ProjetoController implements Controller<Request, Response> {
  async index(request: Request, response: Response){
    try {
      const repository = getRepository(Projeto);
      const projetos = await repository.find();

      return response.status(200).json({
        projetos
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async show(request: Request, response: Response){
    try {
      const repository = getRepository(Projeto);
      const projeto = await repository.find({where: request.params});

      return response.status(200).json({
        projeto
      })

    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async stored(request: Request, response: Response){
    try {
      const repository = getRepository(Projeto);
      const projeto = await repository.save(request.body);

      return response.status(201).json({
        projeto
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async update(request: Request, response: Response){
    try {
      const repository = getRepository(Projeto);
      const projeto = await repository.update(request.params, request.body);

      return response.status(200).json({
        projeto
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async delete(request: Request, response: Response){
    try {
      const repository = getRepository(Projeto);
      const projeto = await repository.delete(request.params);

      return response.status(200).json({
        projeto
      })

    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }
}
