# hive-parser

Hive parser is an event driven parser for a JSON object.

the parsers in hive parser are designed to handle the key-value pairs of a single object or array. They apply each
relevant handler in their stack to the key-value pairs therein.

Handlers apply themselves to each node that passes their test() function.

Both the creation of the handlers and parsers and the excution of parse() are callback-centric; they use promises to
return their values, as demonstrated in the unit tests.

## Using hive-parser

Hive-parser uses two components in combination to parse a JSON object:

### Parsers

A parser walks a JSON object and emits each property with the type `property`
as a JSON object in the form:

``` javascript

{
    value: value, // {variant}
    key: key, //{String}
    root: obj, //{Objecct}
    loader: this, //{Parser} sic
    gate: gate //{Gate*}
}

```

* **name** is the property name
* **value** is the value of the property
* **root** is the object under inspection
* **loader** the parser
* **gate** a gate&apos; that lets you spawn callbacks for async actions

### Handlers

Handlers are designed to listen to this emitted data. they have two driving parameters:

* **key** {String || Regex} A test/match for a key
* **respond** {function} a handler for the emitted data described above

## Designing recursive parsers

Parsers do not automatically recurse. To design a recursive parser, you must create new parsers within your handlers.

## Asyncronous handlers

Each emitted data comes with a gate&apos; To executa asynchronous activity (file handling, database entry, call

``` javascript

   var callback = params.gate.latch();
   my_model.save({params.value, callback);


```

--------------
&apos; See https://github.com/nakamura-to/gate
