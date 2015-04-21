var nconf = require('nconf'),
	validator = require('validator'),
	plugins = require('../plugins');

module.exports = function(Meta) {
	Meta.tags = {};

	Meta.tags.parse = function(meta, link, callback) {
		var defaultMetaTags = [{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1.0, user-scalable=no'
			}, {
				name: 'content-type',
				content: 'text/html; charset=UTF-8'
			}, {
				name: 'apple-mobile-web-app-capable',
				content: 'yes'
			}, {
				property: 'og:site_name',
				content: Meta.config.title || 'NodeBB'
			}, {
				name: 'keywords',
				content: Meta.config.keywords || ''
			}, {
				name: 'msapplication-badge',
				content: 'frequency=30; polling-uri=' + nconf.get('url') + '/sitemap.xml'
			}, {
				name: 'msapplication-square150x150logo',
				content: Meta.config['brand:logo'] || ''
			}],
			defaultLinkTags = [{
				rel: 'apple-touch-icon',
				href: nconf.get('relative_path') + '/apple-touch-icon'
			}];

		meta = defaultMetaTags.concat(meta || []).map(function(tag) {
			if(!tag || typeof tag.content !== 'string') {
				winston.warn('Invalid meta tag. ', tag);
				return tag;
			}

			tag.content = validator.escape(tag.content);
			return tag;
		});

		link = defaultLinkTags.concat(link || []);
		link.unshift({
			rel: "icon",
			type: "image/x-icon",
			href: nconf.get('relative_path') + '/favicon.ico'
		});

		callback(null, {
			meta: meta,
			link: link
		});
	};
};