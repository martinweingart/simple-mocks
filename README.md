# simple-mocks

simple-mocks is a simple and lightweight command line tool that generates random JSON data from a provided configuration file.

It creates collections of data using a template definition for each collection. It also support definitions of nested objects and arrays.

By default, the generated data will be prompt in the terminal but you can also write the collections (or just one) to a file or serve them from `localhost` as an api.

The tool uses [Chance.js](http://chancejs.com/) to generate the random data.

## Installation

```
npm install --global simple-mocks
```

Or just call it with npx:

```
npx simple-mocks
```

## Usage

```
  Usage: simple-mocks [options]

  Options:

    -h, --help                 output usage information
    -c, --config <path>        path to configuration json file
    -o, --output <path>        path of output json file
    --collection <name>        write to file only the specified collection
    -s, --serve                serve the generated collections from http://localhost:<port>/<collection_name>"
    -p, --port                 port configuration for the server (default is 3030)
```

## Configuration file

```
{
  "templates": {
    <template_name>: {
      <prop_name>: {
        type: 'value',
        chance: {
          name: <chance_function_name>,
          args: [<chance_function_arguments>]
        },
      }
      <prop_name>: {
        type: 'object',
        template: <template_name>
      },
       <prop_name>: {
        type: 'array',
        template: <template_name>,
        "count": <size_of_array>,
        "min": <min_size>,
        "max": <max_size>
      }
    }
  },

  "collections": [
    {
      "name": <collection_name>,
      "template": <template_name>,
      "count": <size_of_collection>,
      "min": <min_size>,
      "max": <max_size>
    }
  ]
}
```

- Each template prop can be one of these types: `value` | `object` | `array`. In case of objects and arrays, there must be a corresponding template definition in the `templates` section to create the data.
- In arrays and collections, `min` and `max` are used to get a random size between these numbers.
- If `count` is defined, the `min` and `max` props arent used.

## Example configuration file

```
{
  "templates": {
    "Person": {
      "name": {
        "type": "value",
        "chance": {
          "name": "name"
        }
      },
      "age": {
        "type": "value",
        "chance": {
          "name": "age"
        }
      }
    },

    "Vehicle": {
      "type": {
        "type": "value",
        "chance": {
          "name": "pickone",
          "args": [["car", "bike", "bus"]]
        }
      }
    },

    "User": {
      "name": {
        "type": "value",
        "chance": {
          "name": "name"
        }
      },
      "email": {
        "type": "value",
        "chance": {
          "name": "email"
        }
      },
      "vehicle": {
        "type": "object",
        "template": "Vehicle"
      },

      "friends": {
        "type": "array",
        "template": "Person",
        "min": 0,
        "max": 10
      }
    },

    "Place": {
      "city": {
        "type": "value",
        "chance": {
          "name": "city"
        }
      },
      "address": {
        "type": "value",
        "chance": {
          "name": "address"
        }
      }
    }
  },

  "collections": [
    { "name": "users", "template": "User", "count": 20 },
    { "name": "places", "template": "Place", "min": 5, "max": 10 }
  ]
}
```

## Example Usage

```
simple-mocks -c config.json -s
```

This will run a server on `localhost` to fetch the data of every collection defined in the configuration file.

```
http://localhost:3030/places
```

Output:

```
[
  {
    "city": "Vudavi",
    "address": "1413 Fufuri Lane"
  },
  {
    "city": "Ritarfu",
    "address": "301 Nokhad Junction"
  },
  {
    "city": "Fekvewsut",
    "address": "1608 Turvew Center"
  },
  {
    "city": "Venhusze",
    "address": "175 Jibuz River"
  },
  {
    "city": "Gepawi",
    "address": "1986 Kozop Grove"
  },
  {
    "city": "Zovsevda",
    "address": "82 Bale Avenue"
  },
  {
    "city": "Cisisgo",
    "address": "692 Pofog Parkway"
  },
  {
    "city": "Hozuvro",
    "address": "876 Jijov Park"
  },
  {
    "city": "Nikiweba",
    "address": "1117 Piges Pass"
  },
  {
    "city": "Eziubpom",
    "address": "1212 Beeti Glen"
  }
]
```
