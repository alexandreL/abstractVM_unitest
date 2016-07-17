'use strict';

const net = require('net');
const testCase = require('nodeunit').testCase;
const exec = require('child_process').exec;
const fs = require('fs');
var execParam = {
    encoding: 'utf8',
    timeout: 5000, // 5s
    killSignal: 'SIGINT',
}
var stackProcess = []

function exitHandler(options, err) {
    stackProcess.forEach(elem => {
        elem.kill("SIGINT")
    });
    process.exit(1)
}
//do something when app is closing
process.on('exit', exitHandler.bind())
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind())

function execTest(test, file) {
    stackProcess.push(exec('./auto_copy/abstractVM ./input/' + file, execParam, function(err, stdout, stderr) {
        stackProcess.pop()
        fs.readFile("./output/" + file, 'utf-8', function(errfile, data) {
            var s1 = stdout.split('\n')
            var s2 = data.split('\n')
            for (var i = 0; i < s1.length && i < s2.length; i++) {
                test.equal(s1[i], s2[i])
            }
            test.done()
        });
    }))
}

module.exports = testCase({
    'Compile': testCase({
        'base': function(test) {
            stackProcess.push(exec("make -C ./auto_copy/", function(err, stdout, stderr) {
                stackProcess.pop()
                if (stderr.length !== 0) {
                    console.log(stderr)
                    test.ok(false)
                    test.done()
                } else {
                    test.ok(true)
                    test.done()
                }
            }))
        }
    }),
    'Error Management': testCase({
        'Assert': function(test) {
            execTest(test, '1A')
        },
        'Divide By Zero': function(test) {
            execTest(test, '1B')
        },
        'Empty Stack': function(test) {
            execTest(test, '1C')
        },
        'Missing Exit': function(test) {
            execTest(test, '1D')
        },
        'Lexical Error': function(test) {
            execTest(test, '1E')
        },
        'Lexical Error Simple #2': function(test) {
            execTest(test, '1F')
        },
        'Lexical Error Simple': function(test) {
            execTest(test, '1G')
        },
        'Modulo BigDecimal': function(test) {
            execTest(test, '1H')
        },
        'Modulo By Zero': function(test) {
            execTest(test, '1I')
        },
        'Modulo Double': function(test) {
            execTest(test, '1J')
        },
        'Modulo Float': function(test) {
            execTest(test, '1K')
        },
        'Not enough Values': function(test) {
            execTest(test, '1L')
        },
        'Overflow #2': function(test) {
            execTest(test, '1M')
        },
        'Overflow': function(test) {
            execTest(test, '1N')
        },
        'Underflow #2': function(test) {
            execTest(test, '1O')
        },
        'Underflow': function(test) {
            execTest(test, '1P')
        },
        'Unknown Instruction': function(test) {
            execTest(test, '1Q')
        }
    }),
    'Unit Tests': testCase({
        'Assert': function(test) {
            execTest(test, '2A')
        },
        'Add': function(test) {
            execTest(test, '2B')
        },
        'Add #2': function(test) {
            execTest(test, '2C')
        },
        'Add #3': function(test) {
            execTest(test, '2D')
        },
        'Sub': function(test) {
            execTest(test, '2E')
        },
        'Sub #2': function(test) {
            execTest(test, '2F')
        },
        'Sub #3': function(test) {
            execTest(test, '2G')
        },
        'Div': function(test) {
            execTest(test, '2H')
        },
        'Div #2': function(test) {
            execTest(test, '2I')
        },
        'Div #3': function(test) {
            execTest(test, '2J')
        },
        'Mod': function(test) {
            execTest(test, '2K')
        },
        'Mod #2': function(test) {
            execTest(test, '2L')
        },
        'Mul': function(test) {
            execTest(test, '2M')
        },
        'Mul #2': function(test) {
            execTest(test, '2N')
        },
        'Dup': function(test) {
            execTest(test, '2O')
        },
        'Pop': function(test) {
            execTest(test, '2P')
        },
        'Print': function(test) {
            execTest(test, '2Q')
        },
        'Push': function(test) {
            execTest(test, '2R')
        },
        'Swap': function(test) {
            execTest(test, '2S')
        },
        'Clear': function(test) {
            execTest(test, '2T')
        },
        'Clear #2': function(test) {
            execTest(test, '2U')
        }
    }),
    'Parsing': testCase({
        'Comment': function(test) {
            execTest(test, '3A')
        },
        'Inline comment': function(test) {
            execTest(test, '3B')
        },
        'Space': function(test) {
            execTest(test, '3C')
        },
        'Tab & Space': function(test) {
            execTest(test, '3D')
        },
        'Tab': function(test) {
            execTest(test, '3E')
        }
    }),
    'Advanced': testCase({
        '4A': function(test) {
            execTest(test, '4A')
        },
        '4B': function(test) {
            execTest(test, '4B')
        },
        '4C': function(test) {
            execTest(test, '4C')
        },
        '4D': function(test) {
            execTest(test, '4D')
        },
        '4E': function(test) {
            execTest(test, '4E')
        },
        '4F': function(test) {
            execTest(test, '4F')
        },
        '4G': function(test) {
            execTest(test, '4G')
        }
    }),
    'BigDecimal': testCase({
        'Add': function(test) {
            execTest(test, '5A')

        },
        'Add #2': function(test) {
            execTest(test, '5B')

        },
        'Sub': function(test) {
            execTest(test, '5C')

        },
        'Sub #2': function(test) {
            execTest(test, '5D')

        },
        'Div': function(test) {
            execTest(test, '5E')

        },
        'Mul': function(test) {
            execTest(test, '5F')

        },
        'BigF': function(test) {
            execTest(test, '5G')

        },
        'BigG': function(test) {
            execTest(test, '5H')

        }
    }),
    'Registers': testCase({
        'Load & Store': function(test) {
            execTest(test, '6A')
        },
        'Load': function(test) {
            execTest(test, '6B')
        },
        'Load Empty': function(test) {
            execTest(test, '6C')
        },
        'Store': function(test) {
            execTest(test, '6D')
        },
        'Store #2': function(test) {
            execTest(test, '6E')
        }
    }),
    'Type Cascading': testCase({
        'Add int16': function(test) {
            execTest(test, '7A')
        },
        'Add int8': function(test) {
            execTest(test, '7B')
        },
        'Div': function(test) {
            execTest(test, '7C')
        },
        'Mul': function(test) {
            execTest(test, '7D')
        }
    })
});
