# tint3-themes

Static repository of themes for the tint3 panel.

## How to contribute a new theme

Send a pull request to either add or update an existing theme.

Every pull request must update `repository.json` and `index.md` according to the
changes being made.

### Expected directory structure

Every theme has to provide its own `tint3rc`, and can optionally provide a
`screenshot.png`.

  ```plain
  /t
    /author_name
      /theme_name
        /tint3rc
        /screenshot.png
      ...
    ...
  ```

### Expected `repository.json` structure

Every theme has a version number (starts from `1` and MUST be incremented at
every update) and belongs to an author. Both author and theme name MUST only
contain alphanumeric characters or underscores.

Clients can refer to uploaded themes by the canonical form
`author_name/theme_name`, or simply by `theme_name` if they're unambiguous (i.e.
no other theme of the same name exists from any other author).

  ```json
  [{
    "author": "THEME_AUTHOR",
    "themes": [{
      "name": "THEME_NAME",
      "version": THEME_VERSION_NUMER,
    }]
  }]
  ```

## License

The content of this project itself is licensed under the [Creative Commons
Attribution 3.0 license](http://creativecommons.org/licenses/by/3.0/us/deed.en_US),
and the underlying source code used to update its contents is licensed under
the [MIT license](http://opensource.org/licenses/mit-license.php).
