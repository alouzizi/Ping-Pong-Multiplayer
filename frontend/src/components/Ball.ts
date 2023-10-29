const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.00001

export default class Ball {
	ballRef:any;
	direction:any;
	velocity: any;
	constructor(ballRef:any)
	{
		this.ballRef = ballRef;
		this.reset();
	}

	get x() {
		return parseFloat(getComputedStyle(this.ballRef).getPropertyValue("--x"))
	}
	set x(value:any) {
		this.ballRef.style.setProperty("--x", value)
	}
	get y() {
		return parseFloat(getComputedStyle(this.ballRef).getPropertyValue("--y"))
	}
	set y(value:any) {
		this.ballRef.style.setProperty("--y", value)
	}
	
	rect() {
		return this.ballRef.getBoundingClientRect()
	}
	reset() {

		this.x = 50
		this.y = 50
		this.direction = { x: 0 }
		while (
			Math.abs(this.direction.x) <= 0.2 ||
			Math.abs(this.direction.x) >= 0.9
		) {
			const heading = randomNumberBetween(0, 2 * Math.PI)
			this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
		}
		this.velocity = INITIAL_VELOCITY
	}

	update(delta:any, paddleRects:any) {
		this.x += this.direction.x * this.velocity * delta
		this.y += this.direction.y * this.velocity * delta
		this.velocity += VELOCITY_INCREASE * delta
		const rect = this.rect()
	
		if (rect.bottom >= window.innerHeight || rect.top <= 0) {
		  this.direction.y *= -1
		}
	
		if (paddleRects.some((r: any) => isCollision(r, rect))) {
		  this.direction.x *= -1
		}
    console.log("ballUpdate");

	}
}

function randomNumberBetween(min:any, max:any) {
	return Math.random() * (max - min) + min
}

function isCollision(rect1:any, rect2:any) {
	return (
		rect1.left <= rect2.right &&
		rect1.right >= rect2.left &&
		rect1.top <= rect2.bottom &&
		rect1.bottom >= rect2.top
	)
}