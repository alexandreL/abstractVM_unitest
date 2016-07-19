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

function execTest(test, file, neederr = false) {
    stackProcess.push(exec('./auto_copy/abstractVM ./input/' + file, execParam, function(err, stdout, stderr) {
        stackProcess.pop()
        if (stderr) {
            console.log('err:' + stderr)
        }
        if (neederr) {

        }
        if (err) {
            if (err.code != 84) {
                test.ok(false, err + 'signal: ' + err.signal)
            }
            else {
                if (neederr) {
                    test.ok(true, err + 'code de sortie: ' + err.code)
                } else {
                    test.ok(false, err + 'code de sortie: ' + err.code)
                }
            }
            test.done()
            return
        } else if (neederr) {
            test.ok(false, 'you need to exit 84')
            test.done()
            return
        }
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
        'base': function( test ) {
            stackProcess.push(exec("make re -C ./auto_copy/", function(err, stdout, stderr) {
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
        '1A - Assert': function(test) {
            execTest(test, '1A', true)
        },
        '1B - Divide By Zero': function(test) {
            execTest(test, '1B', true)
        },
        '1C - Empty Stack': function(test) {
            execTest(test, '1C', true)
        },
        '1D - Missing Exit': function(test) {
            execTest(test, '1D', true)
        },
        '1E - Lexical Error': function(test) {
            execTest(test, '1E', true)
        },
        '1F - Lexical Error Simple #2': function(test) {
            execTest(test, '1F', true)
        },
        '1G - Lexical Error Simple': function(test) {
            execTest(test, '1G', true)
        },
        '1H - Modulo BigDecimal': function(test) {
            execTest(test, '1H', true)
        },
        '1I - Modulo By Zero': function(test) {
            execTest(test, '1I', true)
        },
        '1J - Modulo Double': function(test) {
            execTest(test, '1J', true)
        },
        '1K - Modulo Float': function(test) {
            execTest(test, '1K', true)
        },
        '1L - Not enough Values': function(test) {
            execTest(test, '1L', true)
        },
        '1M - Overflow #2': function(test) {
            execTest(test, '1M', true)
        },
        '1N - Overflow': function(test) {
            execTest(test, '1N', true)
        },
        '1O - Underflow #2': function(test) {
            execTest(test, '1O', true)
        },
        '1P - Underflow': function(test) {
            execTest(test, '1P', true)
        },
        '1Q - Unknown Instruction': function(test) {
            execTest(test, '1Q', true)
        }
    }),
    'Unit Tests': testCase({
        '2A - Assert': function(test) {
            execTest(test, '2A')
        },
        '2B - Add': function(test) {
            execTest(test, '2B', true)
        },
        '2C - Add #2': function(test) {
            execTest(test, '2C')
        },
        '2D - Add #3': function(test) {
            execTest(test, '2D')
        },
        '2E - Sub': function(test) {
            execTest(test, '2E')
        },
        '2F - Sub #2': function(test) {
            execTest(test, '2F')
        },
        '2G - Sub #3': function(test) {
            execTest(test, '2G')
        },
        '2H - Div': function(test) {
            execTest(test, '2H')
        },
        '2I - Div #2': function(test) {
            execTest(test, '2I')
        },
        '2J - Div #3': function(test) {
            execTest(test, '2J')
        },
        '2K - Mod': function(test) {
            execTest(test, '2K')
        },
        '2L - Mod #2': function(test) {
            execTest(test, '2L')
        },
        '2M - Mul': function(test) {
            execTest(test, '2M')
        },
        '2N - Mul #2': function(test) {
            execTest(test, '2N')
        },
        '2O - Dup': function(test) {
            execTest(test, '2O')
        },
        '2P - Pop': function(test) {
            execTest(test, '2P')
        },
        '2Q - Print': function(test) {
            execTest(test, '2Q')
        },
        '2R - Push': function(test) {
            execTest(test, '2R')
        },
        '2S - Swap': function(test) {
            execTest(test, '2S')
        },
        '2T - Clear': function(test) {
            execTest(test, '2T')
        },
        '2U - Clear #2': function(test) {
            execTest(test, '2U')
        }
    }),
    'Parsing': testCase({
        '3A - Comment': function(test) {
            execTest(test, '3A')
        },
        '3B - Inline comment': function(test) {
            execTest(test, '3B')
        },
        '3C - Space': function(test) {
            execTest(test, '3C')
        },
        '3D - Tab & Space': function(test) {
            execTest(test, '3D')
        },
        '3E - Tab': function(test) {
            execTest(test, '3E')
        }
    }),
    'Advanced': testCase({
        '4A - 2 * 1 + 3': function(test) {
            execTest(test, '4A')
        },
        '4B - 6*(4+5) - 25/(2+3)': function(test) {
            execTest(test, '4B')
        },
        '4C - (42 + 33) * 44.55; 42.42; 42': function(test) {
            execTest(test, '4C')
        },
        '4D - (256 * 34 + 21) * (344 + 12 + 23)': function(test) {
            execTest(test, '4D')
        },
        '4E - (256 + 34 * 21) + (344 + 12 + 23)²': function(test) {
            execTest(test, '4E')
        },
        '4F - (2.56 + 34 * 21.4) * (0.344 + 12 + 23)²': function(test) {
            execTest(test, '4F')
        },
        '4G - (566.0 - 2443 / 5)^3': function(test) {
            execTest(test, '4G')
        }
    }),
    'BigDecimal': testCase({
        '5A - Add': function(test) {
            execTest(test, '5A')

        },
        '5B - Add #2': function(test) {
            execTest(test, '5B')

        },
        '5C - Sub': function(test) {
            execTest(test, '5C')

        },
        '5D - Sub #2': function(test) {
            execTest(test, '5D')

        },
        '5E - Div': function(test) {
            execTest(test, '5E')

        },
        '5F - Mul': function(test) {
            execTest(test, '5F')

        },
        '5G - BigF': function(test) {
            execTest(test, '5G')

        },
        '5H - BigG': function(test) {
            execTest(test, '5H')

        }
    }),
    'Registers': testCase({
        '6A - Load & Store': function(test) {
            execTest(test, '6A')
        },
        '6B - Load': function(test) {
            execTest(test, '6B')
        },
        '6C - Load Empty': function(test) {
            execTest(test, '6C', true)
        },
        '6D - Store': function(test) {
            execTest(test, '6D')
        },
        '6E - Store #2': function(test) {
            execTest(test, '6E')
        }
    }),
    'Type Cascading': testCase({
        '7A - Add int16': function(test) {
            execTest(test, '7A', true)
        },
        '7B - Add int8': function(test) {
            execTest(test, '7B')
        },
        '7C - Div': function(test) {
            execTest(test, '7C')
        },
        '7D - Mul': function(test) {
            execTest(test, '7D')
        }
    })
});
