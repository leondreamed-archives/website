<script setup lang="ts">
import communicationMatrix from '~/assets/communication-matrix.png';
</script>

<template>
	<div class="column items-center p-8">
		<div class="prose">
			Hey! I'm quitting Discord and moving away from text-based synchronous
			communication. I find that this form of communication is rather
			inefficient, and it often distracts me from work. However, don't get me
			wrong; communication is still valuable! That's why I'm limiting my
			communication to only either text-based asynchronous communication (e.g.
			email) or voice-based communication (both synchronous and asynchronous):
			<img :src="communicationMatrix" class="max-w-[600px] mx-auto" />
			However, I understand the value of Discord for others; it's one of the
			best synchronous communication platforms out there! Thus, if you still
			would prefer to use Discord to contact me, you can use my custom Discord
			bot that uses acts as a "tunnel" between my emails and Discord. If you
			need to communicate with me synchronously, I would prefer to set up a
			Google Meet or a similar voice-based communication channel instead of
			back-and-forth direct messages. To use this bot, you need to join the
			following Discord channel to get access to the Discord bot:
			<a class="inline" href="https://discord.gg/cysqhWcv69"
				>https://discord.gg/cysqhWcv69</a
			>. Then, you can type
			<code>/dm</code>
			in the #bot-commands channel, and the bot will send you a Direct Message.
			You can then DM the bot to send me a message (which will automatically get
			forwarded to my email). Whenever I reply to the email, the bot will then
			send that reply as a message to you. I likely won't respond immediately
			since I only check my emails around two times a day.

			<p>
				Once again, the Discord bot is completely optional and isn't the only
				way to get in touch with me. Rather, you'll likely find sending me a
				normal email at contact@leonzalion.com to be more practical :)
			</p>

			<strong>Discord Bot Source Code: </strong>
			<a href="https://github.com/leonzalion/discord-email-tunnel"
				>https://github.com/leonzalion/discord-email-tunnel</a
			>
		</div>
	</div>
</template>
