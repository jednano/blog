import * as path from 'path'

import * as bodyParser from 'body-parser'
import chalk from 'chalk'
import { Express } from 'express'
import * as bb from 'express-busboy'
import * as logger from 'morgan'
import { createExpressServer } from 'routing-controllers'
import { createConnection } from 'typeorm'

createConnection().then(async () => {

	const app: Express = createExpressServer({
		classTransformer: true,
		cors: true,
		controllers: [path.join(__dirname, 'controllers', '*.ts')],
		interceptors: [path.join(__dirname, 'interceptors', '*.ts')],
		middlewares: [path.join(__dirname, 'middlewares', '*.ts')],
		routePrefix: '/api',
	})

	// parse multipart/form-data
	bb.extend(app)

	app.use(logger('dev'))
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	const port = process.env.PORT || 3001
	app.listen(port, () => {
		console.log(chalk.green(`API server lisening on port ${port}`))
	})
})
.catch(error => console.log('Error:', error))
