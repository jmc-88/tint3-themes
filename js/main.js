(function() {
  var baseURL = "/tint3-themes";  // should be in sync with _config.yml
  var matchAllRE = new RegExp("");
  var keyPressTimeoutMs = 750;

  function tooManyParts(parts) {
    return parts.length > 2;
  }
  function emptySearchItems(parts) {
    // the only failure here is if two items surround '/' and
    // the first one is empty:
    //  - parts.length==0 && parts[0].trim()==""
    //    This only indicates the search box is empty, which should
    //    not apply any filtering as expected.
    //  - parts.length==1 && parts[1].trim()==""
    //    This can happen if the user has provided the author name but
    //    no theme name, in which case we want to match all themes by
    //    that author.
    return parts.length == 2 && parts[0].trim() == "";
  }
  function invalidSearch(parts) {
    return tooManyParts(parts) || emptySearchItems(parts);
  }

  var themeList = document.getElementById("themes");
  var searchBox = document.getElementById("search");
  function filterThemeList() {
    var parts = searchBox.value.split("/");
    if (invalidSearch(parts)) {
      searchBox.classList.add("invalid");
      return;
    }
    searchBox.classList.remove("invalid");

    var authorRE = matchAllRE;
    var themeRE = new RegExp(parts[0].trim(), "i");
    if (parts.length == 2) {
      authorRE = themeRE;
      themeRE = new RegExp(parts[1].trim(), "i");
    }

    var re = new RegExp(searchBox.value, "i");
    for (var i = 0; i < themeList.children.length; ++i) {
      var li = themeList.children[i];
      li.dataset.matching = (
          authorRE.test(li.dataset.author) &&
          themeRE.test(li.dataset.theme));
    }
  }

  var searchTimeout = null;
  searchBox.addEventListener("input", function() {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(filterThemeList, keyPressTimeoutMs);
  }, false);

  searchBox.addEventListener("keypress", function(e) {
    if (e.keyCode == 27) {  // key: ESC
      searchBox.blur();
      e.preventDefault();
    }
    if (e.charCode == 47) {  // char: '/'
      e.stopPropagation();
    }
  }, false);

  document.addEventListener("keypress", function(e) {
    if (e.shiftKey || e.ctrlKey || e.altKey) {
      return;
    }
    if (e.charCode == 47) {  // char: '/'
      searchBox.focus();
      searchBox.select();
      e.preventDefault();
    }
  }, false);

  function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          callback(JSON.parse(this.responseText));
        } else {
          console.error(
              "Failed HTTP GET: " + this.status + " " + this.statusText);
        }
      }
    }, false);
    xhr.open("GET", url, true);
    xhr.send();
  }

  var repository = {};
  getJSON("/tint3-themes/repository.json", function(data) {
    console.log("Succesfully loaded repository.");
    repository = data;
  });
})();
