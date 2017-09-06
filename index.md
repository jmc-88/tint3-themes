---
layout: index
title: tint3 themes
---

<input id="search" type="text" placeholder="Search for themes...">
<noscript>
  Note: the search box requires JavaScript to work.
</noscript>

<ul id="themes" class="flex gallery two four-500">
  {% for entry in site.data.repository %}
    {% for theme in entry.themes %}
      {% capture entry_title %}{{ entry.author }}/{{ theme.name }} (v{{ theme.version }}){% endcapture %}
      {% capture theme_path %}{{ site.baseurl }}/t/{{ entry.author }}/{{ theme.name }}{% endcapture %}
      <li data-matching="true"
          data-author="{{ entry.author }}"
          data-theme="{{ theme.name }}"
          data-version="{{ theme.version }}">
        {% comment %}
          TODO: provide fallback "no screenshot" image
        {% endcomment %}
        <img alt="Screenshot of {{ entry_title }}"
             src="{{ theme_path }}/screenshot.png"
             class="stack">
        <a href="{{ theme_path }}/tint3rc"
           target="tint3-theme"
           class="stack button">{{ entry_title }}</a>
      </li>
    {% endfor %}
  {% endfor %}
</ul>
