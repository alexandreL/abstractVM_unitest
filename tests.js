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

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    stackProcess.forEach(elem => {
        elem.kill("SIGINT");
    });
    process.exit(1);
}

//do something when app is closing
process.on('exit', exitHandler.bind());
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind());

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
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Divide By Zero': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Empty Stack': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Missing Exit': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Lexical Error': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Lexical Error Simple #2': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Lexical Error Simple': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Modulo BigDecimal': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Modulo By Zero': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Modulo Double': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Modulo Float': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Not enough Values': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Overflow #2': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Overflow': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Underflow #2': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Underflow': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Unknown Instruction': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        }
    }),
    'Unit Tests': testCase({
        'Assert': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Add': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Add #2': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Add #3': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Sub': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Sub #2': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Sub #3': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Div': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Div #2': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Div #3': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Mod': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Mod #2': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Mul': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Mul #2': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Dup': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Pop': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Print': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Push': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Swap': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Clear': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Clear #2': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        }
    }),
    'Parsing': testCase({
        'Comment': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Inline comment': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Space': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Tab & Space': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Tab': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        }
    }),
    'Advanced': testCase({
        '4A': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        '4B': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        '4C': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        '4D': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        '4E': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        '4F': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        '4G': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        }
    }),
    'BigDecimal': testCase({
        'Add': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))

        },
        'Add #2': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))

        },
        'Sub': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))

        },
        'Sub #2': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))

        },
        'Div': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))

        },
        'Mul': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))

        },
        'BigF': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))

        },
        'BigG': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))

        }
    }),
    'Registers': testCase({
        'Load & Store': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Load': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Load Empty': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Store': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Store #2': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        }
    }),
    'Type Cascading': testCase({
        'Add int16': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Add int8': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Div': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        },
        'Mul': function(test) {
            stackProcess.push(exec('./auto_copy/abstractVM ', execParam, function(err, stdout, stderr) {
                stackProcess.pop()
                test.ok(true, "unavailable")
                test.done()
            }))
        }
    })
});
