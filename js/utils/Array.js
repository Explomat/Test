function shift(arr, k) {
	var n = arr.length;
    k = k % n;
    reverse(arr, 0, n - 1);
    reverse(arr, 0, n - k - 1);
    reverse(arr, n - k, n - 1);

    function reverse(arr, start, end) {
		while (start < end) {
	        var tmp = arr[start];
	        arr[start] = arr[end];
	        arr[end] = tmp;
	        start++;
	        end--;
	    }
	}
}

function objectToArray(obj){
	if (!obj) {
		throw new TypeError('objectToArray requires an object - not null or undefined');
	}

	var arr = [];
	Object.keys(obj).forEach(function(key){
		var a = Object.defineProperty({}, key, { 
			value: obj[key],
			writable: true,
			configurable: true,
			enumerable: true
		});
		arr.push(a);
	});
	return arr;
}

module.exports = {
	shift: shift,
	objectToArray: objectToArray
}