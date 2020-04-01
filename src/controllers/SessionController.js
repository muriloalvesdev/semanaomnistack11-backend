const connection = require('../database/connection');
const jwt = require('jsonwebtoken');

module.exports = {

    async create(request, response) {
        const {id} = request.body;
        const token = jwt.sign({id: id}, id);
        
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if(!ong){
            return response.status(400)
                .json({error: 'No ONG found with this ID'});
        }

        return response.json(token);
    }
}