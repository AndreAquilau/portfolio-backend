import {Response, Request} from 'express';
import Portfolio from 'src/models/Portfolio';
import { getRepository } from 'typeorm';
import Controller from '../interface/Controller';

export default class PortfolioController implements Controller<Request, Response> {
  async index(request: Request, response: Response){
    try {
      const repository = getRepository(Portfolio);
      const portfolios = await repository.find();

      return response.status(200).json({
        portfolios
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async show(request: Request, response: Response){
    try {
      const repository = getRepository(Portfolio);
      const portfolio = await repository.find({where: request.params});

      return response.status(200).json({
        portfolio
      })

    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async stored(request: Request, response: Response){
    try {
      const repository = getRepository(Portfolio);
      const portfolio = await repository.save(request.body);

      return response.status(201).json({
        portfolio
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async update(request: Request, response: Response){
    try {
      const repository = getRepository(Portfolio);
      const portfolio = await repository.update(request.params, request.body);

      return response.status(200).json({
        portfolio
      })
    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }

  async delete(request: Request, response: Response){
    try {
      const repository = getRepository(Portfolio);
      const portfolio = await repository.delete(request.params);

      return response.status(200).json({
        portfolio
      })

    } catch (err) {
      return response.status(400).json({
        errors: [err]
      })
    }
  }
}
