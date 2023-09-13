<script>
	let DateOfHack = new Date(1694412900000);
	let TimeNow = Date.now();
	$: TimeSinceHack = `${Math.ceil(Math.abs(TimeNow - DateOfHack) / (1000 * 60 * 60 * 24))} days
            ${Math.ceil(Math.abs(TimeNow - DateOfHack) / (1000 * 60 * 60)) % 24} hours
            ${Math.ceil(Math.abs(TimeNow - DateOfHack) / (1000 * 60)) % 60} minutes
            ${Math.ceil(Math.abs(TimeNow - DateOfHack) / 1000) % 60} seconds`;
	$: setInterval(() => {
		TimeNow = Date.now();
	}, 1000);
	let TimesHacked = 3;
</script>

<div class="main">
	<div>
		<p>
			Times <strong>Killerey</strong> has gotten his account hacked: <strong>{TimesHacked}</strong>
		</p>
		<p>
			Approximate time since last time <strong>Killerey</strong> got his account hacked:<br
			/>{TimeSinceHack}
		</p>
		<p>
			"Don't get hacked by clicking on random links."<br />
			-Sun Tzu. The Art of War
		</p>
	</div>
</div>

<style>
	p {
		text-align: center;
	}
	p {
		font-size: 1.6em;
	}
	strong {
		color: red;
	}
	.main {
		display: grid;
		place-items: center;
		height: 100%;
	}
</style>
