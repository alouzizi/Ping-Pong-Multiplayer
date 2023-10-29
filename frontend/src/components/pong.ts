export default class Pong {
	ball: any;

	constructor(ball: any)
	{
		this.ball = ball;
	}

	get x() {
		return parseFloat(getComputedStyle(this.ball).getPropertyValue("--x"))
	}
	set x(value: number)
	{
		this.ball.style.setProperty("--x", value)
	}
}