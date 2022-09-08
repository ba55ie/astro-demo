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

const people: Person[] = [];

export async function getPeople() {
	if (people.length) {
		return people;
	}

	const $ = await getHtml('https://www.vicompany.nl/vi-company');

	$('#people a.person[href]').each((i, el) => {
		const url = el.attribs['href'];
		const id = url.split('/').pop() as string;

		people.push({
			name: $('.heading', el).text(),
			body: $('.is-subjacent', el).text().trim(),
			id,
			url,
			$: load('', null, false),
		});
	});

	return people;
}
