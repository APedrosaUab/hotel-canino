require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Utilizador = require('./models/Utilizador');
const Cao = require('./models/Cao');
const Reserva = require('./models/Reserva');
const Conteudo = require('./models/Conteudo');

async function seedDatabase() {
  try {
    // Verificar se a conexão está configurada
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI não encontrada no arquivo .env');
    }

    console.log('🔄 Conectando ao MongoDB...');
    console.log('URI:', process.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Mascarar credenciais
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Ligado ao MongoDB');
    console.log('📍 Base de dados:', mongoose.connection.db.databaseName);
    console.log('📍 Estado da conexão:', mongoose.connection.readyState);

    // Verificar coleções existentes
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Coleções existentes:', collections.map(c => c.name));

    // Testar se consegue criar um documento simples
    console.log('\n🧪 TESTE SIMPLES - Criar um utilizador...');
    try {
      const testUser = await Utilizador.create({
        nome: 'Teste',
        apelido: 'Debug',
        username: 'testdebug',
        dataNascimento: new Date('1990-01-01'),
        email: 'test@debug.com',
        avatarUser: 1,
        password_hash: await bcrypt.hash('test123', 10),
        role: 'user'
      });
      console.log('✅ Utilizador teste criado:', testUser._id);
      
      // Verificar se foi mesmo criado
      const verificacao = await Utilizador.findById(testUser._id);
      if (verificacao) {
        console.log('✅ Utilizador encontrado na BD:', verificacao.username);
      } else {
        console.log('❌ Utilizador NÃO encontrado na BD após criação!');
      }
      
      // Contar documentos
      const count = await Utilizador.countDocuments();
      console.log('📊 Total de utilizadores na BD:', count);
      
    } catch (testError) {
      console.error('❌ ERRO no teste simples:', testError);
      console.error('Detalhes do erro:', testError.message);
      if (testError.errors) {
        console.error('Erros de validação:', testError.errors);
      }
      return; // Parar aqui se o teste falhar
    }

    console.log('\n🔄 Limpando coleções...');
    const deleteResults = await Promise.all([
      Utilizador.deleteMany({}),
      Cao.deleteMany({}),
      Reserva.deleteMany({}),
      Conteudo.deleteMany({})
    ]);
    console.log('🗑️ Registos removidos:', deleteResults.map(r => r.deletedCount));

    console.log('\n🔄 Iniciando criação em massa...');
    
    // Dados dos utilizadores
    const dadosUtilizadores = [
      { 
        nome: 'Admin', 
        apelido: 'Hotel', 
        username: 'admin', 
        dataNascimento: new Date('1980-01-01'), 
        email: 'admin@hotelcanino.pt', 
        avatarUser: 1, 
        password_hash: await bcrypt.hash('hc2025', 10), 
        role: 'admin' 
      },
      { 
        nome: 'User', 
        apelido: 'Normal', 
        username: 'user', 
        dataNascimento: new Date('1995-01-01'), 
        email: 'user@hotelcanino.pt', 
        avatarUser: 2, 
        password_hash: await bcrypt.hash('2025hc', 10), 
        role: 'user' 
      },
      { 
        nome: 'Ana', 
        apelido: 'Silva', 
        username: 'ana123', 
        dataNascimento: new Date('1990-05-10'), 
        email: 'ana@cliente.pt', 
        avatarUser: 3, 
        password_hash: await bcrypt.hash('teste123', 10), 
        role: 'user' 
      }
    ];

    // Criar utilizadores individualmente
    const utilizadores = [];
    for (let i = 0; i < dadosUtilizadores.length; i++) {
      const dados = dadosUtilizadores[i];
      console.log(`\n🔄 Criando utilizador ${i + 1}/${dadosUtilizadores.length}: ${dados.username}`);
      
      try {
        const utilizador = new Utilizador(dados);
        const savedUser = await utilizador.save();
        utilizadores.push(savedUser);
        console.log(`✅ Criado com ID: ${savedUser._id}`);
        
        // Verificar imediatamente se foi salvo
        const verificar = await Utilizador.findById(savedUser._id);
        if (verificar) {
          console.log(`✅ Confirmado na BD: ${verificar.username}`);
        } else {
          console.log(`❌ NÃO encontrado na BD: ${savedUser._id}`);
        }
        
      } catch (error) {
        console.error(`❌ Erro ao criar ${dados.username}:`, error.message);
        if (error.errors) {
          console.error('Detalhes:', error.errors);
        }
      }
    }

    console.log(`\n📊 Total de utilizadores criados: ${utilizadores.length}`);
    
    // Contar na base de dados
    const totalNaBD = await Utilizador.countDocuments();
    console.log(`📊 Total na base de dados: ${totalNaBD}`);

    // Se chegou até aqui com utilizadores, criar alguns cães
    if (utilizadores.length > 0) {
      console.log('\n🔄 Criando cães...');
      
      const usuariosNormais = utilizadores.filter(u => u.role === 'user');
      console.log(`📊 Utilizadores normais encontrados: ${usuariosNormais.length}`);
      
      for (const usuario of usuariosNormais) {
        console.log(`\n🔄 Criando cães para: ${usuario.username}`);
        
        try {
          const cao = await Cao.create({
            nome: 'Rex',
            raca: 'Labrador',
            idade: 3,
            id_utilizador: usuario._id
          });
          console.log(`✅ Cão criado: ${cao.nome} (ID: ${cao._id})`);
          
          // Criar uma reserva
          const reserva = await Reserva.create({
            id_utilizador: usuario._id,
            id_cao: cao._id,
            data_inicio: new Date('2025-07-01'),
            data_fim: new Date('2025-07-05'),
            observacoes: `Reserva teste para ${cao.nome}`
          });
          console.log(`✅ Reserva criada: ${reserva._id}`);
          
        } catch (error) {
          console.error(`❌ Erro ao criar cão/reserva para ${usuario.username}:`, error.message);
        }
      }
    }

    // Criar alguns conteúdos
    console.log('\n🔄 Criando conteúdos...');
    const conteudosSimples = [
      { titulo: 'Bem-vindo', tipo: 'apresentacao', corpo: '<p>Teste de conteúdo</p>' },
      { titulo: 'Evento Teste', tipo: 'Eventos', corpo: '<p>Evento de teste</p>' }
    ];

    for (const conteudo of conteudosSimples) {
      try {
        const saved = await Conteudo.create(conteudo);
        console.log(`✅ Conteúdo criado: ${saved.titulo} (ID: ${saved._id})`);
      } catch (error) {
        console.error(`❌ Erro ao criar conteúdo:`, error.message);
      }
    }

    // Verificação final completa
    console.log('\n🔍 VERIFICAÇÃO FINAL:');
    const contagens = await Promise.all([
      Utilizador.countDocuments(),
      Cao.countDocuments(),
      Reserva.countDocuments(),
      Conteudo.countDocuments()
    ]);

    console.log(`📊 Utilizadores: ${contagens[0]}`);
    console.log(`📊 Cães: ${contagens[1]}`);
    console.log(`📊 Reservas: ${contagens[2]}`);
    console.log(`📊 Conteúdos: ${contagens[3]}`);

    // Listar alguns documentos para confirmar
    console.log('\n📋 DOCUMENTOS CRIADOS:');
    const users = await Utilizador.find({}, 'username email role');
    users.forEach(user => {
      console.log(`- User: ${user.username} (${user.email}) - ${user.role}`);
    });

    const caes = await Cao.find({}, 'nome raca');
    caes.forEach(cao => {
      console.log(`- Cão: ${cao.nome} (${cao.raca})`);
    });

    // Verificar se as coleções foram realmente criadas
    const collectionsAfter = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📚 Coleções após seed:', collectionsAfter.map(c => c.name));

    console.log('\n✅ Seed concluído!');

  } catch (error) {
    console.error('\n❌ ERRO FATAL:', error);
    console.error('Stack:', error.stack);
  } finally {
    console.log('\n🔄 Desconectando...');
    await mongoose.disconnect();
    console.log('✅ Desconectado');
  }
}

// Adicionar listeners para debug
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erro de conexão Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose desconectado');
});

seedDatabase().catch(error => {
  console.error('❌ Erro não capturado:', error);
  process.exit(1);
});