import {Response, Request} from 'express';
import Formacao from 'src/models/Formacao';
import { getRepository } from 'typeorm';
import Controller from '../interface/Controller';

export default class FormacaoController implements Controller<Request, Response> {
  async index(request: Request, response: Response){
    try {
      const repository = getRepository(Formacao);
      const formacaos = await repository.find();

      return response.status(200).json({
        formacaos
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async show(request: Request, response: Response){
    try {
      const repository = getRepository(Formacao);
      const formacao = await repository.find({where: request.params});

      return response.status(200).json({
        formacao
      })

    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async stored(request: Request, response: Response){
    try {
      const repository = getRepository(Formacao);
      const formacao = await repository.save(request.body);

      return response.status(201).json({
        formacao
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async update(request: Request, response: Response){
    try {
      const repository = getRepository(Formacao);
      const formacao = await repository.update(request.params, request.body);

      return response.status(200).json({
        formacao
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async delete(request: Request, response: Response){
    try {
      const repository = getRepository(Formacao);
      const formacao = await repository.delete(request.params);

      return response.status(200).json({
        formacao
      })

    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }
}
