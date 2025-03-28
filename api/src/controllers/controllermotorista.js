const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const motorista = await prisma.motorista.create({
            data: req.body
        });
        return res.status(201).json(motorista);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const motoristas = await prisma.motorista.findMany({
        include: {
            pedidos: true // Inclui os pedidos relacionados
        }
    });
    return res.json(motoristas);
}

const readOne = async (req, res) => {
    try {
        const motorista = await prisma.motorista.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                pedidos: true // Inclui os pedidos relacionados
            }
        });
        return res.json(motorista);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const motorista = await prisma.motorista.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(motorista);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        // Primeiro deleta os pedidos associados
        await prisma.pedido.deleteMany({
            where: {
                motoristaId: parseInt(req.params.id)
            }
        });
        
        // Depois deleta o motorista
        await prisma.motorista.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { create, read, readOne, update, remove };