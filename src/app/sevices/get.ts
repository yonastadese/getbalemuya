export const GET = {
    "getClean": {
        title: 'What kind of cleaning you want?',
        child: [
            {
                id: 'kjadf',
                option: 'Deep clean',
                done: true,
                next: 'partClean'
            },
            {
                id: 'kjasf',
                option: 'Standard clean',
                done: true,
                next: 'partClean'
            },
            {
                id: 'kuadf',
                option: 'Eliminate bad odor',
                done: false
            },
            {
                id: 'kuadf',
                option: 'Other',
                done: true,
                next: 'partClean'
            }
        ]
    },
    "kuadf": {
        title: 'What kind of cleaning you want?',
        child: [
            {
                id: 'qjadf',
                option: 'Bathroom',
                done: false
            },
            {
                id: 'wjasf',
                option: 'Kitchen',
                done: false
            },
            {
                id: 'ruadf',
                option: 'Manhole',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'tuadf',
                option: 'Septic tank',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'yuadf',
                option: 'Other',
                done: true,
                next: "oftenclean"
            }
        ]
    },
    "qjadf": {
        title: 'Where in the bathroom',
        child: [
            {
                id: 'ujadf',
                option: 'Shower drainage',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'ijasf',
                option: 'Floor drainage',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'ouadf',
                option: 'Handwash drainage',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'puadf',
                option: 'I don’t know',
                done: true,
                next: "oftenclean"
            }
        ]
    },
    "wjasf": {
        title: 'Where in the Kitchen',
        child: [
            {
                id: 'ajadf',
                option: 'Sink drainage',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'sjasf',
                option: 'Floor drainage',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'duadf',
                option: 'I don’t know',
                done: true,
                next: "oftenclean"
            }
        ]
    },
    "partClean": {
        title: 'Which part of the property needs cleaning?',
        child: [
            {
                id: 'aaaa',
                option: 'The whole building',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'aaab',
                option: 'Windows and glasses ',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'aaac',
                option: 'Living room',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'aaad',
                option: 'Bed room/s',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'aaae',
                option: 'Kitchen',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'aaaf',
                option: 'Bathroom ',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'aaag',
                option: 'Compound',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'aaah',
                option: 'Walk way',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'aaai',
                option: ' Drive way',
                done: true,
                next: "oftenclean"
            },
            {
                id: 'aaaj',
                option: ' other',
                done: true,
                next: "oftenclean"
            }
        ]
    },
    "oftenclean": {
        title: 'How often you want the cleaning',
        child: [
            {
                id: 'bbbb',
                option: 'Every day ',
                done: true
            },
            {
                id: 'bbba',
                option: 'Twice a week ',
                done: true
            },
            {
                id: 'bbbc',
                option: 'Three times a week ',
                done: true
            },
            {
                id: 'bbbd',
                option: 'Once in a week ',
                done: true
            },
            {
                id: 'bbbe',
                option: 'Every month',
                done: true
            },
            {
                id: 'bbeb',
                option: 'Quarterly ',
                done: true
            },
            {
                id: 'bbfb',
                option: 'Annually ',
                done: true
            },
            {
                id: 'bbbg',
                option: 'One time ',
                done: true
            }
        ]
    },

    "getPlumbing": {
        title: 'Where is the leakage?',
        child: [
            {
                id: 'asdas',
                option: 'Broken pipe',
                done: false
            },
            {
                id: 'jhfgj',
                option: 'Water leaks',
                done: false
            },
            {
                id: 'jllj',
                option: 'Water drainage',
                done: false
            },
            {
                id: 'ewrwe',
                option: 'Water tanker',
                done: true
            }
            ,
            {
                id: 'sdawd',
                option: 'Water pump',
                done: true
            },
            {
                id: 'gsdg',
                option: 'Water heater',
                done: false
            },
            {
                id: 'gshskjhh',
                option: 'Swage ',
                done: false
            }
            ,
            {
                id: 'gshkjsh',
                option: 'Toilet flush',
                done: false
            }
            ,
            {
                id: 'gssdsh',
                option: 'Toilet seat',
                done: false
            }
        ]
    },
    "asdas": {
        title: 'Where is the broken pipe?',
        child: [
            {
                id: '906',
                option: 'Before the water meter',
                done: false
            },
            {
                id: 'ijasdgf',
                option: 'After the water meter',
                done: true
            }
        ]
    },
    "906": {
        title: 'Sorry we can’t help on this. Please call 906 and report to water authority',
        child: []
    },
    "jhfgj": {
        title: 'Where is the leakage?',
        child: [
            {
                id: '906',
                option: 'Before the water meter',
                done: false
            },
            {
                id: 'jbids',
                option: 'After the water meter',
                done: false
            }
        ]
    },
    "jbids": {
        title: 'Where after the water meter? ',
        child: [
            {
                id: 'wqrt',
                option: 'On the faucet /valve',
                done: true,
                next: 'jbidss'
            },
            {
                id: 'xcxx',
                option: 'On joints/fittings',
                done: true,
                next: 'jbidss'
            }
            ,
            {
                id: 'bbcx',
                option: 'On the pipe',
                done: true,
                next: 'jbidss'
            }
            ,
            {
                id: 'qqqq',
                option: 'other',
                done: true,
                next: 'jbidss'
            }
        ]
    },
    "jbidss": {
        title: 'Where is the leakage? ',
        child: [
            {
                id: 'sgsdg',
                option: 'in the kitchen',
                done: false
            },
            {
                id: 'asasad',
                option: 'in the bathroom',
                done: false
            },
            {
                id: 'bnbn',
                option: 'Water tanker',
                done: false
            },
            {
                id: 'mmmvcm',
                option: 'Water pump',
                done: false
            }
        ]
    },
    "sgsdg": {
        title: 'Where after in the kitchen? ',
        child: [
            {
                id: 'jxzfg',
                option: 'Sink area',
                done: false
            },
            {
                id: 'xcdgh',
                option: 'water heater',
                done: false
            }

        ]
    },
    "jxzfg": {
        title: 'which part?',
        child: [
            {
                id: 'fwefwe',
                option: 'On the valve/faucet',
                done: true
            },
            {
                id: 'dswda',
                option: 'On joints/fitting',
                done: true
            }
            ,
            {
                id: 'xsvxg',
                option: 'From the wall',
                done: true
            }
            ,
            {
                id: 'kgjkha',
                option: 'On the control valve/ faucet',
                done: true
            }
            ,
            {
                id: 'vbdf',
                option: 'On the flexible hose',
                done: true
            }
            ,
            {
                id: 'jfgjfg',
                option: 'other',
                done: true
            }

        ]
    },
    "xcdgh": {
        title: 'which part ',
        child: [
            {
                id: 'fwefwe',
                option: 'On the valve/faucet',
                done: true,
                next: "dfsob"
            },
            {
                id: 'dswda',
                option: 'On joints/fitting',
                done: true,
                next: "dfsob"
            }
            ,
            {
                id: 'xsvxg',
                option: 'From the wall',
                done: true,
                next: "dfsob"
            }
            ,
            {
                id: 'kgjkha',
                option: 'On the control valve/ faucet',
                done: true,
                next: "dfsob"
            },
            {
                id: 'vbdf',
                option: 'On the flexible hose',
                done: true,
                next: "dfsob"
            },
            {
                id: 'jfgjfg',
                option: 'other',
                done: true,
                next: "dfsob"
            }

        ]
    },
    "dfsob": {
        title: 'what kind of water heater ',
        child: [
            {
                id: 'gjhjdg',
                option: 'instant',
                done: true
            },
            {
                id: 'sadass',
                option: 'boiler',
                done: true
            }


        ]
    },
    "asasad": {
        title: 'Where in the bathroom water leaks? ',
        child: [
            {
                id: 'wqeqwe',
                option: 'Handwash area',
                done: false
            },
            {
                id: 'jkhgfd',
                option: 'Water heater',
                done: false
            },
            {
                id: 'nfgfdsa',
                option: 'shower',
                done: true
            },
            {
                id: 'ldjna',
                option: 'other',
                done: true
            }
        ]
    },
    "wqeqwe": {
        title: 'which part ',
        child: [
            {
                id: 'jfdsda',
                option: 'On the valve/faucet',
                done: true
            },
            {
                id: 'wwww',
                option: 'On joints/fitting',
                done: true
            },
            {
                id: 'qqqqq',
                option: 'From the wall',
                done: true
            },
            {
                id: 'yyyy',
                option: 'On the control valve/ faucet',
                done: true
            },
            {
                id: 'iii',
                option: 'On the flexible hose',
                done: true
            },
            {
                id: 'ppp',
                option: 'From the drainage',
                done: true
            },
            {
                id: 'ooo',
                option: 'other',
                done: true
            }
        ]
    },
    "jkhgfd": {
        title: 'which part?',
        child: [
            {
                id: 'ccc',
                option: 'On joints/fitting',
                done: true,
                next: "dfghfds"
            },
            {
                id: 'bbbcxx',
                option: 'From the wall',
                done: true,
                next: "dfghfds"
            },
            {
                id: 'nnnnn',
                option: 'On the control valve/ faucet',
                done: true,
                next: "dfghfds"
            },
            {
                id: 'mmmm',
                option: 'On the flexible hose',
                done: true,
                next: "dfghfds"
            },
            {
                id: 'jhkkkkk',
                option: 'From the the water heater',
                done: true,
                next: "dfghfds"
            },
            {
                id: 'ddddd',
                option: 'other',
                done: true,
                next: "dfghfds"
            }
        ]
    },
    "dfghfds": {
        title: 'what kind of water heater ',
        child: [
            {
                id: 'gjhjdg',
                option: 'instant',
                done: true
            },
            {
                id: 'sadass',
                option: 'boiler',
                done: true
            }
        ]
    },
    "nfgfdsa": {
        title: 'which part ',
        child: [
            {
                id: 'hyuvdsi',
                option: 'On shower head',
                done: true
            },
            {
                id: 'wwwqw',
                option: 'On joints/fitting',
                done: true
            },
            {
                id: 'qqwssa',
                option: 'From the wall',
                done: true
            },
            {
                id: 'yyyya',
                option: 'On the control valve/ faucet',
                done: true
            },
            {
                id: 'iiiss',
                option: 'On the flexible hose',
                done: true
            },
            {
                id: 'pppss',
                option: 'on the telephone shower',
                done: true
            },
            {
                id: 'oooaa',
                option: 'other',
                done: true
            }

        ]
    },
    "bnbn": {
        title: 'Where does the water tanker leak?',
        child: [
            {
                id: 'vvdss',
                option: 'On the water tank itself',
                done: true,
                next: "vsdaa"
            },
            {
                id: 'zaza',
                option: 'On the faucet /valve',
                done: true,
                next: "vsdaa"
            },
            {
                id: 'assasff',
                option: 'On the pipe',
                done: true,
                next: "vsdaa"
            },
            {
                id: 'yyayya',
                option: 'On the control valve/ faucet',
                done: true,
                next: "vsdaa"
            },
            {
                id: 'iasiiss',
                option: 'On joints/fittings',
                done: true,
                next: "vsdaa"
            },
            {
                id: 'ooaoaa',
                option: 'other',
                done: true,
                next: "vsdaa"
            }
        ]
    },
    "vsdaa": {
        title: 'Where is the tanker?',
        child: [
            {
                id: 'gdsaa',
                option: 'On the roof',
                done: true
            },
            {
                id: 'sadasss',
                option: 'On the tower',
                done: true
            }
            ,
            {
                id: 'sadadss',
                option: 'On the ground ',
                done: true
            }
            ,
            {
                id: 'sadagss',
                option: 'Other',
                done: true
            }
        ]
    },
    "mmmvcm": {
        title: 'Where does the water pump leak?',
        child: [
            {
                id: 'hayuvdsi',
                option: 'On the control faucet /valve',
                done: true
            },
            {
                id: 'wwawqw',
                option: 'On joints/fitting',
                done: true
            },
            {
                id: 'qaqwssa',
                option: 'On the pipe',
                done: true
            },
            {
                id: 'oaooaa',
                option: 'other',
                done: true
            }
        ]
    },
    "gsdg": {
        title: 'What is the problem with the water heater?',
        child: [
            {
                id: 'hadyuvdsi',
                option: 'No hot water ',
                done: true,
                next: "aasadass"
            },
            {
                id: 'wwdawqw',
                option: 'No water flows ',
                done: true,
                next: "aasadass"
            },
            {
                id: 'qaqwdssa',
                option: 'On-off switch doesn’t work',
                done: true,
                next: "aasadass"
            },
            {
                id: 'oaodoaa',
                option: 'Electric wire disconnected',
                done: true,
                next: "aasadass"
            },
            {
                id: 'oaoodaa',
                option: 'Water leaks',
                done: true,
                next: "aasadass"
            }
        ]
    },
    "aasadass": {
        title: 'What is the problem with the water heater?',
        child: [
            {
                id: 'accc',
                option: 'On joints/fitting',
                done: true,
                next: 'aasadasss'
            },
            {
                id: 'bbbacxx',
                option: 'From the wall',
                done: true,
                next: 'aasadasss'
            },
            {
                id: 'nnnann',
                option: 'On the control valve/ faucet',
                done: true,
                next: 'aasadasss'
            },
            {
                id: 'mmamm',
                option: 'On the flexible hose',
                done: true,
                next: 'aasadasss'
            },
            {
                id: 'jhkakkkk',
                option: 'From the the water heater',
                done: true,
                next: 'aasadasss'
            },
            {
                id: 'dddadd',
                option: 'other',
                done: true,
                next: 'aasadasss'
            }
        ]
    },
    "aasadasss": {
        title: 'What kind of water heater?',
        child: [
            {
                id: 'acccc',
                option: 'Instant ',
                done: true
            },
            {
                id: 'bbbcacxx',
                option: 'Boiler ',
                done: true
            }
        ]
    },
    "jllj": {
        title: 'Where is the drainage ',
        child: [
            {
                id: 'acccg',
                option: 'in the kitchen',
                done: false
            },
            {
                id: 'bbbacgxx',
                option: 'in the bathroom',
                done: false
            }
        ]
    },
    "jlljp": {
        title: 'what is wrong? ',
        child: [
            {
                id: 'acccg',
                option: 'Water drains slowly',
                done: true
            },
            {
                id: 'bbbacgxx',
                option: 'Water does not drain ',
                done: true
            },
            {
                id: 'bbbacgxx',
                option: 'Drainage pumps out',
                done: true
            },
            {
                id: 'asbacgxx',
                option: 'other',
                done: true
            }
        ]
    },
    "acccg": {
        title: 'Where is the drainage ',
        child: [
            {
                id: 'accscg',
                option: 'sink',
                done: true
            },
            {
                id: 'bbsbacgxx',
                option: 'floor',
                done: false
            }
        ]
    },
    "bbbacgxx": {
        title: 'Where is the drainage ',
        child: [
            {
                id: 'accascg',
                option: 'Hand wash ',
                done: true,
                next: 'jlljp'
            },
            {
                id: 'bbgxx',
                option: 'Toilet seat',
                done: true,
                next: 'jlljp'
            },
            {
                id: 'bbsgxx',
                option: 'Shower tray ',
                done: true,
                next: 'jlljp'
            },
            {
                id: 'bbsbacgxa',
                option: 'Bathtub',
                done: true,
                next: 'jlljp'
            },
            {
                id: 'bbsbacgxax',
                option: 'floor',
                done: true,
                next: 'jlljp'
            }
        ]
    },
    "gshkjsh": {
        title: 'What is wrong?',
        child: [
            {
                id: 'acawscg',
                option: 'Flash does not work ',
                done: true
            },
            {
                id: 'bsaacgxx',
                option: 'Water runs nonstop  ',
                done: true
            },
            {
                id: 'asbassx',
                option: 'other',
                done: true
            }
        ]
    },
    "gssdsh": {
        title: 'What is wrong?',
        child: [
            {
                id: 'acfadawscg',
                option: 'Cover broken ',
                done: true
            },
            {
                id: 'bsaaaacgxx',
                option: 'Seat broken ',
                done: true
            },
            {
                id: 'bsaaacgxx',
                option: 'Cover is not stable  ',
                done: true
            },
            {
                id: 'asbfasdfassx',
                option: 'other',
                done: true
            }
        ]
    },
    "gshskjhh": {
        title: 'What is the problem with the sewage?',
        child: [
            {
                id: 'agdawscg',
                option: 'Sewage drains slowly',
                done: true,
                next: 'gshskjsaahh'
            },
            {
                id: 'gjcgxx',
                option: 'Sewage pipe blocked ',
                done: true,
                next: 'gshskjsaahh'
            },
            {
                id: 'kslscgxx',
                option: 'Sewage over flow',
                done: true,
                next: 'gshskjsaahh'
            },
            {
                id: 'asbfsaax',
                option: 'other',
                done: true,
                next: 'gshskjsaahh'
            }
        ]
    },
    "gshskjsaahh": {
        title: 'Where is the sewage problem?',
        child: [
            {
                id: 'agdawfascg',
                option: 'Bathroom',
                done: true
            },
            {
                id: 'adfadfsa',
                option: 'Kitchen',
                done: true
            },
            {
                id: 'kslscgagsagxx',
                option: 'Manhole',
                done: true
            },
            {
                id: 'gddga',
                option: 'Septic tank',
                done: true
            },
            {
                id: 'kslscgfaxx',
                option: 'The sewage pipe from house to manhole ',
                done: true
            },
            {
                id: 'kslscafdsgxx',
                option: 'The sewage pipe from manhole to septic tank ',
                done: true
            },
            {
                id: 'assadsaax',
                option: 'other',
                done: true
            }


        ]
    },

    "getHandyman": {
        title: 'What seems to be the problem?',
        child: [
            {
                id: 'jkjijk',
                option: 'TV problem',
                done: false,
            }
        ]
    },
    "jkjijk": {
        title: 'what is the size of the tv',
        child: [
            {
                id: 'kghhhjadf',
                option: '40',
                done: true,
                next: 'khghguadf'
            },
            {
                id: 'k;jljasf',
                option: '43',
                done: true,
                next: 'khghguadf'
            },
            {
                id: 'kusdfgadf',
                option: '50',
                done: true,
                next: 'khghguadf'
            },
            {
                id: 'kudsdhjadf',
                option: '55',
                done: true,
                next: 'khghguadf'
            },
            {
                id: 'kussddsdhjadf',
                option: '60',
                done: true,
                next: 'khghguadf'
            },
            {
                id: 'kussdjgffghdsdhjadf',
                option: 'other',
                done: true,
                next: 'khghguadf'
            }
        ]
    },
    "khghguadf": {
        title: 'Do you have wall mounting accessories?',
        child: [
            {
                id: 'qjajjvldf',
                option: 'yes',
                done: true,
                next: 'wjkllkjgasf'
            },
            {
                id: 'jhkgfdfg',
                option: 'no',
                done: false
            }
        ]
    },
    "jhkgfdfg": {
        title: 'Who provides the mounting accessories?',
        child: [
            {
                id: 'ujasdfgdf',
                option: 'I will provide',
                done: true,
                next: 'wjkllkjgasf'
            },
            {
                id: 'ihvjasf',
                option: 'You provide',
                done: true,
                next: 'wjkllkjgasf'
            }
        ]
    },
    "wjkllkjgasf": {
        title: 'Do you want channel setup?',
        child: [
            {
                id: 'akjjadf',
                option: 'yes',
                done: false
            },
            {
                id: 'sjghhsf',
                option: 'no',
                done: true
            }
        ]
    },
    "akjjadf": {
        title: 'Who is your satellite provider?',
        child: [
            {
                id: 'ahgfkjjadf',
                option: 'DSTV',
                done: true
            },
            {
                id: 'sjghhsgfsf',
                option: 'nile sat',
                done: true
            },
            {
                id: 'sbvjghhsf',
                option: 'arav sat',
                done: true
            },
            {
                id: 'sjggfshhsf',
                option: 'NETFLIX',
                done: true
            },
            {
                id: 'sjghhfsf',
                option: 'other',
                done: true
            }
        ]
    },

    "getGarder": {
        title: 'How you want us to keep your garden?',
        child: [
            {
                id: 'kghghghjadf',
                option: 'Design the garden',
                done: true
            },
            {
                id: 'kjhyjljasf',
                option: 'Re-design existed garden',
                done: true
            },
            {
                id: 'kusdfgkjhadf',
                option: 'Mow/ grass cut',
                done: true
            },
            {
                id: 'kudsdhjadf',
                option: 'Weeding',
                done: true
            },
            {
                id: 'kubgdsdhjadf',
                option: 'Trim branches',
                done: true
            },
            {
                id: 'kushgfghdsdhjadf',
                option: 'Install automatic sprinkler system',
                done: true
            },
            {
                id: 'kjhyjljasf',
                option: 'Install Manual sprinkler system',
                done: true
            },
            {
                id: 'asdfgkjhadf',
                option: 'Plant trees',
                done: true
            },
            {
                id: 'kzdhjgadf',
                option: 'Plant flowers',
                done: true
            },
            {
                id: 'zabhgfdsdhjadf',
                option: 'Plant grass',
                done: true
            },
            {
                id: 'zadsdhjadf',
                option: 'Use organic fertilizer',
                done: true
            },
            {
                id: 'zadjljasf',
                option: 'Use chemical fertilizers',
                done: true
            },
            {
                id: 'aszssdzhadf',
                option: 'Remove garden waste',
                done: true
            },
            {
                id: 'kudzaggfdf',
                option: 'other',
                done: true
            }
        ]
    },

    "getSecurity": {
        title: 'How do you want us to secure your property?',
        child: [
            {
                id: 'gdsfad',
                option: 'Hire guards',
                done: true
            },
            {
                id: 'lkgfjhd',
                option: 'Install security camera',
                done: false
            },
            {
                id: 'jfddgsfdf',
                option: 'Mount security fence ',
                done: false
            }
        ]
    },
    "jfddgsfdf": {
        title: 'What kind of security fence?',
        child: [
            {
                id: 'hgfdds',
                option: 'Electric fence',
                done: true
            },
            {
                id: 'gfydrsea',
                option: 'Pointed wire',
                done: true
            },
            {
                id: 'r5ewaw',
                option: 'Other',
                done: true
            },
            {
                id: 'hugfydrsddfy',
                option: 'others',
                done: true
            }
        ]
    },
    "lkgfjhd": {
        title: 'Where do you want the security camera installed?',
        child: [
            {
                id: 'fhsgafaads',
                option: 'Out-side the compound',
                done: true
            },
            {
                id: 'sghfgadsdffd',
                option: 'By the gate',
                done: true
            },
            {
                id: 'shfsadfnfds',
                option: 'In the compound',
                done: true
            },
            {
                id: 'dsasddas',
                option: 'In the living room',
                done: true
            },
            {
                id: 'wertyfutdsf',
                option: 'I need your advice',
                done: true
            },
            {
                id: 'gfdsdg',
                option: 'other',
                done: true
            }
        ]
    }

};

export const LOGISTICS = [
    {
        title: "Can you please fill this basic informations."
    },
    {
        title: "Where are you located?"
    }
]

export class Get {
    title: string;
    child: any;
}
