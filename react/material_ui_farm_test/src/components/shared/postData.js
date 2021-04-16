export default async function postData(data, selectedCameras) {
    // Default options are marked with *
    
    selectedCameras.forEach(camera => {
      const url = 'https://connectedfarmsnodered.mybluemix.net/commands';
      data.DeviceID = "000" + camera;
      fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    })
    
    // return response.json(); // parses JSON response into native JavaScript objects

    // return response;
}