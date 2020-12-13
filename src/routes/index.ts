import ContatoController from '@controllers/ContatoController';
import EnderecoController from '@controllers/EnderecoController';
import ExperienciaController from '@controllers/ExperienciaController';
import FormacaoController from '@controllers/FormacaoController';
import LoginController from '@controllers/LoginController';
import PortfolioController from '@controllers/PortfolioController';
import ProjetoController from '@controllers/ProjetoController';
import RedeSocialController from '@controllers/RedeSocialController';
import UsuarioController from '@controllers/UsuarioController';
import authentication from '@middleware/authentication';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    try {
        return res.status(200).json({
            message: 'API Portfolio Online',
        });
    } catch (err) {
        return res.status(400);
    }
});

router.post('/login', LoginController.stored);

router.get('/contato', ContatoController.index);
router.get('/contato/:id?', ContatoController.show);
router.post('/contato', authentication, ContatoController.stored);
router.put('/contato/tipo/:id', authentication, ContatoController.update);
router.delete('/contato/:id', authentication, ContatoController.delete);

router.get('/endereco', EnderecoController.index);
router.get('/endereco/:id', EnderecoController.show);
router.post('/endereco', authentication, EnderecoController.stored);
router.put('/endereco/:id', authentication, EnderecoController.update);
router.delete('/endereco/:id', authentication, EnderecoController.delete);

router.get('/experiencia', ExperienciaController.index);
router.get('/experiencia/:id?', ExperienciaController.show);
router.post('/experiencia', authentication, ExperienciaController.stored);
router.put('/experiencia/:id', authentication, ExperienciaController.update);
router.delete('/experiencia/:id', authentication, ExperienciaController.delete);

router.get('/formacao', FormacaoController.index);
router.get('/formacao/:id?', FormacaoController.show);
router.post('/formacao', authentication, FormacaoController.stored);
router.put('/formacao/:id', authentication, FormacaoController.update);
router.delete('/formacao/:id', authentication, FormacaoController.delete);

router.get('/portfolio', PortfolioController.index);
router.get('/portfolio/:id', PortfolioController.show);
router.post('/portfolio', authentication, PortfolioController.stored);
router.put('/portfolio/document/:id', authentication, PortfolioController.updateDocument);
router.put('/portfolio/photo/:id', authentication, PortfolioController.updatePhoto);
router.put('/portfolio/sobre/:id', authentication, PortfolioController.updateSobre);
router.put('/portfolio/titulo/:id', authentication, PortfolioController.updateTitulo);
router.delete('/portfolio/:id', authentication, PortfolioController.delete);

router.get('/projeto', ProjetoController.index);
router.get('/projeto/:id?', ProjetoController.show);
router.post('/projeto', authentication, ProjetoController.stored);
router.put('/projeto/descricao/:id', authentication, ProjetoController.updateDescProjeto);
router.put('/projeto/link github/:id', authentication, ProjetoController.updateLinkGithub);
router.put('/projeto/link projeto/:id', authentication, ProjetoController.updateLinkProjeto);
router.put('/projeto/titulo/:id', authentication, ProjetoController.updateTitulo);
router.delete('/projeto/:id', authentication, ProjetoController.delete);

router.get('/redesocial', RedeSocialController.index);
router.get('/redesocial/:id', RedeSocialController.show);
router.post('/redesocial', authentication, RedeSocialController.stored);
router.put('/redesocial/icon/:id', authentication, RedeSocialController.updateIconLink);
router.put('/redesocial/link/:id', authentication, RedeSocialController.updateLink);
router.delete('/redesocial/:id', authentication, RedeSocialController.delete);

router.get('/usuario', UsuarioController.index);
router.get('/usuario/:id', UsuarioController.show);
router.post('/usuario', authentication, UsuarioController.stored);
router.put('/usuario/:id', authentication, UsuarioController.update);
router.delete('/usuario/:id', authentication, UsuarioController.delete);

export default router;
