const run = async (url, desc) => {
  try {
    const resp = await fetch(url, { mode: 'cors' }).catch(err => {
      // 500 will trigger this catch
      console.log(desc, 'in fetch promise catch', url, err);
      throw new Error(desc + ' thrown from fetch catch');
    });

    // all responses will continue here
    console.log(desc, 'after catch', url, resp);

    if (resp && resp.json && resp.ok) {
      // only 200 responses will continue here, including 204

      const body = await resp.json();
      console.log(desc, 'response body after catch', url, body);
    }
  } catch (err) {
    console.log(desc, 'top level catch', url, err);
  } finally {
    console.log('-----------------------------');
  }
};

// 200
run('https://swapi.dev/api/people/1', '200');

// 404
run('https://swapi.dev/api/people/1000000', '404');

// internal server Error
run('https://mock.codes/500', '500');
