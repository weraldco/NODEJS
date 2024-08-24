// const p = { id: 1, name: 'Alice' };

// function getDataFromObject(key) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			if (p[key]) {
// 				resolve(p[key]);
// 			} else {
// 				reject(new Error('Data not found'));
// 			}
// 		}, 1000); // Simulate a 1-second delay
// 	});
// }

// getDataFromObject('name')
// 	.then((userData) => console.log(userData))
// 	.catch((error) => console.error(error));

const p = new Promise((resolve) => resolve({ id: 1, name: 'Alice' }));
p.then((val) => console.log(val['name']));
