<template>
	<li class="vue-link-card">
		<a :href="href" @click="add">
			<h2>
				{{ title }}
				<span>&rarr;</span>
			</h2>
			<p>{{ body }}</p>
			<p>
				<small>visited: {{ visited }}</small>
			</p>
		</a>
	</li>
</template>

<script lang="ts">
export default {
	props: {
		title: String,
		body: String,
		href: String,
	},

	data() {
		return {
			visited: 0,
		};
	},

	computed: {
		clicked: {
			get() {
				const count = localStorage?.getItem(this.title);

				return Number(count ?? 0);
			},

			set(value: number) {
				localStorage?.setItem(this.title, value);
			},
		},
	},
	methods: {
		add(e: Event): void {
			this.clicked++;
		},
	},

	mounted() {
		this.visited = this.clicked;
	},
};
</script>

<style>
:root {
	--link-gradient: linear-gradient(
		45deg,
		#4f39fa,
		#da62c4 30%,
		var(--color-border) 60%
	);
}

.vue-link-card {
	list-style: none;
	display: flex;
	padding: 0.15rem;
	background-image: var(--link-gradient);
	background-size: 400%;
	border-radius: 0.5rem;
	background-position: 100%;
	transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.vue-link-card > a {
	width: 100%;
	text-decoration: none;
	line-height: 1.4;
	padding: 1em 1.3em;
	border-radius: 0.35rem;
	color: var(--text-color);
	background-color: white;
	opacity: 0.8;
	border: solid thin #ccc;
}

h2 {
	margin: 0;
	transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

p {
	margin-top: 0.75rem;
	margin-bottom: 0;
}

h2 span {
	display: inline-block;
	transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.vue-link-card:is(:hover, :focus-within) {
	background-position: 0;
}

.vue-link-card:is(:hover, :focus-within) h2 {
	color: #4f39fa;
}

.vue-link-card:is(:hover, :focus-within) h2 span {
	will-change: transform;
	transform: translateX(2px);
}
</style>
