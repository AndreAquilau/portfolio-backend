import {Response, Request} from 'express';
import RedeSocial from 'src/models/RedeSocial';
import { getRepository } from 'typeorm';
import Controller from '../interface/Controller';

export default class RedeSocialController implements Controller<Request, Response> {
  async index(request: Request, response: Response){
    try {
      const repository = getRepository(RedeSocial);
      const redesociais = await repository.find();

      return response.status(200).json({
        redesociais
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async show(request: Request, response: Response){
    try {
      const repository = getRepository(RedeSocial);
      const redesocial = await repository.find({where: request.params});

      return response.status(200).json({
        redesocial
      })

    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async stored(request: Request, response: Response){
    try {
      const repository = getRepository(RedeSocial);
      const redesocial = await repository.save(request.body);

      return response.status(201).json({
        redesocial
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async update(request: Request, response: Response){
    try {
      const repository = getRepository(RedeSocial);
      const redesocial = await repository.update(request.params, request.body);

      return response.status(200).json({
        redesocial
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async delete(request: Request, response: Response){
    try {
      const repository = getRepository(RedeSocial);
      const redesocial = await repository.delete(request.params);

      return response.status(200).json({
        redesocial
      })

    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }
}
