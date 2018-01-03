
var HTTP_URL = require('./URL');


var testcases = [
	{ 
		input: 'https://poop:1234/1/2/?yes=And%20No#ok',
		tests: [
			['HREF matches', (URL, input) => {
				return URL.href == input
			}],
			['Parameter setting working', (URL, input) => {
				URL.searchParams.set('bananas', true)
				return URL.search == 'yes=And%20No&bananas=true'
					|| URL.search == 'bananas=true&yes=And%20No'
			}],
			['Parameter setting working', (URL, input) => {
				URL.searchParams.delete('bananas');
				return URL.search == 'yes=And%20No'
			}],
		]
    },
    { 
		input: 'google.com/1/2/?yes=And%20No#ok',
		tests: [
			['Protocol is null', (URL, input) => {
                return URL.protocol == null
            }],
			['Host matches', (URL, input) => {
                return URL.host == 'google.com'
                    && URL.hostname == 'google.com'
            }],
            ['Port is null', (URL, input) => {
                return URL.port == null
            }],
		]
	}
];



function it(name, test) {
	console.log(`    Running: ${name}`);
	console.assert(test());
}


for(var t of testcases) {
	var trial = new HTTP_URL(t.input);
	console.log('Testing: ' + t.input);
	for(var test of t.tests) {
		it(test[0], ()=> { 
			return test[1](trial, t.input); 
		});
	}
}