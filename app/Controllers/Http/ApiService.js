'use strict'

const Logger = use('Logger')
const http = require('axios')

class ApiService {
	async getData(url, method = 'GET', params = null, options = null) {
		if (method == 'GET') {
			let customopt
			if (options) {
				customopt = {
					url: url,
					method: method,
					params: params,
					headers: options.headers,
					timeout: 60000
				}
			} else {
				customopt = {
					url: url,
					method: method,
					params: params,
					timeout: 60000
				}
			}
			return await http(customopt)
				.then(function (response) {
					return response.data
				})
				.catch(function (error) {
					if (error.response) {
						let data = {
							code: error.response.status,
							data: error.response.data
						}
						return data
					} else if (error.request) {
						let data = {
							code: '404',
							data: 'Error Request URI'
						}
						return data
					} else {
						let data = {
							code: error.response.status,
							data: error.response.data
						}
						return data
					}
				})
		} else {
			let customopt
			if (options) {
				customopt = {
					url: url,
					method: method,
					data: params,
					headers: options.headers,
					timeout: 60000
				}
			} else {
				customopt = {
					url: url,
					method: method,
					data: params,
					timeout: 60000
				}
			}
			return await http(customopt)
				.then(function (response) {
					return response.data
				})
				.catch(function (error) {
					if (error.response) {
						let data = {
							code: error.response.status,
							data: error.response.data
						}
						return data
					} else if (error.request) {
						let data = {
							code: '404',
							data: 'Error Request URI'
						}
						return data
					} else {
						let data = {
							code: error.response.status,
							data: error.response.data
						}
						return data
					}
				})
		}
	}
}

module.exports = new ApiService