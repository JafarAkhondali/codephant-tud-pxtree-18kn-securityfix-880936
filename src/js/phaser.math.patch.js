
Phaser.Math.factorial = function factorial (n)
{
	var prod = 1;
	
	if (typeof(n) === 'number' && n > 0)
		while (n > 0)
			prod *= (n--);
	
	return prod;
};