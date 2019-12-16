'use strict'

const Env = use('Env')
const ApiService = require('./ApiService.js')

class BlogController {
	async getBlog({ request, response }) {
		let req = request.post()
		const reqparam = {
			title: req.title,
			limit: req.limit,
			offset: req.offset
		}

		let posts = await ApiService.getData(Env.get('API_GOA_HOST') + '/posts', 'POST', reqparam)

		let postjson = posts.data.posts

		let posdata = []
		for(let x in postjson) {
			let splitimage
			if(postjson[x].image != null) {
				splitimage = postjson[x].image.split('/')
				splitimage = Env.get('CDN_URL') + 'mediums/' + splitimage.slice(-1)[0]
			} else {
				splitimage = Env.get('CDN_URL') + 'product-placeholder.jpg'
			}

			let splitimagecover
			if(postjson[x].image_cover != null) {
				splitimagecover = postjson[x].image_cover.split('/')
				splitimagecover = Env.get('CDN_URL') + 'mediums/' + splitimagecover.slice(-1)[0]
			} else {
				splitimagecover = Env.get('CDN_URL') + 'product-placeholder.jpg'
			}

			let pos = {
				id: postjson[x].id,
				category_post_id: postjson[x].category_post_id,
				category_title: postjson[x].category_title,
				tag: postjson[x].tag,
				date: postjson[x].date,
				time: postjson[x].time,
				publishdate: postjson[x].publishdate,
				active: postjson[x].active,
				headline: postjson[x].headline,
				comment: postjson[x].comment,
				image: splitimage,
				image_cover: splitimagecover,
				image_description: postjson[x].image_description,
				post_id: postjson[x].post_id,
				language_id: postjson[x].language_id,
				title: postjson[x].title,
				content: postjson[x].content,
				contentsubstr: this.substrTexts(this.stripHtmlTags(postjson[x].content), 0 , 250),
				seotitle: postjson[x].seotitle,
			}
			posdata.push(pos)
		}

		if (posts['code'] == '2000') {
			let data = {
				code: '2000',
				message: 'Blog Found',
				data: posdata
			}

			return data
		} else {
			return response.redirect('/error/404')
		}
	}

	stripHtmlTags(txt) {
		if ((txt===null) || (txt==='')) {
			return false
		} else {
			txt = txt.toString()
			return txt.replace(/<[^>]*>/g, '')
		}
	}

	substrTexts(txt, start, finish) {
		if ((txt===null) || (txt==='')) {
			return false
		} else {
			txt = txt.substr(parseInt(start), parseInt(finish))
			let ltxt = txt.substr(0, Math.min(txt.length, txt.lastIndexOf(" ")))
			return ltxt
		}
	}
}

module.exports = BlogController
