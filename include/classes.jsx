// Break the timer into ms
export class TimerBreak {
	constructor(time) {
		let { h, m, s } = time;
		let hConv = int => int * 3600000;
		let mConv = int => int * 60000;
		let sConv = int => int * 1000;
		this.ms = hConv(h) + mConv(m) + sConv(s);
		this.length = time;
	}
}

// Build timer from ms
export class TimerBuild {
	constructor(ms) {
		let conv = {
			h: 3600000,
			m: 60000,
			s: 1000
		};
		this.h = Math.floor(ms / conv.h);
		ms %= conv.h;
		this.m = Math.floor(ms / conv.m);
		ms %= conv.m;
		this.s = Math.floor(ms / conv.s);
	}
}
