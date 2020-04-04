
/**
 * OPENCART - SEARCH TOP
 * AUTHOR - PATRYK PAWLICKI
 * 2020
 * LICENSE : "Take it for free and make Your shop better"
 */

// ajax abort request
var currentRequest = null

var ST = {
  query: null,
  searchTop: null,
  element: null,
  list: 'search-top-list',
  searchInput: '#search',
  destroy: function () {
    try {
      document.querySelector('#' + ST.list).outerHTML = ''
    } catch (e) {}
  },
  search: function () {
    currentRequest = $.ajax({
      url: 'index.php?route=product/search/ajax',
      type: 'get',
      data: {
        query: ST.query
      },
      beforeSend: function () {
        if (currentRequest != null) {
          currentRequest.abort()
        }
      },
      success: function (json) {
        // var json = JSON.parse(json)
        if (json.products && json.products_total) {
          ST.createList(
            'Produkty (znalezionych:' + json.products_total + ')',
            json.products
          )
        }
      }
    })
  },
  init: function (query) {
    ST.query = query
    ST.searchTop = document.querySelector(ST.searchInput)
    if (ST.element !== null) {
      ST.destroy()
    }
    ST.element = document.createElement('DIV')
    ST.search()
  },
  goTo: function (element) {
    location = element.href
  },
  createList: function (name, j) {
    ST.element.id = ST.list
    var ul = document.createElement('UL')
    ST.element.appendChild(ul)
    var li = {}
    var a = {}

    li[0] = document.createElement('li')
    li[0].classList = 'titleLi'
    li[0].appendChild(document.createTextNode(name))
    ul.appendChild(li[0])

    for (var i = 0; i < j.length; i++) {

      li[i] = document.createElement('li')
      a[i] = document.createElement('a')
      a[i].href = j[i].href.replace(/&amp;/g, '&')
      a[i].innerHTML = '<img src="' + j[i].thumb + '"/>&nbsp;' + j[i].name

      li[i].appendChild(a[i])
      // li[i].appendChild(document.createTextNode(j[i].name))
      ul.appendChild(li[i])
    }

    ST.searchTop.appendChild(ST.element)
  }
}

$(document).ready(function () {
  $(ST.searchInput).on('keyup', function (e) {
    setTimeout(function () {
      if (e.target && e.target.value.length > 2) {
        ST.init(e.target.value)
      } else {
        if (e.target.value.length === 0 && ST.element !== null) {
          ST.destroy()
        }
      }
    }, 100)
  })
  $('input[name="search"]').blur(function (e) {
    ST.destroy()
  })
  $('input[name="search"]').focus(function (e) {
    if (e.target && e.target.value.length > 2) {
      ST.init(e.target.value)
    }
  })
})
