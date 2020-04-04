## OPENCART search top results



```
'index.php?route=product/search/ajax'
```
### Usage

```
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
```
