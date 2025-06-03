require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Utilizador = require('./models/Utilizador');
const Cao = require('./models/Cao');
const Reserva = require('./models/Reserva');
const Conteudo = require('./models/Conteudo');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Ligado ao MongoDB');

    // Limpar dados anteriores (opcional)
    await Promise.all([
      Utilizador.deleteMany({}),
      Cao.deleteMany({}),
      Reserva.deleteMany({}),
      Conteudo.deleteMany({})
    ]);

    // Criar utilizadores
    const utilizadores = await Utilizador.insertMany([
      {
        nome: 'Admin',
        apelido: 'Hotel',
        username: 'admin',
        dataNascimento: new Date('1980-01-01'),
        email: 'admin@hotelcanino.pt',
        avatarUser: 1,
        password_hash: await bcrypt.hash('hc2025', 10)
      },
      {
        nome: 'Ana',
        apelido: 'Silva',
        username: 'ana123',
        dataNascimento: new Date('1990-05-10'),
        email: 'ana@cliente.pt',
        avatarUser: 2,
        password_hash: await bcrypt.hash('teste123', 10)
      },
      {
        nome: 'Carlos',
        apelido: 'Ferreira',
        username: 'cferreira',
        dataNascimento: new Date('1985-03-15'),
        email: 'carlos@cliente.pt',
        avatarUser: 3,
        password_hash: await bcrypt.hash('carlos123', 10)
      },
      {
        nome: 'Beatriz',
        apelido: 'Matos',
        username: 'bea90',
        dataNascimento: new Date('1990-08-20'),
        email: 'beatriz@cliente.pt',
        avatarUser: 4,
        password_hash: await bcrypt.hash('beatriz123', 10)
      }
    ]);

    const [, ana, carlos, beatriz] = utilizadores;

    // Criar cães
    const caes = await Cao.insertMany([
      {
        nome: 'Tobi',
        raca: 'Labrador',
        idade: 3,
        id_utilizador: ana._id
      },
      {
        nome: 'Luna',
        raca: 'Beagle',
        idade: 2,
        id_utilizador: carlos._id
      },
      {
        nome: 'Bolt',
        raca: 'Pastor Alemão',
        idade: 5,
        id_utilizador: beatriz._id
      }
    ]);

    const [tobi, luna, bolt] = caes;

    // Criar reservas
    await Reserva.insertMany([
      {
        id_utilizador: ana._id,
        id_cao: tobi._id,
        data_inicio: new Date('2025-07-01'),
        data_fim: new Date('2025-07-07'),
        observacoes: 'Gosta de brincar e precisa de comida hipoalergénica.'
      },
      {
        id_utilizador: carlos._id,
        id_cao: luna._id,
        data_inicio: new Date('2025-08-01'),
        data_fim: new Date('2025-08-10'),
        observacoes: 'Ansioso, precisa de atividades frequentes.'
      },
      {
        id_utilizador: beatriz._id,
        id_cao: bolt._id,
        data_inicio: new Date('2025-09-05'),
        data_fim: new Date('2025-09-12'),
        observacoes: 'Tem alergia a certos alimentos e barulhos fortes.'
      }
    ]);

    // Criar conteúdos
    await Conteudo.insertMany([
      {
        titulo: 'Bem-vindo ao Hotel Canino',
        tipo: 'apresentacao',
        corpo: `
          <p>O Hotel Canino é o espaço ideal para acolher o seu melhor amigo.</p>
          <p>Com pátios exteriores, boxes individuais, alimentação cuidada e vigilância 24h, aqui os cães são tratados como membros da família.</p>
        `
      },
      {
        titulo: 'As Nossas Instalações',
        tipo: 'instalacoes',
        corpo: `
          <p>Boxes individuais com climatização, zona de higiene, áreas verdes e videovigilância 24h.</p>
        `
      },
      {
        titulo: 'Serviços Disponíveis',
        tipo: 'servicos',
        corpo: `
          <p>Alojamento, banhos e tosquias, passeios higiénicos, transporte e atividades de socialização.</p>
        `
      }
    ]);

    console.log('✅ Dados iniciais criados com sucesso.');
  } catch (error) {
    console.error('❌ Erro ao criar dados iniciais:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
