const plugin = require('../dist/lib.cjs.js');

// console.log(plugin)

const msg = plugin.str('I Feel Like__Shit');

console.log(plugin.is.$keys);
console.log(plugin.random.$keys);
console.log(plugin.storage.$keys);
console.log(plugin.field.$keys);
console.log(plugin.dict().dir);

console.log(plugin.is.function(() => console.log('hello')));

const value = 'AnyValue';

plugin.is.function(value);
plugin.is.dict(value);
plugin.is.str(value);
plugin.is.number(value);
plugin.is.list(value);
plugin.is.null(value);
plugin.is.undefined(value);
plugin.is.none(value);
plugin.is.boolean(value);
plugin.is.date(value);
plugin.is.regex(value);


const text = plugin.str('i feel like shit');

['session', 'local'].forEach(key=>{
    ['set',
'get',
'del',
'clear'].forEach(i=>{
    console.log(`plugin.${key}.${i}(key)`)
})

})
