'use strict'

class WelcomeController {
	hello({ request, response, view }) {
		let user = {
			nama: 'Lazu',
			ttl: 'Indramayu, 11 Maret 1997'
		}
		return view.render('hello', { user: user })
	}
}

module.exports = WelcomeController
