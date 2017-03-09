/*
 * bambooshoot
 */

'use strict';



var bambooshoot_cli = {
    name:"bamboo",
    colors:require('colors'),
    commander:require('commander'),
    util:require('../lib/util.js'),
    commands:[ {
        "name":'start',
        "desc":"start mock server,you can pass option '-p' to set the server port"
    }]
};


bambooshoot_cli.help=function() {
    var content = [
        '',
        '  Usage: ' + bambooshoot_cli.name + ' <command>',
        '',
        '  Commands:',
        ''
    ];

    bambooshoot_cli.commands.forEach(function(cmd){        
        content.push('    ' + cmd.name + '    ' +(cmd.desc || ''));
    });

    content = content.concat([
        '',
        '  Options:',
        '',        
        '    -v, --version  output the version number',        
        '',
        '    -p, --port  set the server port',
    ]);
    console.log(content.join('\n'));
}





//package.json
bambooshoot_cli.info = require('../package.json');


bambooshoot_cli.help.commands = [ 'start'];

//output version info
bambooshoot_cli.version = function(){
    var content = [        
        '  v' + bambooshoot_cli.info.version,        
    ].join('\n');
    console.log(content);
};

function hasArgv(argv, search){
    var pos = argv.indexOf(search);
    var ret = false;
    while(pos > -1){
        argv.splice(pos, 1);
        pos = argv.indexOf(search);
        ret = true;
    }
    return ret;
}

//run cli tools
bambooshoot_cli.run = function(argv){
    //var processCWD = process.cwd();
    if(hasArgv(argv, '--no-color')){
        bambooshoot_cli.colors.mode = 'none';
    }
    var first = argv[2];
    if(argv.length < 3 || first === '-h' ||  first === '--help'){
        bambooshoot_cli.help();
    } else if(first === '-v' || first === '--version'){
        bambooshoot_cli.version();
    } else if(first[0] === '-'){
        bambooshoot_cli.help();
    } else {        
        bambooshoot_cli.commander.command('start')
            .description('start bambooshoot mock server')
            .option("-p,--port <port_number>", "Which port to use")
            .action(function(options) {
                var port = options.port || 3000;
                //console.log(port);
                require('../cli-start/clistart').serverstart(port);
            });
        bambooshoot_cli.commander.parse(argv);

    }
};
module.exports = bambooshoot_cli;