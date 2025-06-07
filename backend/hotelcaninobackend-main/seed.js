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

    // Limpeza de coleções
    await Promise.all([
      Utilizador.deleteMany({}),
      Cao.deleteMany({}),
      Reserva.deleteMany({}),
      Conteudo.deleteMany({})
    ]);

    // Criação de utilizadores
    const utilizadores = await Utilizador.insertMany([
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
      },
      { 
        nome: 'Carlos', 
        apelido: 'Ferreira', 
        username: 'carlosf', 
        dataNascimento: new Date('1987-03-12'), 
        email: 'carlos@cliente.pt', 
        avatarUser: 4, 
        password_hash: await bcrypt.hash('carlos123', 10), 
        role: 'user' 
      },
      { 
        nome: 'Rita', 
        apelido: 'Gomes', 
        username: 'ritag', 
        dataNascimento: new Date('1992-09-25'), 
        email: 'rita@cliente.pt', 
        avatarUser: 5, 
        password_hash: await bcrypt.hash('rita123', 10), 
        role: 'user' 
      },
      { 
        nome: 'João', 
        apelido: 'Pereira', 
        username: 'joaop', 
        dataNascimento: new Date('1985-06-18'), 
        email: 'joao@cliente.pt', 
        avatarUser: 6, 
        password_hash: await bcrypt.hash('joao123', 10), 
        role: 'user' 
      }
    ]);

    // Criar cães e reservas para todos os utilizadores com role 'user'
    const usuariosNormais = utilizadores.filter(u => u.role === 'user');
    const meses = [
      { nome: 'Janeiro', numero: 1 },
      { nome: 'Fevereiro', numero: 2 },
      { nome: 'Março', numero: 3 },
      { nome: 'Abril', numero: 4 },
      { nome: 'Maio', numero: 5 },
      { nome: 'Junho', numero: 6 },
      { nome: 'Julho', numero: 7 },
      { nome: 'Agosto', numero: 8 },
      { nome: 'Setembro', numero: 9 }
    ];

    // Nomes bonitos de cães
    const nomesCaes = [
      'Max', 'Luna', 'Charlie', 'Bella', 'Rocky', 'Mia', 'Zeus', 'Nina',
      'Bruno', 'Sofia', 'Thor', 'Emma', 'Rex', 'Lola', 'Duke', 'Nala',
      'Leo', 'Zara', 'Toby', 'Maya', 'Oscar', 'Coco', 'Buddy', 'Ruby',
      'Simba', 'Kira', 'Jack', 'Dora', 'Bear', 'Zoe', 'Cooper', 'Lily',
      'Rusty', 'Honey', 'Milo', 'Stella', 'Tucker', 'Rosie', 'Benny', 'Pearl'
    ];

    let nomeIndex = 0;

    for (const u of usuariosNormais) {
      const caes = [];
      for (let i = 1; i <= 3; i++) {
        const cao = await Cao.create({
          nome: nomesCaes[nomeIndex % nomesCaes.length],
          raca: ['Labrador','Beagle','Pastor Alemão','Caniche','Bulldog'][i % 5],
          idade: Math.floor(Math.random() * 10) + 1,
          id_utilizador: u._id
        });
        caes.push(cao);
        nomeIndex++;
      }

      // Criar reservas para todos os meses (Janeiro a Setembro)
      for (const cao of caes) {
        for (const mes of meses) {
          // Criar 1-2 reservas por mês para cada cão (aleatório)
          const numReservas = Math.floor(Math.random() * 2) + 1; // 1 ou 2 reservas
          
          for (let j = 0; j < numReservas; j++) {
            // Gerar datas aleatórias dentro do mês
            const diasNoMes = new Date(2025, mes.numero, 0).getDate();
            const diaInicio = Math.floor(Math.random() * (diasNoMes - 7)) + 1; // Garante pelo menos 7 dias de margem
            const duracaoEstadia = Math.floor(Math.random() * 7) + 3; // Entre 3 a 9 dias
            const diaFim = Math.min(diaInicio + duracaoEstadia, diasNoMes);
            
            await Reserva.create({
              id_utilizador: u._id,
              id_cao: cao._id,
              data_inicio: new Date(2025, mes.numero - 1, diaInicio),
              data_fim: new Date(2025, mes.numero - 1, diaFim),
              observacoes: `Reserva de ${cao.nome} (${u.username}) - ${mes.nome} 2025, sessão ${j + 1}`
            });
          }
        }
      }
    }

    // Conteúdos de apresentação originais
    const conteudosApresentacao = [
      { titulo: 'Bem-vindo ao Hotel Canino', tipo: 'apresentacao', corpo: '<p>O espaço ideal para acolher o seu melhor amigo. Cuidamos com carinho e profissionalismo.</p>' },
      { titulo: 'A Nossa Missão', tipo: 'apresentacao', corpo: '<p>Proporcionar uma estadia segura, confortável e feliz para todos os cães.</p>' },
      { titulo: 'Instalações Modernas', tipo: 'apresentacao', corpo: '<p>Boxes climatizadas, espaços verdes e videovigilância garantem conforto e segurança.</p>' },
      { titulo: 'Alimentação Personalizada', tipo: 'apresentacao', corpo: '<p>Adotamos dietas personalizadas conforme as instruções do tutor.</p>' },
      { titulo: 'Atividades Diárias', tipo: 'apresentacao', corpo: '<p>Passeios, brincadeiras e socialização fazem parte da rotina dos nossos hóspedes.</p>' },
      { titulo: 'Acompanhamento Veterinário', tipo: 'apresentacao', corpo: '<p>Temos parcerias com clínicas veterinárias para garantir assistência sempre que necessário.</p>' },
      { titulo: 'Banhos e Tosquias', tipo: 'apresentacao', corpo: '<p>Serviços de estética e higiene realizados com produtos de qualidade.</p>' },
      { titulo: 'Socialização Segura', tipo: 'apresentacao', corpo: '<p>Promovemos interações seguras entre cães, sempre com supervisão.</p>' },
      { titulo: 'Equipa Dedicada', tipo: 'apresentacao', corpo: '<p>Profissionais apaixonados por animais, preparados para todas as situações.</p>' },
      { titulo: 'Acesso Online', tipo: 'apresentacao', corpo: '<p>Os tutores podem acompanhar as reservas e atualizar dados pelo nosso portal.</p>' },
      { titulo: 'Feedback Diário', tipo: 'apresentacao', corpo: '<p>Enviamos informações diárias sobre o bem-estar do seu cão durante a estadia.</p>' },
      { titulo: 'Transporte Seguro', tipo: 'apresentacao', corpo: '<p>Oferecemos recolha e entrega em veículo adaptado para cães.</p>' },
      { titulo: 'Horário Flexível', tipo: 'apresentacao', corpo: '<p>Check-in e check-out flexíveis para maior comodidade.</p>' },
      { titulo: 'Reservas Online', tipo: 'apresentacao', corpo: '<p>Sistema de reservas online intuitivo e disponível 24h.</p>' },
      { titulo: 'Testemunhos de Clientes', tipo: 'apresentacao', corpo: '<p>Partilhamos experiências reais de quem confia no Hotel Canino.</p>' }
    ];

    // Conteúdos para Homepage: Eventos
    const conteudosEventos = [
      { titulo: 'Feira de Adoção Anual', tipo: 'Eventos', corpo: '<p>Participe na nossa feira e encontre o seu novo melhor amigo!</p>' },
      { titulo: 'Dia de Spa Canino', tipo: 'Eventos', corpo: '<p>Um dia de cuidados especiais: banho, tosquia e mimos para o seu cão.</p>' },
      { titulo: 'Workshops de Treino', tipo: 'Eventos', corpo: '<p>Aprenda técnicas de treino e reforço positivo com os nossos especialistas.</p>' },
      { titulo: 'Passeio Solidário', tipo: 'Eventos', corpo: '<p>Junte-se a nós para um passeio e ajude instituições de proteção animal.</p>' }
    ];

    // Conteúdos para Homepage: Notícias
    const conteudosNoticias = [
      { titulo: 'Nova Parceria Veterinária', tipo: 'Notícias', corpo: '<p>Firmámos um protocolo com a Clínica VetPet para descontos exclusivos.</p>' },
      { titulo: 'Ampliação das Instalações', tipo: 'Notícias', corpo: '<p>Inaugurámos novas boxes individuais e áreas de lazer.</p>' },
      { titulo: 'Certificação de Qualidade', tipo: 'Notícias', corpo: '<p>Somos o primeiro hotel canino certificado pela Associação AnimalCare.</p>' },
      { titulo: 'Equipa Premiada', tipo: 'Notícias', corpo: '<p>A nossa equipa venceu o Prémio Excelência em Cuidados Animais 2025.</p>' }
    ];

    // Conteúdos para Homepage: Promoções
    const conteudosPromocoes = [
      { titulo: 'Promoção de Verão 20%', tipo: 'Promoções', corpo: '<p>Desconto de 20% em reservas de julho e agosto.</p>' },
      { titulo: 'Pacote Fim de Semana', tipo: 'Promoções', corpo: '<p>Reserve sexta a domingo com tarifa especial.</p>' },
      { titulo: 'Desconto Lealdade', tipo: 'Promoções', corpo: '<p>10% de desconto para clientes frequentes.</p>' },
      { titulo: 'Oferta de Brinquedo', tipo: 'Promoções', corpo: '<p>Brinquedo grátis para cada nova reserva acima de 3 dias.</p>' }
    ];

    // Conteúdos para Homepage: Outras informações
    const conteudosOutras = [
      { titulo: 'Dicas de Viagem', tipo: 'Outras informações', corpo: '<p>Checklist para uma viagem tranquila com o seu cão.</p>' },
      { titulo: 'Cuidados no Verão', tipo: 'Outras informações', corpo: '<p>Proteja o seu cão do calor com recomendações práticas.</p>' },
      { titulo: 'Alimentação Saudável', tipo: 'Outras informações', corpo: '<p>Sugestões de dietas equilibradas para diferentes idades.</p>' },
      { titulo: 'Sinalização de Emergência', tipo: 'Outras informações', corpo: '<p>Como agir em caso de acidentes ou doenças súbitas.</p>' }
    ];

    // Inserir todos os conteúdos
    await Conteudo.insertMany([
      ...conteudosApresentacao,
      ...conteudosEventos,
      ...conteudosNoticias,
      ...conteudosPromocoes,
      ...conteudosOutras
    ]);

    console.log('✅ Dados iniciais criados com sucesso.');
    console.log('📊 Estatísticas:');
    console.log(`- ${utilizadores.length} utilizadores criados`);
    console.log(`- ${usuariosNormais.length * 3} cães criados`);
    console.log(`- Reservas criadas para 9 meses (Janeiro a Setembro)`);
    console.log(`- ${conteudosApresentacao.length + conteudosEventos.length + conteudosNoticias.length + conteudosPromocoes.length + conteudosOutras.length} conteúdos criados`);
  } catch (error) {
    console.error('❌ Erro ao criar dados iniciais:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();