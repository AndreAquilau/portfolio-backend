import { Router } from 'express';
import EnderecoController from '../controllers/EnderecoController';
import ExperienciaController from '../controllers/ExperienciaController';
import FormacaoController from '../controllers/FormacaoController';
import LoginController from '../controllers/LoginController';
import PortfolioController from '../controllers/PortfolioController';
import ProjetoController from '../controllers/ProjetoController';
import RedeSocialController from '../controllers/RedeSocialController';
import UsuarioController from '../controllers/UsuarioController';
import authentication from '../middleware/authentication';
import ContatoController from '../controllers/ContatoController';

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
router.get('/contato/filter/:id?', ContatoController.show);
router.post('/contato', authentication, ContatoController.stored);
router.put('/contato/:id?', authentication, ContatoController.update);
router.delete('/contato/:id?', authentication, ContatoController.delete);

router.get('/endereco', EnderecoController.index);
router.get('/endereco/filter/:id?', EnderecoController.show);
router.post('/endereco', authentication, EnderecoController.stored);
router.put('/endereco/:id?', authentication, EnderecoController.update);
router.delete('/endereco/:id?', authentication, EnderecoController.delete);

router.get('/experiencia', ExperienciaController.index);
router.get('/experiencia/filter/:id?', ExperienciaController.show);
router.post('/experiencia', authentication, ExperienciaController.stored);
router.put('/experiencia/:id?', authentication, ExperienciaController.update);
router.put('/experiencia/titulo/:id?', authentication, ExperienciaController.updateTitulo); //
router.put('/experiencia/subtitulo/:id?', authentication, ExperienciaController.updateSubtitulo); //
router.delete('/experiencia/:id?', authentication, ExperienciaController.delete);

router.get('/formacao', FormacaoController.index);
router.get('/formacao/filter/:id?', FormacaoController.show);
router.post('/formacao', authentication, FormacaoController.stored);
router.put('/formacao/instituicao/:id?', authentication, FormacaoController.updateInstituicao); //
router.put('/formacao/formacao:id?', authentication, FormacaoController.update);
router.delete('/formacao/:id?', authentication, FormacaoController.delete);

router.get('/portfolio', PortfolioController.index);
router.get('/portfolio/filter/:id?', PortfolioController.show);
router.post('/portfolio', authentication, PortfolioController.stored);
router.put('/portfolio/document/:id?', authentication, PortfolioController.updateDocument);
router.put('/portfolio/photo/:id?', authentication, PortfolioController.updatePhoto);
router.put('/portfolio/sobre/:id?', authentication, PortfolioController.updateSobre);
router.put('/portfolio/titulo/:id?', authentication, PortfolioController.updateTitulo);
router.put('/portfolio/subtitulo/:id?', authentication, PortfolioController.updateSubTitulo); //
router.put('/portfolio/messagedownload/:id?', authentication, PortfolioController.updateMessageDownload); //
router.delete('/portfolio/:id?', authentication, PortfolioController.delete);

router.get('/projeto', ProjetoController.index);
router.get('/projeto/filter/:id?', ProjetoController.show);
router.post('/projeto', authentication, ProjetoController.stored);
router.put('/projeto/descricao/:id?', authentication, ProjetoController.updateDescProjeto);
router.put('/projeto/link-github/:id?', authentication, ProjetoController.updateLinkGithub);
router.put('/projeto/link-projeto/:id?', authentication, ProjetoController.updateLinkProjeto);
router.put('/projeto/titulo/:id?', authentication, ProjetoController.updateTitulo);
router.delete('/projeto/:id?', authentication, ProjetoController.delete);

router.get('/redesocial', RedeSocialController.index);
router.get('/redesocial/filter/:id?', RedeSocialController.show);
router.post('/redesocial', authentication, RedeSocialController.stored);
router.put('/redesocial/icon/:id?', authentication, RedeSocialController.updateIconLink);
router.put('/redesocial/link/:id?', authentication, RedeSocialController.updateLink);
router.delete('/redesocial/:id?', authentication, RedeSocialController.delete);

router.get('/usuario', UsuarioController.index);
router.get('/usuario/filter/:id?', UsuarioController.show);
router.post('/usuario', authentication, UsuarioController.stored);
router.put('/usuario/:id?', authentication, UsuarioController.update);
router.delete('/usuario/:id?', authentication, UsuarioController.delete);

export default router;
