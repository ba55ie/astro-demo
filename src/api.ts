import { load, type CheerioAPI } from 'cheerio';

export type { CheerioAPI };

export type Person = {
	name: string;
	body: string;
	url: string;
	id: string;
	$: CheerioAPI;
};

export async function getHtml(url: string): Promise<CheerioAPI> {
	const response = await fetch(url);
	const text = await response.text();

	return load(text);
}

const peopleCache: Person[] = [];

export async function getPeople() {
	if (peopleCache.length) {
		return peopleCache;
	}

	const $ = await getHtml('https://www.vicompany.nl/vi-company');

	$('#people a.person[href]').each((i, el) => {
		const url = el.attribs['href'];
		const id = url.split('/').pop() as string;

		peopleCache.push({
			name: $('.heading', el).text(),
			body: $('.is-subjacent', el).text().trim(),
			id,
			url,
			$: load('', null, false),
		});
	});

	return peopleCache;
}

export type PersonDetail = {
	title: string;
	body: string;
};

const personCache = new Map<string, PersonDetail>();

export async function getPerson(id: string): Promise<PersonDetail> {
	if (personCache.has(id)) {
		return personCache.get(id) as PersonDetail;
	}

	const $ = await getHtml(`https://www.vicompany.nl/vi-company/people/${id}`);

	const title = $('h1', '.main').text();
	const body = $('.text-max-width', '.main').html() || '';

	const person: PersonDetail = { title, body };

	personCache.set(id, person);

	return person;
}
