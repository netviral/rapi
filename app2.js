const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const some = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 })
const { exec } = require('child_process');
const parser = some.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', function(data){
   // console.log(data);
    var command = "aplay /audio/"+data+".wav";
    // Execute the command
    exec(command, (error, stdout, stderr) => {
        if (error) {
        console.error(`Playing Note ${data}. Error executing the command: ${error.message}`);
        return;
        }
        if (stderr) {
        console.error(`Playing Note ${data}. Command stderr: ${stderr}`);
        return;
        }
        console.log(`Playing Note ${data}. Command stdout: ${stdout}`);
    });
});
