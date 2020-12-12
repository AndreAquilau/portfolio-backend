

export default interface Controller<Request, Response> {
  stored(resquest: Request, response: Response ): Promise<any>;
  index(resquest: Request, response: Response ): Promise<any>;
  show(resquest: Request, response: Response ): Promise<any>;
  update(resquest: Request, response: Response ): Promise<any>;
  delete(resquest: Request, response: Response ): Promise<any>;
};
