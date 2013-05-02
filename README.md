## hive-parser

Hive parser is an event driven parser for a JSON object.

the parsers in hive parser are designed to handle the key-value pairs of a single object or array. They apply each
relevant handler in their stack to the key-value pairs therein.

Handlers apply themselves to each node that passes their test() function.

Both the creation of the handlers and parsers and the excution of parse() are callback-centric; they use promises to
return their values, as demonstrated in the unit tests.

FAIR WARNING: Hive Parser is not designed to handle recursive structures.