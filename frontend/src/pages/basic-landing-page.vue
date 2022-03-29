<script setup lang="ts">
import devpostIcon from '~/assets/devpost.png';
import githubIcon from '~/assets/github.png';
import linkedinIcon from '~/assets/linkedin.png';
import wakatimeIcon from '~/assets/wakatime.png';
import selfie from '~/assets/selfie.jpeg';
import lionProfile from '~/assets/lion-profile.png';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/700.css';
</script>

<template>
	<head>
		<title>Leon Si</title>

		<meta
			name="description"
			content="Leon Si (@leonzalion) Ambitious ultralearner, expectation defier. Making life more efficient, one project at a time."
		/>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>

	<div class="page__container">
		<div class="profile-image__container">
			<img
				class="profile-image profile-image--selfie"
				:src="selfie"
				height="500"
				alt="Profile Picture"
			/>
			<img
				class="profile-image profile-image--lion"
				:src="lionProfile"
				height="500"
				alt="Lion Profile Picture"
			/>
		</div>

		<div class="name">Leon Si (@leonzalion)</div>

		<div class="slogan">Ambitious ultralearner.</div>

		<a class="email" href="mailto:contact@leonzalion.com">
			contact@leonzalion.com
		</a>

		<div class="links">
			<div class="link">
				<a href="https://github.com/leonzalion" class="link__link">
					<img :src="githubIcon" class="link__logo" />
				</a>
			</div>

			<div class="link">
				<a href="https://linkedin.com/in/leonzalion" class="link__link">
					<img :src="linkedinIcon" class="link__logo" />
				</a>
			</div>

			<div class="link">
				<a href="https://wakatime.com/@leonzalion" class="link__link">
					<img :src="wakatimeIcon" class="link__logo" style="padding: 2px" />
				</a>
			</div>

			<div class="link">
				<a href="https://devpost.com/leonzalion" class="link__link">
					<img :src="devpostIcon" class="link__logo" style="width: 31px" />
				</a>
			</div>
		</div>
	</div>
</template>

<style scoped>
.page__container {
	padding: 10px;
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.profile-image__container {
	position: relative;
}

.profile-image {
	width: 300px;
	height: 300px;
	object-fit: cover;
	object-position: 50% 50%;
	border-radius: 50%;
}

.profile-image--selfie:hover ~ .profile-image--lion {
	opacity: 1;
}

.profile-image--lion {
	transition: opacity 0.5s linear;
	pointer-events: none;
	opacity: 0;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	position: absolute;
	z-index: 1;
}

.name {
	font-size: 25px;
	font-weight: bold;
	text-align: center;
	line-height: 1.2;
	margin-top: 0.3rem;
	margin-bottom: 0.3rem;
}

.slogan {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	font-weight: lighter;
}

.email {
	color: darkorange;
	margin-top: 0.2rem;
}

.email:hover {
	color: orange;
}

.links {
	margin-top: 0.6rem;
	display: flex;
	flex-direction: row;
}

.link {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-right: 3px;
	margin-left: 3px;
}

.link:hover {
	opacity: 0.7;
}

.link__logo {
	box-sizing: border-box;
	width: 30px;
}

.link__link {
	margin-left: auto;
	color: black;
}

.link__link:hover {
	color: gray;
}
</style>
