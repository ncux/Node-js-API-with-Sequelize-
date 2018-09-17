module.exports = (router, db) => {


    router.get('/items/all', async (req, res) => {
        let items = await db.Item.findAll({});
        res.send(items);
    });

    router.post('/items/new', async (req, res) => {
        try {
            let item = await db.Item.create({name: req.body.name, price: req.body.price, category: req.body.category});
            res.json({message: 'Successfully created item in database!', item: item});
        } catch (e) {
            res.send('Failed to create item in database!');
        }

    });

    router.put('/items/update/:id', async (req, res) => {
        try {
            let item = await db.Item.update({name: req.body.name, price: req.body.price, category: req.body.category}, {where: {id: req.params.id}});
            res.json({message: 'Successfully updated item in database!'});
        } catch (e) {
            res.send('Failed to create item in database!');
        }
    });

    router.delete('/items/delete/:id', async (req, res) => {
        try {
            await db.Item.destroy({where: {id: req.params.id}});
            res.json({message: 'Successfully deleted item in database!'});
        } catch (e) {
            res.send('Failed to create item in database!');
        }
    });

};








