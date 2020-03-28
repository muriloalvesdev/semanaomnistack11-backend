const crypto = require('crypto');
const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId')
module.exports = {

    async list (request, response) {
        const ongs = await connection('ongs').select('*');
        response.json(ongs);

    },

    async create (request, response) {
        const {name, email, whatsapp, city, uf} = request.body;
        const id = generateUniqueId();
        const whatsappWithCodeBrasil = "55" + whatsapp;
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ id });
    }
};