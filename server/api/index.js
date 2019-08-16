const router = require('express').Router()
module.exports = router

router.use('/food', require('./food'))
router.use('/meals', require('./meals'))


router.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
  })
  