PL.System = class extends PL.SystemBase {

	constructor(loader) {
		super(loader);

		this.rings = 8;
		this.radius = 0;
		this.radiusGrowth = 1.5;
		this.duration = 3500;

		for(let i = 0; i < this.rings; i++) {
			let count = i === 0 ? 1 : 1 + Math.ceil(i * 6);

			for(let j = 0; j < count; j++) {
				let angle = (j / count) * Math.PI * 2;
				let x = Math.cos(angle) * this.radius;
				let y = Math.sin(angle) * this.radius;
				let z = 0;
				let size = this.calc.map(i, 0, this.rings, 0.2, 0.05);

				this.particles.push(new PL.Particle({
					group: this.particleGroup,
					x: x,
					y: y,
					z: z,
					size: size,
					radius: this.radius,
					angle: angle,
					color: i % 2 === 0 ? 0xffffff: 0xffffff,
					opacity: 1
				}, this, this.loader));
			}

			this.radius += this.radiusGrowth;
		}
	}

	update() {
		super.update();

		if(this.exiting) {
			this.loader.camera.position.z = 100 - this.ease.inExpo(this.exitProg, 0, 1, 1) * 100;
		}
	}

}
