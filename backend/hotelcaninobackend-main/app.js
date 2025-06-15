require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const Utilizador = require("./models/Utilizador");
const Cao = require("./models/Cao");
const Reserva = require("./models/Reserva");
const Conteudo = require("./models/Conteudo");

// === Email Config ===
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8080";

async function sendEmail({ to, subject, text }) {
  const mailOptions = {
    from: '"2302570" <pwauab@gmail.com>',
    to,
    subject,
    text,
  };
  await transporter.sendMail(mailOptions);
}

// === JWT ===
function generateSessionToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// === Autenticação ===
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const utilizador = await Utilizador.findOne({ username });
    if (!utilizador) return res.status(404).json({ message: "Utilizador não encontrado." });

    const isMatch = await bcrypt.compare(password, utilizador.password_hash);
    if (!isMatch) return res.status(400).json({ message: "Password incorrecta." });

    const sessionToken = generateSessionToken(utilizador);
    utilizador.tokenSessao = sessionToken;
    await utilizador.save();

    res.json({
      message: "Login bem-sucedido.",
      sessionToken,
      username: utilizador.username,
      id_utilizador: utilizador._id,
      avatarUser: utilizador.avatarUser,
      userRole: utilizador.username === 'admin' ? 'admin' : 'user'
    });
  } catch {
    res.status(500).json({ message: "Erro ao realizar login." });
  }
});

// === Recuperar Password ===
app.post('/forgot/recuperar-password', async (req, res) => {
  const { email } = req.body;
  const utilizador = await Utilizador.findOne({ email });
  if (!utilizador) return res.status(404).send('Utilizador não encontrado.');

  const resetToken = generateSessionToken(utilizador);
  utilizador.resetPasswordToken = resetToken;
  utilizador.resetPasswordExpires = Date.now() + 3600000;
  await utilizador.save();

  const resetUrl = `${FRONTEND_URL}/recover/redefinir-password/${resetToken}`;
  await sendEmail({
    to: email,
    subject: 'Redefinir Password',
    text: `Clique no link para redefinir a sua password:\n\n${resetUrl}`,
  });

  res.status(200).send('E-mail enviado.');
});

app.post('/recover/redefinir-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const utilizador = await Utilizador.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!utilizador) return res.status(400).send('Token inválido ou expirado.');

  utilizador.password_hash = await bcrypt.hash(newPassword, 10);
  utilizador.resetPasswordToken = undefined;
  utilizador.resetPasswordExpires = undefined;
  await utilizador.save();

  res.status(200).send('Password redefinida com sucesso.');
});

// === Utilizadores ===
app.post("/utilizadores", async (req, res) => {
  try {
    const { nome, apelido, username, dataNascimento, email, avatarUser, password } = req.body;
    if (!nome || !apelido || !username || !dataNascimento || !email || !avatarUser || !password) {
      return res.status(400).json({ message: "Dados incompletos." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const utilizador = new Utilizador({ nome, apelido, username, dataNascimento, email, avatarUser, password_hash: hashedPassword });
    await utilizador.save();
    res.status(201).json({ message: "Utilizador criado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar utilizador.", error: error.message });
  }
});

app.get("/utilizadores", async (req, res) => {
  try {
    const utilizadores = await Utilizador.find();
    res.json(utilizadores);
  } catch {
    res.status(500).json({ message: "Erro ao obter utilizadores" });
  }
});

app.delete("/utilizadores/:id", async (req, res) => {
  try {
    const resultado = await Utilizador.findByIdAndDelete(req.params.id);
    if (!resultado) return res.status(404).json({ message: "Utilizador não encontrado." });
    res.json({ message: "Utilizador eliminado com sucesso." });
  } catch {
    res.status(500).json({ message: "Erro ao eliminar utilizador" });
  }
});

app.get("/utilizador/:id", async (req, res) => {
  try {
    const utilizador = await Utilizador.findById(req.params.id);
    if (!utilizador) return res.status(404).json({ message: "Utilizador não encontrado." });
    res.json({
      nome: utilizador.nome,
      apelido: utilizador.apelido,
      username: utilizador.username,
      dataNascimento: utilizador.dataNascimento,
      email: utilizador.email,
      avatarUser: utilizador.avatarUser,
    });
  } catch {
    res.status(500).json({ message: "Erro ao obter dados do Utilizador." });
  }
});

app.put("/utilizador/:id", async (req, res) => {
  try {
    const { nome, apelido, username, dataNascimento, email, avatarUser } = req.body;
    const utilizador = await Utilizador.findById(req.params.id);
    if (!utilizador) return res.status(404).json({ message: "Utilizador não encontrado." });

    Object.assign(utilizador, { nome, apelido, username, dataNascimento, email, avatarUser });
    await utilizador.save();
    res.json({ message: "Dados atualizados com sucesso." });
  } catch {
    res.status(500).json({ message: "Erro ao atualizar dados." });
  }
});

// === Cães ===
app.post("/caes/adicionar", async (req, res) => {
  try {
    const cao = new Cao(req.body);
    await cao.save();
    res.status(201).json({ message: "Cão adicionado", cao });
  } catch {
    res.status(500).json({ message: "Erro ao adicionar cão" });
  }
});

app.get("/caes/:id_utilizador", async (req, res) => {
  try {
    const caes = await Cao.find({ id_utilizador: req.params.id_utilizador });
    res.json(caes);
  } catch {
    res.status(500).json({ message: "Erro ao listar cães" });
  }
});

// === Reservas ===

// Criar reserva
app.post("/reservas/criar", async (req, res) => {
  try {
    const { id_utilizador, id_cao, data_inicio, data_fim, observacoes } = req.body;

    if (!id_utilizador || !id_cao || !data_inicio || !data_fim) {
      return res.status(400).json({ message: "Campos obrigatórios em falta." });
    }

    const novaReserva = new Reserva({
      id_utilizador,
      id_cao,
      data_inicio,
      data_fim,
      observacoes
    });

    await novaReserva.save();
    res.status(201).json({ message: "Reserva criada com sucesso.", reserva: novaReserva });

  } catch (error) {
    console.error("❌ Erro ao criar reserva:", error);
    res.status(500).json({ message: "Erro ao criar reserva.", error: error.message });
  }
});

// Obter reservas de um utilizador
app.get("/reservas/:id_utilizador", async (req, res) => {
  try {
    const reservas = await Reserva.find({ id_utilizador: req.params.id_utilizador })
      .populate("id_cao", "nome raca");
    res.json(reservas);
  } catch (error) {
    console.error("❌ Erro ao obter reservas por utilizador:", error);
    res.status(500).json({ message: "Erro ao obter reservas." });
  }
});

// Obter todas as reservas
app.get("/reservas", async (req, res) => {
  try {
    const { id_utilizador, page, limit } = req.query;
    
    // Se é para um utilizador específico
    if (id_utilizador) {
      const reservas = await Reserva.find({ id_utilizador })
        .populate("id_cao", "nome raca");
      return res.json(reservas);
    }
    
    // Paginação (opcional)
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 50); // Default maior
    
    if (page) {
      // Com paginação
      const [items, total] = await Promise.all([
        Reserva.find()
          .populate('id_cao', 'nome raca')
          .populate('id_utilizador', 'nome apelido')
          .sort({ data_inicio: -1 })
          .skip((pageNum - 1) * limitNum)
          .limit(limitNum),
        Reserva.countDocuments()
      ]);
      
      res.json({
        items,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      });
    } else {
      // Sem paginação - todas as reservas
      const reservas = await Reserva.find()
        .populate("id_utilizador", "nome apelido email")
        .populate("id_cao", "nome raca")
        .sort({ data_inicio: -1 });
      res.json(reservas);
    }
  } catch (error) {
    console.error("❌ Erro ao obter reservas:", error);
    res.status(500).json({ message: "Erro ao obter reservas." });
  }
});

// Obter uma reserva por ID
app.get("/reserva/:id", async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate("id_cao", "nome");
    if (!reserva) return res.status(404).json({ message: "Reserva não encontrada." });
    res.json(reserva);
  } catch (error) {
    console.error("❌ Erro ao obter reserva por ID:", error);
    res.status(500).json({ message: "Erro ao obter reserva." });
  }
});

// Editar reserva
app.put("/reservas/editar/:id", async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reserva) return res.status(404).json({ message: "Reserva não encontrada." });
    res.json({ message: "Reserva atualizada com sucesso.", reserva });
  } catch (error) {
    console.error("❌ Erro ao atualizar reserva:", error);
    res.status(500).json({ message: "Erro ao atualizar reserva." });
  }
});

// Eliminar reserva
app.delete("/reservas/:id", async (req, res) => {
  try {
    const resultado = await Reserva.findByIdAndDelete(req.params.id);
    if (!resultado) return res.status(404).json({ message: "Reserva não encontrada." });
    res.json({ message: "Reserva eliminada com sucesso." });
  } catch (error) {
    console.error("Erro ao eliminar reserva:", error);
    res.status(500).json({ message: "Erro ao eliminar reserva." });
  }
});

// === Conteúdos - ROTA ÚNICA COM PAGINAÇÃO OPCIONAL ===
app.get("/conteudos", async (req, res) => {
  try {
    const { page, limit } = req.query;
    
    // Paginação (opcional)
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 50); // Default maior
    
    if (page) {
      // Com paginação
      const [items, total] = await Promise.all([
        Conteudo.find()
          .sort({ criadoEm: -1 })
          .skip((pageNum - 1) * limitNum)
          .limit(limitNum),
        Conteudo.countDocuments()
      ]);
      
      res.json({
        items,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      });
    } else {
      // Sem paginação - todos os conteúdos
      const conteudos = await Conteudo.find().sort({ createdAt: 1 });
      res.json(conteudos);
    }
  } catch (error) {
    console.error("❌ Erro ao obter conteúdos:", error);
    res.status(500).json({ message: "Erro ao obter conteúdos." });
  }
});

app.get("/conteudos/tipo/:tipo", async (req, res) => {
  try {
    const conteudos = await Conteudo.find({ tipo: req.params.tipo }).sort({ createdAt: 1 });
    if (!conteudos.length) {
      return res.status(404).json({ message: "Nenhum conteúdo encontrado." });
    }
    res.json(conteudos);
  } catch {
    res.status(500).json({ message: "Erro ao obter conteúdos por tipo." });
  }
});

// Rota para múltiplos tipos na Homepage
app.get("/conteudos/homepage", async (req, res) => {
  const tipos = ["Eventos", "Notícias", "Promoções", "Outras informações"];
  const conteudos = await Conteudo
    .find({ tipo: { $in: tipos } })
    .sort({ createdAt: -1 });
  res.json(conteudos);
});

app.post("/conteudos", async (req, res) => {
  const { titulo, tipo, corpo } = req.body;

  if (!titulo || !tipo || !corpo) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const novo = new Conteudo({
      titulo,
      tipo,
      corpo,
      atualizadoEm: Date.now()
    });
    await novo.save();
    res.status(201).json({ message: "Conteúdo criado.", conteudo: novo });
  } catch (err) {
    console.error("Erro ao criar conteúdo:", err);
    res.status(500).json({ message: "Erro ao criar conteúdo." });
  }
});


app.put("/conteudos/:id", async (req, res) => {
  const { titulo, tipo, corpo } = req.body;
  try {
    const atualizado = await Conteudo.findByIdAndUpdate(
      req.params.id,
      { titulo, tipo, corpo, atualizadoEm: Date.now() },
      { new: true }
    );
    if (!atualizado) return res.status(404).json({ message: "Conteúdo não encontrado." });
    res.json({ message: "Atualizado com sucesso.", conteudo: atualizado });
  } catch {
    res.status(500).json({ message: "Erro ao atualizar conteúdo." });
  }
});

app.delete("/conteudos/:id", async (req, res) => {
  try {
    const eliminado = await Conteudo.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ message: "Conteúdo não encontrado." });
    res.json({ message: "Eliminado com sucesso." });
  } catch {
    res.status(500).json({ message: "Erro ao eliminar conteúdo." });
  }
});

app.get("/calendario/ocupacoes", async (req, res) => {
  const { ano, mes } = req.query;
  if (!ano || !mes) {
    return res.status(400).json({ message: "Parâmetros 'ano' e 'mes' são obrigatórios." });
  }

  const anoInt = parseInt(ano);
  const mesInt = parseInt(mes) - 1;

  const inicio = new Date(Date.UTC(anoInt, mesInt, 1));
  const fim = new Date(Date.UTC(anoInt, mesInt + 1, 0, 23, 59, 59));

  try {
    const reservas = await Reserva.find({
      data_inicio: { $lte: fim },
      data_fim: { $gte: inicio }
    });

    const diasOcupados = new Set();

    reservas.forEach(reserva => {
      const atual = new Date(reserva.data_inicio);
      const ultima = new Date(reserva.data_fim);

      // Normalizar para UTC 00:00:00
      atual.setUTCHours(0, 0, 0, 0);
      ultima.setUTCHours(0, 0, 0, 0);

      while (atual <= ultima) {
        const dataStr = atual.toISOString().split('T')[0];
        diasOcupados.add(dataStr);
        atual.setUTCDate(atual.getUTCDate() + 1);
      }
    });

    res.json([...diasOcupados]);
  } catch (error) {
    console.error("Erro ao obter dias ocupados:", error);
    res.status(500).json({ message: "Erro ao obter dias ocupados." });
  }
});


// === Dashboard ===
app.get('/admin/stats', async (req, res) => {
  try {
    // Totais
    const totalUsers = await Utilizador.countDocuments();
    const totalRes = await Reserva.countDocuments();
    const totalContent = await Conteudo.countDocuments();

    // Utilizador com mais reservas
    const agg = await Reserva.aggregate([
      { $group: { _id: '$id_utilizador', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'utilizadores', // ← CORREÇÃO: era 'utilizadors', agora é 'utilizadores'
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      { $project: { username: '$user.username', count: 1 } }
    ]);
    const topUser = agg.length ? `${agg[0].username} (${agg[0].count})` : '–';

    const statsArray = [
      { label: 'Total de Utilizadores', value: totalUsers },
      { label: 'Total de Reservas', value: totalRes },
      { label: 'Total de Conteúdos', value: totalContent },
      { label: 'Utilizador Top', value: topUser }
    ];

    res.json({ stats: statsArray });
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({ message: 'Erro ao obter estatísticas.' });
  }
});

const path = require('path');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => {
  console.log("Servidor a funcionar na porta 3000");
});
