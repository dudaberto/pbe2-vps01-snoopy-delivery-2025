const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const pedido = await prisma.pedido.create({
            data: {
                ...req.body,
                motoristaId: parseInt(req.body.motoristaId), // Converte para número
                valor: parseFloat(req.body.valor) // Converte para float
            }
        });
        return res.status(201).json(pedido);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const pedidos = await prisma.pedido.findMany({
        include: {
            motorista: true // Inclui dados do motorista
        }
    });
    return res.json(pedidos);
}

const readOne = async (req, res) => {
    try {
        const pedido = await prisma.pedido.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                motorista: true // Inclui dados do motorista
            }
        });
        return res.json(pedido);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const pedido = await prisma.pedido.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                ...req.body,
                // Converte campos quando necessário
                ...(req.body.motoristaId && { motoristaId: parseInt(req.body.motoristaId) }),
                ...(req.body.valor && { valor: parseFloat(req.body.valor) })
            }
        });
        return res.status(202).json(pedido);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.pedido.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

// Método adicional para listar pedidos por motorista
const byMotorista = async (req, res) => {
    try {
        const pedidos = await prisma.pedido.findMany({
            where: {
                motoristaId: parseInt(req.params.motoristaId)
            }
        });
        return res.json(pedidos);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { create, read, readOne, update, remove, byMotorista };