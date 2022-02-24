const router = require('express').Router()
const { ReadingList } = require('../models')

router.get('/', async (req, res) => {
	const rls = await ReadingList.findAll()
	return res.json(rls)
})

router.post('/', async (req, res) => {
	const rl = await ReadingList.create(req.body)
	return res.json(rl)
})

router.post('/:id', async (req, res) => {
	const body = req.body
	if(!req.token){
		return res.status(401).end()
	}
	const rl = await ReadingList.findByPk(req.params.id)
	if(!rl || body.read === undefined){
		return res.status(204).end()
	}
	rl.read = req.body.read
	await rl.save()
	return res.json(rl)
})

module.exports = router