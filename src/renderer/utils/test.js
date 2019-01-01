;(function (C) {
  jQuery.extend({
    ht_getcookie: function (W) {
      var k = document.cookie.indexOf(W)
      var i = document.cookie.indexOf(';', k)
      return k == -1
        ? ''
        : unescape(
          document.cookie.substring(
            k + W.length + 1,
            i > k ? i : document.cookie.length
          )
        )
    },
    ht_setcookie: function (aa, Z, Y, X, k, W) {
      var i = new Date()
      i.setTime(i.getTime() + Y * 1000)
      document.cookie =
        escape(aa) +
        '=' +
        escape(Z) +
        (i ? '; expires=' + i.toGMTString() : '') +
        (X ? '; path=' + X : '; path=/') +
        (k ? '; domain=' + k : '') +
        (W ? '; secure' : '')
    },
    textFocus: function (W) {
      var k,
        i,
        W = W === undefined ? 0 : parseInt(W)
      this.each(function () {
        if (!this.setSelectionRange) {
          k = this.createTextRange()
          W === 0 ? k.collapse(false) : k.move('character', W)
          k.select()
        } else {
          i = this.value.length
          W === 0 ? this.setSelectionRange(i, i) : this.setSelectionRange(W, W)
        }
        this.focus()
      })
      return this
    }
  })
  var w = []
  var D = []
  var E = []
  var G = []
  var v = 0
  var y = 0
  var A = 0
  var S = 0
  var U = false
  var g = false
  var H = false
  var z = 0
  var I = null
  var m = -1
  var N = {}
  var f = []
  var e = []
  var d = []
  var b = []
  var V = []
  var F = new Array(
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  )
  var j = []
  var x = false
  var c = []
  for (var R = 0; R < 26; R++) {
    c[R] = []
  }
  var P = []
  for (var T = 0; T < 5; T++) {
    P[T] = []
  }
  var t = []
  var s = []
  var q = []
  var p = []
  var o = []
  var K = []
  var a = false
  var L = true
  var u = 12
  var h = '简码/汉字'
  var n = '简码/汉字'
  var r = 'inp-txt_select'
  var l = 'inp-txt'
  var B = false
  var J = null
  var Q = null
  var M = false
  var O = C.ht_getcookie('hj_favcity')
  C.stationFor12306 = {
    bindInputs: [],
    get_initInputValue: function () {
      return h
    },
    get_initTopInputValue: function () {
      return n
    },
    city_Bind: function (k) {
      if (k.length == 0) {
        return
      }
      var i = ''
      C.each(k, function (W) {
        if (O == k[W][2]) {
          i +=
            "<div class='cityline' id='citem_" +
            W +
            "' cturn='" +
            k[W][6] +
            "'><span class='ralign'><b>" +
            k[W][1] +
            '</b></span></div>\n'
        } else {
          i +=
            "<div class='cityline' id='citem_" +
            W +
            "' cturn='" +
            k[W][6] +
            "'><span class='ralign'>" +
            k[W][1] +
            "</span><span style='float:right;' class='ralign'>" +
            k[W][3] +
            '</span></div>\n'
        }
      })
      C('#panel_cities').html(i)
      C('.cityline')
        .mouseover(function () {
          C.stationFor12306.city_shiftSelect(this)
        })
        .click(function () {
          C.stationFor12306.city_confirmSelect()
          E = C.stationFor12306.filterCity('')
          C.stationFor12306.city_showlist(0)
        })
      C.stationFor12306.city_shiftSelect(C('#citem_0'))
    },
    city_changeSelectIndex: function (i) {
      var k = A + i
      if (k == -1) {
        C.stationFor12306.city_showlist(z - 1)
        C.stationFor12306.city_shiftSelect(C('#citem_' + (G.length - 1)))
      } else {
        if (k == G.length) {
          C.stationFor12306.city_showlist(z + 1)
          C.stationFor12306.city_shiftSelect(C('#citem_0'))
        } else {
          C.stationFor12306.city_shiftSelect(C('#citem_' + k))
        }
      }
    },
    city_confirmSelect: function () {
      I.val(S[1])
      curObjCode.val(S[2])
      if (B) {
        C.stationFor12306.setStationInCookies(S[1], S[2])
      }
      C('#form_cities').css('display', 'none')
      C('#form_cities2').css('display', 'none')
      C('#form_cities3').css('display', 'none')
      m = -1
      y = 0
      C.stationFor12306.setStationStyle()
      if (L) {
        C.stationFor12306.LoadJS(S[2])
      }
      if (J) {
        J(I, curObjCode)
      }
    },
    city_shiftSelect: function (k) {
      if (v != k) {
        if (v != 0) {
          C(v)
            .removeClass('citylineover')
            .addClass('cityline')
            .css('backgroundColor', 'white')
        }
        if (k != 0) {
          try {
            v = k
            var i = C(v)
              .removeClass('cityline')
              .addClass('citylineover')
              .css('backgroundColor', '#c8e3fc')
            A = Number(i.attr('id').split('_')[1])
            S = w[Number(i.attr('cturn'))]
            C('#cityid').val(S[2])
          } catch (W) {}
        }
      }
    },
    city_shiftSelectInLi: function (i) {
      if (y != i) {
        if (y != 0) {
          C(y)
            .removeClass('ac_over')
            .addClass('ac_odd')
        }
        if (i != 0) {
          try {
            y = i
            C(y)
              .removeClass('ac_odd')
              .addClass('ac_over')
          } catch (k) {}
        }
      }
    },
    js: function (W) {
      var k
      for (k = 1; k <= 7; k++) {
        if (C('#nav_list' + k).attr('class')) {
          C('#ul_list' + k).css('display', 'none')
          C('#nav_list' + k).removeClass('action')
        }
      }
      for (k = 1; k <= 7; k++) {
        if (k == W) {
          C('#ul_list' + k).css('display', 'block')
          C('#nav_list' + k).addClass('action')
          if (k == 1 || k == 7) {
            C('#flip_cities2').css('display', 'none')
          }
          if (k > 1 && k < 7) {
            var Y = C.stationFor12306.tHtmlGetCityName(W - 1, -1, 0)
            if (Y > u) {
              var X = Math.ceil(Y / u)
              if (X > 1) {
                C.stationFor12306.pageDesigh(X, 0, k)
              }
              C('#flip_cities2').css('display', 'block')
            } else {
              C('#flip_cities2').css('display', 'none')
            }
          } else {
            I.focus()
          }
        } else {
          C('#ul_list' + k).css('display', 'none')
          C('#nav_list' + k).removeClass('action')
        }
      }
      if (W != 1) {
        C('.ac_even')
          .on('mouseover', function () {
            C.stationFor12306.city_shiftSelectInLi(this)
          })
          .on('click', function () {
            I.val(C(this).text())
            curObjCode.val(C(this).attr('data'))
            if (B) {
              C.stationFor12306.setStationInCookies(
                C(this).text(),
                C(this).attr('data')
              )
            }
            C('#form_cities2').css('display', 'none')
            m = -1
            y = 0
            C.stationFor12306.setStationStyle()
            if (L) {
              C.stationFor12306.LoadJS(C(this).attr('data'))
            }
            if (J) {
              J(I, curObjCode)
            }
          })
      }
    },
    tHtmlGetCityName: function (k, i, X) {
      switch (k) {
        case 0:
          if (i == -1) {
            return D.length
          }
          if (i == -2) {
            return D
          }
          return D[i]
          break
        case 1:
          if (i == -1) {
            return c[3].length
          }
          if (i == -2) {
            return f
          }
          if (f.length > u) {
            var W = Math.ceil(f.length / u)
            if (W > 1) {
              t = f.slice(u * X, Math.min(u * (X + 1), f.length))
              return t[i]
            }
          }
          return f[i]
          break
        case 2:
          if (i == -1) {
            return c[7].length
          }
          if (i == -2) {
            return e
          }
          if (e.length > u) {
            var W = Math.ceil(e.length / u)
            if (W > 1) {
              s = e.slice(u * X, Math.min(u * (X + 1), e.length))
              return s[i]
            }
          }
          return e[i]
          break
        case 3:
          if (i == -1) {
            return c[11].length
          }
          if (i == -2) {
            return d
          }
          if (d.length > u) {
            var W = Math.ceil(d.length / u)
            if (W > 1) {
              q = d.slice(u * X, Math.min(u * (X + 1), d.length))
              return q[i]
            }
          }
          return d[i]
          break
        case 4:
          if (i == -1) {
            return c[18].length
          }
          if (i == -2) {
            return b
          }
          if (b.length > u) {
            var W = Math.ceil(b.length / u)
            if (W > 1) {
              p = b.slice(u * X, Math.min(u * (X + 1), b.length))
              return p[i]
            }
          }
          return b[i]
          break
        case 5:
          if (i == -1) {
            return c[24].length
          }
          if (i == -2) {
            return V
          }
          if (V.length > u) {
            var W = Math.ceil(V.length / u)
            if (W > 1) {
              o = V.slice(u * X, Math.min(u * (X + 1), V.length))
              return o[i]
            }
          }
          return V[i]
          break
        default:
          return 'error'
          break
      }
    },
    closeShowCity: function () {
      C('#form_cities2').css('display', 'none')
      m = -1
      y = 0
      C.each(C.stationFor12306.bindInputs, function (Y, X) {
        var W = '#' + X
        var k = '#' + X + 'Text'
        var i = C(k).val()
        if (i == '') {
          C(k).val(h)
          C.stationFor12306.from_to_station_class_gray(C(k))
          C(W).val('')
        }
      })
    },
    showAllCity: function () {
      var ab = ''
      var k = '440px'
      if (B) {
        k = '400px'
      }
      ab =
        '<div class="com_hotresults" id="thetable" style="width:' +
        k +
        '"><div style="width:100%;"><div class="ac_title"><span>拼音支持首字母输入</span><a class="ac_close" style="cursor:pointer" title="关闭" onclick="$.stationFor12306.closeShowCity()"></a></div><ul class="AbcSearch clx" id="abc">'
      if (B) {
        ab =
          ab +
          '<li class="action" index="7" method="liHotTab"  onclick="$.stationFor12306.js(7)" id="nav_list7">常用</li>'
      }
      ab =
        ab +
        '<li index="1" method="liHotTab"  onclick="$.stationFor12306.js(1)" id="nav_list1">热门</li><li index="2" method="liHotTab"  onclick="$.stationFor12306.js(2)" id="nav_list2">ABCDE</li><li index="3" method="liHotTab"  onclick="$.stationFor12306.js(3)" id="nav_list3">FGHIJ</li><li index="4" method="liHotTab"  onclick="$.stationFor12306.js(4)" id="nav_list4">KLMNO</li><li index="5" method="liHotTab"  onclick="$.stationFor12306.js(5)" id="nav_list5">PQRST</li><li index="6" method="liHotTab"  onclick="$.stationFor12306.js(6)" id="nav_list6">UVWXYZ</li></ul>'
      if (B) {
        ab +=
          '<ul class="popcitylist" style="overflow: auto;max-height: 280px;height: 191px;" method="hotData" id="ul_list7">'
        var ac = C.stationFor12306.getStationInCookies()
        var Y = ac.length
        if (Y > 2) {
          M = true
          for (var ad = 0; ad < Y; ad++) {
            ab +=
              '<li class="ac_even"   title="' +
              ac[ad][0] +
              '" data="' +
              ac[ad][1] +
              '">' +
              ac[ad][0] +
              '</li>'
          }
        }
        ab += '</ul>'
      }
      ab +=
        '<ul class="popcitylist" style="overflow: auto;max-height: 280px;height: 191px;display:none;" method="hotData" id="ul_list1">'
      var X = C.stationFor12306.tHtmlGetCityName(0, -1, 0)
      var aa = ''
      if (!B) {
        aa = ' openLi'
      }
      for (var ad = 0; ad < X; ad++) {
        ab +=
          '<li class="ac_even' +
          aa +
          '"   title="' +
          C.stationFor12306.tHtmlGetCityName(0, ad, 0)[1] +
          '" data="' +
          C.stationFor12306.tHtmlGetCityName(0, ad, 0)[2] +
          '">' +
          C.stationFor12306.tHtmlGetCityName(0, ad, 0)[1] +
          '</li>'
      }
      ab += '</ul>'
      for (var ae = 2; ae <= 6; ae++) {
        var Z = ae - 1
        var i = C.stationFor12306.tHtmlGetCityName(Z, -1, 0)
        if (i > u) {
          var W = Math.ceil(i / u)
          if (W > 1) {
            ab += '<div id="ul_list' + ae + '">'
            C.stationFor12306.pageDesigh(W, 0, ae)
          }
          C('#flip_cities2').css('display', 'block')
        } else {
          ab +=
            '<ul  class="popcitylist" style="overflow: auto; max-height: 260px; height: 191px;display:none;" id="ul_list' +
            ae +
            '">'
          C('#flip_cities2').css('display', 'none')
          var aa = ''
          if (!B) {
            aa = ' openLi'
          }
          for (
            var ad = 0;
            ad < C.stationFor12306.tHtmlGetCityName(Z, -1, 0);
            ad++
          ) {
            ab +=
              '<li class="ac_even' +
              aa +
              '"   title="' +
              C.stationFor12306.tHtmlGetCityName(Z, ad, 0)[1] +
              '" data="' +
              C.stationFor12306.tHtmlGetCityName(Z, ad, 0)[2] +
              '">' +
              C.stationFor12306.tHtmlGetCityName(Z, ad, 0)[1] +
              '</li>'
          }
        }
        ab += '</div>'
      }
      ab += '<div id="flip_cities2"> 翻页控制区</div>'
      ab += '</div>'
      C('#panel_cities2').html(ab)
      C('#thetable').on('click', function () {
        if (C('#form_cities2').css('display') == 'block') {
          if ((m == 1) | (m == 0)) {
            m == -1
          }
          I.select()
        }
      })
      C('#form_cities').on('click', function () {
        if (C('#form_cities').css('display') == 'block') {
          if ((m == 1) | (m == 0)) {
            m == -1
          }
          I.select()
        }
      })
      C('.ac_even')
        .on('mouseover', function () {
          C.stationFor12306.city_shiftSelectInLi(this)
        })
        .on('click', function () {
          I.val(C(this).text())
          curObjCode.val(C(this).attr('data'))
          if (B) {
            C.stationFor12306.setStationInCookies(
              C(this).text(),
              C(this).attr('data')
            )
          }
          C('#form_cities2').css('display', 'none')
          m = -1
          y = 0
          C.stationFor12306.setStationStyle()
          if (L) {
            C.stationFor12306.LoadJS(C(this).attr('data'))
          }
          if (J) {
            J(I, curObjCode)
          }
        })
      C('#flip_cities2').css('display', 'none')
      return w
    },
    LoadJS: function (W) {
      if (typeof mm_addjs !== 'undefined' && mm_addjs != '' && mm_addjs == 1) {
        var k = document.getElementsByTagName('HEAD').item(0)
        var i = document.createElement('SCRIPT')
        i.src = mm_srcjs + W + '.js'
        i.type = 'text/javascript'
        k.appendChild(i)
      }
    },
    addZMHtml: function (X, Y) {
      var W = ''
      if (X && X.length > 0) {
        var Z = X[0][0].charAt(0)
        W +=
          '<ul  class="popcitylist" style="overflow: auto; max-height: 260px; " >'
        W += '<li class="ac_letter">' + Z.toUpperCase() + '</li>'
        for (var i = 0; i < 12; i++) {
          var k = X[i]
          if (k) {
            W +=
              '<li class="ac_even' +
              Y +
              '"   title="' +
              k[1] +
              '" data="' +
              k[2] +
              '">' +
              k[1] +
              '</li>'
          } else {
            W += '<li class="ac_even' + Y + '" </li>'
          }
        }
        W += '</ul>'
      }
      return W
    },
    pageDesigh: function (Z, ac, ad) {
      var W = ''
      if (Z > 1) {
        if (ac == -1) {
          ac = Z - 1
        } else {
          if (ac == Z) {
            ac = 0
          }
        }
        var ab = ''
        if (!B) {
          ab = ' openLi'
        }
        for (var X = 2; X <= 6; X++) {
          if (X == ad) {
            var aa = P[X - 2]
            for (var i = 0; i < aa.length; i++) {
              K = aa[i].slice(ac * u, (ac + 1) * u)
              W += C.stationFor12306.addZMHtml(K, ab)
            }
          }
        }
        C('#ul_list' + ad).html(W)
        C('#ul_list' + ad).css('height', 270)
        if (W) {
          var Y =
            ac == 0
              ? '&laquo;&nbsp;上一页'
              : "<a style='cursor:pointer'    class='cityflip' onclick='$.stationFor12306.pageDesigh(" +
                Z +
                ',' +
                (ac - 1) +
                ',' +
                ad +
                ");return false;'>&laquo;&nbsp;上一页</a>"
          Y += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;'
          Y +=
            ac == Z - 1
              ? '下一页&nbsp;&raquo;'
              : "<a style='cursor:pointer' class='cityflip'  onclick='$.stationFor12306.pageDesigh(" +
                Z +
                ',' +
                (ac + 1) +
                ',' +
                ad +
                ")'>下一页&nbsp;&raquo;</a>"
          C('#flip_cities2').html(Y)
        } else {
          C('#flip_cities2').html('')
        }
        if ((m == 1) | (m == 0) | (m == 2)) {
          m == -1
        }
        if (I) {
          I.select()
        }
      } else {
      }
      C('.ac_even')
        .on('mouseover', function () {
          C.stationFor12306.city_shiftSelectInLi(this)
        })
        .on('click', function () {
          I.val(C(this).text())
          curObjCode.val(C(this).attr('data'))
          if (B) {
            C.stationFor12306.setStationInCookies(
              C(this).text(),
              C(this).attr('data')
            )
          }
          C('#form_cities2').css('display', 'none')
          m = -1
          y = 0
          C.stationFor12306.setStationStyle()
          if (L) {
            C.stationFor12306.LoadJS(C(this).attr('data'))
          }
          if (J) {
            J(I, curObjCode)
          }
        })
    },
    filterCity: function (Z) {
      if (Z.length == 0) {
        C('#top_cities').html(n)
        return w
      }
      var Y = /<\/?[^>]*>/g
      Z = Z.replace(Y, '')
      var W = []
      var k = /[^A-z]/.test(Z)
      for (var X = 0; X < w.length; X++) {
        if (C.stationFor12306.isMatchCity(w[X], Z, k)) {
          W.push(w[X])
        }
      }
      if (W.length > 0) {
        C('#top_cities').html('按"<font color=red>' + Z + '</font>"检索：')
        return W
      } else {
        C('#top_cities').html('无法匹配:<font color=red>' + Z + '</font>')
        return []
      }
    },
    replaceChar: function (i, W, k) {
      return i.substr(0, W) + k + i.substr(W + 1, i.length - 1)
    },
    isMatchCity: function (Z, ac, W) {
      var ac = ac.toLowerCase()
      var k = [Z[4].toLowerCase(), Z[1], Z[3].toLowerCase()]
      var ab = -1
      var Y = -1
      if (W) {
        ac = ac.split('')
        for (var X = 0; X < ac.length; X++) {
          var ae = k[1].indexOf(ac[X])
          if (ae > ab && ae <= X) {
            k[1] = C.stationFor12306.replaceChar(k[1], ae, '-')
            ab = ae
          } else {
            return false
          }
        }
      } else {
        ac = ac.split('')
        var i = true
        var aa = true
        for (var X = 0; X < ac.length; X++) {
          var ae = k[0].indexOf(ac[X])
          if (ae > ab && ae <= X) {
            k[0] = C.stationFor12306.replaceChar(k[0], ae, '-')
            ab = ae
          } else {
            i = false
            break
          }
        }
        for (var X = 0; X < ac.length; X++) {
          var ad = k[2].indexOf(ac[X])
          if (ad > Y && ad <= X) {
            k[2] = C.stationFor12306.replaceChar(k[2], ad, '-')
            Y = ad
          } else {
            aa = false
            break
          }
        }
        if (i == false && aa == false) {
          return false
        }
      }
      return true
    },
    city_showlist_page: function (ad, Y) {
      var Z = ''
      Z += '<div class="citypage">'
      Z +=
        ad == 0
          ? ''
          : '<a href="#" class="pagetxt" onclick="$.stationFor12306.city_showlist(' +
            (ad - 1) +
            ');return false;"><<</a>'
      var ae = ad + 1
      var aa = Y
      var ab = 2
      var ac = 5
      var k = ae - ab > 0 ? (ae + ab > aa ? aa - ac + 1 : ae - ab) : 1
      var W = k + ac > aa ? aa + 1 : k + ac
      if (aa < ac) {
        for (var X = 1; X < aa + 1; X++) {
          if (ae == X) {
            Z +=
              "<a href='' class='cur' onclick='$.stationFor12306.city_showlist(" +
              (X - 1) +
              ");return false;'>" +
              X +
              '</a>'
          } else {
            Z +=
              "<a href='' onclick='$.stationFor12306.city_showlist(" +
              (X - 1) +
              ");return false;'>" +
              X +
              '</a>'
          }
        }
      } else {
        for (var X = k; X < W; X++) {
          if (ae == X) {
            Z +=
              "<a href='' class='cur' onclick='$.stationFor12306.city_showlist(" +
              (X - 1) +
              ");return false;'>" +
              X +
              '</a>'
          } else {
            Z +=
              "<a href='' onclick='$.stationFor12306.city_showlist(" +
              (X - 1) +
              ");return false;'>" +
              X +
              '</a>'
          }
        }
      }
      Z +=
        ad == Y - 1
          ? ''
          : '<a href="" class="pagetxt" onclick="$.stationFor12306.city_showlist(' +
            (ad + 1) +
            ');return false;">>></a>'
      Z += '</div>'
      return Z
    },
    city_showlist: function (W) {
      if (E.length > 6) {
        var k = Math.ceil(E.length / 6)
        if (W == -1) {
          W = k - 1
        } else {
          if (W == k) {
            W = 0
          }
        }
        G = E.slice(6 * W, Math.min(6 * (W + 1), E.length))
        C.stationFor12306.city_Bind(G)
        var i = ''
        i += C.stationFor12306.city_showlist_page(W, k)
        C('#flip_cities').html(i)
        C('#flip_cities').css('display', 'block')
      } else {
        W = 0
        G = E
        C.stationFor12306.city_Bind(G)
        C('#flip_cities').css('display', 'none')
      }
      z = W
      if (C('#form_cities').css('display') == 'block') {
        a = true
        I.focus()
      }
    },
    fixDivBugInIE6: function (i) {
      try {
        i.bgiframe()
        if (i.width() > C('> ul', i).width()) {
          i.css('overflow', 'hidden')
        } else {
          C('> iframe.bgiframe', i).width(C('> ul', i).width())
          i.css('overflow', 'scroll')
        }
        if (i.height() > C('> ul', i).height()) {
          i.css('overflow', 'hidden')
        } else {
          C('> iframe.bgiframe', i).height(C('> ul', i).height())
          i.css('overflow', 'scroll')
        }
      } catch (k) {}
    },
    clearStation: function (i) {
      m = -1
      var W = I.val()
      var X = curObjCode.val()
      if (W == '' || X == '') {
        I.val('')
        curObjCode.val('')
      } else {
        var k = W + '|' + X
        if (typeof station_names !== 'undefined') {
          if (station_names.indexOf(k) == -1) {
            I.val('')
            curObjCode.val('')
          } else {
            if (i == 'click') {
              I.select()
              if (C('#form_cities').is(':hidden')) {
                C('#form_cities2').css('display', 'block')
              }
            }
          }
        } else {
          I.val('')
          curObjCode.val('')
        }
      }
    },
    MapCityID: function (W) {
      for (var k = 0; k < w.length; k++) {
        if (w[k][1] == W) {
          return w[k][2]
        }
      }
      return 0
    },
    MapCityName: function (k) {
      for (var W = 0; W < w.length; W++) {
        if (w[W][2] == k) {
          return w[W][1]
        }
      }
      return ''
    },
    SetISPos: function (Y) {
      if (Q) {
        Q(C('#form_cities'), C('#form_cities2'))
      } else {
        C('#form_cities').css('left', Y.position().left)
        C('#form_cities').css('top', Y.position().top + Y.height() + 12)
        C('#form_cities2').css('left', Y.position().left)
        C('#form_cities2').css('top', Y.position().top + Y.height() + 12)
      }
      var X = Y.offset().top
      var i = C('#search_div')
      var k = C('#choice_div')
      i.css('top', X)
      k.css('top', X)
      var W = Y.offset().left
      i.css('left', W)
      k.css('left', W)
    },
    myHandlerFg: function (i) {
      if (i == null) {
        i.keyCode = 9
      } else {
        if (!i.which && i.which == 13) {
          i.preventDefault()
        } else {
          if (i.which && i.keyCode == 13) {
            i.which = 9
          }
        }
      }
    },
    myHandler2: function (i) {
      if (i == null) {
        i = window.event
        i.returnValue = false
      } else {
        if (i.which && i.which == 13) {
          var W = document.getElementById('Upload_Data3')
          if (document.createEvent) {
            var k = document.createEvent('MouseEvents')
            k.initEvent('click', true, false)
            W.dispatchEvent(k)
          } else {
            if (document.createEventObject) {
              W.fireEvent('onclick')
            }
          }
        } else {
          if (!i.which && i.which == 13) {
            i.preventDefault()
          }
        }
      }
    },
    from_to_station_class_plain: function (i) {
      if (l && l != '') {
        i.removeClass(l)
      }
      if (r && r != '') {
        i.addClass(r)
      }
    },
    from_to_station_class_gray: function (i) {
      if (r && r != '') {
        i.removeClass(r)
      }
      if (l && l != '') {
        i.addClass(l)
      }
    },
    setStationStyle: function () {
      var i = I.val()
      if (i == '') {
        I.val(h)
        C.stationFor12306.from_to_station_class_gray(I)
        curObjCode.val('')
      } else {
        C.stationFor12306.from_to_station_class_plain(I)
      }
    },
    setCurValue: function () {
      I.val(S[1])
      curObjCode.val(S[2])
    },
    bindEvent: function (i) {
      var W = '#' + i
      var k = '#' + i + 'Text'
      C(k)
        .keydown(function (Y) {
          I = C(k)
          curObjCode = C(W)
          m = 0
          a = true
          L = true
          C('#form_cities2').css('display', 'none')
          y = 0
          var X = C(k).width()
          if (-[1]) {
            X = X - 4
          }
          X = X < 220 ? 220 : X
          C('#form_cities').css('width', X)
          C('#form_cities').css('display', 'block')
          C('.AbcSearch li').removeClass('action')
          C('.popcitylist').css('display', 'none')
          if (M && B) {
            C('#ul_list7').css('display', 'block')
            C('#nav_list7').addClass('action')
          } else {
            C('#nav_list1').addClass('action')
            C('#ul_list1').css('display', 'block')
          }
          C('#flip_cities2').css('display', 'none')
          C('.ac_even')
            .removeClass('ac_over')
            .addClass('ac_odd')
          Y = Y || window.event
          if (Y.keyCode == 40) {
            C.stationFor12306.city_changeSelectIndex(1)
            C('#form_cities').css('display', 'block')
            C.stationFor12306.SetISPos(I)
            C.stationFor12306.setCurValue()
          } else {
            if (Y.keyCode == 38) {
              C.stationFor12306.city_changeSelectIndex(-1)
              C.stationFor12306.setCurValue()
              C('#form_cities').css('display', 'block')
              C.stationFor12306.SetISPos(I)
            } else {
              if (Y.keyCode == 13) {
                C.stationFor12306.city_confirmSelect()
                if (document.addEventListener) {
                  document.addEventListener(
                    'keypress',
                    C.stationFor12306.myHandlerFg,
                    true
                  )
                } else {
                  evt = window.event
                  evt.keyCode = 9
                }
              }
            }
          }
        })
        .focus(function () {
          L = true
          if (a) {
            C('#form_cities2').css('display', 'none')
            y = 0
            a = false
            m = -1
          } else {
            if (m == -1) {
              C('.AbcSearch li').removeClass('action')
              C('.popcitylist').css('display', 'none')
              C('#flip_cities2').css('display', 'none')
              if (M && B) {
                C('#ul_list7').css('display', 'block')
                C('#nav_list7').addClass('action')
              } else {
                C('#nav_list1').addClass('action')
                C('#ul_list1').css('display', 'block')
              }
              C('.ac_even')
                .removeClass('ac_over')
                .addClass('ac_odd')
              C('#form_cities2').css('display', 'block')
              for (var X = 2; X <= 6; X++) {
                C('#ul_list' + X).css('height', 0)
              }
            }
          }
          I = C(k)
          curObjCode = C(W)
          m = 0
          U = true
          C.stationFor12306.SetISPos(I)
        })
        .blur(function () {
          I = C(k)
          curObjCode = C(W)
          m = 0
          a = false
          L = true
          if (!g && !H) {
            C.stationFor12306.clearStation('blur')
            U = false
            C('#form_cities').css('display', 'none')
            C('#form_cities2').css('display', 'none')
            m = -1
            y = 0
            E = C.stationFor12306.filterCity('')
            C.stationFor12306.city_showlist(0)
            C.stationFor12306.setStationStyle()
          }
        })
        .keyup(function (X) {
          I = C(k)
          curObjCode = C(W)
          m = 0
          a = true
          X = X || window.event
          if (
            X.keyCode != 40 &&
            X.keyCode != 38 &&
            X.keyCode != 37 &&
            X.keyCode != 39 &&
            X.keyCode != 13 &&
            X.keyCode != 9
          ) {
            E = C.stationFor12306.filterCity(I.val())
            C.stationFor12306.city_showlist(0)
          }
        })
        .click(function () {
          C.stationFor12306.clearStation('click')
        })
      C.stationFor12306.bindInputs.push(i)
    },
    getStationInCookies: function () {
      var W = []
      var k = C.ht_getcookie('_city_name_save_station')
      if (k) {
        var i = k.split(',')
        if (i && i.length > 0) {
          C.each(i, function (aa, Z) {
            var X = Z.split('#')
            var Y = []
            Y[0] = X[0]
            Y[1] = X[1]
            W[aa] = Y
          })
        }
      }
      return W
    },
    setStationInCookies: function (af, W) {
      var ac = C.stationFor12306.getStationInCookies()
      var Z = []
      var ag = ac.length
      var Y = true
      var ah = 10
      for (var aa = 0; aa < ag; aa++) {
        if (ac[aa][0] == af && ac[aa][1] == W) {
          Y = false
        }
        Z.push(ac[aa])
      }
      if (Y) {
        Z.push([af, W])
      }
      var ab = Z
      var X = ''
      var ad = ab.length
      var aa = 0
      if (ad > ah) {
        aa = 1
      }
      var i = aa
      if (ad > 1) {
        C('#ul_list7').html('')
        M = true
      }
      var ae = ''
      for (; aa < ad; aa++) {
        if (aa > i) {
          X += ','
        }
        X += ab[aa][0] + '#' + ab[aa][1]
        if (M && B) {
          ae +=
            '<li class="ac_even" onmouseover="$.stationFor12306.city_shiftSelectInLi(this);" onclick="$.stationFor12306.li_click(this);"   title="' +
            ab[aa][0] +
            '" data="' +
            ab[aa][1] +
            '">' +
            ab[aa][0] +
            '</li>'
        }
      }
      if (M && B) {
        C('#ul_list7').html(ae)
      }
      C.ht_setcookie('_city_name_save_station', X, 365 * 24 * 60 * 60)
    },
    li_click: function (i) {
      I.val(C(i).text())
      curObjCode.val(C(i).attr('data'))
      if (B) {
        C.stationFor12306.setStationInCookies(C(i).text(), C(i).attr('data'))
      }
      C('#form_cities2').css('display', 'none')
      m = -1
      y = 0
      C.stationFor12306.setStationStyle()
      if (L) {
        C.stationFor12306.LoadJS(C(i).attr('data'))
      }
      if (J) {
        J(I, curObjCode)
      }
    },
    init: function (ac, ad) {
      if (typeof ad !== 'undefined') {
        if (typeof ad._init_input !== 'undefined') {
          h = ad._init_input
        }
        if (typeof ad._top_4_initInput !== 'undefined') {
          n = ad._top_4_initInput
        }
        if (typeof ad.confirmCallBack !== 'undefined') {
          J = ad.confirmCallBack
        }
        if (typeof ad._selected_class !== 'undefined') {
          r = ad._selected_class
        }
        if (typeof ad._unselected_class !== 'undefined') {
          l = ad._unselected_class
        }
        if (typeof ad._12306_openFavorite !== 'undefined') {
          B = ad._12306_openFavorite
        }
        if (typeof ad.position !== 'undefined') {
          Q = ad.position
        }
      }
      if (typeof station_names !== 'undefined') {
        var Z = station_names.split('@')
        for (var Y = 0; Y < Z.length; Y++) {
          var ab = Z[Y]
          var aa = ab.toString().charAt(0)
          for (var X in F) {
            if (aa == F[X]) {
              c[X].push(ab.split('|'))
            }
          }
          if (ab.length > 0) {
            ab = ab.split('|')
            if (O != '' && ab[2] == O) {
              favcity = ab
              w.unshift(ab)
              if (Y > 6) {
                w.push(ab)
              }
            } else {
              w.push(ab)
            }
          }
        }
        f = c[0]
          .concat(c[1])
          .concat(c[2])
          .concat(c[3])
          .concat(c[4])
        e = c[5]
          .concat(c[6])
          .concat(c[7])
          .concat(c[8])
          .concat(c[9])
        d = c[10]
          .concat(c[11])
          .concat(c[12])
          .concat(c[13])
          .concat(c[14])
        b = c[15]
          .concat(c[16])
          .concat(c[17])
          .concat(c[18])
          .concat(c[19])
        V = c[20]
          .concat(c[21])
          .concat(c[22])
          .concat(c[23])
          .concat(c[24])
          .concat(c[25])
        P[0] = [c[0], c[1], c[2], c[3], c[4]]
        P[1] = [c[5], c[6], c[7], c[8], c[9]]
        P[2] = [c[10], c[11], c[12], c[13], c[14]]
        P[3] = [c[15], c[16], c[17], c[18], c[19]]
        P[4] = [c[20], c[22], c[23], c[24], c[25]]
        for (var Y = 0; Y < w.length; Y++) {
          w[Y].push(Y)
        }
      }
      if (typeof favorite_names !== 'undefined') {
        var W = favorite_names.split('@')
        for (var Y = 0; Y < W.length; Y++) {
          var ab = W[Y]
          if (ab.length > 0) {
            ab = ab.split('|')
            D.push(ab)
          }
        }
        for (var Y = 0; Y < D.length; Y++) {
          D[Y].push(Y)
        }
      }
      E = C.stationFor12306.filterCity('')
      C.stationFor12306.city_showlist(0)
      C.stationFor12306.showAllCity()
      a = false
      C.stationFor12306.fixDivBugInIE6(C('#form_cities'))
      C.stationFor12306.fixDivBugInIE6(C('#form_cities2'))
      if (ac && ac.length > 0) {
        C.each(ac, function (k, i) {
          C.stationFor12306.bindEvent(i)
        })
      }
      C('#form_cities')
        .mousedown(function () {
          g = true
        })
        .mouseup(function () {
          g = false
        })
      C('#form_cities2')
        .mousedown(function () {
          H = true
        })
        .mouseup(function () {
          H = false
        })
    }
  }
})(jQuery)
;(function () {
  $.stopStation = function (a) {
    var b = this
    b.init = function () {
      b.options = $.extend({}, $.stopStation.defaultOptions, a)
      if (b.options.url == null || b.options.getSearchDate == null) {
        throw 'error options,url can not be null'
      }
      b.options.mouseOnPanel = 0
      if (!$('#' + b.options.showDivId)[0]) {
        var d = []
        var c = -1
        d[++c] =
          '<div class="station" style="display:none;" id="' +
          b.options.showDivId +
          '"><b></b>'
        d[++c] =
          '<div class="station-info" id="' + b.options.showTitleId + '"></div>'
        d[++c] =
          '<div class="station-hd"><span class="zx">站序</span><span class="zm">站名</span><span class="dzsj">到站时间</span>'
        d[++c] =
          '<span class="cfsj">出发时间</span><span class="tlsj">停留时间</span>'
        d[++c] =
          '<a id="_stopStation_close_id" class="close" title="关闭" href="javascript:" </a></div>'
        d[++c] =
          '<div class="station-bd"><table><tbody id="' +
          b.options.showTableId +
          '"></tbody></table></div></div>'
        $(d.join('')).appendTo($('body:eq(0)'))
        $('#_stopStation_close_id').on('click', b.close)
      }
      $('#' + b.options.showDivId).css('z-index', '20001')
      if (b.options.mouseOutClose) {
        $('#' + b.options.showDivId)
          .on('mouseenter', function (e) {
            b.options.mouseOnPanel = 1
          })
          .on('mouseleave', function () {
            b.options.mouseOnPanel = 0
            $('#' + b.options.showDivId)
              .hide()
              .appendTo($('body:eq(0)'))
            $('#' + b.options.showTableId).html('')
          })
      }
    }
    b.close = function () {
      $('#' + $.stopStation.defaultOptions.showDivId)
        .closest('tr')
        .removeAttr('style')
      $('#' + $.stopStation.defaultOptions.showDivId).removeAttr('style')
      b.options.mouseOnPanel = 0
      $('#' + $.stopStation.defaultOptions.showDivId)
        .hide()
        .appendTo($('body:eq(0)'))
      $('#' + $.stopStation.defaultOptions.showTableId).html('')
    }
    b.open = function (f, j, h, e, i, c) {
      $('#' + $.stopStation.defaultOptions.showDivId).attr(
        'style',
        'z-index:20001'
      )
      if (a.timer) {
        clearTimeout(a.timer)
      }
      var g = a.getSearchDate()
      if (i && i != '' && i != null) {
        var d = formatDate(i)
        if (d != '-') {
          g = formatDate(i)
        } else {
          g = a.getSearchDate()
        }
      } else {
        g = a.getSearchDate()
      }
      $.ajax({
        url: a.url,
        type: 'get',
        isTakeParam: false,
        beforeSend: function (k) {
          k.setRequestHeader('If-Modified-Since', '0')
          k.setRequestHeader('Cache-Control', 'no-cache')
        },
        data: {
          train_no: j,
          from_station_telecode: h,
          to_station_telecode: e,
          depart_date: g
        },
        success: function (p) {
          var t = p.data.data
          if (t && t.length > 0) {
            var r = []
            var u = -1
            for (var q = 0; q < t.length; q++) {
              var l = t[q]
              if (q == 0) {
                var n = null
                n = l.train_class_name
                var s = l.service_type
                if (s == '0') {
                  c = '无空调'
                } else {
                  c = '有空调'
                }
                if (!n) {
                  n = '&nbsp;&nbsp;'
                }
                $('#' + $.stopStation.defaultOptions.showTitleId)
                  .html(
                    '<span class="item1">' +
                      l.station_train_code +
                      '次      </span><span class="item2">' +
                      l.start_station_name +
                      '<em>--></em>' +
                      l.end_station_name +
                      '</span><span class="item3">' +
                      n +
                      '</span><span class="item4">' +
                      c +
                      '</span>'
                  )
                  .find('span')
                  .css('color', '#333')
              }
              var m = ''
              if (!l.isEnabled) {
                m = " style='color: #999;' "
              }
              r[++u] =
                '<tr><td width="50" class="tc" ' +
                m +
                '>' +
                l.station_no +
                '</td>'
              r[++u] = '<td width="75" ' + m + '>' + l.station_name + '</td>'
              r[++u] = '<td width="75" ' + m + '>' + l.arrive_time + '</td>'
              r[++u] = '<td width="75" ' + m + '>' + l.start_time + '</td>'
              r[++u] = '<td ' + m + '>' + l.stopover_time + '</td></tr>'
            }
            $('#' + $.stopStation.defaultOptions.showTableId).html(r.join(''))
            var o = $('#' + $.stopStation.defaultOptions.appendTo + f)
            $('#' + $.stopStation.defaultOptions.showDivId)
              .appendTo(o)
              .show()
            $('.ticket-info')
              .filter('div')
              .attr('style', '')
            o[0].style['z-index'] = 19999
            if (!(navigator.appVersion.indexOf('MSIE 6') > -1)) {
            } else {
            }
          }
        }
      })
    }
    b.init()
    myStopStation = b
    return b
  }
  $.fn.stopStation = function () {
    return new $.stopStation(Array.prototype.slice.call(arguments)[0])
  }
  $.stopStation.defaultOptions = {
    url: null,
    mouseOutClose: false,
    showDivId: 'train_div_',
    showTableId: 'train_table_',
    showTitleId: 'train_span_',
    appendTo: 'train_num_',
    getSearchDate: null
  }
})()
var myStopStation = function () {}
var formatDate = function (b) {
  if (b && b.length == 8) {
    var c = b.substring(0, 4)
    var d = b.substring(4, 6)
    var a = b.substring(6, 8)
    return c + '-' + d + '-' + a
  } else {
    return '-'
  }
}
var checkusermdId
var showTrainStop
var hideTrainStop
var showTicketPrice
var isInitQueryInput = false
var isInitStationDiv = false
var isInitJsrenderTemplate = false
var isInitDateRange = false
var tickets_info
var location_code
var md5Str
var leftTicketStr
var isAsync
var box
var countDown = null
var ischeckAutoSubmitCode = true
var hainan_tip
var firstShow = 1
var endShow = 20
var dataNumber = 0
var change_dates_arr = []
var isOther = true
var dwTranTimeStr
var ydTranTimeStr
var uninputmsg = '用户名／邮箱／手机号码'
var adtimeout = 5000
var iframeUrl = 'https://ad.12306.cn/res/0004.html'
var frameComplete = false
var iframeOnload = function () {
  frameComplete = true
}
var yxTrainPageSize = 15
var passengerPageSize = 20
var timer_time = 3
var yxTrainChange = ''
var trainListForIE = []
var queryLeftTicket_times = 0
var queryLeftTicket_count = 10
var ifAlertCode = false
var intervalTime
var seatTypeForHB = {
  SWZ: '9_商务座',
  TZ: 'P_特等座',
  ZY: 'M_一等座',
  ZE: 'O_二等座',
  GR: '6_高级软卧',
  RW: '4_软卧',
  SRRB: 'F_动卧',
  YW: '3_硬卧',
  RZ: '2_软座',
  YZ: '1_硬座',
  WZ: '1_无座',
  QT: 'H_其他'
}
var _alowHBHour = 19
var alowHBMaxNum = 2
var hbbeginTime = 600
var hb_max_msg =
  '同一候补订单中每个乘车日期最多可包含' +
  alowHBMaxNum +
  '个不同“车次+席别”的组合需求。'
var hb_date_msg = '请选择两个相邻的乘车日期。'
var hb_date_msg_station = '您已更换发到站，将清空原候补购票需求。'
var hb_date_msg_diff = '请选择两个相邻的乘车日期。'
var hbSessionKey = '_hbBuyCart'
var isInitLoad = true
;(function () {
  var a
  var bi = null
  var bW
  var bH
  var S
  var ao
  var cv
  var ce
  var q = false
  var cl = 0
  var aI
  var bt
  var B
  var al
  var cC
  var bq = new Array()
  var ca = new Array()
  var ck = new Array()
  var ad = new Array()
  var b5 = new Array()
  var P
  var aO = new Array()
  tickets_info = new Array()
  var bj = true,
    cn = true,
    be = true,
    aJ = 'starttime'
  var aN = true
  var bQ = []
  var bw = []
  var cd = []
  var a2
  var M = []
  var cb = ''
  var ct = ''
  var bo = ''
  var h = ''
  var H = ''
  $(document).ready(function () {
    d()
    $.init_ul4li()
    g()
    af()
    C()
    aj()
    K()
    aK()
    bl()
    bO()
    clickCheckBoxName()
    bU()
    cf()
    aB()
    aq()
    cp()
    E()
    bd()
    b1()
    $('#float').headerFloat()
    $(window).scroll(function () {
      if (bi != null && !bi.isHidden()) {
        $('#floatTable').hide()
        $(window).scrollTop(a)
      }
    })
    $.stopStation({
      url: ctx + 'czxx/queryByTrainNo',
      getSearchDate: function () {
        return train_tour_flag == 'fc'
          ? $.trim($('#back_train_date').val())
          : $.trim($('#train_date').val())
      }
    })
    bs()
    cH()
    cq()
    p()
    Y()
    am()
    cb = $('#fromStationText').val()
    ct = $('#toStationText').val()
    $('#showOnlyTicA').bind('click', function () {
      $('#filterTic').attr('checked', 'checked')
      bx()
      $jpopup.startOrHiden()
    })
    a2 = $.autoSubmit()
    var cM = $('#train_date').val()
    var cK = $('#back_train_date').val()
    if (cK == '') {
      $('#back_train_date').val(cM)
    } else {
      $('#back_train_date').val(cK)
    }
    w()
    bb()
    var cL = new bG('right')
    cL.init()
    ab()
    if (page_show_flag == 'preStep') {
      $('#query_ticket').click()
    }
    if (tour_flag == 'fc' || tour_flag == 'gc') {
      $('.cart-hd').hide()
    }
  })
  var bG = function (cR) {
    var cS,
      cO = {},
      cT,
      cP = this,
      cN = false,
      cL,
      cQ,
      cM = { x: 10, y: 66 },
      cK = { x: 5, y: 1 }
    this.move = function () {
      cL = cL + cK.x
      cQ = cQ + cK.y
      if (cL < cM.x) {
        cL = cM.x
        cK.x = -cK.x
      } else {
        if (cL > cO.dx) {
          cL = cO.dx
          cK.x = -cK.x
        }
      }
      if (cQ < cM.y) {
        cQ = cM.y
        cK.y = -cK.y
      } else {
        if (cQ > cO.dy) {
          cQ = cO.dy
          cK.y = -cK.y
        }
      }
      cT.css(cR, cL + 'px').css('top', cQ + 'px')
    }
    this.init = function () {
      if (cN) {
        return
      }
      cN = true
      cT = $(bG.htmlTemplate)
      $(window).on('resize', cP.resize)
      cT.css(cR, cM.x + 'px')
        .css({ top: cM.y + 'px' })
        .on('mouseenter', cP.stop)
        .on('mouseleave', cP.resize)
        .children('a.close')
        .on('click', cP.hidden)
      $('body').append(cT)
      cL = cM.x
      cQ = cM.y
      cP.resize()
    }
    this.destory = function () {
      cT.remove()
    }
    this.resize = function () {
      cO.dx = ($(window).width() - $('.content').width()) / 2 - cT.width()
      cO.dy = $(window).height() - cT.height()
      if (cO.dx <= cM.x + Math.abs(cK.x) || cO.dy <= cM.y + Math.abs(cK.y)) {
        cP.stop()
      } else {
        cP.alive()
      }
    }
    this.show = function () {
      cT.show()
      cP.alive()
    }
    this.hidden = function () {
      cP.stop()
      cT.hide()
    }
    this.stop = function () {
      clearInterval(cS)
    }
    this.alive = function () {
      cP.stop()
      cS = setInterval(cP.move, 200)
    }
  }
  function L () {
    setTimeout(function () {
      if (!frameComplete) {
        var cL = $('#ad_frame_query')
        var cK = cL.get(0)
        var cM = ctx + 'resources/images/bg11.png'
        cL.remove()
        $('#myfix_yh').css('background', 'url(' + cM + ') no-repeat')
        $('#myfix_yh').html(
          '<a href="javascript:void(0);" class="close" title="关闭">关闭</a>'
        )
        $('#myfix_yh')
          .children('a.close')
          .on('click', function () {
            $(this)
              .parent()
              .hide()
          })
      }
    }, adtimeout)
  }
  function t () {
    var cM = $('.cart-tlist li')
    if (cM && cM.length > 0) {
      for (var cL = 0; cL < cM.length; cL++) {
        var cK = $(cM[cL])
          .attr('hbid')
          .split('#')[0]
        if (cK == $('#train_date').val()) {
          $(cM[cL])
            .find('a[class="del"]')
            .click()
        }
        var cO = $(cM[cL])
          .attr('hbid')
          .split('#')
        var cN = cO[0] + '#' + cO[3] + '#' + cO[4] + '#'
        $('td[hbdata="' + cN + '"]').click()
      }
    }
  }
  function b2 (cL) {
    if (cL) {
      $('.yzm').show()
      $('#orange_msg').hide()
      $('#randCodeForm_id')
        .find('a')
        .css('margin-top', '30px')
      var cK = $('#qr_submit1')
      cK.unbind('click').bind('click', j)
      cK.removeClass('btn92')
        .addClass('btn92s')
        .show()
      ifAlertCode = true
    } else {
      $('.yzm').hide()
      $('#orange_msg').show()
      $('#qr_submit1').hide()
      ifAlertCode = false
    }
  }
  function am () {
    if (rqChecked.length == 0) {
      if (train_tour_flag == 'fc') {
        rqChecked.push($('#back_train_date').val())
      } else {
        rqChecked.push($('#train_date').val())
      }
    }
  }
  function cq () {
    if (ClickWho == '0X00') {
      $('#sf1').attr('disabled', 'true')
      $('#sf1_label').addClass('color999')
      $('#sf2').attr('checked', 'true')
      $('#query_ticket')
        .removeClass()
        .addClass('btn92s')
    } else {
      if (ClickWho == '00' || ClickWho == 'ADULT') {
        $('#sf2').attr('disabled', 'true')
        $('#sf2_label').addClass('color999')
        $('#query_ticket')
          .removeClass()
          .addClass('btn92s')
      } else {
        $('#query_ticket')
          .removeClass()
          .addClass('btn92s')
      }
    }
    if (isstudentDate) {
      $('#sf2').attr('disabled', 'true')
      $('#sf2_label').addClass('color999')
      $('#query_ticket')
        .removeClass()
        .addClass('btn92s')
    }
  }
  function ar () {
    if (!isInitStationDiv) {
      e()
      isInitStationDiv = true
    }
    if (!isInitJsrenderTemplate) {
      aD()
      isInitJsrenderTemplate = true
    }
  }
  function bs () {
    $('#fromStationText').mouseover(ar)
    $('#toStationText').mouseover(ar)
    $('#dc').mouseover(ar)
    $('#wf').mouseover(ar)
    $('#dc_label').mouseover(ar)
    $('#wf_label').mouseover(ar)
    $('#train_date').mouseover(ar)
    $('#back_train_date').mouseover(ar)
    $('#date_range').mouseover(ar)
  }
  function aM (cK) {
    aY()
    var cR = b5.length
    if ($('#query_ticket').html() == '停止查询') {
      if (cR > 0 && a4) {
        $('#auto_query').removeAttr('disabled')
        if ($('#dc').is(':checked') && train_tour_flag != 'gc') {
          $('#autoSubmit').removeAttr('disabled')
          $('#partSubmit').removeAttr('disabled')
        }
        $('#query_ticket').html('查询')
        $('#query_ticket').unbind('click')
        b6()
        if (countDown) {
          clearInterval(countDown)
        }
        $('#filterTicDiv').html(
          "<strong><label for='filterTic' style='cursor: pointer;'>仅显示选定车次</label></strong>"
        )
        if (!$('#autoSubmit').is(':checked')) {
          clearInterval(bg)
          if (
            ccSelected.length > 0 ||
            rqChecked.length > 0 ||
            xbChecked.length > 0
          ) {
            myJpopup.startOrHiden()
            if (train_tour_flag == 'fc') {
              var cS =
                '成功查到' +
                $('#back_train_date').val() +
                '的' +
                b5[0]['queryLeftNewDTO']['station_train_code'] +
                '次'
            } else {
              var cS =
                '成功查到' +
                $('#train_date').val() +
                '的' +
                b5[0]['queryLeftNewDTO']['station_train_code'] +
                '次'
            }
            if (cR == 1) {
              cS = cS + '车。'
            } else {
              cS = cS + '等' + cR + '趟车。'
            }
            $('#filterRes').html(cS)
          }
        }
        jPlayer('play')
      } else {
        if (countDown) {
          clearInterval(countDown)
        }
        var cQ = autoSearchTime / 1000
        $('#filterTicDiv').html(
          "<strong>离下次刷新时间<font class='colorA' style='font-size: 16px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
            cQ +
            '</font>秒<strong>'
        )
        countDown = window.setInterval(function () {
          var cT =
            "<strong>离下次刷新时间<font class='colorA' style='font-size: 16px;'>"
          if (cQ == 0) {
            cQ = autoSearchTime / 1000
          }
          cQ = cQ - 1
          if (cQ == 4) {
            cT = cT + '&nbsp;&nbsp;&nbsp;&nbsp;'
          }
          if (cQ == 3) {
            cT = cT + '&nbsp;&nbsp;&nbsp;'
          }
          if (cQ == 2) {
            cT = cT + '&nbsp;&nbsp;'
          }
          if (cQ == 1) {
            cT = cT + '&nbsp;'
          }
          cT = cT + cQ
          cT += '</font>秒<strong>'
          $('#filterTicDiv').html(cT)
        }, 1000)
        $('#filterTic').hide()
      }
    }
    var cP = new Array()
    cP.push('<tbody id="queryLeftTable">')
    cK = a6(cK)
    var cM = ch(cK)
    if (cM) {
      cK = cy(cK)
    }
    if ($('#avail_jf')[0].checked) {
      cK = aT(cK)
    }
    for (var cL = 0; cL < cK.length; cL++) {
      cP.push('<tr id="ticket_')
      cP.push(cK[cL].queryLeftNewDTO.train_no)
      cP.push('" class="')
      cP.push(cL % 2 ? '">' : 'bgc">')
      cP.push('<td colspan="4" width="370">')
      cP.push('<div class="ticket-info clearfix" id="train_num_')
      cP.push(cL)
      cP.push('">')
      cP.push('<div class="train" id="ticket_')
      cP.push(cK[cL].queryLeftNewDTO.train_no)
      cP.push('_train">')
      var cO = ''
      if (c(cK[cL].queryLeftNewDTO.station_train_code)) {
        cO = ' style="color:red;" '
      }
      cP.push(
        '<div><a  ' + cO + ' title="点击查看停靠站信息" href="javascript:" id="'
      )
      cP.push(cK[cL].queryLeftNewDTO.train_no)
      cP.push('_')
      cP.push(cK[cL].queryLeftNewDTO.from_station_telecode)
      cP.push('_')
      cP.push(cK[cL].queryLeftNewDTO.to_station_telecode)
      if (
        cK[cL].queryLeftNewDTO.controlled_train_flag == '1' ||
        cK[cL].queryLeftNewDTO.controlled_train_flag == '2'
      ) {
        cP.push('" class="number"')
        cP.push('>')
      } else {
        cP.push('" class="number"  onclick="myStopStation.open(\'')
        cP.push(cL)
        cP.push("','")
        cP.push(cK[cL].queryLeftNewDTO.train_no)
        cP.push("','")
        cP.push(cK[cL].queryLeftNewDTO.from_station_telecode)
        cP.push("','")
        cP.push(cK[cL].queryLeftNewDTO.to_station_telecode)
        cP.push("','")
        cP.push(cK[cL].queryLeftNewDTO.start_train_date)
        cP.push("','")
        cP.push(cK[cL].queryLeftNewDTO.train_seat_feature)
        cP.push('\');">')
      }
      cP.push(cK[cL].queryLeftNewDTO.station_train_code)
      cP.push('</a>')
      if (cK[cL].queryLeftNewDTO.is_support_card != 0) {
        cP.push(
          ' <span class="i-card" title="可凭二代身份证直接进出站"></span>'
        )
      }
      cP.push('</div>')
      cP.push('<span id="')
      cP.push(cK[cL].queryLeftNewDTO.train_no)
      cP.push('_')
      cP.push(cK[cL].queryLeftNewDTO.from_station_no)
      cP.push('_')
      cP.push(cK[cL].queryLeftNewDTO.to_station_no)
      cP.push('_')
      cP.push(cK[cL].queryLeftNewDTO.yp_info)
      cP.push('_')
      cP.push(cK[cL].queryLeftNewDTO.seat_types)
      if (
        cK[cL].queryLeftNewDTO.controlled_train_flag == '1' ||
        cK[cL].queryLeftNewDTO.controlled_train_flag == '2'
      ) {
        cP.push(
          '" class="lookup"><span style="display:none;">查看票价</span><b style="display:none;" title="查看票价"></b></span>'
        )
      } else {
        cP.push(
          '" class="lookup" onclick="showTicketPrice(this)"><span style="display:none;">查看票价</span><b title="查看票价"></b></span>'
        )
      }
      cP.push('</div>')
      cP.push('<div class="cdz">')
      if (
        cK[cL].queryLeftNewDTO.from_station_telecode != null &&
        cK[cL].queryLeftNewDTO.from_station_telecode ==
          cK[cL].queryLeftNewDTO.start_station_telecode
      ) {
        cP.push('<strong class="start-s">')
        cP.push(cK[cL].queryLeftNewDTO.from_station_name)
        cP.push('</strong>')
      } else {
        cP.push('<strong>')
        cP.push(cK[cL].queryLeftNewDTO.from_station_name)
        cP.push('</strong>')
      }
      if (
        cK[cL].queryLeftNewDTO.to_station_telecode != null &&
        cK[cL].queryLeftNewDTO.to_station_telecode ==
          cK[cL].queryLeftNewDTO.end_station_telecode
      ) {
        cP.push('<strong class="end-s">')
        cP.push(cK[cL].queryLeftNewDTO.to_station_name)
        cP.push('</strong>')
      } else {
        cP.push('<strong>')
        cP.push(cK[cL].queryLeftNewDTO.to_station_name)
        cP.push('</strong>')
      }
      cP.push('</div>')
      cP.push('<div class="cds">')
      if (
        cK[cL].queryLeftNewDTO.controlled_train_flag == '1' ||
        cK[cL].queryLeftNewDTO.controlled_train_flag == '2'
      ) {
        cP.push('<strong class="start-t" style="color:#999;">')
        cP.push('-----')
        cP.push('</strong>')
        cP.push('<strong class="color999">')
        cP.push('-----')
        cP.push('</strong>')
      } else {
        cP.push('<strong class="start-t">')
        cP.push(cK[cL].queryLeftNewDTO.start_time)
        cP.push('</strong>')
        cP.push('<strong class="color999">')
        cP.push(cK[cL].queryLeftNewDTO.arrive_time)
        cP.push('</strong>')
      }
      cP.push('</div>')
      cP.push('<div  class="ls" ')
      cP.push('id="')
      cP.push(cK[cL].queryLeftNewDTO.train_no)
      cP.push('_ls">')
      if (
        cK[cL].queryLeftNewDTO.controlled_train_flag == '1' ||
        cK[cL].queryLeftNewDTO.controlled_train_flag == '2'
      ) {
        cP.push('<strong class="color999">')
        cP.push('------')
        cP.push('</strong>')
        cP.push('<strong class="color999">')
        cP.push('------')
        cP.push('</strong>')
      } else {
        cP.push('<strong>')
        cP.push(cK[cL].queryLeftNewDTO.lishi)
        cP.push('</strong>')
        cP.push('<span>')
        cP.push(
          changeArriveDate(
            cK[cL].queryLeftNewDTO.start_time,
            cK[cL].queryLeftNewDTO.lishi
          )
        )
        cP.push('到达</span>')
      }
      cP.push('</div>')
      cP.push('</div>')
      cP.push('</td>')
      if (
        cK[cL].queryLeftNewDTO.swz_num &&
        cK[cL].queryLeftNewDTO.swz_num != '--' &&
        cK[cL].queryLeftNewDTO.swz_num != 0 &&
        cK[cL].queryLeftNewDTO.swz_num != '无'
      ) {
        cr(
          cP,
          cK[cL].queryLeftNewDTO.swz_num,
          'SWZ_',
          cK[cL].queryLeftNewDTO.train_no,
          cK[cL].queryLeftNewDTO.yp_ex,
          '91',
          cK[cL].queryLeftNewDTO.controlled_train_flag,
          cK[cL]
        )
      } else {
        if (
          cK[cL].queryLeftNewDTO.tz_num &&
          cK[cL].queryLeftNewDTO.tz_num != '--' &&
          cK[cL].queryLeftNewDTO.tz_num != 0 &&
          cK[cL].queryLeftNewDTO.tz_num != '无'
        ) {
          cr(
            cP,
            cK[cL].queryLeftNewDTO.tz_num,
            'TZ_',
            cK[cL].queryLeftNewDTO.train_no,
            cK[cL].queryLeftNewDTO.yp_ex,
            'P1',
            cK[cL].queryLeftNewDTO.controlled_train_flag,
            cK[cL]
          )
        } else {
          if (
            cK[cL].queryLeftNewDTO.swz_num &&
            cK[cL].queryLeftNewDTO.swz_num == '无'
          ) {
            cr(
              cP,
              cK[cL].queryLeftNewDTO.swz_num,
              'SWZ_',
              cK[cL].queryLeftNewDTO.train_no,
              cK[cL].queryLeftNewDTO.yp_ex,
              '91',
              cK[cL].queryLeftNewDTO.controlled_train_flag,
              cK[cL]
            )
          } else {
            cr(
              cP,
              cK[cL].queryLeftNewDTO.tz_num,
              'TZ_',
              cK[cL].queryLeftNewDTO.train_no,
              cK[cL].queryLeftNewDTO.yp_ex,
              'P1',
              cK[cL].queryLeftNewDTO.controlled_train_flag,
              cK[cL]
            )
          }
        }
      }
      cr(
        cP,
        cK[cL].queryLeftNewDTO.zy_num,
        'ZY_',
        cK[cL].queryLeftNewDTO.train_no,
        cK[cL].queryLeftNewDTO.yp_ex,
        'M1',
        cK[cL].queryLeftNewDTO.controlled_train_flag,
        cK[cL]
      )
      cr(
        cP,
        cK[cL].queryLeftNewDTO.ze_num,
        'ZE_',
        cK[cL].queryLeftNewDTO.train_no,
        cK[cL].queryLeftNewDTO.yp_ex,
        'O1',
        cK[cL].queryLeftNewDTO.controlled_train_flag,
        cK[cL]
      )
      cr(
        cP,
        cK[cL].queryLeftNewDTO.gr_num,
        'GR_',
        cK[cL].queryLeftNewDTO.train_no,
        cK[cL].queryLeftNewDTO.yp_ex,
        '61',
        cK[cL].queryLeftNewDTO.controlled_train_flag,
        cK[cL]
      )
      cr(
        cP,
        cK[cL].queryLeftNewDTO.rw_num,
        'RW_',
        cK[cL].queryLeftNewDTO.train_no,
        cK[cL].queryLeftNewDTO.yp_ex,
        '41',
        cK[cL].queryLeftNewDTO.controlled_train_flag,
        cK[cL]
      )
      cr(
        cP,
        cK[cL].queryLeftNewDTO.srrb_num,
        'SRRB_',
        cK[cL].queryLeftNewDTO.train_no,
        cK[cL].queryLeftNewDTO.yp_ex,
        'F1',
        cK[cL].queryLeftNewDTO.controlled_train_flag,
        cK[cL]
      )
      cr(
        cP,
        cK[cL].queryLeftNewDTO.yw_num,
        'YW_',
        cK[cL].queryLeftNewDTO.train_no,
        cK[cL].queryLeftNewDTO.yp_ex,
        '31',
        cK[cL].queryLeftNewDTO.controlled_train_flag,
        cK[cL]
      )
      cr(
        cP,
        cK[cL].queryLeftNewDTO.rz_num,
        'RZ_',
        cK[cL].queryLeftNewDTO.train_no,
        cK[cL].queryLeftNewDTO.yp_ex,
        '21',
        cK[cL].queryLeftNewDTO.controlled_train_flag,
        cK[cL]
      )
      cr(
        cP,
        cK[cL].queryLeftNewDTO.yz_num,
        'YZ_',
        cK[cL].queryLeftNewDTO.train_no,
        cK[cL].queryLeftNewDTO.yp_ex,
        '11',
        cK[cL].queryLeftNewDTO.controlled_train_flag,
        cK[cL]
      )
      cr(
        cP,
        cK[cL].queryLeftNewDTO.wz_num,
        'WZ_',
        cK[cL].queryLeftNewDTO.train_no,
        cK[cL].queryLeftNewDTO.yp_ex,
        'W1',
        cK[cL].queryLeftNewDTO.controlled_train_flag,
        cK[cL]
      )
      cr(
        cP,
        cK[cL].queryLeftNewDTO.qt_num,
        'QT_',
        cK[cL].queryLeftNewDTO.train_no,
        cK[cL].queryLeftNewDTO.yp_ex,
        '',
        cK[cL].queryLeftNewDTO.controlled_train_flag,
        cK[cL]
      )
      if (cK[cL].queryLeftNewDTO.canWebBuy == 'Y') {
        cP.push(
          ' <td align="center" width="80" class="no-br"><a href="javascript:" class="btn72" onclick="checkG1234(\''
        )
        cP.push(cK[cL].secretStr)
        cP.push("','")
        cP.push(cK[cL].queryLeftNewDTO.start_time)
        cP.push("','")
        cP.push(cK[cL].queryLeftNewDTO.train_no)
        cP.push("','")
        cP.push(cK[cL].queryLeftNewDTO.from_station_telecode)
        cP.push("','")
        cP.push(cK[cL].queryLeftNewDTO.to_station_telecode)
        cP.push('\')">')
        cP.push(buttonText())
        if (cK[cL].queryLeftNewDTO.exchange_train_flag == 1) {
          cP.push("<i class='ico-dh'></i>")
        }
        cP.push('</a>')
        cP.push('</td>')
      } else {
        cP.push('<td align="center" width="80" class="no-br">')
        cP.push(cK[cL].buttonTextInfo)
        cP.push('</td>')
      }
      cP.push('</tr>')
      cP.push(
        '<tr datatran="' +
          cK[cL].queryLeftNewDTO.station_train_code +
          '" id="price_'
      )
      cP.push(cK[cL].queryLeftNewDTO.train_no)
      cP.push('" style="display:none;"></tr>')
    }
    cP.push('</tbody>')
    $('#queryLeftTable').replaceWith(cP.join(''))
    if (cM) {
      for (var cL = 0; cL < cK.length; cL++) {
        var cN = cK[cL]
        if (c(cN.queryLeftNewDTO.station_train_code)) {
        }
      }
    }
  }
  function cy (cL) {
    if (cL && cL.length > 0) {
      var cP = []
      var cK = []
      for (var cM = 0, cN = cL.length; cM < cN; cM++) {
        var cO = cL[cM]
        if (c(cO.queryLeftNewDTO.station_train_code)) {
          cP.push(cO)
        } else {
          cK.push(cO)
        }
      }
      cL = cP.concat(cK)
    }
    return cL
  }
  function aT (cK) {
    if (cK && cK.length > 0) {
      for (var cL = cK.length - 1; cL >= 0; cL--) {
        if (
          cK[cL].queryLeftNewDTO.exchange_train_flag == 0 ||
          cK[cL].queryLeftNewDTO.canWebBuy != 'Y'
        ) {
          cK.splice(cL, 1)
        }
      }
    }
    return cK
  }
  function a6 (cK) {
    if (cK && cK.length > 0) {
      var cQ = []
      var cL = []
      for (var cM = 0, cS = cK.length; cM < cS; cM++) {
        var cO = cK[cM]
        var cP = cO.queryLeftNewDTO.yp_ex.split('')
        var cR = false
        for (var cN = 0; cN < cP.length; cN++) {
          if (cN % 2 == 1 && cP[cN] == 1) {
            cR = true
            break
          }
        }
        if (cR) {
          cQ.push(cO)
        } else {
          cL.push(cO)
        }
      }
      cK = cQ.concat(cL)
    }
    return cK
  }
  function c (cM) {
    if (DW_TRAINS && DW_TRAINS.length) {
      for (var cK = 0, cL = DW_TRAINS.length; cK < cL; cK++) {
        if (cM == DW_TRAINS[cK]) {
          return true
        }
      }
    } else {
      return false
    }
    return false
  }
  function ch (cK) {
    if (cK && cK.length > 0) {
      if (DW_TRAINS && DW_TRAINS.length) {
        for (var cN = 0, cP = cK.length; cN < cP; cN++) {
          var cO = cK[cN].queryLeftNewDTO.station_train_code
          for (var cL = 0, cM = DW_TRAINS.length; cL < cM; cL++) {
            if (cO == DW_TRAINS[cL]) {
              return true
            }
          }
        }
      }
    }
    return false
  }
  function an (cQ, cK) {
    var cR, cO, cN
    var cM
    cN = cQ['leftTicketDTO.train_date']
    if (
      hainan_limit_start_traindate &&
      G(cN) >= G(hainan_limit_start_traindate)
    ) {
      if (hainan_limit_from_telcode && hainan_limit_to_telcode) {
        for (var cL = 0, cP = cK.length; cL < cP; cL++) {
          cR = cK[cL].queryLeftNewDTO.from_station_telecode
          cO = cK[cL].queryLeftNewDTO.to_station_telecode
          cM = cK[cL].buttonTextInfo
          if (
            hainan_limit_from_telcode.indexOf(cR) > -1 &&
            hainan_limit_to_telcode.indexOf(cO) > -1 &&
            cM.indexOf('起售') > -1
          ) {
            return true
          }
        }
      }
    }
    return false
  }
  function bZ (cP) {
    var cL = new Date()
    cL.setHours(cL.getHours() + 3)
    var cN = cL.getTime()
    var cO = new Date(cP.replace(/-/g, '/')).getTime()
    if (cO <= cN) {
      return false
    }
    var cM = cP.substring(0, 10).replace(/-/g, '')
    var cK = other_buy_date.split('&')[1].replace(/-/g, '')
    if (cM > cK) {
      return false
    }
    return true
  }
  function ap (cL) {
    var cM = ''
    var cK = new Date()
    cK.setDate(cK.getDate() + cL)
    cM += cK.getFullYear() + '-'
    cM += ah(cK.getMonth() + 1) + '-'
    cM += ah(cK.getDate())
    return cM
  }
  function ah (cK) {
    var cL = cK + ''
    if (cL.length < 2) {
      cL = '0' + cL
    }
    return cL
  }
  function cr (cT, c4, c1, cX, c2, cV, cR, cU) {
    var cM = cU.queryLeftNewDTO
    var cP =
      $('#train_date').val() +
      '#' +
      cM.from_station_telecode +
      '#' +
      cM.to_station_telecode +
      '#' +
      cM.train_no +
      '#' +
      c1 +
      '#' +
      cM.from_station_no +
      '#' +
      cM.from_station_name +
      '#' +
      cM.to_station_no +
      '#' +
      cM.to_station_name +
      '#' +
      cU.secretStr +
      '#' +
      cM.station_train_code +
      '#'
    var cL = $('#train_date').val() + '#' + cM.train_no + '#' + c1 + '#'
    var cW = ''
    var cY = bZ($('#train_date').val() + ' ' + cM.start_time)
    if ($('#train_date').val() == ap(0)) {
      cY = false
    }
    var cN = new Date().getHours()
    if (cN >= _alowHBHour) {
      if ($('#train_date').val() == ap(1)) {
        cY = false
      }
      if ($('#train_date').val() == ap(2)) {
        var cO = cM.start_time
        var cS = cO.substring(0, 2) + cO.substring(3, 5)
        if (cS < hbbeginTime) {
          cY = false
        }
      }
    }
    if ($('#train_date').val() == ap(1)) {
      var cO = cM.start_time
      var cS = cO.substring(0, 2) + cO.substring(3, 5)
      if (cS < hbbeginTime) {
        cY = false
      }
    }
    if (!cU.secretStr || cU.secretStr == 'null') {
      cY = false
    }
    if (tour_flag == 'fc' || tour_flag == 'gc') {
      cY = false
    }
    if (!'1' == cM.houbu_train_flag) {
      cY = false
    }
    if (c4 == '无' && c1 != 'WZ_' && c1 != 'QT_' && cY) {
      c4 = '候补'
      cW = 'color: #f80;'
    }
    c2 = c2.replace('A', '6')
    var c3 = c2 ? c2.indexOf(cV) : -1
    var c0 = false
    if (c3 > -1 && c3 % 2 == 0) {
      c0 = true
    }
    if (cV == '') {
      c0 = false
      var cK = c2.split('')
      for (var cZ = 0; cZ < cK.length; cZ++) {
        if (
          cZ % 2 == 0 &&
          cK[cZ] != '9' &&
          cK[cZ] != 'P' &&
          cK[cZ] != 'M' &&
          cK[cZ] != 'O' &&
          cK[cZ] != '6' &&
          cK[cZ] != '4' &&
          cK[cZ] != 'F' &&
          cK[cZ] != '3' &&
          cK[cZ] != '2' &&
          cK[cZ] != '1' &&
          cK[cZ] != 'W'
        ) {
          if (cK[cZ + 1] == '1') {
            c0 = true
            break
          }
        }
      }
    }
    if (cR == '1' || cR == '2') {
      cT.push(' <td width="46" align="center" style="cursor: pointer;"  id="')
      cT.push(c1)
      cT.push(cX)
      cT.push('">')
      cT.push(c4)
      cT.push('</td>')
    } else {
      if (c4 == '有') {
        if (c1 == 'SWZ_' || c1 == 'TZ_') {
          cT.push(
            '<td hbdata="' +
              cL +
              '" hbid="' +
              cP +
              '" width="46" align="center" class="yes" onclick="showTicketPrice(this)"　style="cursor: pointer;" id="'
          )
          cT.push(c1)
          cT.push(cX)
          cT.push('">')
          if (c0) {
            cT.push(
              '<div class="sale" title="本席别票价打折">' +
                c4 +
                '<span class="i-mark">折</span></div>'
            )
          } else {
            cT.push(c4)
          }
          cT.push('</td>')
        } else {
          if (c1 == 'ZY_' || c1 == 'ZE_') {
            cT.push(
              '<td hbdata="' +
                cL +
                '" hbid="' +
                cP +
                '" width="46" align="center" class="yes" style="cursor: pointer;" onclick="showTicketPrice(this)" id="'
            )
            cT.push(c1)
            cT.push(cX)
            cT.push('">')
            if (c0) {
              cT.push(
                '<div class="sale" title="本席别票价打折">' +
                  c4 +
                  '<span class="i-mark">折</span></div>'
              )
            } else {
              cT.push(c4)
            }
            cT.push('</td>')
          } else {
            cT.push(
              '<td hbdata="' +
                cL +
                '" hbid="' +
                cP +
                '" width="46" align="center" style="cursor: pointer;" class="yes" onclick="showTicketPrice(this)" id="'
            )
            cT.push(c1)
            cT.push(cX)
            cT.push('">')
            if (c0) {
              cT.push(
                '<div class="sale" title="本席别票价打折">' +
                  c4 +
                  '<span class="i-mark">折</span></div>'
              )
            } else {
              cT.push(c4)
            }
            cT.push('</td>')
          }
        }
      } else {
        if (c4 == '无' || isNum(c4) >= 0) {
          var cQ = ' class="t-num" '
          if (c4 == '无' || isNum(c4) == 0) {
            cQ = ''
          }
          if (c1 == 'SWZ_' || c1 == 'TZ_' || c1 == 'ZY_' || c1 == 'ZE_') {
            cT.push(
              '<td hbdata="' +
                cL +
                '"  hbid="' +
                cP +
                '" width="46" align="center" style="cursor: pointer;' +
                cW +
                '" ' +
                cQ +
                ' onclick="showTicketPrice(this)" id="'
            )
            cT.push(c1)
            cT.push(cX)
            cT.push('">')
            cT.push('<div>')
            if (c0) {
              cT.push(
                '<div class="sale" title="本席别票价打折">' +
                  c4 +
                  '<span class="i-mark">折</span></div>'
              )
            } else {
              cT.push(c4)
            }
            cT.push('</td>')
          } else {
            cT.push(
              '<td hbdata="' +
                cL +
                '" hbid="' +
                cP +
                '" width="46" align="center" style="cursor: pointer;' +
                cW +
                '" ' +
                cQ +
                ' onclick="showTicketPrice(this)" id="'
            )
            cT.push(c1)
            cT.push(cX)
            cT.push('">')
            if (c0) {
              cT.push(
                '<div class="sale" title="本席别票价打折">' +
                  c4 +
                  '<span class="i-mark">折</span></div>'
              )
            } else {
              cT.push(c4)
            }
            cT.push('</td>')
          }
        } else {
          cT.push(
            ' <td hbdata="' +
              cL +
              '" hbid="' +
              cP +
              '" width="46" align="center" style="cursor: pointer;' +
              cW +
              '" ' +
              cQ +
              ' onclick="showTicketPrice(this)"  id="'
          )
          cT.push(c1)
          cT.push(cX)
          cT.push('">')
          cT.push(c4)
          cT.push('</td>')
        }
      }
    }
  }
  function l (cL, cK) {
    ishaveCheckId = false
    for (i = 0; i < cL.length; i++) {
      if (cL[i][0] == cK) {
        cL[i][1] = $('#'.concat($('#'.concat(cK)).attr('for'))).is(':checked')
        ishaveCheckId = true
      }
    }
    if (!ishaveCheckId) {
      cL[cL.length] = [cK, true]
    }
  }
  function b8 () {
    f(bW)
    f(bH)
    f(S)
  }
  function f (cK) {
    for (i = 0; i < cK.length; i++) {
      if (cK[i][1]) {
        $('#'.concat(cK[i][0]).concat('_check')).attr('checked', true)
      }
    }
  }
  function G (cL) {
    var cK = new Date()
    var cM = cL.split('-')
    cK.setFullYear(
      parseInt(cM[0]),
      parseInt(cM[1] - 1, 10),
      parseInt(cM[2], 10)
    )
    if (cM.length >= 6) {
      cK.setHours(cM[3], cM[4], cM[5])
    }
    return cK
  }
  Date.prototype.format = function (cL) {
    var cM = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      S: this.getMilliseconds()
    }
    if (/(y+)/.test(cL)) {
      cL = cL.replace(
        RegExp.$1,
        (this.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var cK in cM) {
      if (new RegExp('(' + cK + ')').test(cL)) {
        cL = cL.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? cM[cK]
            : ('00' + cM[cK]).substr(('' + cM[cK]).length)
        )
      }
    }
    return cL
  }
  function aW (cM, cL) {
    var cK = new Date(Date.parse(cM.replace(/-/g, '/')))
    cK.setDate(cK.getDate() + cL)
    return W(cK)
  }
  function W (cL) {
    var cM = cL.getFullYear()
    var cO = cL.getMonth() + 1
    var cN = cL.getDate()
    var cK = cM + '-' + cO + '-' + cN
    return cK
  }
  function bX () {
    var cM = $('#train_date').val()
    var cL = $('#back_train_date').val()
    var cK = false
    if ($('#wf').is(':checked')) {
      if (G(cM) <= G(cL)) {
        cK = true
      }
    } else {
      return true
    }
    return cK
  }
  function cA () {
    var cN = $.jc_getFromStation()
    if (cN) {
      var cM = cN.split(',')
      if (cM && cM.length == 2) {
        $('#fromStationText').val(cM[0])
        $('#fromStation').val(cM[1])
      }
    }
    var cL = $.jc_getToStation()
    if (cL) {
      var cM = cL.split(',')
      if (cM && cM.length == 2) {
        $('#toStationText').val(cM[0])
        $('#toStation').val(cM[1])
      }
    }
    var cO = []
    cO = stu_buy_date.split('&')
    var cK = $.jc_getFromDate()
    if (cK) {
      if (cK >= cO[0] && cK <= cO[1]) {
        $('#train_date').val(cK)
      }
    }
    var cP = $.jc_getWfOrDc()
    if (cP && cP == 'wf') {
      $('#wf').click()
      var cQ = $.jc_getToDate()
      if (cQ) {
        if (cQ >= cO[0] && cQ <= cO[1]) {
          $('#back_train_date').val(cQ)
        }
      }
    } else {
      $('#dc').click()
    }
  }
  function bh () {
    $('#train_stop')
      .on('mouseover', function (cK) {
        if (checkHover(cK, this)) {
          cl = 1
        }
      })
      .on('mouseleave', function () {
        cl = 0
        $('#train_stop').hide()
        $('#train_table_').html('')
      })
  }
  function g () {
    fromStation = from_station
    fromStationName = from_station_name
    toStation = to_station
    toStationName = to_station_name
    trainDate = trainDate
    backTrainDate = backTrainDate
    bW = new Array()
    bH = new Array()
    S = new Array()
  }
  function w () {
    if ($('#sf1').is(':checked')) {
      isOther = true
      if (other_control < dataNumber) {
        for (var cK = other_control + 1; cK <= dataNumber; cK++) {
          $('#date-list>li:nth-child(' + cK + ')').hide()
        }
      } else {
        for (var cK = 1; cK <= dataNumber; cK++) {
          $('#date-list>li:nth-child(' + cK + ')').show()
        }
      }
    } else {
      isOther = false
      if (stu_control < dataNumber) {
        for (var cK = stu_control + 1; cK <= dataNumber; cK++) {
          $('#date-list>li:nth-child(' + cK + ')').hide()
        }
      } else {
        for (var cK = 1; cK <= dataNumber; cK++) {
          $('#date-list>li:nth-child(' + cK + ')').show()
        }
      }
    }
  }
  function p () {
    $('#fromStation').val(fromStation)
    $('#fromStationText').val(fromStationName)
    $('#toStation').val(toStation)
    $('#toStationText').val(toStationName)
    $('#train_date').val(trainDate)
    if (isInMaintenanceHours) {
      if (!isSuperLogin) {
        $('#autoSubmit').prop('checked', false)
        $('#autoSubmit').attr('disabled', true)
        $('#autoSubmit')
          .siblings('label')
          .css('color', '#999')
        $('#autoSubmitTxt').attr('title', '系统维护时间下不允许自动提交')
        $('#partSubmit').prop('checked', false)
        $('#partSubmit').attr('disabled', true)
        $('#partSubmit')
          .siblings('label')
          .css('color', '#999')
        $('#partSubmitTxt').attr('title', '系统维护时间下不允许自动提交')
        $('#auto_query').prop('checked', false)
        $('#auto_query').attr('disabled', true)
        $('#auto_query')
          .siblings('label')
          .css('color', '#999')
        $('#autoQueryTxt').attr('title', '系统维护时间下不允许自动查询')
      }
    }
    if (backTrainDate != null && backTrainDate != '') {
      $('#back_train_date').val(backTrainDate)
    }
    if ($('#fromStationText').val() == '') {
      $('#fromStationText').val('简拼/全拼/汉字')
    }
    if ($('#toStationText').val() == '') {
      $('#toStationText').val('简拼/全拼/汉字')
    }
    if (page_show_flag == null) {
      cA()
      aH()
    } else {
      if (page_show_flag == 'index') {
        bF()
      } else {
        if (page_show_flag == 'preStep') {
          cu()
        } else {
          if (page_show_flag == 'fcInit') {
            z()
            $('#autoSubmit').attr('disabled', true)
            $('#autoSubmit')
              .siblings('label')
              .css('color', '#999')
            $('#partSubmit').attr('disabled', true)
            $('#partSubmit')
              .siblings('label')
              .css('color', '#999')
          } else {
            if (page_show_flag == 'gcInit') {
              bI()
              $('#autoSubmit').attr('disabled', true)
              $('#autoSubmit')
                .siblings('label')
                .css('color', '#999')
              $('#partSubmit').attr('disabled', true)
              $('#partSubmit')
                .siblings('label')
                .css('color', '#999')
            }
          }
        }
      }
    }
  }
  function bF () {
    if (tour_flag == 'wf') {
      $('#wf').click()
    } else {
      if (tour_flag == 'dc') {
        $('#dc').click()
      }
    }
    if (purposeCodeFromIndex == '0X00') {
      $('#sf2').click()
    } else {
      if (purposeCodeFromIndex == 'ADULT') {
        $('#sf1').click()
      }
    }
    var cK = []
    $('#date_range>ul>li').each(function () {
      var cL = $(this)
        .children('span:first-child')
        .html()
      cK.push(cL)
    })
    $('#query_ticket').click()
  }
  function aH () {
    var cN = decodeURI(window.location.href)
    value = cN.split('?')[1]
    if (value != '' && value != undefined && value != 'undefined') {
      var cO = initParams(value)
      if (cO.linktypeid) {
        if (cO.linktypeid == 'dc') {
          $('#dc').click()
        } else {
          $('#wf').click()
          var cL = $('#train_date').val()
          var cM = $('#back_train_date').val()
          if (!cM | (G(cL) > G(cM))) {
            $('#back_train_date').val(cL)
          }
        }
      }
      if (cO.fromStationText) {
        $('#fromStationText').val(cO.fromStationText)
      }
      if (cO.fromStation) {
        $('#fromStation').val(cO.fromStation)
      }
      if (cO.toStationText) {
        $('#toStationText').val(cO.toStationText)
      }
      if (cO.toStation) {
        $('#toStation').val(cO.toStation)
      }
      if (cO.train_date) {
        $('#train_date').val(cO.train_date)
      }
      if (cO.back_train_date) {
        $('#back_train_date').val(cO.back_train_date)
      }
      if (cO.is_student && cO.is_student == 'Y') {
        $('#sf2').click()
      } else {
        $('#sf1').click()
      }
      if (cO.is_GDC && cO.is_GDC == 'Y') {
        $("#sear-sel-bd input[name='cc_type']")[0].click()
        $("#sear-sel-bd input[name='cc_type']")[1].click()
      }
      if (cO.auto_query && cO.auto_query == 'Y') {
        var cK = []
        $('#date_range>ul>li').each(function () {
          var cP = $(this)
            .children('span:first-child')
            .html()
          cK.push(cP)
        })
        $('#query_ticket').click()
      }
    }
  }
  function cu () {
    $('#fromStationText')
      .removeClass()
      .addClass('inp_selected')
    $('#toStationText')
      .removeClass()
      .addClass('inp_selected')
    if (train_tour_flag == 'dc') {
      aC(trainDate)
      $('#dc').click()
    }
    if (train_tour_flag == 'wc') {
      aC(trainDate)
      $('#wf').click()
    }
    if (train_tour_flag == 'fc') {
      aC(backTrainDate)
      $('#wf').click()
      $('#wf').attr('disabled', 'true')
      $('#dc').attr('disabled', 'true')
      $('#change_station')
        .removeClass()
        .addClass('i-change i-change2')
      $('#change_station').attr('style', '')
      $('#fromStationText').attr(
        'title',
        '返程时不得变更出发地或不能变更到达地'
      )
      $('#toStationText').attr('title', '返程时不得变更出发地或不能变更到达地')
      $('#toStationText')
        .unbind('focus')
        .unbind('click')
        .attr('readonly', 'true')
      $('#fromStationText')
        .unbind('focus')
        .unbind('click')
        .attr('readonly', 'true')
      $('#dfc>ul>li:nth-child(2)')
        .children('label:first')
        .removeClass()
        .addClass('color999')
      $('#dfc>ul>li:nth-child(1)')
        .children('label:first')
        .removeClass()
        .addClass('color999')
      $('#place_area>ul>li:nth-child(1)').addClass('no-change')
      $('#place_area>ul>li:nth-child(3)').addClass('no-change')
      $('#place_area>ul>li:nth-child(4)').addClass('no-change')
      $('#fromStationText')
        .removeClass()
        .addClass('inp-txt')
      $('#toStationText')
        .removeClass()
        .addClass('inp-txt')
      $('#change_station').unbind()
      $('#train_date').val(trainDate)
      $('#train_date').attr('readonly', 'true')
      $('#train_date')
        .removeClass()
        .addClass('inp-txt')
      $('#train_date').unbind('click')
      $('#date_icon_1').unbind('click')
      $('#date_area>ul>li:nth-child(1)>span>label').addClass('color999')
      $('#back_train_date').val(backTrainDate)
      $('#back_train_date').removeAttr('disabled')
      $('#date_area>ul>li:nth-child(2)>span>label').removeClass('color999')
      $('#back_train_date')
        .removeClass()
        .addClass('inp_selected')
      $('#autoSubmit').attr('disabled', true)
      $('#autoSubmit')
        .siblings('label')
        .css('color', '#999')
      $('#partSubmit').attr('disabled', true)
      $('#partSubmit')
        .siblings('label')
        .css('color', '#999')
    }
    if (train_tour_flag == 'gc') {
      aC(trainDate)
      bI()
      $('#autoSubmit').attr('disabled', true)
      $('#autoSubmit')
        .siblings('label')
        .css('color', '#999')
      $('#partSubmit').attr('disabled', true)
      $('#partSubmit')
        .siblings('label')
        .css('color', '#999')
    }
  }
  function aC (cM) {
    for (var cK = 1; cK <= 20; cK++) {
      var cL = $('#date_range>ul>li:nth-child(' + cK + ')')
        .children('span:first-child')
        .text()
      cL = '2013-' + cL
      if (cM == cL) {
        $('#date_range>ul>li').removeClass('sel')
        $('#date_range>ul>li').removeAttr('alt')
        $('#date_range>ul>li:nth-child(' + cK + ')').addClass('sel')
        $('#date_range>ul>li:nth-child(' + cK + ')').attr('alt', 'show')
        $('#date_range>ul>li:nth-child(20)').addClass('end')
        $('#date_range>ul>li:nth-child(' + cK + ')')
          .children('span:first-child')
          .removeClass()
        $('#date_range>ul>li:nth-child(' + cK + ')')
          .children('span:last-child')
          .removeClass()
        $('#date_range>ul>li:nth-child(' + cK + ')')
          .children('span:first-child')
          .addClass('hide')
        $('#date_range>ul>li:nth-child(1)')
          .children()
          .addClass('first')
        ce = $('#date_range>ul>li:nth-child(' + cK + ')')
          .children('span:first-child')
          .text()
        break
      }
    }
  }
  function bI () {
    $('#fromStationText').attr('title', '改签时不得变更出发地或不能变更到达地')
    $('#dc').click()
    $('#wf').attr('disabled', 'true')
    $('#dc').attr('disabled', 'true')
    $('#place_area>ul>li:nth-child(1)').addClass('no-change')
    $('#place_area>ul>li:nth-child(3)').addClass('no-change')
    $('#place_area>ul>li:nth-child(5)').addClass('no-change')
    $('#dfc>ul>li:nth-child(1)')
      .children('label:first')
      .removeClass()
      .addClass('color999')
    $('#dfc>ul>li:nth-child(2)')
      .children('label:first')
      .removeClass()
      .addClass('color999')
    $('#fromStationText')
      .unbind('focus')
      .unbind('click')
      .attr('readonly', 'true')
    if (canChangeToStation != 'Y') {
      $('#toStationText')
        .unbind('focus')
        .unbind('click')
        .attr('readonly', 'true')
      $('#toStationText')
        .removeClass()
        .addClass('inp-txt')
      $('#toStationText_label').addClass('color999')
    }
    $('#fromStationText')
      .removeClass()
      .addClass('inp-txt')
    $('#fromStationText_label').addClass('color999')
    $('#change_station').unbind()
    $('#change_station')
      .removeClass()
      .addClass('i-change i-change2')
    $('#change_station').attr('style', '')
  }
  function z () {
    $('#fromStationText').attr(
      'title',
      '订返程票时不得变更出发地或不能变更到达地'
    )
    $('#toStationText').attr(
      'title',
      '订返程票时不得变更出发地或不能变更到达地'
    )
    aC(backTrainDate)
    $('#wf').click()
    $('#dc').attr('disabled', 'true')
    $('#wf').attr('disabled', 'true')
    $('#place_area>ul>li:nth-child(1)').addClass('no-change')
    $('#place_area>ul>li:nth-child(3)').addClass('no-change')
    $('#place_area>ul>li:nth-child(4)').addClass('no-change')
    $('#dfc>ul>li:nth-child(1)')
      .children('label:first')
      .removeClass()
      .addClass('color999')
    $('#dfc>ul>li:nth-child(2)')
      .children('label:first')
      .removeClass()
      .addClass('color999')
    $('#train_date').attr('readonly', 'true')
    $('#train_date').addClass('color999')
    $('#train_date').attr('disabled', true)
    $('#train_date').unbind('click')
    $('#date_icon_1').unbind('click')
    $('#date_area>ul>li:nth-child(1)>span>label').addClass('color999')
    $('#back_train_date').removeAttr('disabled')
    $('#date_area>ul>li:nth-child(2)>span>label').removeClass('color999')
    $('#train_date')
      .removeClass()
      .addClass('inp-txt')
    $('#back_train_date')
      .removeClass()
      .addClass('inp_selected')
    $('#fromStationText')
      .unbind('focus')
      .unbind('unfocus')
      .unbind('click')
      .attr('readonly', 'true')
    $('#toStationText')
      .unbind('focus')
      .unbind('unfocus')
      .unbind('click')
      .attr('readonly', 'true')
    $('#fromStationText')
      .removeClass()
      .addClass('inp-txt')
    $('#toStationText')
      .removeClass()
      .addClass('inp-txt')
    $('#change_station').unbind()
    $('#change_station')
      .removeClass()
      .addClass('i-change i-change2')
    $('#change_station').attr('style', '')
  }
  function af () {
    initPageTitle(1)
    $('#train_type_btn_all').css('cursor', 'pointer')
    $('#start_time_btn_all').css('cursor', 'pointer')
    $('#arrive_time_btn_all').css('cursor', 'pointer')
    $('#seat_type_btn_all').css('cursor', 'pointer')
    $('#from_station_name_all').css('cursor', 'pointer')
    $('#to_station_name_all').css('cursor', 'pointer')
    $('#change_station').css('cursor', 'pointer')
    $('#show_more').css('cursor', 'pointer')
    $('#date_normal').css('cursor', 'pointer')
    $('#lookup').css('cursor', 'pointer')
    $('#s_time').css('cursor', 'pointer')
    $('#r_time').css('cursor', 'pointer')
    $('#l_s').css('cursor', 'pointer')
    $('#other_span_starttime').css('cursor', 'pointer')
    $('#other_span_endtime').css('cursor', 'pointer')
    $('#other_span_lishi').css('cursor', 'pointer')
    $('#date_range>ul>li')
      .children('span:nth-child(1)')
      .css('cursor', 'pointer')
    $('#cc_seat_type_btn_all>ul>li').hide()
    $('#train_date')
      .removeClass()
      .addClass('inp_selected')
    if (
      ($('#fromStationText').val() != '' &&
        $('#fromStationText').val() != '简拼/全拼/汉字') ||
      ($('#toStationText').val() != '' &&
        $('#toStationText').val() != '简拼/全拼/汉字')
    ) {
      $('#fromStationText')
        .removeClass()
        .addClass('inp_selected')
      $('#toStationText')
        .removeClass()
        .addClass('inp_selected')
    }
    var cK = stu_start_train_date.split('&')
    var cL = stu_end_tain_date.split('&')
  }
  function cx (cL) {
    var cK = ('00' + (cL.getMonth() + 1)).slice(-2) + '-'
    cK += ('00' + cL.getDate()).slice(-2) + ' 00:00:00'
    return cK
  }
  function C () {
    $('#dc').click(function () {
      $('#wf').attr('checked', false)
      $('#dc').attr('checked', 'true')
      $('#place_area>ul>li:nth-child(5)').addClass('no-change')
      $('#back_train_date')
        .removeClass()
        .addClass('inp-txt')
      $('#back_train_date').attr('disabled', true)
    })
    $('#wf').click(function () {
      $('#dc').attr('checked', false)
      $('#wf').attr('checked', true)
      $('#back_train_date').removeAttr('disabled')
      $('#place_area>ul>li:nth-child(5)').removeClass()
      $('#train_date')
        .removeClass()
        .addClass('inp_selected')
      $('#back_train_date')
        .removeClass()
        .addClass('inp_selected')
      isbigdate = bX()
      if (!isbigdate) {
        train = $('#train_date').val()
        $('#back_train_date').val(train)
      }
      var cK = $('#train_date').val()
    })
  }
  function bl () {
    $('#avail_ticket').click(function () {
      $('#filterTic').attr('checked', false)
      aU()
    })
    $('#avail_jf').click(function () {
      aU()
    })
    $('#train_type_btn_all').click(function () {
      var cK = true
      $("#sear-sel-bd input[name='cc_type']").each(function () {
        if (!this.checked) {
          cK = false
        }
      })
      if (cK) {
        $("#sear-sel-bd input[name='cc_type']").each(function () {
          this.checked = false
        })
        $('#train_type_btn_all')
          .removeClass()
          .addClass('btn-all')
      } else {
        $("#sear-sel-bd input[name='cc_type']").each(function () {
          if (!this.checked) {
            this.checked = true
          }
        })
        $('#train_type_btn_all')
          .removeClass()
          .addClass('btn-all')
      }
      aU()
    })
    $('#start_time_btn_all').click(function () {
      var cK = true
      $("#sear-sel-bd input[name='cc_start_time']").each(function () {
        if (!this.checked) {
          cK = false
        }
      })
      if (cK) {
        $("#sear-sel-bd input[name='cc_start_time']").each(function () {
          this.checked = false
        })
        $('#start_time_btn_all')
          .removeClass()
          .addClass('btn-all')
      } else {
        $("#sear-sel-bd input[name='cc_start_time']").each(function () {
          if (!this.checked) {
            this.checked = true
          }
        })
        $('#start_time_btn_all')
          .removeClass()
          .addClass('btn-all')
      }
      aU()
    })
    $('#from_station_name_all').click(function () {
      var cK = true
      $("#sear-sel-bd input[name='cc_from_station']").each(function () {
        if (!this.checked) {
          cK = false
        }
      })
      if (cK) {
        $("#sear-sel-bd input[name='cc_from_station']").each(function () {
          this.checked = false
          l(bW, 'cc_from_station_' + $(this).val())
        })
        $('#from_station_name_all')
          .removeClass()
          .addClass('btn-all')
      } else {
        $("#sear-sel-bd input[name='cc_from_station']").each(function () {
          if (!this.checked) {
            this.checked = true
            l(bW, 'cc_from_station_' + $(this).val())
          }
        })
        $('#from_station_name_all')
          .removeClass()
          .addClass('btn-all')
      }
      aU()
    })
    $('#to_station_name_all').click(function () {
      var cK = true
      $("#sear-sel-bd input[name='cc_to_station']").each(function () {
        if (!this.checked) {
          cK = false
        }
      })
      if (cK) {
        $("#sear-sel-bd input[name='cc_to_station']").each(function () {
          this.checked = false
          l(bH, 'cc_to_station_' + $(this).val())
        })
        $('#to_station_name_all')
          .removeClass()
          .addClass('btn-all')
      } else {
        $("#sear-sel-bd input[name='cc_to_station']").each(function () {
          if (!this.checked) {
            this.checked = true
            l(bH, 'cc_to_station_' + $(this).val())
          }
        })
        $('#to_station_name_all')
          .removeClass()
          .addClass('btn-all')
      }
      aU()
    })
  }
  function cf () {
    $('#change_station').bind('click', function () {
      var cO = $('#fromStationText').val()
      var cQ = $('#fromStation').val()
      var cP = $('#toStationText').val()
      var cK = $('#toStation').val()
      if (
        cO != '' &&
        cO != '简拼/全拼/汉字' &&
        (cP != '' && cP != '简拼/全拼/汉字')
      ) {
        $('#fromStationText').val(cP)
        $('#toStationText').val(cO)
        $('#fromStation').val(cK)
        $('#toStation').val(cQ)
        $('#fromStationText')
          .removeClass()
          .addClass('inp_selected')
        $('#toStationText')
          .removeClass()
          .addClass('inp_selected')
      } else {
        bt.checkForm()
        bt.hideErrors()
        var cN = bt.errorList
        for (var cM = 0; cM < cN.length; cM++) {
          var cL = cN[cM]
          $(cL.element)
            .next()
            .addClass('error')
        }
        bt.checkForm()
      }
      b7()
    })
  }
  function b7 () {
    if ($('#fromStationText').val() == '简拼/全拼/汉字') {
      $.stationFor12306.from_to_station_class_gray($('#fromStationText'))
    } else {
      $.stationFor12306.from_to_station_class_plain($('#fromStationText'))
    }
    if ($('#toStationText').val() == '简拼/全拼/汉字') {
      $.stationFor12306.from_to_station_class_gray($('#toStationText'))
    } else {
      $.stationFor12306.from_to_station_class_plain($('#toStationText'))
    }
  }
  function bU () {
    $('#show_more').click(function () {
      var cK = $(this)
      if (cK.hasClass('down')) {
        aE()
        cK.attr('class', 'up')
      } else {
        document.getElementById('sear-sel-bd').style.height = '17px'
        cK.attr('class', 'down')
        cK.parent().css('top', '58px')
      }
    })
  }
  function o () {
    if ($('#show_more').hasClass('up')) {
      aE()
    }
  }
  function aE () {
    var cM = '17px'
    var cO = 179
    var cN = 28
    var cK = $("#sear-sel-bd input[name='cc_from_station']").length
    var cP = $("#sear-sel-bd input[name='cc_to_station']").length
    var cL = $("#sear-sel-bd input[name='cc_seat_type']").length
    if (cK > 7 && cK <= 14) {
      cM = cO + cN + 'px'
    } else {
      if (cP > 7 && cK <= 14) {
        cM = cO + cN * 2 + 'px'
      } else {
        if (cL > 7) {
          cM = cO + cN + 'px'
        } else {
          cM = cO + 'px'
        }
      }
    }
    document.getElementById('sear-sel-bd').style.height = cM
    $('#show_more')
      .parent()
      .css('top', '220px')
  }
  function e () {
    if (
      train_tour_flag == 'fc' ||
      (train_tour_flag == 'gc' && canChangeToStation != 'Y')
    ) {
      return
    }
    var cK = ['fromStation', 'toStation']
    if (canChangeToStation == 'Y') {
      cK = ['toStation']
    }
    $.stationFor12306.init(cK, {
      _init_input: '简拼/全拼/汉字',
      _top_4_initInput: '简拼/全拼/汉字或↑↓',
      _unselected_class: 'inpt_unselected',
      _selected_class: 'inp_selected',
      confirmCallBack: function (cL, cM) {
        $('#yxtrain_close').click()
        cL.removeClass('error')
        if (cL.attr('id') == 'fromStationText') {
          if (ccSelected.length > 0) {
            if (cL.val() != cb) {
              $('#prior_train span:gt(1)').remove()
              $('#inp-train').css('color', '#999')
              $('#inp-train').val('  请输入')
              ccSelected = []
              $('#prior_seat span:gt(0)').remove()
              $('#seat-list input').prop('checked', false)
              xbChecked = []
            }
          }
          cb = cL.val()
        }
        if (cL.attr('id') == 'toStationText') {
          if (ccSelected.length > 0) {
            if (cL.val() != ct) {
              $('#prior_train span:gt(1)').remove()
              $('#inp-train').css('color', '#999')
              $('#inp-train').val('  请输入')
              ccSelected = []
              $('#prior_seat span:gt(0)').remove()
              $('#seat-list input').prop('checked', false)
              xbChecked = []
            }
          }
          ct = cL.val()
        }
      }
    })
    $('#fromStation_icon_image').css('cursor', 'pointer')
    $('#fromStationText_label').click(function () {
      $('#fromStationText').focus()
    })
    $('#fromStation_icon_image').click(function () {
      $('#fromStationText').focus()
    })
    $('#toStation_icon_image').css('cursor', 'pointer')
    $('#toStationText_label').click(function () {
      $('#toStationText').focus()
    })
    $('#toStation_icon_image').click(function () {
      $('#toStationText').focus()
    })
  }
  function cH () {
    bt = $('#queryLeftForm').validate({
      rules: {
        'leftTicketDTO.from_station': { required: true },
        'leftTicketDTO.to_station': { required: true },
        'leftTicketDTO.train_date': { required: true },
        back_train_date: { required: true }
      },
      ignore: '',
      onsubmit: false,
      onfocusout: function () {},
      onkeyup: function () {},
      onclick: function () {},
      highlight: function () {},
      unhighlight: function () {}
    })
    b6()
  }
  function b (cK) {
    dhtmlx.alert({
      title: '提示',
      ok: messages['button.ok'],
      text: cK,
      type: 'alert-error',
      callback: function () {}
    })
  }
  function b4 (cL, cR) {
    var cK = bt.checkForm()
    bt.hideErrors()
    if (cK) {
      var cQ = ''
      if (!bX()) {
        cQ = '返回日期不得早于出发日期'
        b(cQ)
        return false
      }
      var cO = []
      if (cR) {
        cO = stu_buy_date.split('&')
      } else {
        cO = other_buy_date.split('&')
      }
      if (cO.length > 0) {
        if (cL < cO[0] || cL > cO[1]) {
          cQ = '您选择的日期不在预售期范围内！'
          b(cQ)
          return false
        }
      }
    } else {
      var cP = bt.errorList
      for (var cN = 0; cN < cP.length; cN++) {
        var cM = cP[cN]
        $(cM.element)
          .next()
          .addClass('error')
      }
      return false
    }
    cz()
    return true
  }
  function cz () {
    $.jc_setFromStation($('#fromStationText').val(), $('#fromStation').val())
    $.jc_setToStation($('#toStationText').val(), $('#toStation').val())
    $.jc_setFromDate($('#train_date').val())
    $.jc_setToDate($('#back_train_date').val())
    $.jc_setWfOrDc($('#wf').is(':checked') ? 'wf' : 'dc')
  }
  function b6 () {
    $('#query_ticket')
      .unbind('click')
      .click(function (cO) {
        $('#sel-buyer').hide()
        $('#sel-seat').hide()
        $('#sel-date').hide()
        if ($('#yxtrain_loading').is(':hidden')) {
          $('#yxtraindiv').hide()
        }
        if ($jpopup.isShow()) {
          $jpopup.quickHide()
        }
        if (myStopStation) {
          myStopStation.close()
        }
        if ($('#auto_query').is(':checked')) {
          var cN = $.trim($('#inp-train').val()).toUpperCase()
          if (cN.length != 0 && cN != '请输入') {
            dhtmlx.alert({
              title: '输入车次',
              ok: '确定',
              text:
                '您输入的优先车次未添加，请点击车次输入框后的添加按钮，或者取消车次输入框中的内容！',
              type: 'alert-error',
              callback: function () {
                ccInputSelected = true
                $('#inp-train').select()
              }
            })
            return
          }
        }
        ar()
        if (document.getElementById('autoSubmit').checked) {
          if (passengerChecked.length == 0) {
            dhtmlx.alert({
              title: '选择乘车人',
              ok: '确定',
              text: '请选择乘车人',
              type: 'alert-error',
              callback: function () {}
            })
            return
          }
        }
        B = cE()
        var cP = B == '0X00'
        var cL =
          train_tour_flag == 'fc'
            ? $.trim($('#back_train_date').val())
            : $.trim($('#train_date').val())
        var cK = b4(cL, cP)
        if (!cK) {
          return
        }
        var cM = {
          'leftTicketDTO.train_date': cL,
          'leftTicketDTO.from_station': $('#fromStation').val(),
          'leftTicketDTO.to_station': $('#toStation').val(),
          purpose_codes: B
        }
        bb()
        au(cM)
      })
  }
  var bx = function () {
    if ($('#filterTic').is(':checked')) {
      $('#avail_ticket').attr('checked', false)
      aY()
      if (b5.length != 0 && b5.length < bq.length) {
        $('#trainum').html(b5.length)
        aM(b5)
      }
    } else {
      ca = bu()
      if (b5.length != 0 && b5.length < ca.length) {
        $('#trainum').html(ca.length)
        aM(ca)
      }
    }
  }
  function co (cN, cP) {
    var cM = []
    for (var cL = 0; cL < cN.length; cL++) {
      var cQ = []
      var cK = cN[cL].split('|')
      cQ.secretStr = cK[0]
      cQ.buttonTextInfo = cK[1]
      var cO = []
      cO.train_no = cK[2]
      cO.station_train_code = cK[3]
      cO.start_station_telecode = cK[4]
      cO.end_station_telecode = cK[5]
      cO.from_station_telecode = cK[6]
      cO.to_station_telecode = cK[7]
      cO.start_time = cK[8]
      cO.arrive_time = cK[9]
      cO.lishi = cK[10]
      cO.canWebBuy = cK[11]
      cO.yp_info = cK[12]
      cO.start_train_date = cK[13]
      cO.train_seat_feature = cK[14]
      cO.location_code = cK[15]
      cO.from_station_no = cK[16]
      cO.to_station_no = cK[17]
      cO.is_support_card = cK[18]
      cO.controlled_train_flag = cK[19]
      cO.gg_num = cK[20] ? cK[20] : '--'
      cO.gr_num = cK[21] ? cK[21] : '--'
      cO.qt_num = cK[22] ? cK[22] : '--'
      cO.rw_num = cK[23] ? cK[23] : '--'
      cO.rz_num = cK[24] ? cK[24] : '--'
      cO.tz_num = cK[25] ? cK[25] : '--'
      cO.wz_num = cK[26] ? cK[26] : '--'
      cO.yb_num = cK[27] ? cK[27] : '--'
      cO.yw_num = cK[28] ? cK[28] : '--'
      cO.yz_num = cK[29] ? cK[29] : '--'
      cO.ze_num = cK[30] ? cK[30] : '--'
      cO.zy_num = cK[31] ? cK[31] : '--'
      cO.swz_num = cK[32] ? cK[32] : '--'
      cO.srrb_num = cK[33] ? cK[33] : '--'
      cO.yp_ex = cK[34]
      cO.seat_types = cK[35]
      cO.exchange_train_flag = cK[36]
      cO.houbu_train_flag = cK[37]
      cO.from_station_name = cP[cK[6]]
      cO.to_station_name = cP[cK[7]]
      cQ.queryLeftNewDTO = cO
      cM.push(cQ)
    }
    return cM
  }
  function au (cK) {
    if (!$.isCanChangeHBDate()) {
      return
    }
    $('#cc_seat_type_btn_all>ul>li').css('display', 'none')
    if ($('#auto_query').is(':checked')) {
      $('#query_ticket').html('停止查询')
      $('#auto_query').attr('disabled', 'true')
      $('#autoSubmit').attr('disabled', 'true')
      $('#partSubmit').attr('disabled', 'true')
      $('#query_ticket').unbind('click')
      $('#query_ticket').bind('click', function () {
        $('#filterTic').hide()
        clearInterval(bg)
        if (countDown) {
          clearInterval(countDown)
        }
        $('#filterTicDiv').html('')
        $('#query_ticket').unbind('click')
        $('#query_ticket').html('查询')
        if ($('#dc').is(':checked') && train_tour_flag != 'gc') {
          $('#autoSubmit').removeAttr('disabled')
          $('#partSubmit').removeAttr('disabled')
        }
        $('#auto_query').removeAttr('disabled')
        b6()
      })
    } else {
      if (countDown) {
        clearInterval(countDown)
      }
      $('#filterTicDiv').html('')
      b9()
    }
    if ($('#yxtrain_loading').is(':hidden')) {
      var cL = dhtmlx.modalbox({
        targSrc:
          '<div><img src="' +
          ctx +
          'resources/images/loading.gif"></img></div>',
        callback: function () {}
      })
    }
    if ($jpopup.isShow()) {
      $jpopup.quickHide()
    }
    $('#queryLeftTable').html('')
    $('#sear-result').hide()
    if (bg) {
      clearInterval(bg)
    }
    cj(cK)
    $.ajax({
      type: 'get',
      isTakeParam: false,
      beforeSend: function (cM) {
        cM.setRequestHeader('If-Modified-Since', '0')
        cM.setRequestHeader('Cache-Control', 'no-cache')
      },
      url: ctx + CLeftTicketUrl,
      data: cK,
      timeout: 10000,
      error: function (cM, cO, cN) {
        dhtmlx.modalbox.hide(cL)
        if (cO == 'timeout' || cO == 'No Transport' || cO == 'abort') {
          if ($('#auto_query').is(':checked')) {
            au(cK)
          }
        }
      },
      success: function (cO) {
        dhtmlx.modalbox.hide(cL)
        if (cO.status) {
          if (
            cO.data == null ||
            cO.data.length == 0 ||
            (cO.data.result && cO.data.result.length == 0)
          ) {
            $('#sear-sel').hide()
            $('#sear-result').hide()
            $('#t-list').hide()
            $('#_lc_link_foot').hide()
            $('#no_filter_ticket_fromstation').html($('#fromStationText').val())
            $('#no_filter_ticket_tostation').html($('#toStationText').val())
            $('#no_filter_ticket_6').hide()
            $('#no_filter_ticket_2').show()
            $('.content').css('min-height', '344px')
            $('#yxtraindiv').hide()
            trainListForIE = []
            return
          }
          if (cO.data.flag == 1) {
            cO.data = co(cO.data.result, cO.data.map)
          }
          trainListForIE = []
          for (var cP = 0; cP < cO.data.length; cP++) {
            trainListForIE.push(
              cO.data[cP].queryLeftNewDTO.station_train_code +
                '(' +
                cO.data[cP].queryLeftNewDTO.start_time +
                '--' +
                cO.data[cP].queryLeftNewDTO.arrive_time +
                ')'
            )
          }
          if (train_tour_flag == 'gc' && isDwTicketResign == 'Y') {
            var cW = []
            for (var cP = 0, cX = cO.data.length; cP < cX; cP++) {
              var cN = cO.data[cP].queryLeftNewDTO
              var cS = cN.station_train_code
              cS = cS.substring(0, 1)
              if (cS == 'G' || cS == 'D') {
                cW.push(cO.data[cP])
              }
            }
            cO.data = cW
          }
          if ($('#DW_SHOW_STR')[0]) {
            $('#DW_SHOW_STR').remove()
          }
          if ($('#hainan_limit_msg')[0]) {
            $('#hainan_limit_msg').remove()
          }
          $('#sear-result>p')
            .eq(1)
            .remove()
          $('#sear-sel').show()
          $('#sear-result').show()
          $('#t-list').show()
          $('#no_filter_ticket_2').hide()
          $('#no_filter_ticket_6').hide()
          $('#no_filter_ticket').hide()
          var cM = ''
          var cR = ''
          if (train_tour_flag != null && train_tour_flag == 'fc') {
            var cV = '<strong>'
              .concat($('#fromStationText').val())
              .concat(' --> ')
              .concat($('#toStationText').val())
              .concat('（')
              .concat(aP($('#back_train_date').val()))
              .concat('）</strong>共计<strong id="trainum">')
              .concat(cO.data.length)
              .concat('</strong>个车次')
            if (ch(cO.data)) {
              cM =
                "<p class='ad-gt' id='DW_SHOW_STR' data='1'>高铁动卧 夕发朝至 风雨无阻 省时省钱</p>"
            } else {
              if (hainan_limit_msg && an(cK, cO.data)) {
                cR =
                  "<p class='ad-gt' id='hainan_limit_msg'  style='font-size:13px;background:#fff6f6 left center no-repeat;font-weight:bold'>" +
                  hainan_limit_msg +
                  '</p>'
              }
            }
            if ($('#auto_query').is(':checked')) {
              var cT = ''
              for (var cQ = 0; cQ < 25; cQ++) {
                cT = cT + '&nbsp;'
              }
              cV = cV.concat(
                cT +
                  "<input type='checkbox' class='check' id='filterTic' /><div id='filterTicDiv' style='display:inline'><strong><label for='filterTic' style='cursor: pointer;'>仅查看刷到车次</label></strong></div>"
              )
            }
            $('#sear-result>p').html(cV)
            if ($('#auto_query').is(':checked')) {
              $('#filterTic').bind('click', bx)
            }
          } else {
            var cV = '<strong>'
              .concat($('#fromStationText').val())
              .concat(' --> ')
              .concat($('#toStationText').val())
              .concat('（')
              .concat(aP($('#train_date').val()))
              .concat('）</strong>共计<strong id="trainum">')
              .concat(cO.data.length)
              .concat('</strong>个车次')
            if (ch(cO.data)) {
              cM =
                "<p class='ad-gt' id='DW_SHOW_STR' data='1'>高铁动卧 夕发朝至 风雨无阻 省时省钱</p>"
            } else {
              if (hainan_limit_msg && an(cK, cO.data)) {
                cR =
                  "<p class='ad-gt' id='hainan_limit_msg'  style='font-size:13px;background:#fff6f6 left center no-repeat;font-weight:bold'>" +
                  hainan_limit_msg +
                  '</p>'
              }
            }
            if ($('#auto_query').is(':checked')) {
              var cT = ''
              for (var cQ = 0; cQ < 25; cQ++) {
                cT = cT + '&nbsp;'
              }
              cV = cV.concat(
                cT +
                  "<input type='checkbox' class='check' id='filterTic' /><div id='filterTicDiv' style='display:inline'><strong><label for='filterTic' style='cursor: pointer;'>仅查看刷到车次</label></strong></div>"
              )
            }
            $('#sear-result>p').html(cV)
            if ($('#auto_query').is(':checked')) {
              $('#filterTic').bind('click', bx)
            }
          }
          if (!$('#DW_SHOW_STR')[0]) {
            $('#sear-result>p').after(cM)
          }
          if (cR) {
            $('#sear-result>p').after(cR)
          }
          if (
            !$('#lc_msg')[0] &&
            cR == '' &&
            cM == '' &&
            $('#fromStationText').attr('readonly') != 'readonly' &&
            !$('#autoSubmit').is(':checked')
          ) {
            var cU =
              '<p id="lc_msg">您可使用<a style="color:#07f" href="' +
              ctx +
              'lcQuery/init">接续换乘</a>功能，查询途中换乘一次的部分列车余票情况。</p>'
            $('#sear-result>p').after(cU)
          }
          if (dwTranTimeStr) {
            clearInterval(dwTranTimeStr)
          }
          if ($('#DW_SHOW_STR')[0]) {
            dwTranTimeStr = window.setInterval(function () {
              if ($('#DW_SHOW_STR').attr('data') == '1') {
                $('#DW_SHOW_STR')
                  .attr('data', '2')
                  .html('夜行两千公里 最低不足千元')
              } else {
                $('#DW_SHOW_STR')
                  .attr('data', '1')
                  .html('高铁动卧 夕发朝至 风雨无阻 省时省钱')
              }
            }, 1300)
          }
          if ($('#hainan_limit_msg')[0]) {
            hainan_tip = null
            hainan_tip = new Marquee({
              ID: 'hainan_limit_msg',
              Direction: 'left',
              Step: 1,
              Width: 0,
              Height: 0,
              Timer: 30,
              DelayTime: 0,
              WaitTime: 0,
              ScrollStep: 0
            })
          }
          bq = cO.data
          bE(bq)
          o()
          b0(bq)
          b8()
          Q()
          if (!$('#yxtrain_loading').is(':hidden')) {
            $.showYxTrainData()
          }
          $('#_lc_link_foot').show()
          t()
          yxTrainChange =
            $('#fromStationText').val() +
            '#' +
            $('#toStationText').val() +
            '#' +
            $('#train_date').val()
        } else {
          if (cO && cO.c_url) {
            CLeftTicketUrl = cO.c_url
            au(cK)
          }
        }
      },
      error: function (cM, cO, cN) {
        dhtmlx.modalbox.hide(cL)
        if (cM.status == 403) {
          if ($('#query_ticket').html() == '停止查询') {
            if (queryLeftTicket_times <= queryLeftTicket_count) {
              $('#query_ticket')
                .trigger('click')
                .trigger('click')
              queryLeftTicket_times++
            } else {
              queryLeftTicket_times = 0
            }
            return
          }
          if (
            cM.responseText == '0' ||
            cM.responseText == '1' ||
            cM.responseText == '2' ||
            cM.responseText == '3' ||
            cM.responseText == '4'
          ) {
            cG('查询失败！（' + cM.responseText + '）')
          } else {
            cG('查询失败，请稍后再试！')
          }
        } else {
          if ((cO = 'timeout')) {
            cG('查询超时，请稍后再试！')
          }
        }
      }
    })
    bf()
  }
  function cG (cK) {
    $('#sear-sel').hide()
    $('#sear-result').hide()
    $('#t-list').hide()
    $('#_lc_link_foot').hide()
    $('#no_filter_ticket_2').hide()
    $('#no_filter_ticket_6')
      .find('p')
      .html(cK)
    $('#no_filter_ticket_6').show()
    $('.content').css('min-height', '344px')
    $('#yxtraindiv').hide()
    trainListForIE = []
  }
  function aj () {
    dataNumber = other_control > stu_control ? other_control : stu_control
    for (var cK = endShow + 1; cK <= dataNumber; cK++) {
      $('#date_range>ul>li:nth-child(' + cK + ')').hide()
    }
    var cL
    $('#date_range>ul>li').each(function (cP) {
      var cN = fullDateArr[cP]
      var cM = new Date(Date.parse(cN.replace(/-/g, '/')))
      var cO =
        $('#date_range>ul>li:nth-child(' + (cP + 1) + ')>span[class=hide]')
          .text()
          .substring(0, 5) + bB(cM)
      $('#date_range>ul>li:nth-child(' + (cP + 1) + ')>span[class=hide]').text(
        cO
      )
      cL = $(this)
        .children('span:first-child')
        .html()
      change_dates_arr.push(cL)
    })
    if (index_train_date == null) {
      $('#date_range>ul>li:nth-child(1)').addClass('sel')
      $('#date_range>ul>li:nth-child(1)').attr('alt', 'show')
      $('#date_range>ul>li:nth-child(20)').addClass('end')
      $('#date_range>ul>li:nth-child(1)')
        .children('span:first-child')
        .removeClass()
      $('#date_range>ul>li:nth-child(1)')
        .children('span:last-child')
        .removeClass()
      $('#date_range>ul>li:nth-child(1)')
        .children()
        .addClass('first')
      $('#date_range>ul>li:nth-child(1)')
        .children('span:first-child')
        .addClass('hide')
      ce = $('#date_range>ul>li:nth-child(1)')
        .children('span:first-child')
        .text()
    }
    by()
  }
  function bB (cL) {
    var cO = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    var cN = 0
    for (var cM = 0; cM < cO.length; cM++) {
      if (cL.toString().indexOf(cO[cM]) > -1) {
        cN = cM + 1
        break
      }
    }
    var cK = ''
    switch (cN) {
      case 1:
        cK = ' 周一'
        break
      case 2:
        cK = ' 周二'
        break
      case 3:
        cK = ' 周三'
        break
      case 4:
        cK = ' 周四'
        break
      case 5:
        cK = ' 周五'
        break
      case 6:
        cK = ' 周六'
        break
      case 7:
        cK = ' 周日'
        break
    }
    return cK
  }
  function bC () {
    $('#date_range>ul>li').unbind('mouseover')
    $('#date_range>ul>li').unbind('mouseout')
    $('#date_range').unbind('mouseleave')
    $('#date_range>ul>li').unbind('click')
  }
  function by () {
    $('#date_range>ul>li').bind('mouseover', function () {
      $('#date_range>ul>li').removeClass('sel')
      $('#date_range>ul>li').removeAttr('alt')
      $(this).addClass('sel')
      $(this).attr('alt', 'show')
      $('#date_range>ul>li:nth-child(' + endShow + ')').addClass('end')
      $(this)
        .children('span:first-child')
        .removeClass()
      $(this)
        .children('span:last-child')
        .removeClass()
      $('#date_range>ul>li:nth-child(' + firstShow + ')')
        .children()
        .addClass('first')
      $(this)
        .children('span:first-child')
        .addClass('hide')
    })
    $('#date_range>ul>li').bind('mouseout', function () {
      $('#date_range>ul>li').each(function (cK) {
        $(this)
          .children('span:first')
          .removeClass()
        $('#date_range>ul>li:nth-child(' + firstShow + ')')
          .children()
          .addClass('first')
        $(this)
          .children('span:last')
          .addClass('hide')
      })
    })
    $('#date_range').bind('mouseleave', function () {
      for (var cK = firstShow; cK <= endShow; cK++) {
        var cL = $('#date_range>ul>li:nth-child(' + cK + ')')
          .children('span:first-child')
          .text()
        if (ce == cL) {
          $('#date_range>ul>li').removeClass('sel')
          $('#date_range>ul>li').removeAttr('alt')
          $('#date_range>ul>li:nth-child(' + cK + ')').addClass('sel')
          $('#date_range>ul>li:nth-child(' + cK + ')').attr('alt', 'show')
          $('#date_range>ul>li:nth-child(' + endShow + ')').addClass('end')
          $('#date_range>ul>li:nth-child(' + cK + ')')
            .children('span:first-child')
            .removeClass()
          $('#date_range>ul>li:nth-child(' + cK + ')')
            .children('span:last-child')
            .removeClass()
          $('#date_range>ul>li:nth-child(' + firstShow + ')')
            .children()
            .addClass('first')
          $('#date_range>ul>li:nth-child(' + cK + ')')
            .children('span:first-child')
            .addClass('hide')
          break
        }
      }
    })
    $('#date_range>ul>li').bind('click', function () {
      var cL = new Date()
      var cO = ''
      if (train_tour_flag != null && train_tour_flag == 'fc') {
        nowDate = $('#back_train_date').val()
        var cQ = $(this)
          .children('span:first-child')
          .text()
        var cK = Number(cQ.substring(0, 2))
        var cS = new Date().getMonth()
        var cN = cL.getFullYear()
        if (cS > cK) {
          cN = cN + 1
        }
        $('#back_train_date').val(cN + '-' + cQ)
        backTrainDate = cN + '-' + cQ
        cO = backTrainDate
        if (!bX()) {
          $('#back_train_date').val(nowDate)
          b('返程日期不得小于出发日期.')
          return
        }
        D('back_train_date')
      } else {
        nowDate = $('#train_date').val()
        var cQ = $(this)
          .children('span:first-child')
          .text()
        var cK = Number(cQ.substring(0, 2))
        var cS = new Date().getMonth()
        var cN = cL.getFullYear()
        if (cS > cK) {
          cN = cN + 1
        }
        $('#train_date').val(cN + '-' + cQ)
        trainDate = cN + '-' + cQ
        cO = trainDate
        if (!bX()) {
          $('#back_train_date').val($('#train_date').val())
        }
        D('train_date')
      }
      B = cE()
      var cP = B == '0X00'
      var cR = b4(cO, cP)
      if (!cR) {
        return
      }
      $('#date_range>ul>li').removeClass('sel')
      $('#date_range>ul>li').removeAttr('alt')
      $(this).addClass('sel')
      $(this).attr('alt', 'show')
      $('#date_range>ul>li:nth-child(20)').addClass('end')
      $(this)
        .children('span:first-child')
        .removeClass()
      $(this)
        .children('span:last-child')
        .removeClass()
      $('#date_range>ul>li:nth-child(1)')
        .children()
        .addClass('first')
      $(this)
        .children('span:first-child')
        .addClass('hide')
      ce = $(this)
        .children('span:first-child')
        .text()
      var cM = {
        'leftTicketDTO.train_date': cO,
        'leftTicketDTO.from_station': $('#fromStation').val(),
        'leftTicketDTO.to_station': $('#toStation').val(),
        purpose_codes: cE()
      }
      au(cM)
    })
    $('#sf1').click(function () {
      isOther = true
      bb()
      if (other_control < dataNumber) {
        for (var cK = other_control + 1; cK <= dataNumber; cK++) {
          $('#date-list>li:nth-child(' + cK + ')').hide()
        }
      } else {
        for (var cK = 1; cK <= dataNumber; cK++) {
          $('#date-list>li:nth-child(' + cK + ')').show()
        }
      }
    })
    $('#sf2').click(function () {
      isOther = false
      bb()
      if (stu_control < dataNumber) {
        for (var cK = stu_control; cK <= dataNumber; cK++) {
          $('#date-list>li:nth-child(' + cK + ')').hide()
        }
      } else {
        for (var cK = 1; cK <= dataNumber; cK++) {
          $('#date-list>li:nth-child(' + cK + ')').show()
        }
      }
    })
  }
  function bO () {
    $("#sear-sel-bd input[name='cc_type']").click(function () {
      var cK = $("input[name='cc_type']")
      var cL = $("input[name='cc_type']:checked")
      if ($(this).is(':checked')) {
        if (cK && cL && cL.length == cK.length) {
          $('#train_type_btn_all')
            .removeClass()
            .addClass('btn-all')
        } else {
          $('#train_type_btn_all')
            .removeClass()
            .addClass('btn-all btn-all-sel')
        }
      } else {
        if (cK && cL && cL.length == 0) {
          $('#train_type_btn_all')
            .removeClass()
            .addClass('btn-all')
        } else {
          $('#train_type_btn_all')
            .removeClass()
            .addClass('btn-all btn-all-sel')
        }
      }
      aU()
    })
    $("#sear-sel-bd input[name='cc_start_time']").click(function () {
      var cK = $("input[name='cc_start_time']")
      var cL = $("input[name='cc_start_time']:checked")
      if ($(this).is(':checked')) {
        if (cK && cL && cL.length == cK.length) {
          $('#start_time_btn_all')
            .removeClass()
            .addClass('btn-all')
        } else {
          $('#start_time_btn_all')
            .removeClass()
            .addClass('btn-all btn-all-sel')
        }
      } else {
        if (cK && cL && cL.length == 0) {
          $('#start_time_btn_all')
            .removeClass()
            .addClass('btn-all')
        } else {
          $('#start_time_btn_all')
            .removeClass()
            .addClass('btn-all btn-all-sel')
        }
      }
      aU()
    })
    $("#sear-sel-bd input[name='cc_arrive_time']").click(function () {
      var cK = $("input[name='cc_arrive_time']")
      var cL = $("input[name='cc_arrive_time']:checked")
      if ($(this).is(':checked')) {
        if (cK && cL && cL.length == cK.length) {
          $('#arrive_time_btn_all')
            .removeClass()
            .addClass('btn-all')
        } else {
          $('#arrive_time_btn_all')
            .removeClass()
            .addClass('btn-all btn-all-sel')
        }
      } else {
        if (cK && cL && cL.length == 0) {
          $('#arrive_time_btn_all')
            .removeClass()
            .addClass('btn-all')
        } else {
          $('#arrive_time_btn_all')
            .removeClass()
            .addClass('btn-all btn-all-sel')
        }
      }
      aU()
    })
    $('#cc_start_time').change(function () {
      aU()
    })
  }
  function X (cM, cL) {
    if (cL.length == 0) {
      return true
    }
    for (var cK = 0; cK < cL.length; cK++) {
      if (cM.queryLeftNewDTO.station_train_code.substring(0, 1) == cL[cK]) {
        return true
      }
      if (cL[cK] == 'QT') {
        if (
          cM.queryLeftNewDTO.station_train_code.substring(0, 1) != 'G' &&
          cM.queryLeftNewDTO.station_train_code.substring(0, 1) != 'D' &&
          cM.queryLeftNewDTO.station_train_code.substring(0, 1) != 'C' &&
          cM.queryLeftNewDTO.station_train_code.substring(0, 1) != 'T' &&
          cM.queryLeftNewDTO.station_train_code.substring(0, 1) != 'K' &&
          cM.queryLeftNewDTO.station_train_code.substring(0, 1) != 'Z'
        ) {
          return true
        }
      }
      if (cL[cK] == 'G') {
        if (
          cM.queryLeftNewDTO.station_train_code.substring(0, 1) == 'C' ||
          cM.queryLeftNewDTO.station_train_code.substring(0, 1) == 'G'
        ) {
          return true
        }
      }
    }
    return false
  }
  function aV (cN, cP) {
    if (cP.length == 0) {
      return true
    }
    for (var cK = 0; cK < cP.length; cK++) {
      var cO = cN.queryLeftNewDTO.start_time.replace(':', '')
      var cL = Number(cP[cK].substring(0, 4))
      var cM = Number(cP[cK].substring(4, 8))
      if (cO >= cL && cO <= cM) {
        return true
      }
    }
    return false
  }
  function a7 (cM, cK) {
    if (cK.length == 0) {
      return true
    }
    for (var cL = 0; cL < cK.length; cL++) {
      if (cK[cL] == 'SWZ') {
        if (
          cM.queryLeftNewDTO.swz_num != '--' &&
          cM.queryLeftNewDTO.swz_num != '无'
        ) {
          aO.push('SWZ')
          return true
        }
      }
      if (cK[cL] == 'TZ') {
        if (
          cM.queryLeftNewDTO.tz_num != '--' &&
          cM.queryLeftNewDTO.tz_num != '无'
        ) {
          aO.push('TZ')
          return true
        }
      }
      if (cK[cL] == 'ZY') {
        if (
          cM.queryLeftNewDTO.zy_num != '--' &&
          cM.queryLeftNewDTO.zy_num != '无'
        ) {
          aO.push('ZY')
          return true
        }
      }
      if (cK[cL] == 'ZE') {
        if (
          cM.queryLeftNewDTO.ze_num != '--' &&
          cM.queryLeftNewDTO.ze_num != '无'
        ) {
          aO.push('ZE')
          return true
        }
      }
      if (cK[cL] == 'GR') {
        if (
          cM.queryLeftNewDTO.gr_num != '--' &&
          cM.queryLeftNewDTO.gr_num != '无'
        ) {
          aO.push('GR')
          return true
        }
      }
      if (cK[cL] == 'RW') {
        if (
          cM.queryLeftNewDTO.rw_num != '--' &&
          cM.queryLeftNewDTO.rw_num != '无'
        ) {
          aO.push('RW')
          return true
        }
      }
      if (cK[cL] == 'YW') {
        if (
          cM.queryLeftNewDTO.yw_num != '--' &&
          cM.queryLeftNewDTO.yw_num != '无'
        ) {
          aO.push('YW')
          return true
        }
      }
      if (cK[cL] == 'RZ') {
        if (
          cM.queryLeftNewDTO.rz_num != '--' &&
          cM.queryLeftNewDTO.rz_num != '无'
        ) {
          aO.push('RZ')
          return true
        }
      }
      if (cK[cL] == 'YZ') {
        if (
          cM.queryLeftNewDTO.yz_num != '--' &&
          cM.queryLeftNewDTO.yz_num != '无'
        ) {
          aO.push('YZ')
          return true
        }
      }
      if (cK[cL] == 'SRRB') {
        if (
          cM.queryLeftNewDTO.srrb_num != '--' &&
          cM.queryLeftNewDTO.srrb_num != '无'
        ) {
          aO.push('SRRB')
          return true
        }
      }
      if (cK[cL] == 'YYRW') {
        if (
          cM.queryLeftNewDTO.yyrw_num != '--' &&
          cM.queryLeftNewDTO.yyrw_num != '无'
        ) {
          aO.push('YYRW')
          return true
        }
      }
      if (cK[cL] == 'WZ') {
        if (
          cM.queryLeftNewDTO.wz_num != '--' &&
          cM.queryLeftNewDTO.wz_num != '无'
        ) {
          aO.push('WZ')
          return true
        }
      }
    }
    return false
  }
  function bp (cL, cK) {
    if (cK.length == 0) {
      return true
    }
    for (var cM = 0; cM < cK.length; cM++) {
      if (cK[cM] == cL.queryLeftNewDTO.from_station_name) {
        return true
      }
    }
    return false
  }
  function ac (cK, cL) {
    if (cL.length == 0) {
      return true
    }
    for (var cM = 0; cM < cL.length; cM++) {
      if (cL[cM] == cK.queryLeftNewDTO.to_station_name) {
        return true
      }
    }
    return false
  }
  function A (cL, cK) {
    if (cK.length == 0) {
      return true
    }
    for (var cM = 0; cM < cK.length; cM++) {
      if (
        cK[cM].toLowerCase() ==
        cL.queryLeftNewDTO.station_train_code.toLowerCase()
      ) {
        return true
      }
    }
    return false
  }
  window._tpp_ = 'abcdefghIjkLm nopqrstuvwxiyz'
  function bu () {
    var cL = []
    var cR = []
    var cN = []
    var cP = []
    $("#sear-sel-bd input[name='cc_type']").each(function () {
      if (this.checked == true) {
        cL.push($(this).val())
      }
    })
    cR.push($('#cc_start_time option:selected').val())
    $("#sear-sel-bd input[name='cc_from_station']").each(function () {
      if (this.checked == true) {
        cN.push($(this).val())
      }
    })
    $("#sear-sel-bd input[name='cc_to_station']").each(function () {
      if (this.checked == true) {
        cP.push($(this).val())
      }
    })
    var cM = bq
    var cQ = []
    if (
      cL.length > 0 ||
      cR.length > 0 ||
      filteredTrainArriveTime.length > 0 ||
      cd.length > 0 ||
      cN.length > 0 ||
      cP.length > 0 ||
      aI.getComboText() != '' ||
      $('#avail_ticket')[0].checked
    ) {
      for (var cK = 0; cK < cM.length; cK++) {
        var cO = cM[cK]
        if (!X(cO, cL)) {
          continue
        }
        if (!aV(cO, cR)) {
          continue
        }
        if (!bp(cO, cN)) {
          continue
        }
        if (!ac(cO, cP)) {
          continue
        }
        if ($('#avail_ticket')[0].checked) {
          if (cO.queryLeftNewDTO.canWebBuy == 'Y') {
            cQ.push(cO)
          }
        } else {
          cQ.push(cO)
        }
      }
      cM = cQ
    }
    return cM
  }
  ;(function (cK) {
    cK._Z_ = cK._Z_ || {}
    cK._Z_['YLW'] = function () {
      var cL = ''
      pp = [25, 21, 7, 6, 14, 25, 9, 13, 4, 22, 15, 11, 13, 8]
      while (pp[0]) {
        cL += cK._tpp_.charAt(pp.pop())
      }
      return cL
    }
  })(window)
  function N (cK, cL) {
    if (cL == null || cL == '' || cK.length == 0 || cL.length > cK.length) {
      return false
    }
    if (cK.substr(0, cL.length) == cL) {
      return true
    } else {
      return false
    }
    return true
  }
  function bm (cK) {
    bw = ccSelected
    cd = xbChecked
    if (A(cK, bw) && a7(cK, cd)) {
      return true
    } else {
      return false
    }
  }
  function aY () {
    b5 = []
    ca = bu()
    ck = cc(ca)
    for (var cK = 0; cK < ck.length; cK++) {
      var cL = ck[cK]
      if (!bm(cL)) {
        continue
      }
      if (cL.queryLeftNewDTO.canWebBuy == 'Y') {
        b5.push(cL)
      }
    }
  }
  var bS
  function b1 () {
    if (ischeckAutoSubmitCode) {
      $('#randCode2').on('keyup', function (cK) {
        if ($('#randCode2').val().length == 4 && bS != $('#randCode2').val()) {
          $.ajax({
            url: ctx + 'passcodeNew/checkRandCodeAnsyn',
            type: 'post',
            data: { randCode: $('#randCode2').val(), rand: 'sjrand' },
            async: false,
            success: function (cM) {
              if (cM.data == 'N') {
                $('#randCode2')
                  .removeClass('inptxt w100')
                  .addClass('inptxt w100 error')
                $('#c_error2').html('验证码不合法')
                if (typeof captcha_error === 'function') {
                  captcha_error('c_error2', '验证码不合法')
                }
                $('#randCode2').val('')
                $('#c_error2').addClass('error')
                $('#i-ok2').css('display', 'none')
                $('#c_error2').css('margin-left', '15px')
              } else {
                bS = $('#randCode2').val()
                $('#back_edit').trigger('click')
                var cL = '99999GGGGG'
                var cO =
                  '##CCT##PPT##CPT##PXT##SBT##PBD##JOD##HPD##SHD##QTP##TSP##TJP##'
                var cN = '##CBP##DIP##JGK##ZEK##UUH##NKH##ESH##OHH##AOH##'
                if (isAsync == ticket_submit_order.request_flag.isAsync) {
                  if (
                    P.queryLeftNewDTO.train_no.indexOf(cL) > -1 &&
                    cO.indexOf(P.queryLeftNewDTO.from_station_telecode) > -1 &&
                    cN.indexOf(P.queryLeftNewDTO.to_station_telecode) > -1
                  ) {
                    dhtmlx.createWin({
                      winId: 'confirmG1234',
                      closeWinId: [
                        'close_conifrmdialog_G1234',
                        'cancel_dialog_G1234'
                      ],
                      okId: 'goto_integration_G1234',
                      okCallBack: function () {
                        r()
                      },
                      callback: function () {

                      }
                    })
                  } else {
                    r()
                  }
                } else {
                  if (
                    P.queryLeftNewDTO.train_no.indexOf(cL) > -1 &&
                    cO.indexOf(P.queryLeftNewDTO.from_station_telecode) > -1 &&
                    cN.indexOf(P.queryLeftNewDTO.to_station_telecode) > -1
                  ) {
                    dhtmlx.createWin({
                      winId: 'confirmG1234',
                      closeWinId: [
                        'close_conifrmdialog_G1234',
                        'cancel_dialog_G1234'
                      ],
                      okId: 'goto_integration_G1234',
                      okCallBack: function () {
                        cI()
                      },
                      callback: function () {

                      }
                    })
                  } else {
                    cI()
                  }
                }
                $('#randCode2')
                  .removeClass('inptxt w100 error')
                  .addClass('inptxt w100')
                $('#i-ok2').css('display', 'block')
                $('#c_error2').html('')
                $('#c_error2').removeClass('error')
              }
            }
          })
        } else {
          if ($('#randCode2').val().length != 4) {
            $('#randCode2')
              .removeClass('inptxt w100')
              .addClass('inptxt w100 error')
            $('#c_error2').html('请输入四位长度验证码')
            $('#c_error2').addClass('error')
            $('#i-ok2').css('display', 'none')
            $('#c_error2').css('margin-left', '15px')
          }
        }
        bS = $('#randCode2').val()
      })
    }
  }
  function aw (cK) {
    return a2.autoSubmit(b5, passengerChecked, xbChecked, ccSelected)
  }
  var a4 = false
  function Q () {
    $('#queryLeftTable').html('')
    $('#trainum').html('')
    aY()
    if ($('#auto_query').is(':checked')) {
      if (ck.length < 0) {
        $('#no_filter_ticket').show()
        $('#trainum').html('0')
        a4 = true
      } else {
        if (b5.length > 0) {
          $('#no_filter_ticket').hide()
          if (document.getElementById('autoSubmit').checked) {
            var cO = []
            for (var cU = 0; cU < passengerChecked.length; cU++) {
              var cN = false
              var cR = passengerChecked[cU]
              for (var cV = 0; cV < cO.length; cV++) {
                var cL = cO[cV]
                if (cR.passenger_type != 2) {
                  if (
                    cR.passenger_name == cL.passenger_name &&
                    cR.passenger_id_type_code == cL.passenger_id_type_code &&
                    cR.passenger_id_no == cL.passenger_id_no
                  ) {
                    if (cL.passenger_type != 2) {
                      cN = true
                      break
                    }
                  }
                }
              }
              if (!cN) {
                cO.push(cR)
              }
            }
            passengerChecked = cO
            var c0 = aw(true)
            if (c0[0] == 1 || c0[0] == 2) {
              a4 = true
              P = c0[1]
              var cT = cE()
              var cX = P.secretStr
              n(c0)
              var cW =
                checkusermdId != undefined
                  ? '&_json_att=' + encodeURIComponent(checkusermdId)
                  : ''
              var cK = ''
              if ($('#dc').is(':checked')) {
                cK = 'dc'
              } else {
                cK = 'wc'
              }
              if (typeof submitForm === 'undefined') {
                var c1 =
                  'secretStr=' +
                  cX +
                  '&train_date=' +
                  $('#train_date').val() +
                  '&tour_flag=' +
                  cK +
                  '&purpose_codes=' +
                  cT +
                  '&query_from_station_name=' +
                  $('#fromStationText').val() +
                  '&query_to_station_name=' +
                  $('#toStationText').val() +
                  '&' +
                  cW +
                  '&cancel_flag=2&bed_level_order_num=000000000000000000000000000000&passengerTicketStr=' +
                  getpassengerTicketsForAutoSubmit() +
                  '&oldPassengerStr=' +
                  getOldPassengersForAutoSubmit()
              } else {
                var cM = submitForm()
                var cS = cM.split(':::')
                var cZ = cS[0].split(',-,')[0]
                var cQ = cS[0].split(',-,')[1]
                var cY = cS[1].split(',-,')[0]
                var cP = cS[1].split(',-,')[1]
                var c1 =
                  escape(cZ) +
                  '=' +
                  escape(cQ) +
                  '&' +
                  cY +
                  '=' +
                  cP +
                  '&secretStr=' +
                  cX +
                  '&train_date=' +
                  $('#train_date').val() +
                  '&tour_flag=' +
                  cK +
                  '&purpose_codes=' +
                  cT +
                  '&query_from_station_name=' +
                  $('#fromStationText').val() +
                  '&query_to_station_name=' +
                  $('#toStationText').val() +
                  '&' +
                  cW +
                  '&cancel_flag=2&bed_level_order_num=000000000000000000000000000000&passengerTicketStr=' +
                  getpassengerTicketsForAutoSubmit() +
                  '&oldPassengerStr=' +
                  getOldPassengersForAutoSubmit()
              }
              $.ajax({
                type: 'post',
                url: ctx + 'confirmPassenger/autoSubmitOrderRequest',
                async: false,
                data: c1,
                success: function (c2) {
                  if (c2.status) {
                    if (!c2.data.submitStatus) {
                      if (c2.data.isRelogin) {
                        window.location.href =
                          ctx + 'view/index.html?random=' + new Date().getTime()
                      } else {
                        if (c2.data.isNoActive) {
                          al(c2.data.errMsg, true, '', true, 'warn')
                        } else {
                          if (c2.data.checkSeatNum) {
                            al(
                              '很抱歉，无法提交您的订单!',
                              true,
                              '原因： ' + c2.data.errMsg,
                              true,
                              'warn'
                            )
                          } else {
                            al(
                              '车票信息不合法!',
                              true,
                              '原因： ' + c2.data.errMsg,
                              true,
                              'warn'
                            )
                          }
                        }
                      }
                      return
                    }
                    intervalTime = c2.data.ifShowPassCodeTime
                    if (c2.data.ifShowPassCode == 'Y') {
                      b2(true)
                    } else {
                      b2(false)
                    }
                    canChooseSeats = c2.data.canChooseSeats
                    choose_Seats = c2.data.choose_Seats
                    canChooseBeds = c2.data.canChooseBeds
                    isCanChooseMid = c2.data.isCanChooseMid
                    if (c2.data.smokeStr != '' && c2.data.smokeStr.length > 0) {
                      $('#dialog_smoker_msg').html(c2.data.smokeStr)
                      dhtmlx.createWin({
                        winId: 'dialog_smoker',
                        closeWinId: [
                          'dialog_smoker_close',
                          'dialog_smoker_cancel'
                        ],
                        okId: 'dialog_smoker_ok',
                        okCallBack: function () {
                          m(c2, cT)
                        },
                        checkConfirm: function () {
                          return true
                        },
                        callback: function () {}
                      })
                    } else {
                      m(c2, cT)
                    }
                  }
                }
              })
            } else {
              a4 = false
              R()
            }
          } else {
            a4 = true
          }
        } else {
          a4 = false
          R()
        }
        $('#trainum').html(ck.length)
        aM(ck)
      }
    } else {
      if (ck.length < 0) {
        a4 = true
        $('#no_filter_ticket').show()
        $('#no_filter_ticket_msg_1').show()
        $('#no_filter_ticket_msg_2').hide()
        $('#trainum').html('0')
      } else {
        a4 = true
        $('#trainum').html(ck.length)
        aM(ck)
      }
    }
  }
  function m (cL, cM) {
    if (cL.data.isNeedPassCode == 'N') {
      $('#leftTicketOrderNote').hide()
      $('#qr_submit')
        .nextAll('a')
        .eq(0)
        .hide()
      ischeckAutoSubmitCode = false
    } else {
      $('#leftTicketOrderNote').show()
      $('#qr_submit')
        .nextAll('a')
        .eq(0)
        .show()
      ischeckAutoSubmitCode = true
    }
    if (
      cL.data &&
      undefined != cL.data.result &&
      typeof cL.data.result !== 'undefined'
    ) {
      var cN = cL.data.get608Msg
      if (undefined != cN && typeof cN !== 'undefined' && cN != '') {
        if (cL.data.name && cL.data.card && cL.data.tel) {
          $('#608_check_msg').html(cN)
          dhtmlx.createWin({
            winId: '608_check',
            closeWinId: ['608_check_close', '608_check_cancel'],
            okId: '608_check_ok',
            okCallBack: function () {
              $('#608_name').html(cL.data.name)
              $('#608_card').html(cL.data.card)
              $('#608_tel').html(cL.data.tel)
              $('#ticketInfo').html(cL.data.ticketInfo)
              dhtmlx.createWin({
                winId: '608_complain',
                closeWinId: ['608_complain_close', '608_complain_cancel'],
                okId: '608_complain_ok',
                okCallBack: function () {
                  var cO = dhtmlx.modalbox({
                    targSrc:
                      '<div><img src="' +
                      ctx +
                      'resources/images/loading.gif"></img></div>',
                    callback: function () {}
                  })
                  $.ajax({
                    url: ctx + 'confirmPassenger/report',
                    type: 'post',
                    async: false,
                    success: function (cP) {
                      dhtmlx.modalbox.hide(cO)
                      dhtmlx.alert({
                        title: '提示',
                        ok: messages['button.ok'],
                        text: cP.data == 'Y' ? '举报成功' : '举报失败',
                        type: 'alert-info'
                      })
                    },
                    error: function (cP, cR, cQ) {
                      dhtmlx.modalbox.hide(cO)
                    }
                  })
                },
                checkConfirm: function () {
                  return true
                }
              })
              $('#608_complain').css('top', '200px')
            },
            checkConfirm: function () {
              return true
            }
          })
          $('#608_check').css('top', '200px')
        } else {
          dhtmlx.alert({
            title: '警告',
            ok: '确定',
            text: cN,
            type: 'alert-error',
            callback: function () {
              var cO = cL.data.result
              location_code = cO.split('#')[0]
              md5Str = cO.split('#')[1]
              leftTicketStr = cO.split('#')[2]
              isAsync = cO.split('#')[3]
              bJ(cM, cL.data.isCheckOrderInfo, cL.data.doneHMD)
            }
          })
        }
      } else {
        var cK = cL.data.result
        location_code = cK.split('#')[0]
        md5Str = cK.split('#')[1]
        leftTicketStr = cK.split('#')[2]
        isAsync = cK.split('#')[3]
        bJ(cM, cL.data.isCheckOrderInfo, cL.data.doneHMD)
      }
    }
  }
  var T = 0
  var bg
  function R () {
    var cK
    if (rqChecked.length > 1) {
      if (T >= rqChecked.length) {
        T = 0
      }
      cK = rqChecked[T++]
    } else {
      if (train_tour_flag == 'fc') {
        cK = $.trim($('#back_train_date').val())
      } else {
        cK = $.trim($('#train_date').val())
      }
    }
    clearInterval(bg)
    bg = window.setInterval(function () {
      if (train_tour_flag == 'fc') {
        $('#back_train_date').val(cK)
      } else {
        $('#train_date').val(cK)
      }
      var cL = {
        'leftTicketDTO.train_date': cK,
        'leftTicketDTO.from_station': $('#fromStation').val(),
        'leftTicketDTO.to_station': $('#toStation').val(),
        purpose_codes: cE()
      }
      bb()
      au(cL)
    }, autoSearchTime)
  }
  function j () {
    if (ifAlertCode && !verifyRandCode($('#randCode_other')[0], true)) {
      return
    }
    var cK = bY()
    if (cK.length == 0 || tickets_info.length == cK.length / 2) {
      $('#content_autosubmitcheckticketinfo').hide()
      loadGrayBackground()
      if (isAsync == ticket_submit_order.request_flag.isAsync) {
        r()
      } else {
        cI()
      }
    } else {
      dhtmlx.alert({
        title: '警告',
        ok: '确定',
        text: '您还有未选座的乘客，请选座完成后再提交订单！',
        type: 'alert-error',
        callback: function () {}
      })
    }
  }
  function cg () {
    aG()
    cD(tickets_info)
    aa()
    cs()
    $('#i-ok2').hide()
    if (ifAlertCode) {
      refreshImg('passenger', 'randp', 'other')
    }
    $('#error_msgmypasscode2').hide()
    $('#content_autosubmitcheckticketinfo').show()
    box = dhtmlx.createWin({
      winId: 'autosubmitcheckticketinfo',
      closeWinId: ['back_edit'],
      callback: function () {
        clearTimeout(aS)
        jPlayer('stop')
      },
      okId: 'qr_submit',
      okCallBack: function () {
        jPlayer('stop')
        if (isAsync == ticket_submit_order.request_flag.isAsync) {
          r()
        } else {
          cI()
        }
      },
      checkConfirm: function () {
        if (!bD()) {
          return false
        }
        if (!ischeckAutoSubmitCode) {
          return true
        }
        if (ifAlertCode) {
          return verifyRandCode($('#randCode_other')[0], true)
        } else {
          if (isAsync == ticket_submit_order.request_flag.isAsync) {
            r()
          } else {
            cI()
          }
        }
      }
    })
    var cL = parseInt(intervalTime / timer_time)
    if (!ifAlertCode) {
      at(timer_time, cL)
    } else {
      var cK = $('#qr_submit1')
      cK.unbind('click')
      cK.removeClass('btn92s').addClass('btn92')
      aR(timer_time, cL)
    }
    if (tickets_info.length > 3 && canChooseSeats && canChooseSeats == 'Y') {
      $('#autosubmitcheckticketinfo').css('top', '70px')
    } else {
      $('#autosubmitcheckticketinfo').css('top', '100px')
    }
    $('#autosubmitcheckticketinfo').css('position', 'absolute')
    $('.dhx_modal_cover').css('background-color', '#EEEEEE')
    $('#randCode_other').focus()
  }
  var aS
  function at (cL, cK) {
    if (cL == 0) {
      clearTimeout(aS)
      j()
      return
    } else {
      cL--
    }
    aS = setTimeout(function () {
      at(cL, cK)
    }, cK)
  }
  var bK
  function aR (cM, cL) {
    if (cM == 0) {
      clearTimeout(bK)
      var cK = $('#qr_submit1')
      cK.unbind('click').bind('click', j)
      cK.removeClass('btn92').addClass('btn92s')
      return
    } else {
      cM--
    }
    bK = setTimeout(function () {
      aR(cM, cL)
    }, cL)
  }
  function aU () {
    if (bq.length == 0) {
      return
    }
    var cK = bu()
    var cL = cc(cK)
    $('#train_stop')
      .appendTo($('body'))
      .hide()
    $('#queryLeftTable').html('')
    $('#trainum').html('')
    if (cL.length > 0) {
      $('#no_filter_ticket').hide()
      $('#trainum').html(cL.length)
    } else {
      $('#no_filter_ticket').show()
      $('#no_filter_ticket_msg_1').show()
      $('#no_filter_ticket_msg_2').hide()
      $('#trainum').html('0')
      return
    }
    aM(cL)
  }
  function bP (cL) {
    var cK = cv.createWindow(cL + '_', 0, 0, 660, 100)
    cK.attachObject(cL)
    cK.clearIcon()
    cK.denyResize()
    cK.setModal(true)
    cK.center()
    cK.button('park').hide()
    cK.button('minmax1').hide()
    cK.hideHeader()
    return cK
  }
  function aG () {
    var cP = new Array()
    $('#autosubmit_check_ticket_tit').html('')
    var cN = $('#train_date').val()
    var cK = bB(new Date(Date.parse(cN.replace(/-/g, '/'))))
    var cL = P.queryLeftNewDTO.station_train_code
    var cU = null
    var cV = P.queryLeftNewDTO.from_station_name
    var cO = P.queryLeftNewDTO.to_station_name
    var cQ = P.queryLeftNewDTO.start_time
    var cT = P.queryLeftNewDTO.arrive_time
    var cS = function (cX, cZ, cW, c1, cY, c0, c3, c2) {
      this.date = cX
      this.week = cZ
      this.station_train_code = cW
      this.train_headers = c1
      this.from_station = cY
      this.start_time = c0
      this.to_station = c3
      this.arrive_time = c2
    }
    var cM = new cS(cN, cK, cL, cU, cV, cQ, cO, cT)
    cP.push(cM)
    var cR = $('#autoSubTicketTitTemplate').html()
    $.templates({ leftTableTemplate: cR })
    $('#autosubmit_check_ticket_tit').html($.render.leftTableTemplate(cP))
  }
  function n (cW) {
    if (bg) {
      clearInterval(bg)
    }
    var cL = ''
    var cM = ''
    var cR = ''
    var cN = ''
    if ($('#sf2').is(':checked')) {
      cR = '3'
      cN = '学生票'
    }
    tickets_info = new Array()
    var cX = cW[1]
    var cQ = cW[2]
    var cP = 0
    var cO = passengerChecked.length
    for (var cS = 0; cS < cQ.length; cS++) {
      var cU = 0
      if (cQ[cS].toLowerCase() == 'yyrw') {
        var cK = cX.queryLeftNewDTO['seat_types']
        if (cQ[cS].toLowerCase() == 'yyrw' && cK.indexOf('A') > -1) {
          cU = cX.queryLeftNewDTO['gr_num']
        }
      } else {
        cU = cX.queryLeftNewDTO[cQ[cS].toLowerCase() + '_num']
      }
      if (cU == '--' || cU == '无') {
        cU = 0
      } else {
        if (cU == '有') {
          cU = 20
        } else {
          cU = Number(cU)
        }
      }
      if (cP >= cO) {
        break
      }
      var cV = cQ[cS]
      cL = aF(cV)
      cM = O(cV)
      for (var cT = 0; cT < cU; cT++) {
        if (cP >= cO) {
          break
        }
        cR = passengerChecked[cT].passenger_type
        if (!cR || cR == '') {
          cR = '1'
        }
        if (cR == '1') {
          cN = '成人票'
        } else {
          if (cR == '2') {
            cN = '儿童票'
          } else {
            if (cR == '3') {
              cN = '学生票'
            } else {
              if (cR == '4') {
                cN = '残军票'
              }
            }
          }
        }
        tickets_info.push(
          new br(
            'sdAdd_' + ax(),
            cL,
            cM,
            cR,
            cN,
            passengerChecked[cP].passenger_name,
            passengerChecked[cP].passenger_id_type_code,
            passengerChecked[cP].passenger_id_type_name,
            passengerChecked[cP].passenger_id_no,
            passengerChecked[cP].mobile_no
          )
        )
        cP++
      }
    }
  }
  function cD (cL) {
    var cK
    if (canChooseBeds == 'X') {
      $('#bed_show').html(
        "<span style='background:url(../resources/images/icon_new.png) right center no-repeat; padding-right:30px; cursor: pointer;' title='欢迎使用12306选铺功能'>铺别</span>"
      )
      cK = $('#autoSubCheckTicketInfoTemplate_chooseBeds')
        .html()
        .replace('<!--', '')
        .replace('-->', '')
      $('#bed_show').show()
    } else {
      $('#bed_show').hide()
      cK = $('#autoSubCheckTicketInfoTemplate').html()
    }
    $.templates({ leftTableTemplate: cK })
    $('#autosubmit_check_ticketInfo').html($.render.leftTableTemplate(cL))
  }
  function k () {
    var cN = P.queryLeftNewDTO.yz_num
    var cK = P.queryLeftNewDTO.rz_num
    var cR = P.queryLeftNewDTO.yw_num
    var cP = P.queryLeftNewDTO.rw_num
    var cQ = P.queryLeftNewDTO.gr_num
    var cO = P.queryLeftNewDTO.ze_num
    var cT = P.queryLeftNewDTO.zy_num
    var cU = P.queryLeftNewDTO.tz_num
    var cL = P.queryLeftNewDTO.swz_num
    var cS = P.queryLeftNewDTO.wz_num
    var cM = ''
    if (cN != '--') {
      cM = 'YZ'
      return cM
    }
    if (cO != '--') {
      cM = 'ZE'
      return cM
    }
    if (cR != '--') {
      cM = 'YW'
      return cM
    }
    if (cT != '--') {
      cM = 'ZY'
      return cM
    }
    if (cK != '--') {
      cM = 'RZ'
      return cM
    }
    if (cP != '--') {
      cM = 'RW'
      return cM
    }
    if (cU != '--') {
      cM = 'TZ'
      return cM
    }
    if (cQ != '--') {
      cM = 'GR'
      return cM
    }
    if (cL != '--') {
      cM = 'SWZ'
      return cM
    }
    if (cS != '--') {
      cM = 'WZ'
      return cM
    }
  }
  function O (cL) {
    var cK = ''
    if (cL == 'ZY') {
      cK = '一等座'
    }
    if (cL == 'ZE') {
      cK = '二等座'
    }
    if (cL == 'SWZ') {
      cK = '商务座'
    }
    if (cL == 'TZ') {
      cK = '特等座'
    }
    if (cL == 'YZ') {
      cK = '硬座'
    }
    if (cL == 'RZ') {
      cK = '软座'
    }
    if (cL == 'YW') {
      cK = '硬卧'
    }
    if (cL == 'RW') {
      cK = '软卧'
    }
    if (cL == 'GR') {
      cK = '高级软卧'
    }
    if (cL == 'SRRB') {
      cK = '动卧'
    }
    if (cL == 'YYRW') {
      cK = '高级动卧'
    }
    if (cL == 'WZ') {
      cK = '无座'
    }
    return cK
  }
  function aF (cL) {
    var cK = ''
    if (cL == 'ZY') {
      cK = 'M'
    }
    if (cL == 'ZE') {
      cK = 'O'
    }
    if (cL == 'SWZ') {
      cK = '9'
    }
    if (cL == 'TZ') {
      cK = 'P'
    }
    if (cL == 'YZ') {
      cK = '1'
    }
    if (cL == 'RZ') {
      cK = '2'
    }
    if (cL == 'YW') {
      cK = '3'
    }
    if (cL == 'RW') {
      cK = '4'
    }
    if (cL == 'GR') {
      cK = '6'
    }
    if (cL == 'WZ') {
      cK = 'WZ'
    }
    if (cL == 'SRRB') {
      cK = 'F'
    }
    if (cL == 'YYRW') {
      cK = 'A'
    }
    return cK
  }
  function br (cR, cM, cN, cP, cO, cL, cT, cS, cQ, cK) {
    ;(this.only_id = cR), (this.seat_type = cM)
    this.seat_type_name = cN
    ;(this.ticket_type = cP), (this.ticket_type_name = cO)
    this.name = cL
    this.id_type = cT
    this.id_type_name = cS
    this.id_no = cQ
    this.phone_no = cK
    this.toString = function () {
      return (
        this.name + '_' + this.id_type + '_' + this.id_no + '_' + this.phone_no
      )
    }
  }
  function ax () {
    if (tickets_info.length < 1) {
      return tickets_info.length
    } else {
      var cM = 0
      for (var cL = 0; cL < tickets_info.length; cL++) {
        var cK = Number(tickets_info[cL].only_id.split('_')[1])
        if (cK > cM) {
          cM = cK
        }
      }
      return cM + 1
    }
  }
  function bf () {
    b5 = []
    ad = []
    aO = []
    tickets_info = []
    ca = []
    ck = []
    P = ''
    isAsync = ''
    location_code = ''
    md5Str = ''
    leftTicketStr = ''
  }
  getpassengerTicketsForAutoSubmit = function () {
    var cL = ''
    for (var cQ = 0; cQ < tickets_info.length; cQ++) {
      var cR = ''
      if (tickets_info[cQ].seat_type == 'WZ') {
        cR = aF(k())
      } else {
        cR = tickets_info[cQ].seat_type
      }
      var cO = $('#autosubmit_check_ticketInfo').find('select[id^=ticketype_]')
      var cS = '0'
      if (cO && cO.length > 0) {
        var cK =
          tickets_info[cQ].seat_type +
          '#' +
          tickets_info[cQ].ticket_type +
          '#' +
          tickets_info[cQ].name +
          '#' +
          tickets_info[cQ].id_no
        for (var cP = 0, cV = cO.length; cP < cV; cP++) {
          var cT = cO.eq(cP)
          var cM = cT.val().split('_')[0]
          var cN = cT.val().split('_')[1]
          if (cK == cM) {
            cS = cN
          }
        }
      }
      var cU =
        cR +
        ',' +
        cS +
        ',' +
        tickets_info[cQ].ticket_type +
        ',' +
        tickets_info[cQ].name +
        ',' +
        tickets_info[cQ].id_type +
        ',' +
        tickets_info[cQ].id_no +
        ',' +
        (tickets_info[cQ].phone_no == null ? '' : tickets_info[cQ].phone_no) +
        ',N'
      cL += cU + '_'
    }
    return cL.substring(0, cL.length - 1)
  }
  getOldPassengersForAutoSubmit = function () {
    var cM = ''
    for (var cL = 0; cL < passengerChecked.length; cL++) {
      var cK =
        passengerChecked[cL].passenger_name +
        ',' +
        passengerChecked[cL].passenger_id_type_code +
        ',' +
        passengerChecked[cL].passenger_id_no +
        ',' +
        passengerChecked[cL].passenger_type
      cM += cK + '_'
    }
    return cM
  }
  var a1 = false
  function bJ (cK, cL) {
    var cP = ''
    var cM = $('#train_date')
      .val()
      .split('-')
    var cN = new Date()
    cN.setFullYear(cM[0], cM[1] - 1, cM[2])
    if (
      isAsync == ticket_submit_order.request_flag.isAsync &&
      leftTicketStr != ''
    ) {
      var cO = null
      if (tickets_info[0].seat_type == 'WZ') {
        if (P.queryLeftNewDTO.yz_num != '--') {
          tickets_info[0].seat_type = '1'
          a1 = true
          tickets_info[0].seat_type_name = '硬座'
        } else {
          if (P.queryLeftNewDTO.ze_num != '--') {
            tickets_info[0].seat_type = 'O'
            a1 = true
            tickets_info[0].seat_type_name = '二等座'
          }
        }
      }
      $.ajax({
        url: ctx + 'confirmPassenger/getQueueCountAsync',
        type: 'post',
        async: false,
        data: {
          train_date: cN.toString(),
          train_no: P.queryLeftNewDTO.train_no,
          stationTrainCode: P.queryLeftNewDTO.station_train_code,
          seatType: tickets_info[0].seat_type,
          fromStationTelecode: P.queryLeftNewDTO.from_station_telecode,
          toStationTelecode: P.queryLeftNewDTO.to_station_telecode,
          leftTicket: leftTicketStr,
          purpose_codes: cK,
          isCheckOrderInfo: cL
        },
        dataType: 'json',
        success: function (cS) {
          if (cS.status) {
            if (cS.data.isRelogin == 'Y') {
              window.location.href =
                ctx + 'view/index.html?random=' + new Date().getTime()
            }
            var cT = null
            var cR = tickets_info[0].seat_type
            cT = cS.data.ticket.split(',')
            cP =
              '本次列车，' +
              tickets_info[0].seat_type_name.split('（')[0] +
              '余票'
            if (parseInt(cT[0]) >= 0) {
              cP += '<strong>' + cT[0] + '</strong>张'
            } else {
              cP += cT[0]
            }
            var cQ = false
            if (cT.length > 1) {
              cP += ',无座余票'
              if (parseInt(cT[1]) >= 0) {
                cP += '<strong>' + cT[1] + '</strong>张'
              } else {
                cP += cT[1]
              }
              cQ = true
            }
            cP += '。'
            if (cS.data.op_2 == 'true') {
              if ((a1 && !cQ) || !a1) {
                a4 = false
                R()
                return
              }
              cP +=
                '<font color="red">目前排队人数已经超过余票张数，请您选择其他席别或车次。</font>'
            } else {
              if (cS.data.countT > 0) {
                cP +=
                  '目前排队人数<font color="red">' +
                  cS.data.countT +
                  '</font>人，'
                if (if_show_pass_code_login == 'Y') {
                  cP +=
                    '<br/>请确认以上信息是否正确，点击“确认”后，系统将为您分配席位。'
                }
              }
            }
            var cU = $('#sy_ticket_num_id')
            if (cU != null) {
              cU.html(cP)
            }
            cg()
          }
        },
        error: function (cQ, cS, cR) {}
      })
    } else {
      cg()
    }
  }
  function bL (cL, cK) {
    rt = ''
    seat_1 = -1
    seat_2 = -1
    i = 0
    while (i < cL.length) {
      s = cL.substr(i, 10)
      c_seat = s.substr(0, 1)
      if (c_seat == cK) {
        count = s.substr(6, 4)
        while (count.length > 1 && count.substr(0, 1) == '0') {
          count = count.substr(1, count.length)
        }
        count = parseInt(count)
        if (count < 3000) {
          seat_1 = count
        } else {
          seat_2 = count - 3000
        }
      }
      i = i + 10
    }
    if (seat_1 > -1) {
      rt += seat_1
    }
    if (seat_2 > -1) {
      rt += ',' + seat_2
    }
    return rt
  }
  function cI () {
    $.ajax({
      url: ctx + 'confirmPassenger/confirmSingle',
      type: 'post',
      data: {
        passengerTicketStr: getpassengerTicketsForAutoSubmit(),
        oldPassengerStr: getOldPassengersForAutoSubmit(),
        tour_flag: 'dc',
        randCode: $('#randCode_other').val(),
        purpose_codes: cE(),
        key_check_isChange: md5Str,
        train_location: location_code,
        choose_seats: bY(),
        seatDetailType: a0()
      },
      dataType: 'json',
      async: true,
      success: function (cK) {
        if (cK.status) {
          if (cK.data.submitStatus) {
            otsRedirect(
              'post',
              ctx + 'payOrder/init?random=' + new Date().getTime(),
              {}
            )
          } else {
            al(
              '出票失败!',
              false,
              '原因： ' +
                cK.data.errMsg +
                '<a  id="xg_close_win_id">点击修改</a>',
              true,
              'lose'
            )
            $('#xg_close_win_id').click(function () {
              ao('transforNotice_id', true)
              $('#i-ok').css('display', 'none')
            })
          }
        } else {
          al('订票失败!', true, '很抱歉！请关闭窗口重新预定车票', true, 'lose')
        }
      },
      error: function (cK, cM, cL) {
        al(
          '订票失败!',
          true,
          '很抱歉！网络忙，请关闭窗口稍后再试。',
          true,
          'lose'
        )
      }
    })
  }
  function r () {
    $.ajax({
      url: ctx + 'confirmPassenger/confirmSingleForQueueAsys',
      type: 'post',
      data: {
        passengerTicketStr: getpassengerTicketsForAutoSubmit(),
        oldPassengerStr: getOldPassengersForAutoSubmit(),
        randCode: $('#randCode_other').val(),
        purpose_codes: cE(),
        key_check_isChange: md5Str,
        leftTicketStr: leftTicketStr,
        train_location: location_code,
        choose_seats: bY(),
        seatDetailType: a0()
      },
      dataType: 'json',
      async: true,
      success: function (cK) {
        $('#i-ok').css('display', 'none')
        $('#i-ok2').css('display', 'none')
        $('#c_error2').html('')
        $('#c_error2').removeClass('error')
        $('#randCode2').val('')
        if (cK.status) {
          if (!cK.data.submitStatus) {
            al(
              '出票失败!',
              false,
              '原因： ' +
                cK.data.errMsg +
                '<a id="xg_close_win_id" >点击修改</a>',
              true,
              'lose'
            )
            $('#xg_close_win_id').click(function () {
              ao('transforNotice_id', true)
            })
            if (cK.data.errMsg.indexOf('余票不足') >= 0) {
              jPlayer('stop')
              $('#qr_closeTranforDialog_id').click()
              $('#query_ticket').click()
            }
          } else {
            var cL = new OrderQueueWaitTime('dc', ay, v)
            cL.start(queryOrderWaitTimeInterval)
          }
        } else {
          al('订票失败!', true, '很抱歉！请关闭窗口重新预定车票', true, 'lose')
        }
      },
      error: function (cK, cM, cL) {
        al(
          '订票失败!',
          true,
          '很抱歉！网络忙，请关闭窗口稍后再试。',
          true,
          'lose'
        )
      }
    })
  }
  function ay (cK, cM, cL) {
    if (cM <= 5) {
      al('订单已经提交，系统正在处理中，请稍等。', false, '', false, 'work')
    } else {
      if (cM > 30 * 60) {
        al(
          '订单已经提交，预计等待时间超过30分钟，请耐心等待。',
          false,
          '',
          false,
          'queue'
        )
      } else {
        al(
          '订单已经提交，最新预估等待时间' + cL + '，请耐心等待。',
          false,
          '',
          false,
          'queue'
        )
      }
    }
  }
  function v (cK, cM, cL) {
    if (cM == -1 || cM == -100) {
      $.ajax({
        url: ctx + 'confirmPassenger/resultOrderForDcQueue',
        data: { orderSequence_no: cL.orderId },
        type: 'POST',
        dataType: 'json',
        success: function (cN) {
          if (cN.status) {
            if (cN.data.submitStatus) {
              otsRedirect(
                'post',
                ctx + '/payOrder/init?random=' + new Date().getTime(),
                {}
              )
            } else {
              al('下单成功', false, '', false, 'win')
            }
          } else {
            al('下单成功。', false, '', false, 'win')
          }
        },
        error: function (cN, cP, cO) {
          al('下单成功。', false, '', false, 'win')
        }
      })
    } else {
      b3(cM, cL)
    }
  }
  function b3 (cK, cL) {
    if (cL.name && cL.card && cL.tel) {
      ao('transforNotice_id', true)
      $('#608_check_msg').html(cL.msg)
      dhtmlx.createWin({
        winId: '608_check',
        closeWinId: ['608_check_close', '608_check_cancel'],
        okId: '608_check_ok',
        okCallBack: function () {
          $('#608_name').html(cL.name)
          $('#608_card').html(cL.card)
          $('#608_tel').html(cL.tel)
          $('#ticketInfo').html(cL.ticketInfo)
          dhtmlx.createWin({
            winId: '608_complain',
            closeWinId: ['608_complain_close', '608_complain_cancel'],
            okId: '608_complain_ok',
            okCallBack: function () {
              var cM = dhtmlx.modalbox({
                targSrc:
                  '<div><img src="' +
                  ctx +
                  'resources/images/loading.gif"></img></div>',
                callback: function () {}
              })
              $.ajax({
                url: ctx + 'confirmPassenger/report',
                type: 'post',
                async: false,
                success: function (cN) {
                  dhtmlx.modalbox.hide(cM)
                  if (cN.data == 'Y') {
                    dhtmlx.alert({
                      title: '提示',
                      ok: messages['button.ok'],
                      text: '举报成功',
                      type: 'alert-info'
                    })
                  } else {
                    dhtmlx.alert({
                      title: '提示',
                      ok: messages['button.ok'],
                      text: '举报失败',
                      type: 'alert-error'
                    })
                  }
                  $('#i-okmypasscode1').hide()
                  if (ifAlertCode) {
                    refreshImg('passenger', 'randp', 'other')
                  }
                },
                error: function (cN, cP, cO) {
                  dhtmlx.modalbox.hide(cM)
                }
              })
            },
            checkConfirm: function () {
              return true
            }
          })
          $('#608_complain').css('top', '200px')
        },
        checkConfirm: function () {
          return true
        },
        callback: function () {
          $('#i-okmypasscode1').hide()
          if (ifAlertCode) {
            refreshImg('passenger', 'randp', 'other')
          }
        }
      })
      $('#608_check').css('top', '200px')
      return
    }
    if (cK == -1) {
    } else {
      if (cK == -2) {
        if (cL.errorcode == 0) {
          al('订票失败!', true, '原因： ' + cL.msg, true, 'lose')
        } else {
          al('订票失败!', true, '原因： ' + cL.msg, true, 'lose')
        }
        if (cL.msg.indexOf('没有足够的票') > -1) {
          jPlayer('stop')
          $('#qr_closeTranforDialog_id').click()
          $('#query_ticket').click()
        }
      } else {
        if (cK == -3) {
          al('哎呀,订票失败!', true, '订单已撤销', true, 'lose')
        } else {
          window.location.href =
            ctx + 'view/train_order.html?type=1&random=' + new Date().getTime()
        }
      }
    }
  }
  function Y () {
    cC = new dhtmlXWindows()
    cC.enableAutoViewport(true)
    cC.setSkin('dhx_terrace')
    cC.setImagePath(ctx + 'resources/js/rich/windows/imgs/')
    ao = function (cO, cN) {
      unLoadGrayBackground()
      if (cC.isWindow(cO + '_')) {
        cC.window(cO + '_').setModal(false)
        cC.window(cO + '_').hide()
      }
    }
    al = function (cU, cR, cO, cN, cQ) {
      var cT =
        '<div class="tit">' +
        (cR ? '<span class="colorC">' + cU + '</span>' : cU) +
        '</div>'
      var cP = '<P>' + cO + '</p>'
      var cS = cR
        ? '<p>请点击[<a href="' +
          ctx +
          'view/train_order.html?type=2"><strong>我的12306</strong></a>]办理其他业务。您也可以点击[<a href="' +
          ctx +
          'leftTicket/init"><strong>预订车票</strong></a>]，重新规划您的旅程。</p>'
        : '<P>查看订单处理情况，请点击“<a href="' +
          ctx +
          'view/train_order.html?type=1">未完成订单</a>”</P>'
      $('#iamge_status_id')
        .removeClass()
        .addClass('icon i-' + cQ)
      if (cN) {
        $('#up-box-hd_id').html(
          "提示<a id='closeTranforDialog_id' href='#nogo'>关闭</a>"
        )
        cS = ''
        $('#lay-btn_id').html(
          "<a href='#nogo' id='qr_closeTranforDialog_id'  class='btn92s'>确认</a>"
        )
      } else {
        $('#up-box-hd_id').html('提示')
        $('#lay-btn_id').html('')
      }
      $('#orderResultInfo_id').html(
        cT +
          (cO == '' || cO == null || cO == 'undefined' || cO == undefined
            ? ''
            : cP) +
          cS
      )
      cK('transforNotice_id')
      if (cN) {
        $('#closeTranforDialog_id').click(function () {
          ao('transforNotice_id', true)
        })
        $('#qr_closeTranforDialog_id').click(function () {
          ao('transforNotice_id', true)
          $('#i-ok').css('display', 'none')
        })
      }
    }
    function cK (cR) {
      ao(cR, false)
      if (cR == 'checkticketinfo_id') {
        var cP = ticketInfoForPassengerForm.queryLeftNewDetailDTO
        if (
          cP.to_station_telecode == ticket_submit_order.special_areas.lso ||
          cP.to_station_telecode == ticket_submit_order.special_areas.dao ||
          cP.to_station_telecode == ticket_submit_order.special_areas.ado ||
          cP.to_station_telecode == ticket_submit_order.special_areas.nqo ||
          cP.to_station_telecode == ticket_submit_order.special_areas.tho
        ) {
          if (cL()) {
            $('#notice_1_id').html(
              '1.系统将随机为您申请席位，暂不支持自选席位。'
            )
            $('#notice_2_id').html(
              '2.根据现行规定，外国人在购买进西藏火车票时，须出示西藏自治区外事办公室或旅游局、商务厅的批准函（电），或者出示中国内地司局级接待单位出具的、已征得自治区上述部门同意的证明信函。台湾同胞赴藏从事旅游、商务活动，须事先向西藏自治区旅游局或商务厅提出申请，购买进藏火车票时须出示有关批准函。'
            )
            if (cM()) {
              $('#notice_3_id').html(
                '3.按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。'
              )
            } else {
              $('#notice_3_id').html('')
            }
          }
        } else {
          $('#notice_1_id').html('1.系统将随机为您申请席位，暂不支持自选席位。')
          if (cM()) {
            $('#notice_3_id').html(
              '2.按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。'
            )
          } else {
            $('#notice_3_id').html('')
          }
        }
      }
      var cO = bk(cR)
      var cN = $(window).width() / 2 - 300
      var cQ = cB() + ($(window).height() / 2 - 200)
      cO.setDimension(
        $('#content_' + cR).width(),
        $('#content_' + cR).height() + 10
      )
      $('.dhtmlx_window_active').height($('#content_' + cR).height())
      $('.dhtmlx_window_active').css({ left: cN + 'px', top: cQ + 'px' })
    }
    function cM () {
      for (var cO = 0; cO < limit_tickets.length; cO++) {
        var cN = limit_tickets[cO]
        if (cN.ticket_type == ticket_submit_order.ticket_type.student) {
          return true
        }
      }
      return false
    }
    function cL () {
      for (var cO = 0; cO < limit_tickets.length; cO++) {
        var cN = limit_tickets[cO]
        if (
          (ticketInfoForPassengerForm.tour_flag ==
            ticket_submit_order.tour_flag.fc ||
            ticketInfoForPassengerForm.tour_flag ==
              ticket_submit_order.tour_flag.gc) &&
          cN.save_status != '' &&
          (cN.id_type == ticket_submit_order.passenger_card_type.passport ||
            cN.id_type == ticket_submit_order.passenger_card_type.work ||
            cN.id_type == ticket_submit_order.passenger_card_type.taiwan)
        ) {
          return true
        } else {
          if (
            (ticketInfoForPassengerForm.tour_flag ==
              ticket_submit_order.tour_flag.wc ||
              ticketInfoForPassengerForm.tour_flag ==
                ticket_submit_order.tour_flag.dc) &&
            (cN.id_type == ticket_submit_order.passenger_card_type.passport ||
              cN.id_type == ticket_submit_order.passenger_card_type.work ||
              cN.id_type == ticket_submit_order.passenger_card_type.taiwan)
          ) {
            return true
          }
        }
      }
      return false
    }
  }
  function bk (cL) {
    var cK = cC.createWindow(cL + '_', 0, 0, 660, 100)
    cK.attachObject(cL)
    cK.clearIcon()
    cK.denyResize()
    cK.setModal(true)
    cK.center()
    cK.button('park').hide()
    cK.button('minmax1').hide()
    cK.hideHeader()
    return cK
  }
  function G (cL) {
    var cK = new Date()
    var cM = cL.split('-')
    cK.setFullYear(
      parseInt(cM[0]),
      parseInt(cM[1] - 1, 10),
      parseInt(cM[2], 10)
    )
    if (cM.length >= 6) {
      cK.setHours(cM[3], cM[4], cM[5])
    }
    return cK
  }
  function aP (cK) {
    var cN = '',
      cM = ''
    var cP = cK.replace(/-/g, '')
    if (cP.substring(4, 5) == '0') {
      cN = cP.substring(5, 6) + '月'
    } else {
      cN = cP.substring(4, 6) + '月'
    }
    if (cP.substring(6, 7) == '0') {
      cM = cP.substring(7, 8) + '日'
    } else {
      cM = cP.substring(6, 8) + '日'
    }
    var cL = new Date(Date.parse(cK.replace(/-/g, '/')))
    var cO = '日一二三四五六'
    return cN
      .concat(cM)
      .concat('&nbsp;&nbsp;')
      .concat('周')
      .concat(cO.charAt(cL.getDay()))
  }
  function d () {
    $('.buy-cart .close').on('click', function () {
      $('.cart-bd').hide()
    })
    $('.cart-hd').on('click', function () {
      $(this)
        .next('.cart-bd')
        .toggle()
    })
    $('#hbClear').click(function () {
      var cL = $('.cart-tlist li')
      for (var cK = 0; cK < cL.length; cK++) {
        deleteHB($(cL[cK]).find('a'))
      }
    })
    $('#hbSubmit').click(function () {
      var cO = $('.cart-tlist li')
      var cN = ''
      if (cO.length == 0) {
        dhtmlx.alert({
          title: '提示',
          ok: '确定',
          text: '请先选择候补车次！',
          type: 'alert-error'
        })
        return
      }
      for (var cL = 0; cL < cO.length; cL++) {
        var cM = seatTypeForHB[
          $(cO[cL])
            .attr('hbid')
            .split('#')[4]
            .split('_')[0]
        ].split('_')[0]
        var cK =
          $(cO[cL])
            .attr('hbid')
            .split('#')[9] +
          '#' +
          cM +
          '|'
        cN += cK
      }
      V(cN)
    })
  }
  function aL (cL, cM) {
    var cK = dhtmlx.modalbox({
      targSrc:
        '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>'
    })
    $.ajax({
      type: 'post',
      url: ctx + 'login/checkUser',
      data: {},
      beforeSend: function (cN) {
        cN.setRequestHeader('If-Modified-Since', '0')
        cN.setRequestHeader('Cache-Control', 'no-cache')
      },
      success: function (cN) {
        dhtmlx.modalbox.hide(cK)
        if (cN.data.flag) {
          if (cM && typeof cM === 'function') {
            cM()
          }
        } else {
          aX(function () {
            a3(cL)
          })
        }
      },
      error: function () {
        dhtmlx.modalbox.hide(cK)
        dhtmlx.alert({
          title: '提示',
          ok: '确定',
          text: '系统忙，请稍后再试！',
          type: 'alert-error'
        })
      }
    })
  }
  function aX (cK) {
    $('.mask').fadeIn()
    $('.login-box .login-hd-code')
      .addClass('active')
      .siblings()
      .removeClass('active')
    $('.login-box .login-code')
      .show()
      .siblings()
      .hide()
    $('.login-box').slide({
      titCell: '.login-hd li',
      mainCell: '.login-bd',
      titOnClassName: 'active',
      trigger: 'click'
    })
    $('.modal-login')
      .css(
        'top',
        ($(window).height() - $('.modal-login').height()) / 2 +
          $(window).scrollTop() +
          'px'
      )
      .css(
        'left',
        ($(window).width() - $('.modal-login').width()) / 2 +
          $(window).scrollLeft() +
          'px'
      )
      .show()
    $.popup_initLogin(true)
    $('.modal-login').fadeIn()
    $.pop_callback = function () {
      if (cK && typeof cK === 'function') {
        cK()
      }
    }
  }
  var ba = false
  var J
  var aZ = 0
  function ak (cM, cP) {
    if (ba) {
      var cL = new Date().getTime()
      if (cL - J <= aZ) {
        if (cP && typeof cP === 'function') {
          cP()
        }
        return true
      }
    }
    var cO = seatTypeForHB[
      $(cM)
        .attr('hbid')
        .split('#')[4]
        .split('_')[0]
    ].split('_')[0]
    var cN =
      $(cM)
        .attr('hbid')
        .split('#')[9] +
      '#' +
      cO +
      '|'
    var cK = ak
    $.ajax({
      type: 'post',
      url: ctx + 'afterNate/chechFace',
      data: { secretList: cN },
      async: false,
      beforeSend: function (cQ) {
        cQ.setRequestHeader('If-Modified-Since', '0')
        cQ.setRequestHeader('Cache-Control', 'no-cache')
      },
      success: function (cQ) {
        var cR = cQ.data
        if (cR) {
          if (cR.login_flag) {
            if (cR.face_flag == false) {
              bA(cR.face_check_code)
            } else {
              ba = true
              J = new Date().getTime()
              if (cP && typeof cP === 'function') {
                cP()
              }
              return true
            }
          } else {
            aX(function () {
              cK(cM, cP)
              return true
            })
          }
        } else {
          dhtmlx.alert({
            title: '提示',
            ok: '确定',
            text: cQ.messages[0],
            type: 'alert-error'
          })
        }
      },
      error: function () {
        dhtmlx.alert({
          title: '提示',
          ok: '确定',
          text: '系统忙，请稍后再试！',
          type: 'alert-error'
        })
      }
    })
    return false
  }
  function V (cK) {
    aL(cK, function () {
      a3(cK)
    })
  }
  function a3 (cK) {
    $.ajax({
      type: 'POST',
      url: ctx + 'afterNate/submitOrderRequest',
      data: { secretList: cK },
      timeout: 10000,
      error: function (cL, cN, cM) {
        dhtmlx.alert({
          title: '提示',
          ok: '确定',
          text: '系统忙，请稍后再试！',
          type: 'alert-error'
        })
      },
      success: function (cL) {
        var cM = cL.data
        if (cM) {
          if (cM.flag) {
            otsRedirect(
              'get',
              window.location.protocol +
                '//' +
                window.location.host +
                '/' +
                href_path_2 +
                'view/lineUp_toPay.html',
              {}
            )
          } else {
            bA(cM.faceCheck)
          }
        } else {
          dhtmlx.alert({
            title: '提示',
            ok: '确定',
            text: cL.messages[0],
            type: 'alert-error'
          })
        }
      }
    })
  }
  function bA (cL) {
    if (cL == '01' || cL == '11') {
      var cK =
        '证件信息正在审核中，请您耐心等待，审核通过后可继续完成候补操作。</P>'
      dhtmlx.alert({
        title: '提示',
        ok: '确定',
        text: '身份核验审核中',
        body: cK,
        type: 'alert-error'
      })
    } else {
      if (cL == '03' || cL == '13') {
        var cK =
          '证件信息审核失败，请检查所填写的身份信息内容与原证件是否一致。'
        dhtmlx.alert({
          title: '提示',
          ok: '确定',
          text: '<span class="colorC">审核失败</span>',
          body: cK,
          type: 'alert-error'
        })
      } else {
        if (cL == '04' || cL == '14') {
          var cK =
            '通过人证一致性核验的用户及激活的“铁路畅行”会员可以提交候补需求，请您按照操作说明在铁路12306app上完成人证核验'
          dhtmlx.alert({
            title: '提示',
            ok: '确定',
            text: '身份核验提醒',
            body: cK,
            type: 'alert-error'
          })
        } else {
          if (cL == '02' || cL == '12') {
          } else {
            dhtmlx.alert({
              title: '提示',
              ok: '确定',
              text: '系统忙，请稍后再试！',
              type: 'alert-error'
            })
          }
        }
      }
    }
  }
  function bT (cL) {
    var cM = $(cL).attr('hbid')
    if ($(cL).hasClass('item-cphd cphd-active')) {
      if (
        $(cL)
          .prev()
          .hasClass('cphd-active-prev')
      ) {
        $(cL)
          .prev()
          .removeClass()
      }
      if (
        $(cL)
          .next()
          .hasClass('item-cphd cphd-active')
      ) {
        $(cL).attr('class', 'item-cphd cphd-active-prev')
      } else {
        $(cL).removeClass()
      }
      x(cM, 'del')
    } else {
      var cK = cM.split('#')[0]
      if ($('.cart-tlist li[tdate="' + cK + '"]').length == alowHBMaxNum) {
        dhtmlx.alert({
          title: '提示',
          ok: '确定',
          text: hb_max_msg,
          type: 'alert-error'
        })
        return
      }
      ak(cL, function () {
        $(cL).attr('class', 'item-cphd cphd-active')
        if (
          !$(cL)
            .prev()
            .hasClass('cphd-active')
        ) {
        }
        x(cM, 'add')
        u(cL, cM)
      })
    }
  }
  function x (cQ, cN) {
    var cM = cQ.split('#')
    if (cN == 'add') {
      $('.buy-cart').show()
      var cO =
        '<li tdate="' +
        cM[0] +
        '" hbid="' +
        cQ +
        '"><div>' +
        cM[0] +
        '    ' +
        cM[6] +
        '  -  ' +
        cM[8] +
        '</div><div>' +
        cM[10] +
        ' | ' +
        seatTypeForHB[cM[4].split('_')[0]].split('_')[1] +
        ' <span style="display:none;"></span></div><div name="suc_rate" hbid="' +
        cQ +
        '" class="cart-odds"></div><a href="javascript:void(0)" onclick="deleteHB(this)" class="del">删除</a></li>'
      $('.cart-tlist').append(cO)
      var cL = seatTypeForHB[cQ.split('#')[4].split('_')[0]].split('_')[0]
      var cP = cQ.split('#')[9] + '#' + cL
      bN(cP, cQ)
    } else {
      $('li[hbid="' + cQ + '"]').remove()
    }
    $('.cart-hd span').html($('.cart-tlist li').length)
    if ($('.cart-tlist li').length == 0) {
      $('.cart-bd').hide()
    } else {
      var cK = $($('.cart-tlist li')[0])
        .attr('hbid')
        .split('#')[0]
      $('.cart-bd').show()
    }
  }
  function u (cM, cO) {
    var cN = $('.cart-hd').offset()
    var cP = $(cM).offset()
    var cK = $(
      '<img id="flyer" src="' +
        ctx +
        'resources/images/oval.png" style="overflow:hidden;position:absolute;z-index:1500;" width="11" height="11" />'
    )
    try {
      cK.fly({
        start: { left: cP.left + 27, top: cP.top - $(window).scrollTop() + 10 },
        end: {
          left: cN.left + 10,
          top: cN.top - $(window).scrollTop() + 10,
          width: 0,
          height: 0
        },
        onEnd: function () {
          this.destory()
        },
        autoPlay: true,
        speed: 1.7,
        vertex_Rtop: 100
      })
    } catch (cL) {}
  }
  function bN (cK, cL) {
    $.ajax({
      type: 'POST',
      url: ctx + 'afterNate/getSuccessRate',
      data: { successSecret: cK },
      timeout: 10000,
      error: function (cM, cO, cN) {},
      success: function (cM) {
        var cN = cM.data
        if (cN && cN.flag) {
          var cO = cN.flag[0]
          if (cO.level == 3) {
            $('div[name="suc_rate"][hbid="' + cL + '"]').after(
              '<span class="odds-small">' + cO.info + '</span>'
            )
          } else {
            if (cO.level == 2) {
              $('div[name="suc_rate"][hbid="' + cL + '"]').after(
                '<span class="odds-mid">' + cO.info + '</span>'
              )
            } else {
              if (cO.level == 1) {
                $('div[name="suc_rate"][hbid="' + cL + '"]').after(
                  '<span class="odds-large">' + cO.info + '</span>'
                )
              }
            }
          }
        }
      }
    })
  }
  deleteHB = function (cL) {
    $(cL)
      .parent()
      .remove()
    var cM = $(cL)
      .parent()
      .attr('hbid')
    var cK = $('td[hbid="' + cM + '"]')
    if (
      $(cK)
        .prev()
        .hasClass('cphd-active-prev')
    ) {
      $(cK)
        .prev()
        .removeClass()
    }
    if (
      $(cK)
        .next()
        .hasClass('item-cphd cphd-active')
    ) {
      $(cK).attr('class', 'item-cphd cphd-active-prev')
    } else {
      $(cK).removeClass()
    }
    U()
  }
  function U () {
    $('.cart-hd span').html($('.cart-tlist li').length)
    if ($('.cart-tlist li').length == 0) {
      $('.cart-bd').hide()
    } else {
      var cK = $($('.cart-tlist li')[0])
        .attr('hbid')
        .split('#')[0]
      $('.cart-bd').show()
    }
  }
  showTicketPrice = function (cO) {
    if ($(cO).html() == '候补') {
      bT(cO)
      return
    }
    var cS = $(cO)
      .parent('tr')
      .children('td')
      .children('div')
      .children('div')
      .children('span')
      .attr('id')
    if (undefined == cS || cS == null || typeof cS === 'undefined') {
      cS = $(cO).attr('id')
    }
    $('#price_' + cP).hide()
    $('#tp-list-price').hide()
    $('#sleeper-price>span').css('cursor', 'pointer')
    var cP = cS.split('_')[0]
    var cQ = $('#price_' + cP).attr('datatran')
    var cR = cS.split('_')[1]
    var cN = cS.split('_')[2]
    var cT = cS.split('_')[3]
    var cM = cS.split('_')[4]
    var cK = $('#WZ_' + cP).html()
    var cL = $('#QT_' + cP).html()
    if (cM && $('#ticket_' + cP + '_train>span>span').text() == '查看票价') {
      if ($('#ticket_' + cP).attr('class') == 'bgc') {
        $('#price_' + cP).addClass('bgc')
      }
      $.ajax({
        type: 'get',
        isTakeParam: false,
        beforeSend: function (cU) {
          cU.setRequestHeader('If-Modified-Since', '0')
          cU.setRequestHeader('Cache-Control', 'no-cache')
        },
        url: ctx + 'leftTicket/queryTicketPriceFL',
        data: {
          train_no: cP,
          from_station_no: cR,
          to_station_no: cN,
          seat_types: cM,
          train_date:
            train_tour_flag == 'fc'
              ? $.trim($('#back_train_date').val())
              : $.trim($('#train_date').val())
        },
        timeout: 1000,
        error: function (cU, cW, cV) {},
        success: function (cU) {}
      })
      $.ajax({
        type: 'get',
        isTakeParam: false,
        beforeSend: function (cU) {
          cU.setRequestHeader('If-Modified-Since', '0')
          cU.setRequestHeader('Cache-Control', 'no-cache')
        },
        url: ctx + 'leftTicket/queryTicketPrice',
        data: {
          train_no: cP,
          from_station_no: cR,
          to_station_no: cN,
          seat_types: cM,
          train_date:
            train_tour_flag == 'fc'
              ? $.trim($('#back_train_date').val())
              : $.trim($('#train_date').val())
        },
        success: function (cU) {
          if (cU.status) {
            $('#ticket_' + cP + '_train>span>span').html('收起票价')
            $('#ticket_' + cP + '_train>span>b').addClass('open')
            $('#ticket_' + cP + '_train>span>b').attr('title', '收起票价')
            if (cL == '--') {
              cU.data.MIN = ''
            }
            if (cK == '--') {
              cU.data.WZ = ''
            }
            $('#price_' + cP).html($.render.priceTableTemplate(cU.data))
            $('#price_' + cP).show()
            if (cQ && c(cQ)) {
              $('#price_' + cP)
                .find('td')
                .eq(0)
                .html(
                  '<a class="ad-tlist-hot" href="javascript:void(0);">移动宾馆 免费晚餐 快捷舒适 准时正点</a>'
                )
            } else {
              $('#price_' + cP)
                .find('td')
                .eq(0)
                .html('')
            }
            if (cU.data.PM != '--') {
              $('#sleeper-price_' + cP).mouseover(function () {
                $('#tp-list-price_' + cP).show()
              })
              $('#sleeper-price_' + cP).mouseout(function () {
                $('#tp-list-price_' + cP).hide()
              })
            }
          }
        }
      })
    } else {
      $('#ticket_' + cP + '_train>span>span').html('查看票价')
      $('#ticket_' + cP + '_train>span>b').attr('title', '查看票价')
      $('#ticket_' + cP + '_train>span>b').removeClass()
      $('#price_' + cP).html('')
      $('#price_' + cP).hide()
    }
  }
  function cc (cK) {
    if (aJ == 'starttime') {
      return cK.sort(function (cM, cL) {
        var cO = Number(cM.queryLeftNewDTO.start_time.replace(':', ''))
        var cN = Number(cL.queryLeftNewDTO.start_time.replace(':', ''))
        if (cO > cN) {
          return bj ? 1 : -1
        } else {
          return bj ? -1 : 1
        }
      })
    } else {
      if (aJ == 'arrivedtime') {
        return cK.sort(function (cM, cL) {
          var cO = Number(cM.queryLeftNewDTO.arrive_time.replace(':', ''))
          var cN = Number(cL.queryLeftNewDTO.arrive_time.replace(':', ''))
          if (cO > cN) {
            return cn ? 1 : -1
          } else {
            return cn ? -1 : 1
          }
        })
      } else {
        if (aJ == 'lishi') {
          return cK.sort(function (cM, cL) {
            var cO = Number(cM.queryLeftNewDTO.lishi.replace(':', ''))
            var cN = Number(cL.queryLeftNewDTO.lishi.replace(':', ''))
            if (cO > cN) {
              return be ? 1 : -1
            } else {
              return be ? -1 : 1
            }
          })
        }
      }
    }
    return cK
  }
  function aK () {
    $('#s_time').click(function () {
      if (bj) {
        $('#s_time')
          .removeClass()
          .addClass('b4')
        if ($('#r_time').attr('class') == 'b4') {
          $('#r_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#r_time').attr('class') == 'b3') {
            $('#r_time')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#l_s').attr('class') == 'b4') {
          $('#l_s')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#l_s').attr('class') == 'b3') {
            $('#l_s')
              .removeClass()
              .addClass('b1')
          }
        }
        bj = false
        $('#other_span_starttime')
          .removeClass()
          .addClass('b4')
        if ($('#other_span_endtime').attr('class') == 'b4') {
          $('#other_span_endtime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_endtime').attr('class') == 'b3') {
            $('#other_span_endtime')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#other_span_lishi').attr('class') == 'b4') {
          $('#other_span_lishi')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_lishi').attr('class') == 'b3') {
            $('#other_span_lishi')
              .removeClass()
              .addClass('b1')
          }
        }
      } else {
        $('#s_time')
          .removeClass()
          .addClass('b3')
        if ($('#r_time').attr('class') == 'b4') {
          $('#r_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#r_time').attr('class') == 'b3') {
            $('#r_time')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#l_s').attr('class') == 'b4') {
          $('#l_s')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#l_s').attr('class') == 'b3') {
            $('#l_s')
              .removeClass()
              .addClass('b1')
          }
        }
        bj = true
        $('#other_span_starttime')
          .removeClass()
          .addClass('b3')
        if ($('#other_span_endtime').attr('class') == 'b4') {
          $('#other_span_endtime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_endtime').attr('class') == 'b3') {
            $('#other_span_endtime')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#other_span_lishi').attr('class') == 'b4') {
          $('#other_span_lishi')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_lishi').attr('class') == 'b3') {
            $('#other_span_lishi')
              .removeClass()
              .addClass('b1')
          }
        }
      }
      aJ = 'starttime'
      aU()
    })
    $('#other_span_starttime').click(function () {
      if (bj) {
        $('#s_time')
          .removeClass()
          .addClass('b4')
        if ($('#r_time').attr('class') == 'b4') {
          $('#r_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#r_time').attr('class') == 'b3') {
            $('#r_time')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#l_s').attr('class') == 'b4') {
          $('#l_s')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#l_s').attr('class') == 'b3') {
            $('#l_s')
              .removeClass()
              .addClass('b1')
          }
        }
        bj = false
        $('#other_span_starttime')
          .removeClass()
          .addClass('b4')
        if ($('#other_span_endtime').attr('class') == 'b4') {
          $('#other_span_endtime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_endtime').attr('class') == 'b3') {
            $('#other_span_endtime')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#other_span_lishi').attr('class') == 'b4') {
          $('#other_span_lishi')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_lishi').attr('class') == 'b3') {
            $('#other_span_lishi')
              .removeClass()
              .addClass('b1')
          }
        }
      } else {
        $('#s_time')
          .removeClass()
          .addClass('b3')
        if ($('#r_time').attr('class') == 'b4') {
          $('#r_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#r_time').attr('class') == 'b3') {
            $('#r_time')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#l_s').attr('class') == 'b4') {
          $('#l_s')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#l_s').attr('class') == 'b3') {
            $('#l_s')
              .removeClass()
              .addClass('b1')
          }
        }
        bj = true
        $('#other_span_starttime')
          .removeClass()
          .addClass('b3')
        if ($('#other_span_endtime').attr('class') == 'b4') {
          $('#other_span_endtime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_endtime').attr('class') == 'b3') {
            $('#other_span_endtime')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#other_span_lishi').attr('class') == 'b4') {
          $('#other_span_lishi')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_lishi').attr('class') == 'b3') {
            $('#other_span_lishi')
              .removeClass()
              .addClass('b1')
          }
        }
      }
      aJ = 'starttime'
      aU()
    })
    $('#r_time').click(function () {
      if (cn) {
        $('#r_time')
          .removeClass()
          .addClass('b4')
        if ($('#s_time').attr('class') == 'b4') {
          $('#s_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#s_time').attr('class') == 'b3') {
            $('#s_time')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#l_s').attr('class') == 'b4') {
          $('#l_s')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#l_s').attr('class') == 'b3') {
            $('#l_s')
              .removeClass()
              .addClass('b1')
          }
        }
        cn = false
        $('#other_span_starttime')
          .removeClass()
          .addClass('b4')
        $('#other_span_endtime')
          .removeClass()
          .addClass('b2')
        $('#other_span_lishi')
          .removeClass()
          .addClass('b2')
      } else {
        $('#r_time')
          .removeClass()
          .addClass('b3')
        if ($('#s_time').attr('class') == 'b4') {
          $('#s_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#s_time').attr('class') == 'b3') {
            $('#s_time')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#l_s').attr('class') == 'b4') {
          $('#l_s')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#l_s').attr('class') == 'b3') {
            $('#l_s')
              .removeClass()
              .addClass('b1')
          }
        }
        cn = true
        $('#other_span_endtime')
          .removeClass()
          .addClass('b2')
        if ($('#other_span_starttime').attr('class') == 'b4') {
          $('#other_span_starttime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_starttime').attr('class') == 'b3') {
            $('#other_span_starttime')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#other_span_lishi').attr('class') == 'b4') {
          $('#other_span_lishi')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_lishi').attr('class') == 'b3') {
            $('#other_span_lishi')
              .removeClass()
              .addClass('b1')
          }
        }
      }
      aJ = 'arrivedtime'
      aU()
    })
    $('#other_span_endtime').click(function () {
      if (cn) {
        $('#r_time')
          .removeClass()
          .addClass('b4')
        if ($('#s_time').attr('class') == 'b4') {
          $('#s_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#s_time').attr('class') == 'b3') {
            $('#s_time')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#l_s').attr('class') == 'b4') {
          $('#l_s')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#l_s').attr('class') == 'b3') {
            $('#l_s')
              .removeClass()
              .addClass('b1')
          }
        }
        cn = false
        $('#other_span_endtime')
          .removeClass()
          .addClass('b4')
        if ($('#other_span_starttime').attr('class') == 'b4') {
          $('#other_span_starttime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_starttime').attr('class') == 'b3') {
            $('#other_span_starttime')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#other_span_lishi').attr('class') == 'b4') {
          $('#other_span_lishi')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_lishi').attr('class') == 'b3') {
            $('#other_span_lishi')
              .removeClass()
              .addClass('b1')
          }
        }
      } else {
        $('#r_time')
          .removeClass()
          .addClass('b3')
        if ($('#s_time').attr('class') == 'b4') {
          $('#s_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#s_time').attr('class') == 'b3') {
            $('#s_time')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#l_s').attr('class') == 'b4') {
          $('#l_s')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#l_s').attr('class') == 'b3') {
            $('#l_s')
              .removeClass()
              .addClass('b1')
          }
        }
        cn = true
        $('#other_span_endtime')
          .removeClass()
          .addClass('b3')
        if ($('#other_span_starttime').attr('class') == 'b4') {
          $('#other_span_starttime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_starttime').attr('class') == 'b3') {
            $('#other_span_starttime')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#other_span_lishi').attr('class') == 'b4') {
          $('#other_span_lishi')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_lishi').attr('class') == 'b3') {
            $('#other_span_lishi')
              .removeClass()
              .addClass('b1')
          }
        }
      }
      aJ = 'arrivedtime'
      aU()
    })
    $('#l_s').click(function () {
      if (be) {
        $('#l_s')
          .removeClass()
          .addClass('b4')
        if ($('#r_time').attr('class') == 'b4') {
          $('#r_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#r_time').attr('class') == 'b3') {
            $('#r_time')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#s_time').attr('class') == 'b4') {
          $('#s_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#s_time').attr('class') == 'b3') {
            $('#s_time')
              .removeClass()
              .addClass('b1')
          }
        }
        be = false
        $('#other_span_lishi')
          .removeClass()
          .addClass('b4')
        if ($('#other_span_endtime').attr('class') == 'b4') {
          $('#other_span_endtime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_endtime').attr('class') == 'b3') {
            $('#other_span_endtime')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#other_span_starttime').attr('class') == 'b4') {
          $('#other_span_starttime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_starttime').attr('class') == 'b3') {
            $('#other_span_starttime')
              .removeClass()
              .addClass('b1')
          }
        }
      } else {
        $('#l_s')
          .removeClass()
          .addClass('b3')
        if ($('#r_time').attr('class') == 'b4') {
          $('#r_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#r_time').attr('class') == 'b3') {
            $('#r_time')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#s_time').attr('class') == 'b4') {
          $('#s_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#s_time').attr('class') == 'b3') {
            $('#s_time')
              .removeClass()
              .addClass('b1')
          }
        }
        be = true
        $('#other_span_lishi')
          .removeClass()
          .addClass('b3')
        if ($('#other_span_endtime').attr('class') == 'b4') {
          $('#other_span_endtime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_endtime').attr('class') == 'b3') {
            $('#other_span_endtime')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#other_span_starttime').attr('class') == 'b4') {
          $('#other_span_starttime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_starttime').attr('class') == 'b3') {
            $('#other_span_starttime')
              .removeClass()
              .addClass('b1')
          }
        }
      }
      aJ = 'lishi'
      aU()
    })
    $('#other_span_lishi').click(function () {
      if (be) {
        $('#l_s')
          .removeClass()
          .addClass('b4')
        if ($('#r_time').attr('class') == 'b4') {
          $('#r_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#r_time').attr('class') == 'b3') {
            $('#r_time')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#s_time').attr('class') == 'b4') {
          $('#s_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#s_time').attr('class') == 'b3') {
            $('#s_time')
              .removeClass()
              .addClass('b1')
          }
        }
        be = false
        $('#other_span_lishi')
          .removeClass()
          .addClass('b4')
        if ($('#other_span_endtime').attr('class') == 'b4') {
          $('#other_span_endtime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_endtime').attr('class') == 'b3') {
            $('#other_span_endtime')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#other_span_starttime').attr('class') == 'b4') {
          $('#other_span_starttime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_starttime').attr('class') == 'b3') {
            $('#other_span_starttime')
              .removeClass()
              .addClass('b1')
          }
        }
      } else {
        $('#l_s')
          .removeClass()
          .addClass('b3')
        if ($('#r_time').attr('class') == 'b4') {
          $('#r_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#r_time').attr('class') == 'b3') {
            $('#r_time')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#s_time').attr('class') == 'b4') {
          $('#s_time')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#s_time').attr('class') == 'b3') {
            $('#s_time')
              .removeClass()
              .addClass('b1')
          }
        }
        be = true
        $('#other_span_lishi')
          .removeClass()
          .addClass('b3')
        if ($('#other_span_endtime').attr('class') == 'b4') {
          $('#other_span_endtime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_endtime').attr('class') == 'b3') {
            $('#other_span_endtime')
              .removeClass()
              .addClass('b1')
          }
        }
        if ($('#other_span_starttime').attr('class') == 'b4') {
          $('#other_span_starttime')
            .removeClass()
            .addClass('b2')
        } else {
          if ($('#other_span_starttime').attr('class') == 'b3') {
            $('#other_span_starttime')
              .removeClass()
              .addClass('b1')
          }
        }
      }
      aJ = 'lishi'
      aU()
    })
  }
  closeTrainStop = function () {
    over_flag = false
    cl = 0
    $('#train_stop').hide()
    $('#train_table').html('')
  }
  hideTrainStop = function (cK) {
    over_flag = false
    if (q) {
      clearTimeout(q)
    }
    q = window.setTimeout(function () {
      if (cl != 1) {
        cl = 0
        $('#train_stop').hide()
        $('#train_table').html('')
      }
    }, 130)
  }
  checkHover = function (cL, cK) {
    if (getEvent(cL).type == 'mouseover') {
      return (
        !$.contains(
          cK,
          getEvent(cL).relatedTarget || getEvent(cL).fromElement
        ) && !((getEvent(cL).relatedTarget || getEvent(cL).fromElement) === cK)
      )
    } else {
      return (
        !$.contains(cK, getEvent(cL).relatedTarget || getEvent(cL).toElement) &&
        !((getEvent(cL).relatedTarget || getEvent(cL).toElement) === cK)
      )
    }
  }
  getEvent = function (cK) {
    return cK || window.event
  }
  checkHover = function (cL, cK) {
    if (getEvent(cL).type == 'mouseover') {
      return (
        !$.contains(
          cK,
          getEvent(cL).relatedTarget || getEvent(cL).fromElement
        ) && !((getEvent(cL).relatedTarget || getEvent(cL).fromElement) === cK)
      )
    } else {
      return (
        !$.contains(cK, getEvent(cL).relatedTarget || getEvent(cL).toElement) &&
        !((getEvent(cL).relatedTarget || getEvent(cL).toElement) === cK)
      )
    }
  }
  getEvent = function (cK) {
    return cK || window.event
  }
  function bV (cM, cK) {
    for (var cL = 0; cL < cK.length; cL++) {
      if (cK[cL].key == cM) {
        return true
      }
    }
    return false
  }
  function bE (cO) {
    var cT = function (cU) {
      this.value = cU
    }
    var cP = new Array()
    var cL = new Array()
    var cN = {}
    var cK = {}
    $('#cc_from_station_name_all>ul').html('')
    $('#cc_to_station_name_all>ul').html('')
    var cM
    var cS
    var cR
    for (var cQ = 0; cQ < cO.length; cQ++) {
      cM = cO[cQ].queryLeftNewDTO.from_station_name
      cS = cO[cQ].queryLeftNewDTO.to_station_name
      cR = cO[cQ]
      if (!cN[cM]) {
        cP.push(new cT(cM))
        cN[cM] = true
      }
      if (!cK[cS]) {
        cL.push(new cT(cS))
        cK[cS] = true
      }
    }
    $('#to_station_ul').html($.render.toStationNameTableTemplate(cL))
    $('#from_station_ul').html($.render.stationNameTableTemplate(cP))
    $("#sear-sel-bd input[name='cc_from_station']").click(function () {
      l(bW, 'cc_from_station_' + $(this).val())
      var cU = $("input[name='cc_from_station']")
      var cV = $("input[name='cc_from_station']:checked")
      if ($(this).is(':checked')) {
        if (cU && cV && cV.length == cU.length) {
          $('#from_station_name_all')
            .removeClass()
            .addClass('btn-all')
        } else {
          $('#from_station_name_all')
            .removeClass()
            .addClass('btn-all btn-all-sel')
        }
      } else {
        if (cU && cV && cV.length == 0) {
          $('#from_station_name_all')
            .removeClass()
            .addClass('btn-all')
        } else {
          $('#from_station_name_all')
            .removeClass()
            .addClass('btn-all btn-all-sel')
        }
      }
      aU()
    })
    $("#sear-sel-bd input[name='cc_to_station']").click(function () {
      l(bH, 'cc_to_station_' + $(this).val())
      var cU = $("input[name='cc_to_station']")
      var cV = $("input[name='cc_to_station']:checked")
      if ($(this).is(':checked')) {
        if (cU && cV && cV.length == cU.length) {
          $('#to_station_name_all')
            .removeClass()
            .addClass('btn-all')
        } else {
          $('#to_station_name_all')
            .removeClass()
            .addClass('btn-all btn-all-sel')
        }
      } else {
        if (cU && cV && cV.length == 0) {
          $('#to_station_name_all')
            .removeClass()
            .addClass('btn-all')
        } else {
          $('#to_station_name_all')
            .removeClass()
            .addClass('btn-all btn-all-sel')
        }
      }
      aU()
    })
  }
  submitOrderRequest = function (cL, cK) {
    $.ajax({
      type: 'post',
      url: ctx + 'login/checkUser',
      data: {},
      beforeSend: function (cM) {
        cM.setRequestHeader('If-Modified-Since', '0')
        cM.setRequestHeader('Cache-Control', 'no-cache')
      },
      success: function (cM) {
        var cP
        checkusermdId = cM.attributes
        if (cM.data.flag) {
          if (train_tour_flag == 'fc') {
            cP = $('#back_train_date').val()
          } else {
            cP = $('#train_date').val()
          }
          if (B == '0X00') {
            var cO = false
            for (i = studentComPerArr.length - 1; i >= 0; i = i - 2) {
              if (
                G(studentComPerArr[i - 1]) <= G(cP) &&
                G(studentComPerArr[i]) >= G(cP)
              ) {
                cO = true
                break
              }
            }
            if (!cO) {
              b(
                '学生票的乘车时间为每年的暑假6月1日至9月30日、寒假12月1日至3月31日，目前不办理学生票业务。'
              )
              return
            }
          }
          var cN = $('#fromStation').val()
          if (cN && cN == 'XJA') {
            dhtmlx.alert({
              title: '温馨提示',
              ok: '确定',
              text:
                '香港西九龙站乘车前需办理换取纸质车票、实名制验证、安全检查和出入境手续，请您预留足够时间，合理规划行程。',
              type: 'alert-warn',
              callback: function () {
                Z(cL, cK)
              }
            })
          } else {
            Z(cL, cK)
          }
        } else {
          $('.mask').fadeIn()
          $('.login-box .login-hd-code')
            .addClass('active')
            .siblings()
            .removeClass('active')
          $('.login-box .login-code')
            .show()
            .siblings()
            .hide()
          $('.login-box').slide({
            titCell: '.login-hd li',
            mainCell: '.login-bd',
            titOnClassName: 'active',
            trigger: 'click'
          })
          $('.modal-login')
            .css(
              'top',
              ($(window).height() - $('.modal-login').height()) / 2 +
                $(window).scrollTop() +
                'px'
            )
            .css(
              'left',
              ($(window).width() - $('.modal-login').width()) / 2 +
                $(window).scrollLeft() +
                'px'
            )
            .show()
          $.popup_initLogin(true)
          $('.modal-login').fadeIn()
          $.pop_secretStr = cL
          $.pop_start_time = cK
        }
      }
    })
  }
  function Z (cX, cQ) {
    var cK = ''
    if ($('#dc').is(':checked')) {
      cK = 'dc'
    } else {
      cK = 'wc'
    }
    if (train_tour_flag == 'fc') {
      cK = 'fc'
      var cN = cQ.split(':')
      var cM = $('#back_train_date').val() + '-' + cN[0] + '-' + cN[1] + '-00'
      try {
        if (roundReferTime) {
          if (G(roundReferTime) >= G(cM)) {
            b(
              '您预订的往程车票到站时间为' +
                G(roundReferTime).format('yyyy年MM月dd日 hh时mm分') +
                '，返回日期不能早于此时间'
            )
            return
          }
        }
      } catch (cS) {}
    }
    if (train_tour_flag == 'gc') {
      cK = 'gc'
    }
    if (typeof submitForm === 'undefined') {
      var cO =
        'secretStr=' +
        cX +
        '&train_date=' +
        $('#train_date').val() +
        '&back_train_date=' +
        $('#back_train_date').val() +
        '&tour_flag=' +
        cK +
        '&purpose_codes=' +
        cE() +
        '&query_from_station_name=' +
        $('#fromStationText').val() +
        '&query_to_station_name=' +
        $('#toStationText').val() +
        '&' +
        cV
    } else {
      var cL = submitForm()
      var cW = cL.split(':::')
      var cR = cW[0].split(',-,')[0]
      var cU = cW[0].split(',-,')[1]
      var cP = cW[1].split(',-,')[0]
      var cT = cW[1].split(',-,')[1]
      var cO =
        escape(cR) +
        '=' +
        escape(cU) +
        '&' +
        cP +
        '=' +
        cT +
        '&secretStr=' +
        cX +
        '&train_date=' +
        $('#train_date').val() +
        '&back_train_date=' +
        $('#back_train_date').val() +
        '&tour_flag=' +
        cK +
        '&purpose_codes=' +
        cE() +
        '&query_from_station_name=' +
        $('#fromStationText').val() +
        '&query_to_station_name=' +
        $('#toStationText').val() +
        '&' +
        cV
    }
    var cV =
      checkusermdId != undefined
        ? '&_json_att=' + encodeURIComponent(checkusermdId)
        : ''
    $.ajax({
      type: 'post',
      url: ctx + 'leftTicket/submitOrderRequest',
      data: cO,
      async: false,
      success: function (cY) {
        if (cY.status) {
          if (cY.data == 'Y') {
            dhtmlx.alert({
              title: '温馨提示',
              ok: '确定',
              text:
                '您选择的列车距开车时间很近了，请确保有足够的时间抵达车站，并办理换取纸质车票、安全检查、实名制验证及检票等手续，以免耽误您的旅行。',
              type: 'alert-warn',
              callback: function () {
                bc(cK, train_tour_flag)
              }
            })
          } else {
            bc(cK, train_tour_flag)
          }
        }
      }
    })
  }
  function bc (cL, cK) {
    if (cK != null) {
      if (cK == 'fc') {
        otsRedirect('post', ctx + 'confirmPassenger/initFc', {})
        return
      }
      if (cK == 'gc') {
        otsRedirect('post', ctx + 'confirmPassenger/initGc', {})
        return
      }
    }
    if (cL == 'dc') {
      otsRedirect('post', ctx + 'confirmPassenger/initDc', {})
    } else {
      otsRedirect('post', ctx + 'confirmPassenger/initWc', {})
    }
  }
  var cF = $('#fromStation').val()
  var bv = $('#toStation').val()
  var ci = $.trim($('#train_date').val())
  bo = cF + bv + ci
  $('#add-train').click(function () {
    if ($('#fromStationText').val() == '简拼/全拼/汉字') {
      dhtmlx.alert({
        title: '输入车次',
        ok: '确定',
        text: '请填写出发地！',
        type: 'alert-error'
      })
      return
    }
    if ($('#toStationText').val() == '简拼/全拼/汉字') {
      dhtmlx.alert({
        title: '输入车次',
        ok: '确定',
        text: '请填写目的地！',
        type: 'alert-error'
      })
      return
    }
    var cN = $('#prior_train span[name="prior_train-span"]').length
    var cO = $.trim($('#inp-train').val()).toUpperCase()
    if (cO.length == 0 || cO == '请输入') {
      dhtmlx.alert({
        title: '输入车次',
        ok: '确定',
        text: '请输入车次',
        type: 'alert-error',
        callback: function () {
          $('#inp-train').val('')
          $('#inp-train').focus()
        }
      })
    } else {
      if (cN < 6) {
        var cL = /^[a-zA-Z0-9]+$/
        var cM = /^[0-9]+$/
        if (!cL.test(cO)) {
          dhtmlx.alert({
            title: '输入车次',
            ok: '确定',
            text: '车次格式输入错误！',
            type: 'alert-error',
            callback: function () {
              ccInputSelected = true
              $('#inp-train').select()
            }
          })
        } else {
          if (cM.test(cO) && cO.length > 4) {
            dhtmlx.alert({
              title: '输入车次',
              ok: '确定',
              text: '车次格式输入错误！',
              type: 'alert-error',
              callback: function () {
                ccInputSelected = true
                $('#inp-train').select()
              }
            })
          } else {
            if (cO.length < 2) {
              dhtmlx.alert({
                title: '输入车次',
                ok: '确定',
                text: '车次格式输入错误！',
                type: 'alert-error',
                callback: function () {
                  ccInputSelected = true
                  $('#inp-train').select()
                }
              })
            } else {
              if ($.inArray(cO, ccSelected) < 0) {
                var cK =
                  "<span name='prior_train-span' class='sel-box w80'>" +
                  cO +
                  "<a class='close' href='javascript:' onclick='$.removeSel(this,\"" +
                  cO +
                  '",4)\'></a></span>'
                $('#prior_train').append(cK)
                ccSelected.push(cO)
                $('#inp-train').val('')
              } else {
                dhtmlx.alert({
                  title: '输入车次',
                  ok: '确定',
                  text: '此车次已经添加过！',
                  type: 'alert-error',
                  callback: function () {
                    ccInputSelected = true
                    $('#inp-train').select()
                  }
                })
              }
            }
          }
        }
      } else {
        dhtmlx.alert({
          title: '输入车次',
          ok: '确定',
          text: '最多添加5个优先车次',
          type: 'alert-error'
        })
        $('#inp-train').val('')
      }
    }
  })
  function cE () {
    if ($('#sf2').is(':checked')) {
      return '0X00'
    } else {
      return 'ADULT'
    }
  }
  $('#yxtrain_close').click(function (cK) {
    $('#yxtraindiv').hide()
  })
  $('#yxtrain_a_close').click(function (cK) {
    $('#yxtraininput').val('')
    $('#yxtraininput').trigger('keyup')
  })
  $('#passenger_a_close').click(function (cK) {
    $('#searchPassenger').val('')
    $('#searchPassenger').trigger('keyup')
  })
  $('#yxtraininput').bind('keyup', function () {
    var cL = $(this)
      .val()
      .toUpperCase()
    var cK = $('#yxtrain_code').height()
    if (y(cL, 0)) {
      cJ(1)
    } else {
      cJ(3)
    }
    $('#yxtrain_code').css('height', cK)
  })
  function cJ (cK) {
    $('#yxtrain_loading').hide()
    $('#yxtrain_code').hide()
    $('#yxTrain_page').hide()
    $('#yxtrain_empty').hide()
    if (cK == 1) {
      $('#yxtrain_code').show()
      $('#yxTrain_page').show()
    } else {
      if (cK == 2) {
        $('#yxtrain_loading').show()
      } else {
        if (cK == 3) {
          $('#yxtrain_empty').show()
        }
      }
    }
  }
  function y (cY, cK) {
    cY = cY.toUpperCase()
    var cU = []
    var cZ = $('#prior_train span:gt(1)')
    if (cZ && cZ.length > 0) {
      for (var cN = 0; cN < cZ.length; cN++) {
        cU.push(cZ[cN].innerText)
      }
    }
    var cX = []
    var cT = []
    if (trainListForIE && trainListForIE.length > 0) {
      for (var cL = 0; cL < trainListForIE.length; cL++) {
        cX.push(trainListForIE[cL])
        cT.push(trainListForIE[cL])
      }
    }
    if (cY) {
      for (var cN = 0; cN < cT.length; cN++) {
        var cS = cT[cN].substring(0, cT[cN].indexOf('('))
        if (cS.indexOf(cY) <= -1) {
          cX.splice($.inArray(cT[cN], cX), 1)
        }
      }
    }
    if (cX && cX.length > 0) {
      var cP = ''
      for (var cN = 0; cN < cX.length; cN++) {
        var cS = cX[cN]
        var cO = cS.indexOf('(') > -1 ? cS.substring(0, cS.indexOf('(')) : cS
        var cV = cN >= yxTrainPageSize * cK && cN < yxTrainPageSize * (cK + 1)
        if (cV) {
          if (cO.indexOf(cY) > -1) {
            var cR = cS.indexOf(cY)
            var cQ = cS.substring(0, cR)
            var cW = cS.substring(cR + cY.length, cS.indexOf('('))
            var cM = cS.substring(cS.indexOf('('))
            if (cU && cU.length > 0 && $.inArray(cO, cU) > -1) {
              cP +=
                '<li style="width: 140px;" traincode=' +
                cO +
                ' name="yxtrainli" class="cur"><span style="font-size:15px;">' +
                cQ +
                '<span style="color:red;">' +
                cY +
                '</span>' +
                cW +
                '</span>' +
                cM +
                '</li>'
            } else {
              cP +=
                '<li style="width: 140px;" traincode=' +
                cO +
                ' name="yxtrainli"><span style="font-size:15px;">' +
                cQ +
                '<span style="color:red;">' +
                cY +
                '</span>' +
                cW +
                '</span>' +
                cM +
                '</li>'
            }
          }
        }
      }
      $('#yxtrain_code').html(cP)
    } else {
      return false
    }
    if (cX.length > 0) {
      I(cK, cX.length)
    }
    $('li[name="yxtrainli"]').click(function () {
      if ($(this).attr('class') == 'cur') {
        var c2 = $('span[name="prior_train-span"]')
        for (var c0 = 0; c0 < c2.length; c0++) {
          var c1 = $(c2[c0]).html()
          if (c1.indexOf($(this).attr('traincode')) > -1) {
            $(c2[c0])
              .children()
              .click()
          }
        }
        $(this).removeClass()
      } else {
        $('#inp-train').val($(this).attr('traincode'))
        var c3 = $('#prior_train span[name="prior_train-span"]').length
        $('#add-train').click()
        if (c3 < 6) {
          $(this).attr('class', 'cur')
          $.chooseAutoSubmit()
        }
      }
    })
    return true
  }
  function I (cK, cL) {
    var cM = Math.ceil(cL / yxTrainPageSize)
    $('#yxTrain_page')
      .html(aQ(cK, cM))
      .show()
  }
  function aQ (cS, cN) {
    var cO = ''
    cO +=
      cS == 0
        ? ''
        : '<a href="javascript:void(0);" onclick="$.click_YX_page(' +
          (cS - 1) +
          ')" class="prev">上一页</a>'
    var cT = cS + 1
    var cP = cN
    var cQ = 2
    var cR = 5
    var cK = cT - cQ > 0 ? (cT + cQ > cP ? cP - cR + 1 : cT - cQ) : 1
    var cL = cK + cR > cP ? cP + 1 : cK + cR
    if (cP < cR) {
      for (var cM = 1; cM < cP + 1; cM++) {
        if (cT == cM) {
          cO +=
            '<a href="javascript:void(0);" onclick="$.click_YX_page(' +
            (cM - 1) +
            ')" class="on">' +
            cM +
            '</a>'
        } else {
          cO +=
            '<a href="javascript:void(0);" onclick="$.click_YX_page(' +
            (cM - 1) +
            ')">' +
            cM +
            '</a>'
        }
      }
    } else {
      for (var cM = cK; cM < cL; cM++) {
        if (cT == cM) {
          cO +=
            '<a href="javascript:void(0);" onclick="$.click_YX_page(' +
            (cM - 1) +
            ')" class="on">' +
            cM +
            '</a>'
        } else {
          cO +=
            '<a href="javascript:void(0);" onclick="$.click_YX_page(' +
            (cM - 1) +
            ')">' +
            cM +
            '</a>'
        }
      }
    }
    cO +=
      cS == cN - 1
        ? ''
        : '<a href="javascript:void(0);" onclick="$.click_YX_page(' +
          (cS + 1) +
          ')" class="next">下一页</a>'
    return cO
  }
  function bn (cS, cN) {
    if (cN == 0) {
      return ''
    }
    var cO = ''
    cO +=
      cS == 0
        ? ''
        : '<a href="javascript:void(0);" onclick="$.click_passenger_page(' +
          (cS - 1) +
          ')" class="prev">上一页</a>'
    var cT = cS + 1
    var cP = cN
    var cQ = 2
    var cR = 5
    var cK = cT - cQ > 0 ? (cT + cQ > cP ? cP - cR + 1 : cT - cQ) : 1
    var cL = cK + cR > cP ? cP + 1 : cK + cR
    if (cP < cR) {
      for (var cM = 1; cM < cP + 1; cM++) {
        if (cT == cM) {
          cO +=
            '<a href="javascript:void(0);" onclick="$.click_passenger_page(' +
            (cM - 1) +
            ')" class="on">' +
            cM +
            '</a>'
        } else {
          cO +=
            '<a href="javascript:void(0);" onclick="$.click_passenger_page(' +
            (cM - 1) +
            ')">' +
            cM +
            '</a>'
        }
      }
    } else {
      for (var cM = cK; cM < cL; cM++) {
        if (cT == cM) {
          cO +=
            '<a href="javascript:void(0);" onclick="$.click_passenger_page(' +
            (cM - 1) +
            ')" class="on">' +
            cM +
            '</a>'
        } else {
          cO +=
            '<a href="javascript:void(0);" onclick="$.click_passenger_page(' +
            (cM - 1) +
            ')">' +
            cM +
            '</a>'
        }
      }
    }
    cO +=
      cS == cN - 1
        ? ''
        : '<a href="javascript:void(0);" onclick="$.click_passenger_page(' +
          (cS + 1) +
          ')" class="next">下一页</a>'
    return cO
  }
  function cE () {
    if ($('#sf2').is(':checked')) {
      return '0X00'
    } else {
      return 'ADULT'
    }
  }
  jQuery.extend({
    todo_submitOrderRe: function (cL, cK) {
      Z(cL, cK)
    },
    chooseAutoSubmit: function () {
      if (!$('#autoSubmit').is(':disabled')) {
        if (!$('#autoSubmit').is(':checked')) {
          $('#autoSubmit').click()
        }
      }
    },
    init_ul4li: function () {
      var cK = []
      var cM = 0
      cK[cM++] =
        '<li><input name="cc_type" value="G" type="checkbox" class="check" /><label for="">GC-高铁/城际</label></li>'
      cK[cM++] =
        '<li><input name="cc_type" value="D" type="checkbox" class="check" /><label for="">D-动车</label></li>'
      cK[cM++] =
        '<li><input name="cc_type" value="Z" type="checkbox" class="check" /><label for="">Z-直达</label></li>'
      cK[cM++] =
        '<li><input name="cc_type" value="T" type="checkbox" class="check" /><label for="">T-特快</label></li>'
      cK[cM++] =
        '<li><input name="cc_type" value="K" type="checkbox" class="check" /><label for="">K-快速</label></li>'
      cK[cM++] =
        '<li><input name="cc_type" value="QT" type="checkbox" class="check" /><label for="">其他</label></li>'
      $('#_ul_station_train_code').html(cK.join(''))
      if (train_tour_flag == 'gc' && isDwTicketResign == 'Y') {
        var cO = $('#_ul_station_train_code li')
        for (var cL = 2, cN = cO.length; cL < cN; cL++) {
          cO.eq(cL)
            .find('input')
            .attr('disabled', 'disabled')
          cO.eq(cL)
            .find('label')
            .attr('for', '')
            .attr('style', 'color: rgb(153, 153, 153)')
        }
      }
      $('#startendtime').html(
        '<span class="b1" id="s_time">出发时间</span><br /><span class="b2" id="r_time">到达时间</span>'
      )
      $('#floatstartendtime').html(
        '<span class="b1" id="other_span_starttime">出发时间</span><br /><span class="b2" id="other_span_endtime">到达时间</span>'
      )
    },
    parseDateFormat: function (cO) {
      var cK = ''
      var cL = cO.getFullYear()
      var cN = cO.getMonth() + 1
      var cM = cO.getDate()
      if (cN < 10) {
        cN = '0' + cN
      }
      if (cM < 10) {
        cM = '0' + cM
      }
      cK = cL + '-' + cN + '-' + cM
      return cK
    },
    renderPassenger: function (c2) {
      if (!c2) {
        c2 = 0
      }
      if (passengerAll) {
        var cO = $('#searchPassenger').val()
        var cK = []
        if (cO != '' && cO != '输入乘客姓名') {
          var c0 = passengerAll.length
          for (var cX = 0; cX < c0; cX++) {
            var cW = passengerAll[cX]
            if (
              cW.passenger_name.indexOf(cO) > -1 ||
              (cW.first_letter &&
                cW.first_letter.toUpperCase().indexOf(cO.toUpperCase()) > -1)
            ) {
              cK.push(cW)
            }
          }
        } else {
          cK = passengerAll.slice(
            passengerPageSize * c2,
            Math.min(passengerPageSize * (c2 + 1), passengerAll.length)
          )
        }
        var cV = cK.length
        var cT = []
        var cP = 0
        for (var cX = 0; cX < cV; cX++) {
          var cW = cK[cX]
          var c1 = cW.passenger_type_name
          if (!c1) {
            c1 = ''
          }
          var cN = ''
          var cL = ''
          if ($('#sf2').is(':checked')) {
            if (cW.passenger_type != '3') {
              cN = " disabled='true' "
              cL = " class='color999' "
            }
          }
          var cS = cW.total_times
          if (cW.passenger_id_type_code == '2') {
            cN = " disabled='true' "
            cL = " class='color999' title='请修改身份信息' "
          } else {
            if (cW.passenger_id_type_code == '1') {
              if (!isCanGP('1', cS)) {
                cN = " disabled='true' "
                cL = " class='color999' title='请修改身份信息' "
              }
            } else {
              if (!isCanGP('B', cS)) {
                cN = " disabled='true' "
                cL = " class='color999' title='请修改身份信息' "
              }
              if (!isCanGP('H', cS)) {
                cN = " disabled='true' "
                cL = " class='color999' title='请修改身份信息' "
              }
            }
          }
          var cU =
            c1 == '成人'
              ? cW.passenger_name
              : cW.passenger_name + '(' + c1 + ')'
          cU = cU.substring(0, 9)
          if (cO != '' && cO != '输入乘客姓名') {
            if (
              cW.passenger_name.indexOf(cO) > -1 ||
              (cW.first_letter &&
                cW.first_letter.toUpperCase().indexOf(cO.toUpperCase()) > -1)
            ) {
              cP++
              if ($.pHasInSelected(cW)) {
                if (cL) {
                  var cR = cL.indexOf("'")
                  cL = cL.substring(0, cR + 1) + 'cur ' + cL.substring(cR + 1)
                } else {
                  cL = "class='cur'"
                }
              }
              cT[cX] =
                "<li style='width:110px' " +
                cL +
                " p_value='" +
                cW.passenger_name +
                '(' +
                c1 +
                ')(' +
                cW.passenger_id_no +
                ")' name='" +
                cW.passenger_type +
                "' codeType='" +
                cW.passenger_id_type_code +
                "' flag='" +
                cW.total_times +
                "'>" +
                cU +
                '</li>'
            }
          } else {
            cP++
            if ($.pHasInSelected(cW)) {
              if (cL) {
                var cR = cL.indexOf("'")
                cL = cL.substring(0, cR) + 'cur ' + cL.substring(cR)
              } else {
                cL = "class='cur'"
              }
            }
            cT[cX] =
              "<li style='width:110px' " +
              cL +
              " p_value='" +
              cW.passenger_name +
              '(' +
              c1 +
              ')(' +
              cW.passenger_id_no +
              ")'  name='" +
              cW.passenger_type +
              "' codeType='" +
              cW.passenger_id_type_code +
              "' flag='" +
              cW.total_times +
              "'>" +
              cU +
              '</li>'
          }
        }
        var cY = 100
        var cZ = 0
        if (cP / 3 > 11) {
          cY = 310
          cZ = 258
        } else {
          cY = 100 + parseInt((cP / 3) * 25)
          cZ = cY - 48
        }
        $('#sel-buyer').css('height', cY)
        $('#pContent').css('height', cZ)
        $('#buyer-list').html(cT.join(''))
        var cM = 0
        if (cO != '' && cO != '输入乘客姓名') {
          cM = cK.length
        } else {
          cM = passengerAll.length
        }
        var cQ = Math.ceil(cM / passengerPageSize)
        $('#passenger_page')
          .html(bn(c2, cQ))
          .show()
      }
      $('#buyer-list li').click(function () {
        if ($(this).hasClass('color999')) {
          return
        }
        var c5 = $('#setion_postion span').length
        var c7 = $(this).attr('p_value')
        if (!$(this).hasClass('cur')) {
          if (c5 < 6) {
            var c3 = ''
            var c4 = true
            if (
              c7.indexOf('成人') > -1 ||
              c7.indexOf('残疾军人、伤残人民警察') > -1
            ) {
              c3 =
                "<span name='" +
                c7 +
                "' class='sel-box w80'><a href='javascript:' onclick='$.addChildPassenger(\"" +
                c7 +
                "\");' style='position:static;background:none;width:auto;' title='您可点击此乘车人添加儿童票。'>" +
                c7 +
                "</a><a class='close' href='javascript:' onclick='$.removeSel(this,\"" +
                c7 +
                '",1)\'></a></span>'
              $('#setion_postion').append(c3)
              $.checkedPasseanger(c7)
            } else {
              if (c7.indexOf('学生') > -1) {
                var c6 = $(this)
                if ($.checkSeatTypes()) {
                  c3 =
                    "<span name='" +
                    c7 +
                    "' class='sel-box w80'>" +
                    c7 +
                    "<a class='close' href='javascript:' onclick='$.removeSel(this,\"" +
                    c7 +
                    '",1)\'></a></span>'
                  $('#setion_postion').append(c3)
                  $.checkedPasseanger(c7)
                } else {
                  $('#conifrmdialog_student_to_adult_context').html(
                    '当前选择的优先席别有不支持学生票的，是否选择购买成人票？'
                  )
                  dhtmlx.createWin({
                    winId: 'confirmChangeStudentToAdult',
                    closeWinId: [
                      'close_conifrmdialog_student_to_adult',
                      'cancel_dialog_student_to_adult'
                    ],
                    callback: function () {
                      $(c6).prop('checked', false)
                    },
                    okId: 'goto_student_to_adult',
                    okCallBack: function () {
                      var c8 = c7.replace(/学生/, '成人')
                      c3 =
                        "<span name='" +
                        c7 +
                        "' class='sel-box w80'>" +
                        c8 +
                        "<a class='close' href='javascript:' onclick='$.removeSel(this,\"" +
                        c7 +
                        '",1)\'></a></span>'
                      $('#setion_postion').append(c3)
                      $.checkedPasseanger(c8)
                    }
                  })
                }
              } else {
                if (c7.indexOf('儿童') > -1) {
                  c3 =
                    "<span name='" +
                    c7 +
                    "' class='sel-box w80' title='如需修改旅客类型，请修改相应常用联系人信息。'>" +
                    c7 +
                    "<a class='close' href='javascript:' onclick='$.removeSel(this,\"" +
                    c7 +
                    '",1)\'></a></span>'
                  $('#setion_postion').append(c3)
                  $.checkedPasseanger(c7)
                } else {
                  c3 =
                    "<span name='" +
                    c7 +
                    "' class='sel-box w80'>" +
                    c7 +
                    "<a class='close' href='javascript:' onclick='$.removeSel(this,\"" +
                    c7 +
                    '",1)\'></a></span>'
                  $('#setion_postion').append(c3)
                  $.checkedPasseanger(c7)
                }
              }
            }
            $(this).addClass('cur')
            $.chooseAutoSubmit()
          } else {
            dhtmlx.alert({
              title: '添加常用联系人',
              ok: '确定',
              text: '最多添加5位联系人',
              type: 'alert-error'
            })
            $(this).removeClass('cur')
          }
        } else {
          $.each($('#setion_postion span'), function (c8, c9) {
            if (c7 == $(c9).attr('name')) {
              $(c9).remove()
              $.removePasseanger(c7)
            }
          })
          $(this).removeClass('cur')
        }
      })
    },
    reloadPassenger: function () {
      var cK = dhtmlx.modalbox({
        targSrc:
          '<div><img src="' +
          ctx +
          'resources/images/loading.gif"></img></div>',
        callback: function () {}
      })
      $.ajax({
        type: 'post',
        isTakeParam: false,
        cache: false,
        async: false,
        url: ctx + 'confirmPassenger/getPassengerDTOs',
        timeout: 10000,
        error: function (cL, cN, cM) {
          dhtmlx.modalbox.hide(cK)
        },
        success: function (cL) {
          dhtmlx.modalbox.hide(cK)
          if (cL.status) {
            if (cL.data.noLogin == 'true') {
              $('.mask').fadeIn()
              $('.login-box .login-hd-code')
                .addClass('active')
                .siblings()
                .removeClass('active')
              $('.login-box .login-code')
                .show()
                .siblings()
                .hide()
              $('.login-box').slide({
                titCell: '.login-hd li',
                mainCell: '.login-bd',
                titOnClassName: 'active',
                trigger: 'click'
              })
              $('.modal-login')
                .css(
                  'top',
                  ($(window).height() - $('.modal-login').height()) / 2 +
                    $(window).scrollTop() +
                    'px'
                )
                .css(
                  'left',
                  ($(window).width() - $('.modal-login').width()) / 2 +
                    $(window).scrollLeft() +
                    'px'
                )
                .show()
              $.popup_initLogin(true)
              $('.modal-login').fadeIn()
            } else {
              if (
                cL.data.exMsg != '' &&
                cL.data.exMsg != null &&
                cL.data.exMsg != 'null'
              ) {
                b(cL.data.exMsg)
                return
              }
              $('#sel-buyer').show()
              $('#sel-seat').hide()
              $('#sel-date').hide()
              $('#sel-buyer').css('left', $('#sear-sel').position().left + 80)
              $('#sel-buyer').css('left', $('#sear-sel').position().left + 80)
              $('#sel-buyer').css(
                'top',
                $('#sear-sel').position().top + 4 * 28 + 16
              )
              passengerAll = cL.data.normal_passengers
              if (!(passengerAll && passengerAll.length > 0)) {
                passengerAll = []
              }
              var cO = cL.data.dj_passengers
              if (cO && cO.length > 0) {
                var cN = cO.length
                for (var cM = 0; cM < cN; cM++) {
                  if (!$.checkIsHas(passengerAll, cO[cM])) {
                    passengerAll.push(cO[cM])
                  }
                }
              }
              two_isOpenClick = cL.data.two_isOpenClick
              other_isOpenClick = cL.data.other_isOpenClick
              $.renderPassenger()
            }
          }
        }
      })
    },
    checkIsHas: function (cM, cN) {
      var cL = cM.length
      for (var cK = 0; cK < cL; cK++) {
        if (
          cM[cK].passenger_name == cN.passenger_name &&
          cM[cK].passenger_id_type_code == cN.passenger_id_type_code &&
          cN.passenger_id_no == cM[cK].passenger_id_no
        ) {
          return true
        }
      }
      return false
    },
    pHasInSelected: function (cN) {
      var cL = passengerChecked.length
      if (cL > 0) {
        for (var cK = 0; cK < cL; cK++) {
          var cM = passengerChecked[cK]
          if (
            cM.passenger_name == cN.passenger_name &&
            cM.passenger_id_type_code == cN.passenger_id_type_code &&
            cM.passenger_id_no == cN.passenger_id_no
          ) {
            return true
          }
        }
      }
      return false
    },
    showSelectBuyer: function () {
      $('#sel-seat').hide()
      $('#yxtraindiv').hide()
      $('#sel-date').hide()
      if (!passengerAll) {
        $.reloadPassenger()
      } else {
        var cK = $('#buyer-list li')
        for (var cL = 0; cL < cK.length; cL++) {
          var cN = $(cK[cL]).attr('name')
          var cM = $(cK[cL]).attr('codeType')
          var cO = $(cK[cL]).attr('flag')
          if ($('#sf2').is(':checked')) {
            if (cN != '3') {
              $(cK[cL]).addClass('color999')
            } else {
              $(cK[cL]).removeClass('color999')
            }
          } else {
            $(cK[cL]).removeClass('color999')
          }
          if (cM == '2') {
            $(cK[cL]).addClass('color999')
          } else {
            if (cM == '1') {
              if (!isCanGP('1', cO)) {
                $(cK[cL]).addClass('color999')
              }
            } else {
              if (!isCanGP('B', cO)) {
                $(cK[cL]).addClass('color999')
              }
              if (!isCanGP('H', cO)) {
                $(cK[cL]).addClass('color999')
              }
            }
          }
        }
        $('#sel-buyer').show()
        $('#sel-buyer').css('left', $('#sear-sel').position().left + 80)
        $('#sel-buyer').css('top', $('#sear-sel').position().top + 4 * 28 + 16)
      }
    },
    click_YX_page: function (cL) {
      var cM = $('#yxtraininput')
        .val()
        .toUpperCase()
      var cK = $('#yxtrain_code').height()
      if (y(cM, cL)) {
        cJ(1)
      } else {
        cJ(3)
      }
      $('#yxtrain_code').css('height', cK)
    },
    click_passenger_page: function (cK) {
      $.renderPassenger(cK)
    },
    hbgetDateDiff: function (cN, cM) {
      var cL = new Date(
        cN.substring(0, 4) +
          '/' +
          cN.substring(5, 7) +
          '/' +
          cN.substring(8, 10)
      ).getTime()
      var cK = new Date(
        cM.substring(0, 4) +
          '/' +
          cM.substring(5, 7) +
          '/' +
          cM.substring(8, 10)
      ).getTime()
      return Math.abs((cK - cL) / 1000 / 60 / 60 / 24)
    },
    isCanChangeHBDate: function () {
      var cL = $('.cart-tlist li')
      if (cL.length == 0) {
        return true
      }
      var cM = ''
      for (var cK = 0; cK < cL.length; cK++) {
        var cO = $(cL[cK])
          .attr('hbid')
          .split('#')[0]
        if (cM.indexOf(cO) == -1) {
          cM += cO
        }
      }
      if (yxTrainChange) {
        if (
          $('#fromStationText').val() != yxTrainChange.split('#')[0] ||
          $('#toStationText').val() != yxTrainChange.split('#')[1]
        ) {
          $('#hb_msg').html(hb_date_msg_station)
          dhtmlx.createWin({
            winId: 'hb_info',
            closeWinId: ['hb_info_close', 'hb_info_cancel'],
            okId: 'hb_info_ok',
            callback: function () {},
            okCallBack: function () {
              $('#hbClear').click()
              $('#query_ticket').click()
            }
          })
          return false
        }
      }
      if (cM == '' || cM.indexOf($('#train_date').val()) > -1) {
        return true
      }
      var cN = $.hbgetDateDiff(cM, $('#train_date').val())
      if (cM.length / 10 == 2) {
        dhtmlx.alert({
          title: '提示',
          ok: '确定',
          text: hb_date_msg,
          type: 'alert-error'
        })
        return false
      }
      if (cN != 1) {
        dhtmlx.alert({
          title: '提示',
          ok: '确定',
          text: hb_date_msg_diff,
          type: 'alert-error'
        })
        return false
      }
      return true
    },
    showYxTrain: function () {
      if (!$.isCanChangeHBDate()) {
        return
      }
      $('#yxtrain_code').css('height', 'auto')
      $('#yxtrain_code li').removeClass()
      $('#yxtraininput').val('')
      $('#yxtraindiv')
        .css(
          'top',
          $('#showYxTrainSpan').offset().top +
            $('#showYxTrainSpan').outerHeight()
        )
        .css('left', $('#showYxTrainSpan').offset().left)
        .show()
      cJ(2)
      var cM =
        $('#fromStationText').val() +
        '#' +
        $('#toStationText').val() +
        '#' +
        $('#train_date').val()
      if (trainListForIE.length == 0 || yxTrainChange != cM) {
        B = cE()
        var cO = B == '0X00'
        var cL =
          train_tour_flag == 'fc'
            ? $.trim($('#back_train_date').val())
            : $.trim($('#train_date').val())
        var cK = b4(cL, cO)
        if (!cK) {
          $('#yxtraindiv').hide()
          return
        }
        var cN = {
          'leftTicketDTO.train_date': cL,
          'leftTicketDTO.from_station': $('#fromStation').val(),
          'leftTicketDTO.to_station': $('#toStation').val(),
          purpose_codes: B
        }
        bb()
        $.ajax({
          type: 'get',
          isTakeParam: false,
          beforeSend: function (cP) {
            cP.setRequestHeader('If-Modified-Since', '0')
            cP.setRequestHeader('Cache-Control', 'no-cache')
          },
          url: ctx + CLeftTicketUrl,
          data: cN,
          timeout: 10000,
          success: function (cR) {
            if (cR.status) {
              if (cR.data == null || cR.data.length == 0) {
                cJ(3)
                trainListForIE = []
                return
              }
              if (cR.data.flag == 1) {
                cR.data = co(cR.data.result, cR.data.map)
              }
              trainListForIE = []
              for (var cS = 0; cS < cR.data.length; cS++) {
                trainListForIE.push(
                  cR.data[cS].queryLeftNewDTO.station_train_code +
                    '(' +
                    cR.data[cS].queryLeftNewDTO.start_time +
                    '--' +
                    cR.data[cS].queryLeftNewDTO.arrive_time +
                    ')'
                )
              }
              if (train_tour_flag == 'gc' && isDwTicketResign == 'Y') {
                var cY = []
                for (var cS = 0, cZ = cR.data.length; cS < cZ; cS++) {
                  var cQ = cR.data[cS].queryLeftNewDTO
                  var cV = cQ.station_train_code
                  cV = cV.substring(0, 1)
                  if (cV == 'G' || cV == 'D') {
                    cY.push(cR.data[cS])
                  }
                }
                cR.data = cY
              }
              if ($('#DW_SHOW_STR')[0]) {
                $('#DW_SHOW_STR').remove()
              }
              if ($('#hainan_limit_msg')[0]) {
                $('#hainan_limit_msg').remove()
              }
              $('#sear-sel').show()
              $('#sear-result').show()
              $('#t-list').show()
              $('#no_filter_ticket_2').hide()
              $('#no_filter_ticket_6').hide()
              $('#no_filter_ticket').hide()
              var cP = ''
              var cU = ''
              if (train_tour_flag != null && train_tour_flag == 'fc') {
                var cX = '<strong>'
                  .concat($('#fromStationText').val())
                  .concat(' --> ')
                  .concat($('#toStationText').val())
                  .concat('（')
                  .concat(aP($('#back_train_date').val()))
                  .concat('）</strong>共计<strong id="trainum">')
                  .concat(cR.data.length)
                  .concat('</strong>个车次')
                if (ch(cR.data)) {
                  cP =
                    "<p class='ad-gt' id='DW_SHOW_STR' data='1'>高铁动卧 夕发朝至 风雨无阻 省时省钱</p>"
                } else {
                  if (hainan_limit_msg && an(cN, cR.data)) {
                    cU =
                      "<p class='ad-gt' id='hainan_limit_msg'  style='font-size:13px;background:#fff6f6 left center no-repeat;font-weight:bold'>" +
                      hainan_limit_msg +
                      '</p>'
                  }
                }
                if ($('#auto_query').is(':checked')) {
                  var cW = ''
                  for (var cT = 0; cT < 25; cT++) {
                    cW = cW + '&nbsp;'
                  }
                  cX = cX.concat(
                    cW +
                      "<input type='checkbox' class='check' id='filterTic' /><div id='filterTicDiv' style='display:inline'><strong><label for='filterTic' style='cursor: pointer;'>仅查看刷到车次</label></strong></div>"
                  )
                }
                $('#sear-result>p').html(cX)
                if ($('#auto_query').is(':checked')) {
                  $('#filterTic').bind('click', bx)
                }
              } else {
                var cX = '<strong>'
                  .concat($('#fromStationText').val())
                  .concat(' --> ')
                  .concat($('#toStationText').val())
                  .concat('（')
                  .concat(aP($('#train_date').val()))
                  .concat('）</strong>共计<strong id="trainum">')
                  .concat(cR.data.length)
                  .concat('</strong>个车次')
                if (ch(cR.data)) {
                  cP =
                    "<p class='ad-gt' id='DW_SHOW_STR' data='1'>高铁动卧 夕发朝至 风雨无阻 省时省钱</p>"
                } else {
                  if (hainan_limit_msg && an(cN, cR.data)) {
                    cU =
                      "<p class='ad-gt' id='hainan_limit_msg'  style='font-size:13px;background:#fff6f6 left center no-repeat;font-weight:bold'>" +
                      hainan_limit_msg +
                      '</p>'
                  }
                }
                if ($('#auto_query').is(':checked')) {
                  var cW = ''
                  for (var cT = 0; cT < 25; cT++) {
                    cW = cW + '&nbsp;'
                  }
                  cX = cX.concat(
                    cW +
                      "<input type='checkbox' class='check' id='filterTic' /><div id='filterTicDiv' style='display:inline'><strong><label for='filterTic' style='cursor: pointer;'>仅查看刷到车次</label></strong></div>"
                  )
                }
                $('#sear-result>p').html(cX)
                if ($('#auto_query').is(':checked')) {
                  $('#filterTic').bind('click', bx)
                }
              }
              if (!$('#DW_SHOW_STR')[0]) {
                $('#sear-result>p').after(cP)
              }
              if (cU) {
                $('#sear-result>p').after(cU)
              }
              if (dwTranTimeStr) {
                clearInterval(dwTranTimeStr)
              }
              if ($('#DW_SHOW_STR')[0]) {
                dwTranTimeStr = window.setInterval(function () {
                  if ($('#DW_SHOW_STR').attr('data') == '1') {
                    $('#DW_SHOW_STR')
                      .attr('data', '2')
                      .html('夜行两千公里 最低不足千元')
                  } else {
                    $('#DW_SHOW_STR')
                      .attr('data', '1')
                      .html('高铁动卧 夕发朝至 风雨无阻 省时省钱')
                  }
                }, 1300)
              }
              if ($('#hainan_limit_msg')[0]) {
                hainan_tip = null
                hainan_tip = new Marquee({
                  ID: 'hainan_limit_msg',
                  Direction: 'left',
                  Step: 1,
                  Width: 0,
                  Height: 0,
                  Timer: 30,
                  DelayTime: 0,
                  WaitTime: 0,
                  ScrollStep: 0
                })
              }
              bq = cR.data
              ar()
              bE(bq)
              o()
              b0(bq)
              b8()
              $('#queryLeftTable').html('')
              $('#trainum').html('')
              aY()
              if (ck.length < 0) {
                a4 = true
                $('#no_filter_ticket').show()
                $('#no_filter_ticket_msg_1').show()
                $('#no_filter_ticket_msg_2').hide()
                $('#trainum').html('0')
                return
              } else {
                a4 = true
                $('#trainum').html(ck.length)
                aM(ck)
                $.showYxTrainData()
              }
              t()
              yxTrainChange =
                $('#fromStationText').val() +
                '#' +
                $('#toStationText').val() +
                '#' +
                $('#train_date').val()
            } else {
              if (cR && cR.c_url) {
                CLeftTicketUrl = cR.c_url
                au(cN)
              }
            }
          }
        })
        yxTrainChange = cM
      } else {
        $.showYxTrainData()
      }
      $('#sel-buyer').hide()
      $('#sel-seat').hide()
      $('#sel-date').hide()
    },
    showYxTrainData: function () {
      if (y($('#yxtraininput').val(), 0)) {
        $('#yxtraindiv')
          .css(
            'top',
            $('#showYxTrainSpan').offset().top +
              $('#showYxTrainSpan').outerHeight()
          )
          .css('left', $('#showYxTrainSpan').offset().left)
          .show()
        cJ(1)
        $('#yxtraininput').focus()
      } else {
        cJ(3)
      }
    },
    getMindateForCal: function () {
      if ($('#sf2').is(':checked')) {
        h = studentMindate
      } else {
        h = otherMindate
      }
      return h
    },
    getMaxdateForCal: function () {
      if ($('#sf2').is(':checked')) {
        H = studentMaxdate
      } else {
        H = otherMaxdate
      }
      return H
    }
  })
  function K () {
    $('#show_all_query_result').click(function () {
      bW = new Array()
      bH = new Array()
      S = new Array()
      $('#train_type_btn_all')
        .removeClass()
        .addClass('btn-all')
      $('#start_time_btn_all')
        .removeClass()
        .addClass('btn-all')
      $('#arrive_time_btn_all')
        .removeClass()
        .addClass('btn-all')
      $('#seat_type_btn_all')
        .removeClass()
        .addClass('btn-all')
      $('#from_station_name_all')
        .removeClass()
        .addClass('btn-all')
      $('#to_station_name_all')
        .removeClass()
        .addClass('btn-all')
      $('#sear-sel-bd input').each(function () {
        if (this.checked) {
          this.checked = false
        }
      })
      if (aI) {
        aI.setComboText('')
      }
      $('#avail_ticket').attr('checked', false)
      aU()
    })
  }
  function aD () {
    var cK = $('#queryPriceTemplate')
      .html()
      .replace('<!--', '')
      .replace('-->', '')
    $.templates({ priceTableTemplate: cK })
    var cK = $('#fromStationNameTemplate')
      .html()
      .replace('<!--', '')
      .replace('-->', '')
    $.templates({ stationNameTableTemplate: cK })
    var cK = $('#toStationNameTemplate')
      .html()
      .replace('<!--', '')
      .replace('-->', '')
    $.templates({ toStationNameTableTemplate: cK })
    var cK = $('#seatTypeTemplate')
      .html()
      .replace('<!--', '')
      .replace('-->', '')
    $.templates({ seatTypeTemplate: cK })
    var cK = $('#stationinfoTemplate')
      .html()
      .replace('<!--', '')
      .replace('-->', '')
    $.templates({ stationinfoTemplate: cK })
  }
  function b0 (cL) {
    dhtmlXCombo_defaultOption.prototype._DrawHeaderButton = function () {}
    $('#train_combo_box').hide()
    var cK = []
    if (!aI) {
      aI = new dhtmlXCombo('train_combo_box_div', 'cc', 90)
    } else {
      aI.setComboText('')
    }
    aI.clearAll()
    $(cL).each(function () {
      cK.push([
        this.queryLeftNewDTO.station_train_code,
        this.queryLeftNewDTO.station_train_code
      ])
    })
    aI.addOption(cK)
    aI.enableFilteringMode(true)
    aI.attachEvent('onChange', function () {
      if (aI.getComboText() != '') {
        if ($('#iLcear').is(':hidden')) {
          $('#iLcear').show()
        }
      }
      aU()
    })
    if (!$('#iLcear')[0]) {
      $('.dhx_combo_box ').append(
        $(
          '<span style="display: none;" class="i-clear dhx_combo_img_iClear" id="iLcear"></span>'
        )
      )
      $('#iLcear').on('click', function () {
        if (aI) {
          aI.setComboText('')
          $(this).hide()
        }
      })
    }
    $('.dhx_combo_input').on('keyup', function () {
      if ($(this).val() == '') {
        $('#iLcear').hide()
      } else {
        if ($('#iLcear').is(':hidden')) {
          $('#iLcear').show()
        }
      }
    })
  }
  function aB () {
    if (!cv) {
      cv = new dhtmlXWindows()
      cv.enableAutoViewport(true)
      cv.setSkin('dhx_terrace')
      cv.attachViewportTo('winVP')
      cv.setImagePath(ctx + 'resources/js/rich/windows/imgs/')
    }
    $('#username').keydown(function () {
      login_errorMsg_hide()
    })
    $('#password').keydown(function () {
      login_errorMsg_hide()
    })
  }
  function bM () {
    cv.window('login').hide()
    cv.window('login').setModal(false)
  }
  function bP () {
    if (cv.window('login')) {
      cv.window('login').setModal(false)
      cv.window('login').hide()
    }
    bi = cv.createWindow('login', 0, 0, 400, 350)
    var cK, cL
    if (typeof TouLocal !== 'undefined' && TouLocal.checkZByTargeElement('')) {
      cK = $(window).width() / 2 - 208
      cL = cB() + ($(window).height() / 2 - 232)
    } else {
      cK = $(window).width() / 2 - 200
      cL = cB() + ($(window).height() / 2 - 205)
    }
    bi.attachObject('relogin')
    if (if_show_pass_code_login == 'Y') {
      bi.setDimension($('#content').width(), $('#content').height() + 10)
    } else {
      bi.setDimension(530, 343)
      cK = $(window).width() / 2 - 250
    }
    $('.dhtmlx_window_active').height($('#content').height())
    $('.dhtmlx_window_active').css({ left: cK, top: cL })
    bi.bringToTop()
    cv.window('login').clearIcon()
    cv.window('login').denyResize()
    bi.button('park').hide()
    bi.button('minmax1').hide()
    bi.hideHeader()
    if (if_show_pass_code_login == 'Y') {
      if (is_uam_login == 'Y') {
        refreshImgUAM('login', 'sjrand')
      } else {
        refreshImg('login', 'sjrand')
      }
    }
    bi.setModal(true)
    $('#relogin_close').click(function () {
      bz()
      var cM = $(window).scrollTop()
      var cN = $('#float').position().top
      if (cM > cN + 30) {
        $('#floatTable').show()
      }
      bM()
    })
    if (typeof touclickHook_leftTicketLogin === 'function') {
      touclickHook_leftTicketLogin()
    }
  }
  function bz () {
    a5()
    $('#username').val('')
    $('#password').val('')
    $('#randCode').val('')
    cp()
  }
  function cB () {
    if ('pageYOffset' in window) {
      return window.pageYOffset
    } else {
      if (document.compatMode == 'BackCompat') {
        return document.body.scrollTop
      } else {
        return document.documentElement.scrollTop
      }
    }
  }
  function a5 () {
    $('#username')
      .add($('#password'))
      .add($('#randCode'))
      .add($('#randCode2'))
      .removeClass('error')
  }
  function F (cO) {
    var cL = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])|(19[0-9])|(16[0-9])\d{8}$/
    var cK = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/
    var cN = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
    var cM = true
    a5()
    if (cO == '' || cO == null || cO == uninputmsg || cO == 'admin') {
      $('#username')
        .removeClass('inptxt w200')
        .addClass('inptxt w200 error')
      cM = login_messages.userNameEmpty
    } else {
      if (!cK.test(cO) && !cN.test(cO) && !cL.test(cO)) {
        $('#username')
          .removeClass('inptxt w200')
          .addClass('inptxt w200 error')
        cM = login_messages.userNameFormat
      }
    }
    return cM
  }
  function bR (cK) {
    var cL = true
    a5()
    if (cK == '' || cK == null) {
      $('#password')
        .removeClass('inptxt w200')
        .addClass('inptxt w200 error')
      cL = login_messages.passwordEmpty
    } else {
      if (cK.length < 6) {
        $('#password')
          .removeClass('inptxt w200')
          .addClass('inptxt w200 error')
        cL = login_messages.passwordLength
      }
    }
    return cL
  }
  function a9 () {
    var cM = $.trim($('#username').val())
    var cK = $.trim($('#password').val())
    var cL = F(cM)
    return typeof cL === 'boolean' ? bR(cK) : cL
  }
  function E () {
    var cL = false
    var cK = false
    $('#username')
      .on('keyup', function () {
        aN = true
      })
      .blur(function () {
        if (aN) {
          var cM = $.trim($('#username').val())
          cL = F(cM)
          if (if_show_pass_code_login == 'Y') {
            if (typeof cL !== 'boolean') {
              showError($('#randCode')[0], cL)
            } else {
              if (cL === true) {
                showError($('#randCode')[0]).hide()
              }
            }
          } else {
            if (typeof cL !== 'boolean') {
              login_errorMsg(cL)
            } else {
              if (cL === true) {
                login_errorMsg_hide()
              }
            }
          }
        }
      })
    $('#password').blur(function () {
      if (aN) {
        var cM = $.trim($('#password').val())
        if (if_show_pass_code_login == 'Y') {
          if (cL === true && typeof (cK = bR(cM)) !== 'boolean') {
            showError($('#randCode')[0], cK)
          } else {
            if (cL === true && cK === true) {
              showError($('#randCode')[0]).hide()
            }
          }
        } else {
          if (cL === true && typeof (cK = bR(cM)) !== 'boolean') {
            login_errorMsg(cK)
          } else {
            if (cL === true && cK === true) {
              login_errorMsg_hide()
            }
          }
        }
      }
    })
  }
  function cw (cK) {
    $('#password').val('')
    $('#randCode').val('')
    if (cK != null) {
      if (cK == '登录名不存在。') {
        aN = false
        $('#username')
          .add($('#password'))
          .add($('#randCode'))
          .add($('#randCode2'))
          .removeClass('error')
        $('#username')
          .removeClass('inptxt w200')
          .addClass('inptxt w200 error')
        $('#username').focus()
      } else {
        if (cK.indexOf('密码输入错误。') != -1) {
          $('#username')
            .add($('#password'))
            .add($('#randCode'))
            .add($('#randCode2'))
            .removeClass('error')
          $('#password')
            .removeClass('inptxt w200')
            .addClass('inptxt w200 error')
          $('#password').focus()
        }
      }
      if (if_show_pass_code_login == 'Y') {
        showError($('#randCode')[0], cK)
      } else {
        login_errorMsg(cK)
      }
    }
  }
  function ai (cL, cK) {
    $('#loginSubAsyn').unbind('click')
    $('#loginSubAsyn').click(function () {
      var cM = a9()
      if (is_uam_login == 'Y') {
        if (
          if_show_pass_code_login == 'Y' &&
          !verifyRandCodeUAM($('#randCode')[0], cM)
        ) {
          return
        }
        if (if_show_pass_code_login == 'N' && typeof cM !== 'boolean') {
          login_errorMsg(cM)
          return
        }
        $.ajax({
          url: passport_login,
          data: {
            username: $('#username').val(),
            password: $('#password').val(),
            appid: passport_appId
          },
          dataType: 'json',
          type: 'POST',
          xhrFields: { withCredentials: true },
          success: function (cN) {
            if (cN.result_code == 0) {
              $.ajax({
                type: 'POST',
                url: passport_authuam,
                async: false,
                data: { appid: passport_appId },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (cO) {
                  if (cO.result_code == 0) {
                    var cP = cO.newapptk || cO.apptk
                    $.ajax({
                      type: 'POST',
                      async: false,
                      url: ctx + passport_authclient,
                      data: { tk: cP },
                      datatype: 'json',
                      success: function (cQ) {
                        if (cQ.result_code == 0) {
                          bM()
                          loginAsyn(cQ.username)
                          Z(cL, cK)
                        }
                      },
                      error: function () {}
                    })
                  }
                },
                error: function () {}
              })
            } else {
              if (if_show_pass_code_login == 'Y') {
                showSuc($('#randCode')[0]).hide()
              } else {
                login_errorMsg_hide()
              }
              if (if_show_pass_code_login == 'Y') {
                refreshImgUAM('login', 'sjrand')
              }
              cw(cN.result_message)
            }
          }
        })
      } else {
        if (
          if_show_pass_code_login == 'Y' &&
          !verifyRandCode($('#randCode')[0], cM)
        ) {
          return
        }
        if (if_show_pass_code_login == 'N' && typeof cM !== 'boolean') {
          login_errorMsg(cM)
          return
        }
        $('#loginForm').ajaxSubmit({
          url: ctx + 'login/loginUserAsyn?random=' + new Date().getTime(),
          type: 'post',
          dataType: 'json',
          async: false,
          success: function (cN) {
            if (cN.data.status) {
              if (cN.data.username != null) {
                bM()
                loginAsyn(cN.data.username)
                if (cN.data.otherMsg != '') {
                  dhtmlx.alert({
                    title: messages['message.error'],
                    ok: messages['button.ok'],
                    text: cN.data.otherMsg,
                    type: 'alert-error',
                    callback: function () {
                      if (cN.data.notifysession == 'Y') {
                        dhtmlx.createWin({
                          winId: 'notifysession',
                          closeWinId: ['close_notifysession'],
                          okId: 'goto_notifysession',
                          okCallBack: function () {
                            Z(cL, cK)
                          }
                        })
                      } else {
                        Z(cL, cK)
                      }
                    }
                  })
                } else {
                  if (cN.data.notifysession == 'Y') {
                    dhtmlx.createWin({
                      winId: 'notifysession',
                      closeWinId: ['close_notifysession'],
                      okId: 'goto_notifysession',
                      okCallBack: function () {
                        Z(cL, cK)
                      }
                    })
                  } else {
                    Z(cL, cK)
                  }
                }
              }
            } else {
              if (cN.data.uamflag == '1') {
                location.reload(true)
              }
              if (if_show_pass_code_login == 'Y') {
                showSuc($('#randCode')[0]).hide()
              } else {
                login_errorMsg_hide()
              }
              if (if_show_pass_code_login == 'Y') {
                refreshImg('login', 'sjrand')
              }
              cw(cN.data.loginFail)
            }
          }
        })
      }
    })
  }
  function ag () {
    var cK = false
    $('#loginSubAsyn').unbind('click')
    $('#loginSubAsyn').click(function () {
      if (!cK) {
        var cL = a9()
        if (is_uam_login == 'Y') {
          if (
            if_show_pass_code_login == 'Y' &&
            !verifyRandCodeUAM($('#randCode')[0], cL)
          ) {
            cK = false
            return
          }
          cK = true
          $('#loginForm').ajaxSubmit({
            url: passport_login,
            data: {
              username: $('#username').val(),
              password: $('#password').val(),
              appid: passport_appId
            },
            dataType: 'json',
            type: 'POST',
            xhrFields: { withCredentials: true },
            success: function (cM) {
              if (cM.result_code == 0) {
                $.ajax({
                  type: 'POST',
                  url: passport_authuam,
                  async: false,
                  data: { appid: passport_appId },
                  dataType: 'jsonp',
                  jsonp: 'callback',
                  success: function (cN) {
                    if (cN.result_code == 0) {
                      var cO = cN.newapptk || cN.apptk
                      $.ajax({
                        type: 'POST',
                        async: false,
                        url: ctx + passport_authclient,
                        data: { tk: cO },
                        datatype: 'json',
                        success: function (cP) {
                          if (cP.result_code == 0) {
                            bM()
                            loginAsyn(cP.username)
                          }
                        },
                        error: function () {}
                      })
                    }
                  },
                  error: function () {}
                })
              } else {
                $('#i-ok').hide()
                if (if_show_pass_code_login == 'Y') {
                  refreshImgUAM('login', 'sjrand')
                }
                cw(cM.result_message)
              }
            },
            complete: function () {
              cK = false
            }
          })
        } else {
          if (
            if_show_pass_code_login == 'Y' &&
            !verifyRandCode($('#randCode')[0], cL)
          ) {
            cK = false
            return
          }
          cK = true
          $('#loginForm').ajaxSubmit({
            url: ctx + 'login/loginUserAsyn?random=' + new Date().getTime(),
            type: 'post',
            dataType: 'json',
            async: false,
            success: function (cM) {
              if (cM.data.status) {
                if (cM.data.otherMsg != '') {
                  dhtmlx.alert({
                    title: messages['message.error'],
                    ok: messages['button.ok'],
                    text: cM.data.otherMsg,
                    type: 'alert-error',
                    callback: function () {
                      if (cM.data.username != null) {
                        bM()
                        loginAsyn(cM.data.username)
                      }
                    }
                  })
                } else {
                  if (cM.data.username != null) {
                    bM()
                    loginAsyn(cM.data.username)
                  }
                }
              } else {
                if (cM.data.uamflag == '1') {
                  location.reload(true)
                }
                $('#i-ok').hide()
                if (if_show_pass_code_login == 'Y') {
                  refreshImg('login', 'sjrand')
                }
                cw(cM.data.loginFail)
              }
            },
            complete: function () {
              cK = false
            }
          })
        }
      }
    })
  }
  function bd () {
    window.sucessCallback = function () {
      bS = $('#randCode2').val()
      $('#back_edit').trigger('click')
      var cK = '99999GGGGG'
      var cM = '##CCT##PPT##CPT##PXT##SBT##PBD##JOD##HPD##SHD##QTP##TSP##TJP##'
      var cL = '##CBP##DIP##JGK##ZEK##UUH##NKH##ESH##OHH##AOH##'
      if (isAsync == ticket_submit_order.request_flag.isAsync) {
        if (
          P.queryLeftNewDTO.train_no.indexOf(cK) > -1 &&
          cM.indexOf(P.queryLeftNewDTO.from_station_telecode) > -1 &&
          cL.indexOf(P.queryLeftNewDTO.to_station_telecode) > -1
        ) {
          dhtmlx.createWin({
            winId: 'confirmG1234',
            closeWinId: ['close_conifrmdialog_G1234', 'cancel_dialog_G1234'],
            okId: 'goto_integration_G1234',
            okCallBack: function () {
              r()
            },
            callback: function () {

            }
          })
        } else {
          r()
        }
      } else {
        if (
          P.queryLeftNewDTO.train_no.indexOf(cK) > -1 &&
          cM.indexOf(P.queryLeftNewDTO.from_station_telecode) > -1 &&
          cL.indexOf(P.queryLeftNewDTO.to_station_telecode) > -1
        ) {
          dhtmlx.createWin({
            winId: 'confirmG1234',
            closeWinId: ['close_conifrmdialog_G1234', 'cancel_dialog_G1234'],
            okId: 'goto_integration_G1234',
            okCallBack: function () {
              cI()
            },
            callback: function () {

            }
          })
        } else {
          cI()
        }
      }
    }
  }
  function cp () {
    $('#username').css('color', '#333')
    $('#password').css('color', '#333')
    $('#randCode').css('color', '#333')
    if (
      $('#username').val() == '' ||
      $('#username').val() == uninputmsg ||
      $('#username').val() == null ||
      $('#username').val() == 'admin'
    ) {
      $('#username').css('color', '#999')
      $('#username').val(uninputmsg)
      $('#password').val('')
    }
    $('#username')
      .focus(function () {
        var cK = $('#username').val()
        if (cK == uninputmsg) {
          $('#username').css('color', '#333')
          $('#username').val('')
          $('#password').val('')
        }
      })
      .blur(function () {
        var cK = $('#username').val()
        if (cK == '') {
          $('#username').css('color', '#999')
          $('#username').val(uninputmsg)
        }
      })
  }
  function aq () {
    $('#forget_my_password_id').on('click', function (cK) {
      otsRedirect('post', ctx + 'forgetPassword/initforgetMyPassword')
    })
  }
  function bb () {
    var cK = 1
    var cQ
    var cV
    var cM
    var cP = true
    var cO = true
    var cT = true
    var cX
    var cL
    var cU = false
    var cR = false
    var cW = false
    cM = dataNumber
    var cS
    if (
      train_tour_flag != null &&
      train_tour_flag != '' &&
      train_tour_flag == 'fc'
    ) {
      cS = jQuery.inArray(
        $('#back_train_date')
          .val()
          .substring(5, 10),
        change_dates_arr
      )
    } else {
      cS = jQuery.inArray(
        $('#train_date')
          .val()
          .substring(5, 10),
        change_dates_arr
      )
    }
    if (cS != '-1') {
      cS = cS + 1
      cX = firstShow
      cL = endShow
      if (
        parseInt(cS) >= parseInt(firstShow) &&
        parseInt(cS) <= parseInt(endShow)
      ) {
        if (isOther) {
          if (parseInt(endShow) > parseInt(other_control)) {
            endShow = other_control
            cR = true
            cU = true
          }
        } else {
          if (parseInt(endShow) > parseInt(stu_control)) {
            endShow = stu_control
          }
        }
        if (!cR) {
          cP = false
          cO = false
          cT = false
          cV = endShow + 1
        }
      } else {
        cU = true
        firstShow = cS
        endShow = firstShow + 19
        if (isOther) {
          if (parseInt(endShow) > parseInt(other_control)) {
            endShow = other_control
            cR = true
          }
        } else {
          if (parseInt(endShow) > parseInt(stu_control)) {
            endShow = stu_control
            cR = true
          }
        }
        if (!cR) {
          cQ = firstShow - 1
          cV = endShow + 1
          if (cQ < cK) {
            cP = false
          }
        }
      }
      if (isOther) {
        if (other_control < dataNumber) {
          cW = true
        }
      } else {
        if (stu_control < dataNumber) {
          cW = true
        }
      }
      if (cR) {
        cU = true
        firstShow = endShow - 19
        cQ = firstShow - 1
        if (cW) {
          cO = true
          cV = endShow + 1
          cM = dataNumber
        } else {
          cO = false
        }
        if (
          train_tour_flag != null &&
          train_tour_flag != '' &&
          train_tour_flag == 'fc'
        ) {
          $('#back_train_date').val(fullDateArr[cS - 1])
        } else {
          $('#train_date').val(fullDateArr[cS - 1])
        }
      }
      if (parseInt(firstShow) < 1) {
        firstShow = 1
      }
      if (cP) {
        for (var cN = cK; cN <= cQ; cN++) {
          $('#date_range>ul>li:nth-child(' + cN + ')').hide()
        }
      }
      if (cO) {
        for (var cN = cV; cN <= cM; cN++) {
          $('#date_range>ul>li:nth-child(' + cN + ')').hide()
        }
      }
      if (cT) {
        for (var cN = firstShow; cN <= endShow; cN++) {
          $('#date_range>ul>li:nth-child(' + cN + ')').show()
        }
      }
      $('#date_range>ul>li').removeClass('sel')
      if (cU) {
        $('#date_range>ul>li:nth-child(' + cX + ')')
          .children('span:first')
          .removeClass()
        $('#date_range>ul>li:nth-child(' + cX + ')')
          .children('span:last')
          .removeClass()
        $('#date_range>ul>li:nth-child(' + cL + ')').removeClass()
        $('#date_range>ul>li:nth-child(' + firstShow + ')')
          .children('span:first')
          .addClass('first')
        $('#date_range>ul>li:nth-child(' + firstShow + ')')
          .children('span:last')
          .addClass('first')
        $('#date_range>ul>li:nth-child(' + firstShow + ')')
          .children()
          .addClass('first')
        $('#date_range>ul>li:nth-child(' + endShow + ')').addClass('end')
      }
      $('#date_range>ul>li:nth-child(' + cS + ')').addClass('sel')
      $('#date_range>ul>li:nth-child(' + cS + ')')
        .children('span:last-child')
        .removeClass()
      $('#date_range>ul>li:nth-child(' + cS + ')')
        .children('span:first-child')
        .addClass('hide')
      ce = $('#date_range>ul>li:nth-child(' + cS + ')')
        .children('span:first-child')
        .text()
    }
  }
  function b9 () {
    $('#query_ticket').unbind('click')
    $('#query_ticket_stu').unbind('click')
    $('#query_ticket')
      .removeClass()
      .addClass('btn92s btn-disabled')
    $('#query_ticket_stu')
      .removeClass()
      .addClass('btn92s btn-disabled')
    bC()
    setTimeout(function () {
      cH()
      by()
      $('#query_ticket')
        .removeClass()
        .addClass('btn92s')
      $('#query_ticket_stu')
        .removeClass()
        .addClass('btn92s')
      if (train_tour_flag != 'gc' && train_tour_flag != 'fc') {
        if (ClickWho == '0X00') {
          $('#query_ticket').unbind()
          $('#query_ticket')
            .removeClass()
            .addClass('btn92s btn-disabled')
          $('#query_ticket_stu')
            .removeClass()
            .addClass('btn92s')
        }
        if (ClickWho == '00') {
          $('#query_ticket_stu').unbind()
          $('#query_ticket_stu')
            .removeClass()
            .addClass('btn92s btn-disabled')
          $('#query_ticket')
            .removeClass()
            .addClass('btn92s')
        }
      }
      if (isstudentDate) {
        $('#query_ticket_stu').unbind()
        $('#query_ticket_stu')
          .removeClass()
          .addClass('btn92s btn-disabled')
        $('#query_ticket')
          .removeClass()
          .addClass('btn92s')
      }
    }, 1000)
  }
  changeArriveDate = function (cL, cK) {
    cL = cL.replace(':', '')
    cK = cK.replace(':', '')
    hour_value = Number(cL.substring(0, 2)) + Number(cK.substring(0, 2))
    min_value = Number(cL.substring(2, 4)) + Number(cK.substring(2, 4))
    if (min_value >= 60) {
      hour_value = hour_value + 1
    }
    if (hour_value >= 24 && hour_value < 48) {
      return '次日'
    } else {
      if (hour_value >= 48 && hour_value < 72) {
        return '两日'
      } else {
        if (hour_value >= 72) {
          return '三日'
        } else {
          return '当日'
        }
      }
    }
  }
  changeLiShi = function (cK) {
    if (cK.substring(0, 1) == '0') {
      if (cK.substring(1, 2) == '0') {
        if (cK.substring(3, 4) == '0') {
          cK = cK.substring(4, 5) + '分'
        } else {
          cK = cK.substring(3, 5) + '分'
        }
      } else {
        cK = cK.substring(1, 2) + '小时' + cK.substring(3, 5) + '分'
      }
    } else {
      if (cK.substring(3, 5) == '00') {
        cK = cK.substring(0, 2) + '小时'
      } else {
        cK = cK.substring(0, 2) + '小时' + cK.substring(3, 5) + '分'
      }
    }
    return cK
  }
  isNum = function (cK) {
    return parseInt(cK)
  }
  buttonText = function () {
    return '预订'
  }
  function az () {
    if ($('#sf2').is(':checked')) {
      if (G($('#train_date').val()) > G(init_maxPeriod) - 24 * 60 * 60 * 1000) {
        bC()
      } else {
        by()
      }
    }
  }
  function aA () {
    if (train_tour_flag == 'fc') {
      var cK = $('#back_train_date').val()
      D('back_train_date')
    } else {
      var cK = $('#train_date').val()
      D('train_date')
    }
    if (rqChecked.length == 0) {
      rqChecked.push(cK)
    }
    var cL = false
    if (cK != rqChecked[0]) {
      for (var cM = 0; cM < rqChecked.length; cM++) {
        if (cK == rqChecked[cM]) {
          cL = true
          rqChecked.splice(cM, 1)
          $('#date-list input[scode=' + rqChecked[0] + ']').prop(
            'checked',
            false
          )
          rqChecked.splice(0, 1, cK)
          $('#prior_date span[name=' + cK + ']').remove()
          break
        }
      }
      if (!cL) {
        $('#date-list input[scode=' + rqChecked[0] + ']').prop('checked', false)
        rqChecked.splice(0, 1, cK)
        $('#date-list input[scode=' + rqChecked[0] + ']').prop('checked', true)
      }
    }
  }
  $('#train_date').focus(function () {
    $('#train_date').jcalendar({
      isSingle: false,
      startDate: $.getMindateForCal(),
      endDate: $.getMaxdateForCal(),
      onpicked: function () {
        aA()
        $('#train_date').blur()
        var cK = $('#train_date').val()
        var cL = $('#back_train_date').val()
        if ($('#wf').is(':checked')) {
          if (!cL | (G(cK) > G(cL))) {
            $('#back_train_date').val(cK)
          }
        }
        bb()
      }
    })
  })
  $('#date_icon_1').click(function () {
    $('#train_date').focus()
  })
  $('#back_train_date').focus(function () {
    $('#back_train_date').jcalendar({
      isSingle: false,
      startDate: $('#train_date').val(),
      endDate: $.getMaxdateForCal(),
      onpicked: function () {
        aA()
        $('#back_train_date').blur()
        bb()
      }
    })
  })
  $('#date_icon_2').click(function () {
    $('#back_train_date').focus()
  })
  String.prototype.toDate = function () {
    style = 'yyyy-MM-dd hh:mm'
    var cN = { 'y+': 'y', 'M+': 'M', 'd+': 'd', 'h+': 'h', 'm+': 'm' }
    var cK = { y: '', M: '', d: '', h: '00', m: '00' }
    var cM = style
    for (var cL in cN) {
      if (new RegExp('(' + cL + ')').test(style)) {
        cK[cN[cL]] = this.substring(
          cM.indexOf(RegExp.$1),
          cM.indexOf(RegExp.$1) + RegExp.$1.length
        )
      }
    }
    return new Date(cK.y, cK.M - 1, cK.d, cK.h, cK.m)
  }
  function D (cO) {
    if (cO == 'back_train_date' && ClickWho != '0X00') {
      return
    }
    var cK = (
      $('#' + cO)
        .val()
        .split(' ')[0] + ' 00:00:00'
    )
      .toDate()
      .getTime()
    var cQ = stu_start_train_date.split('&')
    var cM = stu_end_tain_date.split('&')
    var cL = false
    for (var cN = 0, cP = cQ.length; cN < cP; cN++) {
      if (cK >= cQ[cN].toDate().getTime() && cK <= cM[cN].toDate().getTime()) {
        cL = true
        break
      }
    }
    if (cL) {
      $('#sf2').attr('disabled', false)
      $('#sf2_label').removeClass('color999')
    } else {
      $('#sf2').attr('checked', false)
      $('#sf1')[0]['checked'] = 'checked'
      $('#sf2').attr('disabled', true)
      $('#sf2_label').addClass('color999')
    }
  }
  function cj (cK) {
    if (isSaveQueryLog == 'Y') {
      $.ajax({
        type: 'get',
        isTakeParam: false,
        beforeSend: function (cL) {
          cL.setRequestHeader('If-Modified-Since', '0')
          cL.setRequestHeader('Cache-Control', 'no-cache')
        },
        url: ctx + 'leftTicket/log',
        data: cK,
        timeout: 15000,
        error: function (cL, cN, cM) {},
        success: function (cL) {}
      })
    }
  }
  var a8 = 0
  var ae = new Array()
  function ab () {
    $('div#id-seat-sel div.sel-item a').on('click', function () {
      if ($(this).attr('class') == 'cur') {
        $(this).removeClass('cur')
        a8--
        var cL = $(this).attr('id')
        $.each(ae, function (cM, cO) {
          var cN = $(cO).attr('id')
          if (cL == cN) {
            ae.splice(cM, 1)
          }
        })
        $('#selectNo').html(a8 + '/' + tickets_info.length)
      } else {
        ae.push($(this))
        $(this).addClass('cur')
        if (a8 == tickets_info.length) {
          var cK = ae[a8 - 1]
          $(cK).removeClass('cur')
          ae.splice(a8 - 1, 1)
          return
        }
        a8++
        $('#selectNo').html(a8 + '/' + tickets_info.length)
      }
    })
  }
  function aa () {
    av()
    if (tickets_info && tickets_info.length > 0) {
      var cO = 'Y'
      var cK = tickets_info[0].seat_type
      for (var cN = 0; cN < tickets_info.length; cN++) {
        var cM = tickets_info[cN]
        if (cM.seat_type != cK) {
          cO = 'N'
          break
        }
      }
      if (canChooseSeats && canChooseSeats == 'Y' && cO == 'Y') {
        if (choose_Seats) {
          var cL =
            '*如果本次列车剩余席位无法满足您的选座需求，系统将自动为您分配席位。'
          if (cK == 'M' && choose_Seats.indexOf('M') > -1) {
            $('#id-seat-sel').css('display', 'block')
            $('#yideng1').css('display', 'block')
            if (tickets_info.length > 1) {
              $('#yideng2').css('display', 'block')
            }
            $('#notice_1_id').html(cL)
          }
          if (cK == 'O' && choose_Seats.indexOf('O') > -1) {
            $('#id-seat-sel').css('display', 'block')
            $('#erdeng1').css('display', 'block')
            if (tickets_info.length > 1) {
              $('#erdeng2').css('display', 'block')
            }
            $('#notice_1_id').html(cL)
          }
          if (cK == 'P' && choose_Seats.indexOf('P') > -1) {
            $('#id-seat-sel').css('display', 'block')
            $('#tedeng1').css('display', 'block')
            if (tickets_info.length > 1) {
              $('#tedeng2').css('display', 'block')
            }
            $('#notice_1_id').html(cL)
          }
          if (cK == '9' && choose_Seats.indexOf('9') > -1) {
            $('#id-seat-sel').css('display', 'block')
            $('#tedeng1').css('display', 'block')
            if (tickets_info.length > 1) {
              $('#tedeng2').css('display', 'block')
            }
            $('#notice_1_id').html(cL)
          }
        }
      }
    }
  }
  function av () {
    $('div#id-seat-sel div.sel-item a').removeClass('cur')
    a8 = 0
    ae = new Array()
    $('#selectNo').html(a8 + '/' + tickets_info.length)
    $('#id-seat-sel.sel-item').css('display', 'none')
    $('#id-seat-sel').css('display', 'none')
    $('#notice_1_id').html('')
    $('#yideng1').css('display', 'none')
    $('#yideng2').css('display', 'none')
    $('#erdeng1').css('display', 'none')
    $('#erdeng2').css('display', 'none')
    $('#tedeng1').css('display', 'none')
    $('#tedeng2').css('display', 'none')
  }
  function bY () {
    var cK = ''
    $.each($('div#id-seat-sel div.seat-sel-bd a'), function () {
      if ($(this).attr('class') == 'cur') {
        var cL = $(this).attr('id')
        cK += cL
      }
    })
    return cK
  }
  function bD () {
    if (a8 != 0 && a8 != tickets_info.length) {
      $('#sy_ticket_num_id').html(
        "<span style='color:red;'>请按照乘车人个数选座对应的席位。</span>"
      )
      return false
    } else {
      return true
    }
  }
  function cs () {
    cm()
    if (tickets_info && tickets_info.length > 0) {
      if (canChooseBeds && canChooseBeds == 'Y') {
        $('#id-bed-sel').css('display', 'block')
        $('#notice_1_id').html(
          '*选铺后如果系统票额不足，系统将随机为您申请铺位。'
        )
        if (isCanChooseMid && isCanChooseMid == 'Y') {
          $('#mid_bed').css('display', 'block')
        } else {
          $('#mid_bed').css('display', 'none')
        }
      } else {
        $('#id-bed-sel').css('display', 'none')
      }
    }
  }
  numSet = function (cN, cK) {
    var cS = parseInt($('#x_no').text())
    var cO = parseInt($('#z_no').text())
    var cM = parseInt($('#s_no').text())
    var cQ = tickets_info.length
    var cL = cS + cO + cM
    if (cN == 'add') {
      if (cL < cQ) {
        var cR = document.getElementById(cK).innerText
        var cP = parseInt(cR) + 1
        document.getElementById(cK).innerText = cP
        $('#selectBedNo').html(cL + 1 + '/' + cQ)
      }
    } else {
      var cR = document.getElementById(cK).innerText
      if (cL > 0 && parseInt(cR) > 0) {
        var cP = parseInt(cR) - 1
        document.getElementById(cK).innerText = cP
        $('#selectBedNo').html(cL - 1 + '/' + cQ)
      }
    }
  }
  function cm () {
    $('#x_no').html('0')
    $('#z_no').html('0')
    $('#s_no').html('0')
    $('#selectBedNo').html(0 + '/' + tickets_info.length)
    $('#confirmDiv').css('padding', '20px 0')
    $('#checktrain').css('display', 'none')
  }
  function a0 () {
    var cK = $('#x_no').text()
    var cL = $('#z_no').text()
    var cM = $('#s_no').text()
    return cK + cL + cM
  }
})()
function checkG1234 (g, f, c, h, b) {
  var a = '99999GGGGG'
  var e = '##CCT##PPT##CPT##PXT##SBT##PBD##JOD##HPD##SHD##QTP##TSP##TJP##'
  var d = '##CBP##DIP##JGK##ZEK##UUH##NKH##ESH##OHH##AOH##'
  if (c.indexOf(a) > -1 && e.indexOf(h) > -1 && d.indexOf(b) > -1) {
    dhtmlx.createWin({
      winId: 'confirmG1234',
      closeWinId: ['close_conifrmdialog_G1234', 'cancel_dialog_G1234'],
      okId: 'goto_integration_G1234',
      okCallBack: function () {
        submitOrderRequest(g, f)
      },
      callback: function () {}
    })
  } else {
    submitOrderRequest(g, f)
  }
}
function checkRandCodeUAM (e) {
  var b = false,
    a = e.value,
    c = 'sjrand',
    d = TouClick.get('touclick-' + e.id)
  $.ajax({
    url: passport_captcha_check,
    type: 'post',
    dataType: 'json',
    xhrFields: { withCredentials: true },
    data: { answer: a, login_site: 'E', rand: c },
    async: false,
    success: function (f) {
      if (f.result_code == '4') {
        b = true
        d.success()
        setTimeout(function () {
          if (d.getState() === 'success') {
            d.reload()
          }
        }, 3000)
      } else {
        b = false
        var g = f.result_message
        d.fail()
      }
    }
  })
  return b
}
function refreshImgUAM (c, e, d) {
  if (
    $('.login .touclick-image')
      .attr('src')
      .indexOf(passport_captcha) != -1
  ) {
    TouClick.get('touclick-' + TouLocal.getRandCodeName(d)).reload()
    return
  }
  var h = 'randCode'
  if (targetelement[0] !== '') {
    h += '_' + targetelement[0]
  }
  var b = $('#' + targetdiv[0]),
    g = b.data('code_type')
  var j = 'sjrand'
  var f = 'E'
  var a = passport_captcha + '?login_site=' + f + '&module=' + g + '&rand=' + j
  TouClick.ready(function () {
    var k = TouClick.get('touclick-' + h).start({
      gp_url: a,
      onClick: function (m) {
        var o = $('#' + h)
        o.val(m)
        var n = $('#error_msg' + targetdiv[0])
        var l = o[0]
        if (n.data('tag') === 1) {
          n.hide()
        }
      },
      onReload: function () {
        $('#' + h).val('')
        $('#error_msg').css('display', 'none')
        var l = $.jc_getcookie('current_captcha_type')
      },
      onReloading: function () {
        return true
      }
    })
  })
  TouClick.get('touclick-' + TouLocal.getRandCodeName(d)).reload()
  $('.login .touclick-image').attr('src', a)
}
function verifyRandCodeUAM (d, b) {
  if (typeof b !== 'boolean') {
    showError(d, b)
    return false
  }
  var a = d.value
  var c =
    typeof TouLocal.getErrorMessage === 'function'
      ? TouLocal.getErrorMessage(d)
      : login_messages.pleaseClickCaptcha
  if (a == '' || a == null) {
    showError(d, c, 1)
    return false
  }
  if (!checkRandCodeUAM(d)) {
    c =
      typeof TouLocal.getErrorMessage === 'function'
        ? TouLocal.getErrorMessage(d, false)
        : login_messages.pleaseClickCaptcha
    showError(d, c, 1)
    return false
  }
  showError(d).hide()
  return true
}
var left_ticket_messages = {
  'leftTicketDTO.from_station': '出发站',
  'leftTicketDTO.to_station': '目的站',
  'leftTicketDTO.train_no': '车次',
  'leftTicketDTO.train_date': '出发日',
  back_train_date: '返程日'
}
jQuery.validator.addMethod(
  'checkLoginUserName',
  function (f, d) {
    var a = false
    var c = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])|(19[0-9])|(16[0-9])\d{8}$/
    var b = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/
    var e = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
    if (b.test(f) || e.test(f) || c.test(f)) {
      a = true
    }
    return this.optional(d) || a
  },
  'wrong username.'
)
jQuery.validator.addMethod(
  'requiredUserName',
  function (b, a) {
    if (b == '用户名／邮箱／手机号') {
      return false
    }
    if (b == null || b == '') {
      return false
    }
    return true
  },
  'wrong username.'
)
jQuery.validator.addMethod(
  'requiredSchoolName',
  function (b, a) {
    if (b == '简码／汉字') {
      return false
    }
    if (b == null || b == '') {
      return false
    }
    return true
  },
  'wrong schoolname.'
)
jQuery.validator.addMethod(
  'randCodeRequired',
  function (b, a) {
    $('#i-ok').css('display', 'none')
    return b.length > 0
  },
  '验证码错误!'
)
jQuery.validator.addMethod(
  'randCodeFormat',
  function (c, b) {
    $('#i-ok').css('display', 'none')
    var a = /^[a-zA-Z0-9]+$/
    return this.optional(b) || a.test(c)
  },
  '验证码错误!'
)
jQuery.validator.addMethod(
  'randCodeLength',
  function (b, a) {
    $('#i-ok').css('display', 'none')
    return b.length == 4
  },
  '验证码错误!.'
)
jQuery.validator.addMethod(
  'integrationCheck',
  function (b, a) {
    var c = /^\d{6}$/
    return this.optional(a) || c.test(b)
  },
  'wrong integrationpassword'
)
jQuery.validator.addMethod(
  'integrationPwdCheck',
  function (b, a, c) {
    if ($('#' + c[0]).val() == $('#' + c[1]).val()) {
      return true
    }
    return false
  },
  '两次输入密码不一致!.'
)
jQuery.validator.addMethod(
  'checkRandCode',
  function (c, b, d) {
    var a = true
    if (c && c.length == 4) {
      $.ajax({
        url: ctx + 'passcodeNew/checkRandCodeAnsyn',
        type: 'post',
        data: { randCode: c, rand: d },
        async: false,
        success: function (e) {
          if (e.data == 'N') {
            a = false
            $('#i-ok').css('display', 'none')
          } else {
            a = true
            $('#i-ok').css('display', 'block')
          }
        }
      })
    } else {
      a = false
      $('#i-ok').css('display', 'none')
    }
    return a
  },
  '验证码错误!.'
)
jQuery.validator.addMethod(
  'validateUsersName',
  function (b, a) {
    return this.optional(a) || /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/.test(b)
  },
  '用户名只能由字母、数字或_组成'
)
jQuery.validator.addMethod(
  'checkWriteSpace',
  function (c, b) {
    for (var a = 0; a < c.length; a++) {
      if (c.charCodeAt(a) == 32) {
        return false
      }
    }
    return true
  },
  'contain writespace'
)
jQuery.validator.addMethod(
  'validateRandCode',
  function (b, a) {
    return this.optional(a) || /^[a-zA-Z0-9]+$/.test(b)
  },
  '验证码错误!.'
)
jQuery.validator.addMethod(
  'checkPassward',
  function (c, b, e) {
    var d = true
    for (var a = 0; a < c.length; a++) {
      if (
        c.charCodeAt(a) == 39 ||
        c.charCodeAt(a) == 60 ||
        c.charCodeAt(a) == 62
      ) {
        d = false
      }
      if (!d) {
        break
      }
    }
    return this.optional(b) || d
  },
  'Passward wrong'
)
function validateSecIdCard (g) {
  var f = 0
  var a = g
  var e = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙',
    21: '辽宁',
    22: '吉林',
    23: '黑龙',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    83: '台湾',
    91: '国外'
  }
  if (!/^\d{17}(\d|x)$/i.test(a)) {
    return false
  }
  a = a.replace(/x$/i, 'a')
  if (e[parseInt(a.substr(0, 2))] == null) {
    return false
  }
  var c =
    a.substr(6, 4) +
    '-' +
    Number(a.substr(10, 2)) +
    '-' +
    Number(a.substr(12, 2))
  var h = new Date(c.replace(/-/g, '/'))
  if (c != h.getFullYear() + '-' + (h.getMonth() + 1) + '-' + h.getDate()) {
    return false
  }
  for (var b = 17; b >= 0; b--) {
    f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
  }
  if (f % 11 != 1) {
    return false
  }
  return true
}
function validateFirIdCard (g) {
  var f = 0
  var a
  var e = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙',
    21: '辽宁',
    22: '吉林',
    23: '黑龙',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    83: '台湾',
    91: '国外'
  }
  if (g.length == 15) {
    a = idCardUpdate(g)
  } else {
    a = g
  }
  if (!/^\d{17}(\d|x)$/i.test(a)) {
    return false
  }
  a = a.replace(/x$/i, 'a')
  if (e[parseInt(a.substr(0, 2))] == null) {
    return false
  }
  var c =
    a.substr(6, 4) +
    '-' +
    Number(a.substr(10, 2)) +
    '-' +
    Number(a.substr(12, 2))
  var h = new Date(c.replace(/-/g, '/'))
  if (c != h.getFullYear() + '-' + (h.getMonth() + 1) + '-' + h.getDate()) {
    return false
  }
  for (var b = 17; b >= 0; b--) {
    f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
  }
  if (f % 11 != 1) {
    return false
  }
  return true
}
function idCardUpdate (g) {
  var b
  var f = /^(\d){15}$/
  if (f.test(g)) {
    var e = 0
    var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
    var d = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
    g = g.substr(0, 6) + '19' + g.substr(6, g.length - 6)
    for (var c = 0; c < g.length; c++) {
      e += parseInt(g.substr(c, 1)) * a[c]
    }
    g += d[e % 11]
    b = g
  } else {
    b = '#'
  }
  return b
}
jQuery.validator.addMethod(
  'checkBorth',
  function (e, c) {
    var b = e
    if (b == '') {
      return true
    } else {
      var a = b.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (a == null) {
        return false
      }
      var f = new Date(a[1], a[3] - 1, a[4])
      return (
        f.getFullYear() == a[1] &&
        f.getMonth() + 1 == a[3] &&
        f.getDate() == a[4]
      )
    }
  },
  '日期格式不合法'
)
jQuery.validator.addMethod(
  'byteRangeLength',
  function (d, b, e) {
    var c = d.length
    for (var a = 0; a < d.length; a++) {
      if (d.charCodeAt(a) > 127) {
        c++
      }
    }
    return this.optional(b) || (c >= e[0] && c <= e[1])
  },
  'length wrong'
)
jQuery.validator.addMethod(
  'checkNameCharBlank',
  function (c, b, d) {
    var a = d.split('@')
    if ($('#' + a[1]).val() == '') {
      return true
    } else {
      if ($('#' + a[0]).val() == '1' || $('#' + a[0]).val() == '2') {
        return this.optional(b) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(c)
      } else {
        if ($('#' + a[0]).val() == 'B') {
          if (/^[-]+$/.test(c)) {
            return false
          }
          return this.optional(b) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(c)
        } else {
          if ($('#' + a[0]).val() == 'H') {
            return true
          } else {
            return this.optional(b) || /^[a-z A-Z·.．\u3400-\u9FFF]+$/.test(c)
          }
        }
      }
    }
  },
  'wrong name.'
)
jQuery.validator.addMethod(
  'checkNameCharBlankForWork',
  function (c, b, d) {
    var a = d.split('@')
    if ($('#' + a[0]).val() == 'H') {
      return this.optional(b) || /^[a-zA-Z ]+$/.test(c)
    } else {
      return true
    }
  },
  'wrong name.'
)
jQuery.validator.addMethod(
  'checkIdValidStr',
  function (c, b) {
    var a = /^[a-zA-Z0-9\_\-\(\)]+$/
    return this.optional(b) || a.test(c)
  },
  'wrong id'
)
jQuery.validator.addMethod(
  'isSecIDCard',
  function (b, a, c) {
    if (!checkIfSecIdCard($(c).val())) {
      return true
    }
    return validateSecIdCard(b)
  },
  'wrong'
)
function checkIfSecIdCard (a) {
  if (a == '1') {
    return true
  }
  return false
}
function checkIfFirIdCard (a) {
  if (a == '2') {
    return true
  }
  return false
}
function checkCardForHKorTW (a) {
  if (a == 'C' || a == 'G') {
    return true
  }
  return false
}
jQuery.validator.addMethod(
  'isFirIDCard',
  function (b, a, c) {
    if (!checkIfFirIdCard($(c).val())) {
      return true
    }
    return validateFirIdCard(b)
  },
  'wrong'
)
jQuery.validator.addMethod(
  'checkHkongMacaoOld',
  function (c, b, d) {
    if ($(d).val() == 'C') {
      var a = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/
      return this.optional(b) || a.test(c)
    } else {
      return true
    }
  },
  'wrong format.'
)
jQuery.validator.addMethod(
  'checkTaiwOld',
  function (c, a, e) {
    if ($(e).val() == 'G') {
      var d = /^[0-9]{8}$/
      var b = /^[0-9]{10}$/
      return this.optional(a) || d.test(c) || b.test(c)
    } else {
      return true
    }
  },
  'wrong format.'
)
jQuery.validator.addMethod(
  'checkHkongMacao',
  function (c, b, d) {
    if ($(d).val() == 'C') {
      var a = /^[HMhm]{1}([0-9]{8})$/
      return this.optional(b) || a.test(c)
    } else {
      return true
    }
  },
  'wrong format.'
)
jQuery.validator.addMethod(
  'checkTaiw',
  function (b, a, d) {
    if ($(d).val() == 'G') {
      var c = /^[0-9]{8}$/
      return this.optional(a) || c.test(b)
    } else {
      return true
    }
  },
  'wrong format.'
)
jQuery.validator.addMethod(
  'checkPassport',
  function (d, b, e) {
    if ($(e).val() == 'B') {
      var c = /^[a-zA-Z]{5,17}$/
      var a = /^[a-zA-Z0-9]{5,17}$/
      return this.optional(b) || a.test(d) || c.test(d)
    } else {
      return true
    }
  },
  'wrong format.'
)
jQuery.validator.addMethod(
  'checkWork',
  function (c, b, d) {
    if ($(d).val() == 'H') {
      var a = /^[a-zA-Z]{3}[0-9]{12}$/
      return this.optional(b) || a.test(c)
    } else {
      return true
    }
  },
  'wrong format.'
)
jQuery.validator.addMethod(
  'checkGATJmjzz',
  function (d, b, e) {
    var a = e.split('@')
    if ($('#' + a[0]).val() == '1') {
      var c = d.substring(0, 2)
      if ($('#' + a[1]).is(':checked')) {
        if (c != '81' && c != '82' && c != '83') {
          return false
        }
      } else {
        if (c == '81' || c == '82' || c == '83') {
          return false
        }
      }
    }
    return true
  },
  'wrong format.'
)
jQuery.validator.addMethod(
  'isMobile',
  function (d, b) {
    var c = d.length
    var a = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])|(19[0-9])|(16[0-9])\d{8}$/
    return this.optional(b) || (c == 11 && a.test(d))
  },
  'wrong mobile phone '
)
jQuery.validator.addMethod(
  'isTelePhone',
  function (b, a) {
    var c = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}#)/
    return this.optional(a) || c.test(b)
  },
  'wrong telePhone '
)
jQuery.validator.addMethod(
  'illegalChar',
  function (c, b, e) {
    var d = true
    if (c.indexOf('$') >= 0) {
      return false
    }
    for (var a = 0; a < c.length; a++) {
      if (
        c.charCodeAt(a) == 39 ||
        c.charCodeAt(a) == 60 ||
        c.charCodeAt(a) == 62 ||
        c.charCodeAt(a) == 34 ||
        c.charCodeAt(a) == 63
      ) {
        d = false
      }
      if (!d) {
        break
      }
    }
    return this.optional(b) || d
  },
  'Illegal char wrong'
)
jQuery.validator.addMethod(
  'isZipCode',
  function (c, b) {
    var a = /^[0-9]{6}$/
    return this.optional(b) || a.test(c)
  },
  'wrong zipcode'
)
jQuery.validator.addMethod(
  'isEmail',
  function (c, a) {
    var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    return this.optional(a) || b.test(trim(c))
  },
  'wrong email'
)
function replaceChar (b) {
  var a = b.value.replace(/['"<> ?]/g, '')
  b.value = a
}
function checkNameChar1 (a) {
  return /^[a-zA-Z0-9\u3400-\u9FFF]+$/.test(a)
}
function trim (a) {
  return a.replace(/(^\s*)|(\s*$)/g, '')
}
function ltrim (a) {
  return a.replace(/(^\s*)/g, '')
}
function rtrim (a) {
  return a.replace(/(\s*$)/g, '')
}
jQuery.validator.addMethod(
  'validateName',
  function (b, a) {
    return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
  },
  'wrong username.'
)
jQuery.validator.addMethod(
  'studentRequired',
  function (b, a, c) {
    if ($(c).val() == '3') {
      return b && trim(b) != ''
    }
    return true
  },
  'wrong studentRequired.'
)
jQuery.validator.addMethod(
  'studentStationRequired',
  function (b, a, c) {
    if ($(c).val() == '3') {
      return b && trim(b) != '简拼/全拼/汉字' && trim(b) != ''
    }
    return true
  },
  'wrong studentStationRequired.'
)
jQuery.validator.addMethod(
  'studentValidateName',
  function (b, a, c) {
    if ($(c).val() == '3') {
      return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
    }
    return true
  },
  'wrong username.'
)
jQuery.validator.addMethod(
  'checkStudentName',
  function (b, a, c) {
    if ($(c).val() == '3') {
      if (!b || trim(b) == '' || trim(b) == '简码/汉字') {
        return false
      }
    }
    return true
  },
  'wrong username.'
)
jQuery.validator.addMethod(
  'isQuestionNull',
  function (b, a, c) {
    if (jQuery.trim(b) != '') {
      if (
        (jQuery.trim($(c[0]).val()) == 'customQuestion' &&
          jQuery.trim($(c[1]).val()) == '') ||
        jQuery.trim($(c[0]).val()) == ''
      ) {
        return false
      }
    }
    return true
  },
  'you should input the question'
)
jQuery.validator.addMethod(
  'isAnswerNull',
  function (b, a, c) {
    if (
      (jQuery.trim($(c[0]).val()) == 'customQuestion' &&
        jQuery.trim($(c[1]).val()) != '') ||
      jQuery.trim($(c[0]).val()) != ''
    ) {
      if (jQuery.trim(b) == '') {
        return false
      }
    }
    return true
  },
  'you should input the answer'
)
function checkSex (c, b, a) {
  if (!checkSexByCardId(c, b, a)) {
    if (!confirm('性别与身份证中的性别不符，是否继续?')) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
}
function checkSexByCardId (c, e, a) {
  function b (h, i) {
    var g = null
    if (i.length == 15) {
      g = i.substring(14, 15)
    } else {
      if (i.length == 18) {
        g = i.substring(16, 17)
      } else {
        return true
      }
    }
    if (g == 'x' || g == 'X') {
      g = '10'
    }
    var f = parseInt(g)
    var j = f % 2
    if (j === 0 && h === 'F') {
      return true
    } else {
      if (j === 1 && h === 'M') {
        return true
      } else {
        return false
      }
    }
  }
  var d = $(a).val()
  if (checkIfSecIdCard($(e).val()) && validateSecIdCard(d)) {
    if (d !== '') {
      return b(c, d)
    } else {
      return true
    }
  } else {
    if (checkIfFirIdCard($(e).val()) && validateFirIdCard(d)) {
      if (d !== '') {
        return b(c, d)
      } else {
        return true
      }
    } else {
      return true
    }
  }
}
function checkBirdDateByCardId (c, e, b) {
  var a = null
  var d = $(b).val()
  if (checkIfSecIdCard($(e).val()) && d !== '' && validateSecIdCard(d)) {
    a = d.substring(6, 14)
  } else {
    if (checkIfFirIdCard($(e).val()) && d !== '' && validateFirIdCard(d)) {
      if (d.length == 15) {
        a = '19' + d.substring(6, 12)
      } else {
        if (d.length == 18) {
          a = d.substring(6, 14)
        }
      }
    } else {
      return true
    }
  }
  if (c !== '') {
    c = c.replace(/-/g, '')
    if (c != a) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
}
function checkBirdate (c, b, a) {
  if (!checkBirdDateByCardId(c, b, a)) {
    if (!confirm('出生日期与身份证中的出生日期不符，是否继续?')) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
}
jQuery.validator.addMethod(
  'checkPwdValidate',
  function (b, a) {
    return (
      this.optional(a) || /(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]{6,}$/.test(b)
    )
  },
  'contain writespace'
)
jQuery.validator.addMethod(
  'checkConfirmPassWard',
  function (b, a, c) {
    if ($(c).val() != null) {
      return $(c).val() == b
    }
    return true
  },
  'contain writespace'
)
jQuery.validator.addMethod(
  'IVR_passwd_format',
  function (b, a) {
    var c = /^[0-9]{6}$/
    return this.optional(a) || c.test(b)
  },
  '验证码错误!.'
)
jQuery.validator.addMethod(
  'checkStation',
  function (b, a) {
    if (
      !b ||
      trim(b) == '' ||
      trim(b) == '简拼/全拼/汉字' ||
      trim(b) == '简拼/全拼/汉字或↑↓'
    ) {
      return false
    }
    return true
  },
  'wrong username.'
)
jQuery.validator.addMethod(
  'checkAnsyUserName',
  function (e, c, f) {
    var b = f[0]
    var d = $('#' + f[1]).val()
    var a = true
    $.ajax({
      url: b + '?user_name=' + e,
      type: 'get',
      async: false,
      success: function (g, h) {
        if (g.data == true) {
          a = false
        } else {
          a = true
        }
      },
      error: function (g, i, h) {
        a = false
      }
    })
    return a
  },
  'wrong cardNo'
)
function checkPwdRank (e, a, d) {
  var b = $(e)
  var c = b.val()
  if (
    c.length <= 6 ||
    new RegExp('^[a-zA-Z]{6,}$').test(c) ||
    new RegExp('^[0-9]{6,}$').test(c) ||
    new RegExp('^[_]{6,}$').test(c)
  ) {
    $('#' + a).attr('title', '危险')
    $('#' + d).html('危险')
    $('#' + a).removeClass('rank-a')
    $('#' + a).removeClass('rank-b')
    $('#' + a).removeClass('rank-c')
    $('#' + a).addClass('rank-a')
  } else {
    if (
      c.length > 6 &&
      new RegExp('[a-zA-Z]').test(c) &&
      new RegExp('[0-9]').test(c) &&
      new RegExp('[_]').test(c)
    ) {
      $('#' + a).attr('title', '安全')
      $('#' + d).html('安全')
      $('#' + a).removeClass('rank-a')
      $('#' + a).removeClass('rank-b')
      $('#' + a).removeClass('rank-c')
      $('#' + a).addClass('rank-c')
    } else {
      $('#' + a).attr('title', '一般')
      $('#' + d).html('一般')
      $('#' + a).removeClass('rank-a')
      $('#' + a).removeClass('rank-b')
      $('#' + a).removeClass('rank-c')
      $('#' + a).addClass('rank-b')
    }
  }
}
Array.prototype.unique = function () {
  var b = {},
    a = this.length
  for (var c = 0; c < a; c++) {
    if (typeof b[this[c]] === 'undefined') {
      b[this[c]] = 1
    }
  }
  this.length = 0
  a = 0
  for (var c in b) {
    this[a++] = c
  }
  return this
}
function checkSearchPwdRank (h, c, g) {
  var e = $(h)
  var f = e.val()
  if (f.length < 6) {
    $('#' + c).attr('title', '危险')
    $('#' + g).html('危险')
    $('#' + c).removeClass('rank-a')
    $('#' + c).removeClass('rank-b')
    $('#' + c).removeClass('rank-c')
    $('#' + c).addClass('rank-a')
  } else {
    var a = []
    for (var b = 0; b < 6; b++) {
      a.push(f.charAt(b))
    }
    a = a.unique()
    var d = a.length
    if (d == 1) {
      $('#' + c).attr('title', '危险')
      $('#' + g).html('危险')
      $('#' + c).removeClass('rank-a')
      $('#' + c).removeClass('rank-b')
      $('#' + c).removeClass('rank-c')
      $('#' + c).addClass('rank-a')
    } else {
      if (d > 1 && d < 5) {
        $('#' + c).attr('title', '一般')
        $('#' + g).html('一般')
        $('#' + c).removeClass('rank-a')
        $('#' + c).removeClass('rank-b')
        $('#' + c).removeClass('rank-c')
        $('#' + c).addClass('rank-b')
      } else {
        $('#' + c).attr('title', '安全')
        $('#' + g).html('安全')
        $('#' + c).removeClass('rank-a')
        $('#' + c).removeClass('rank-b')
        $('#' + c).removeClass('rank-c')
        $('#' + c).addClass('rank-c')
      }
    }
  }
}
jQuery.validator.addMethod(
  'checkDetailAddress',
  function (b, a) {
    return this.optional(a) || /^[0-9a-zA-Z\u3400-\u9FFF\#]+$/.test(b)
  },
  'wrong name.'
)
jQuery.validator.addMethod(
  'checkAddressName',
  function (b, a) {
    if (/^[-]+$/.test(b)) {
      return false
    }
    return (
      this.optional(a) ||
      /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(b) ||
      /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(b)
    )
  },
  'wrong name.'
)
jQuery.validator.addMethod(
  'checkAddressSelect',
  function (b, a) {
    if (b == '') {
      return false
    }
    if (b) {
      return true
    }
    return this.optional(a)
  },
  'wrong name.'
)
var login_messages = {
  randCodeError: '验证码错误!',
  randCodeExpired: '验证码失效',
  randCodeLentgh: '验证码长度为4位!',
  randCodeFormat: '验证码只能由数字或字母组成!',
  randCodeEmpty: '验证码不能为空!',
  userNameEmpty: '登录名必须填写!',
  userNameFormat: '登录名格式不正确，请重新输入!',
  passwordEmpty: '密码必须填写,且不少于6位!',
  passwordLength: '密码长度不能少于6位!',
  pleaseClickCaptcha: '请点击验证码',
  pleaseClickLeftCaptcha: '请点击左侧验证码',
  pleaseClickCaptchaRight: '请点击正确的验证码',
  pleaseClickBottomCaptcha: '请点击下方验证码',
  loginError: '当前访问用户过多,请稍候重试!',
  submitAfterVerify: '提交',
  pleaseClickSubmitButtonAfterClick: 'pleaseClickSubmitButtonAfterClick',
  leftTicketOrderNoteMessage: '点击"提交"按钮获取验证码',
  leftTicketOrderClickCallbackNoteMessage:
    '完成选择后，继续点击下方橙色"提交"按钮提交订单',
  leftTicketOrderShowCallbackNoteMessage: '按照提示点击选择所有的图片',
  leftTicketOrderHiddenCallbackNoteMessage: '点击"提交"按钮获取验证码',
  getCaptchaByClick: '点击获取验证码'
}
function Marquee (a) {
  if (a == null || a == '') {
    return
  }
  this.ID = document.getElementById(a.ID)
  if (!this.ID) {
    this.id = -1
    return
  }
  this.Direction = this.Width = this.Height = this.DelayTime = this.WaitTime = this.CTL = this.StartID = this.Stop = this.MouseOver = 0
  this.Step = 1
  this.Timer = 30
  this.DirectionArray = { top: 0, up: 0, bottom: 1, down: 1, left: 2, right: 3 }
  if (typeof a.Direction === 'number' && a.Direction) {
    this.Direction = a.Direction
  }
  if (typeof a.Direction === 'string' && a.Direction) {
    this.Direction = this.DirectionArray[a.Direction.toString().toLowerCase()]
  }
  if (typeof a.Step === 'number' && a.Step) {
    this.Step = a.Step
  }
  if (typeof a.Width === 'number' && a.Width) {
    this.Width = a.Width
  }
  if (typeof a.Height === 'number' && a.Height) {
    this.Height = a.Height
  }
  if (typeof a.Timer === 'number' && a.Timer) {
    this.Timer = a.Timer
  }
  if (typeof a.DelayTime === 'number' && a.DelayTime) {
    this.DelayTime = a.DelayTime
  }
  if (typeof a.WaitTime === 'number' && a.WaitTime) {
    this.WaitTime = a.WaitTime
  }
  if (typeof a.ScrollStep === 'number' && a.ScrollStep) {
    this.ScrollStep = a.ScrollStep
  }
  this.ID.style.overflow = this.ID.style.overflowX = this.ID.style.overflowY =
    'hidden'
  this.ID.noWrap = true
  this.IsNotOpera = navigator.userAgent.toLowerCase().indexOf('opera') == -1
  this.Start()
}
Marquee.prototype.Start = function () {
  if (this.ID == -1) {
    return
  }
  if (this.Width == 0) {
    this.Width = parseInt(this.ID.style.width)
  }
  if (this.Height == 0) {
    this.Height = parseInt(this.ID.style.height)
  }
  if (this.Timer < 20) {
    this.Timer = 20
  }
  if (this.WaitTime < 800) {
    this.WaitTime = 800
  }
  this.HalfWidth = Math.round(this.Width / 2)
  this.HalfHeight = Math.round(this.Height / 2)
  this.BakStep = this.Step
  this.ID.style.width = this.Width + 'px'
  this.ID.style.height = this.Height + 'px'
  if (typeof this.ScrollStep !== 'number') {
    this.ScrollStep = this.Direction > 1 ? this.Width : this.Height
  }
  var d =
    "<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;display:inline;'><tr><td noWrap=true style='white-space: nowrap;word-break:keep-all;padding-right:100px;'>MSCLASS_TEMP_HTML</td><td noWrap=true style='white-space: nowrap;word-break:keep-all;'>MSCLASS_TEMP_HTML</td></tr></table>"
  var b =
    "<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;'><tr><td>MSCLASS_TEMP_HTML</td></tr><tr><td>MSCLASS_TEMP_HTML</td></tr></table>"
  var e = this
  e.tempHTML = e.ID.innerHTML
  if (e.Direction <= 1) {
    e.ID.innerHTML = b.replace(/MSCLASS_TEMP_HTML/g, e.ID.innerHTML)
  } else {
    if (e.ScrollStep == 0 && e.DelayTime == 0) {
      e.ID.innerHTML += e.ID.innerHTML
    } else {
      e.ID.innerHTML = d.replace(/MSCLASS_TEMP_HTML/g, e.ID.innerHTML)
    }
  }
  var f = this.Timer
  var a = this.DelayTime
  var c = this.WaitTime
  e.StartID = function () {
    e.Scroll()
  }
  e.Continue = function () {
    if (e.MouseOver == 1) {
      setTimeout(e.Continue, a)
    } else {
      clearInterval(e.TimerID)
      e.CTL = e.Stop = 0
      e.TimerID = setInterval(e.StartID, f)
    }
  }
  e.Pause = function () {
    e.Stop = 1
    clearInterval(e.TimerID)
    setTimeout(e.Continue, a)
  }
  e.Begin = function () {
    e.ClientScroll =
      e.Direction > 1 ? e.ID.scrollWidth / 2 : e.ID.scrollHeight / 2
    if (
      (e.Direction <= 1 && e.ClientScroll <= e.Height + e.Step) ||
      (e.Direction > 1 && e.ClientScroll <= e.Width + e.Step)
    ) {
      e.ID.innerHTML = e.tempHTML
      delete e.tempHTML
      return
    }
    delete e.tempHTML
    e.TimerID = setInterval(e.StartID, f)
    if (e.ScrollStep < 0) {
      return
    }
    e.ID.onmousemove = function (g) {
      if (e.ScrollStep == 0 && e.Direction > 1) {
        var g = g || window.event
        if (window.event) {
          if (e.IsNotOpera) {
            e.EventLeft =
              g.srcElement.id == e.ID.id
                ? g.offsetX - e.ID.scrollLeft
                : g.srcElement.offsetLeft - e.ID.scrollLeft + g.offsetX
          } else {
            e.ScrollStep = null
            return
          }
        } else {
          e.EventLeft = g.layerX - e.ID.scrollLeft
        }
        e.Direction = e.EventLeft > e.HalfWidth ? 3 : 2
        e.AbsCenter = Math.abs(e.HalfWidth - e.EventLeft)
        e.Step = Math.round((e.AbsCenter * (e.BakStep * 2)) / e.HalfWidth)
      }
    }
    e.ID.onmouseover = function () {
      if (e.ScrollStep == 0) {
        return
      }
      e.MouseOver = 1
      clearInterval(e.TimerID)
    }
    e.ID.onmouseout = function () {
      if (e.ScrollStep == 0) {
        if (e.Step == 0) {
          e.Step = 1
        }
        return
      }
      e.MouseOver = 0
      if (e.Stop == 0) {
        clearInterval(e.TimerID)
        e.TimerID = setInterval(e.StartID, f)
      }
    }
  }
  setTimeout(e.Begin, c)
}
Marquee.prototype.Scroll = function () {
  switch (this.Direction) {
    case 0:
      this.CTL += this.Step
      if (this.CTL >= this.ScrollStep && this.DelayTime > 0) {
        this.ID.scrollTop += this.ScrollStep + this.Step - this.CTL
        this.Pause()
      } else {
        if (this.ID.scrollTop >= this.ClientScroll) {
          this.ID.scrollTop -= this.ClientScroll
        }
        this.ID.scrollTop += this.Step
      }
      break
    case 1:
      this.CTL += this.Step
      if (this.CTL >= this.ScrollStep && this.DelayTime > 0) {
        this.ID.scrollTop -= this.ScrollStep + this.Step - this.CTL
        this.Pause()
      } else {
        if (this.ID.scrollTop <= 0) {
          this.ID.scrollTop += this.ClientScroll
        }
        this.ID.scrollTop -= this.Step
      }
      break
    case 2:
      this.CTL += this.Step
      if (this.CTL >= this.ScrollStep && this.DelayTime > 0) {
        this.ID.scrollLeft += this.ScrollStep + this.Step - this.CTL
        this.Pause()
      } else {
        if (this.ID.scrollLeft >= this.ClientScroll) {
          this.ID.scrollLeft -= this.ClientScroll
        }
        this.ID.scrollLeft += this.Step
      }
      break
    case 3:
      this.CTL += this.Step
      if (this.CTL >= this.ScrollStep && this.DelayTime > 0) {
        this.ID.scrollLeft -= this.ScrollStep + this.Step - this.CTL
        this.Pause()
      } else {
        if (this.ID.scrollLeft <= 0) {
          this.ID.scrollLeft += this.ClientScroll
        }
        this.ID.scrollLeft -= this.Step
      }
      break
  }
}
var popup_browser = navigator.appName
var popup_b_version = navigator.appVersion
var popup_version = popup_b_version.split(';')
var popup_trin_version_flag = popup_version && popup_version.length > 1
var popup_trim_Version = popup_trin_version_flag
  ? popup_version[1].replace(/[ ]/g, '')
  : ''
var popup_uam_dataType = 'json'
var popup_uam_type = 'POST'
if (
  popup_browser == 'Microsoft Internet Explorer' &&
  popup_trim_Version == 'MSIE7.0'
) {
  popup_uam_dataType = 'jsonp'
  popup_uam_type = 'GET'
} else {
  if (
    popup_browser == 'Microsoft Internet Explorer' &&
    popup_trim_Version == 'MSIE8.0'
  ) {
    popup_uam_dataType = 'jsonp'
    popup_uam_type = 'GET'
  } else {
    if (
      popup_browser == 'Microsoft Internet Explorer' &&
      popup_trim_Version == 'MSIE9.0'
    ) {
      popup_uam_dataType = 'jsonp'
      popup_uam_type = 'GET'
    }
  }
}
var popup_passport_appId = 'otn'
var popup_passport_baseUrl = 'https://kyfw.12306.cn/passport/'
var popup_passport_apptk_static =
  popup_passport_baseUrl + 'web/auth/uamtk-static'
var popup_passport_login = popup_passport_baseUrl + 'web/login'
var popup_passport_captcha =
  popup_passport_baseUrl +
  'captcha/captcha-image64?login_site=E&module=login&rand=sjrand&'
var popup_passport_captcha_check =
  popup_passport_baseUrl + 'captcha/captcha-check'
var popup_passport_uamtk = popup_passport_baseUrl + 'web/auth/uamtk'
var popup_is_uam_login = 'Y'
var popup_is_login_passCode = 'Y'
var popup_is_sweep_login = 'Y'
var popup_is_login = 'N'
var popup_baseUrl = 'https://kyfw.12306.cn'
var popup_publicName = '/otn'
var base_uamauthclient_url = popup_baseUrl + popup_publicName + '/uamauthclient'
var popup_loginCallBack = function () {
  if (!$.popup_isPop) {
    window.location.href = popup_baseUrl + popup_publicName + '/login/userLogin'
  } else {
    if (popup_is_uam_login == 'Y') {
      $.ajax({
        type: 'POST',
        url: popup_passport_uamtk,
        async: false,
        data: { appid: popup_passport_appId },
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (a) {
          if (a.result_code == 0) {
            var b = a.newapptk || a.apptk
            $.ajax({
              type: 'POST',
              async: false,
              url: base_uamauthclient_url,
              data: { tk: b },
              datatype: 'json',
              success: function (c) {
                if (c.result_code == 0) {
                  $('.mask').fadeOut()
                  $('.modal-login').hide()
                  if ($.pop_secretStr && $.pop_start_time) {
                    $.todo_submitOrderRe($.pop_secretStr, $.pop_start_time)
                  }
                }
              },
              error: function () {}
            })
          }
        },
        error: function () {}
      })
    } else {
      $('.mask').fadeOut()
      $('.modal-login').hide()
      if ($.pop_secretStr && $.pop_start_time) {
        $.todo_submitOrderRe($.pop_secretStr, $.pop_start_time)
      }
      if (typeof $.pop_callback === 'function') {
        $.pop_callback()
      }
    }
  }
}
var popup_loginedCallBack = function () {
  if (!$.popup_isPop) {
    window.location.href = popup_baseUrl + popup_publicName + '/view/index.html'
  }
}
var popup_qr_appId = 'otn'
var popup_url = {
  loginConf: popup_baseUrl + popup_publicName + '/login/conf',
  getPassCodeNew:
    popup_baseUrl +
    popup_publicName +
    '/passcodeNew/getPassCodeNew?module=login&rand=sjrand&',
  checkRandCodeAnsyn:
    popup_baseUrl + popup_publicName + '/passcodeNew/checkRandCodeAnsyn',
  login: popup_baseUrl + popup_publicName + '/login/loginAysnSuggest',
  getBanners: popup_baseUrl + popup_publicName + '/index12306/getLoginBanner',
  qr: popup_baseUrl + '/passport/web/create-qr',
  qr64: popup_baseUrl + '/passport/web/create-qr64',
  checkqr: popup_baseUrl + '/passport/web/checkqr'
}
var popup_defaultPasscodeHeight = 30
var popup_ifSuccessCode = false
var popup_passCodeImg = $('#J-loginImg')
var popup_ispopup_CreateQr = false
var popup_t = null,
  popup_s = '-1'
var popup_isPopupLogin = true
var forie = 'forie.html'
jQuery.extend({
  pop_secretStr: '',
  pop_start_time: '',
  popup_isPop: true,
  pop_callback: function () {},
  popup_show_login_error: function (a) {
    if (a != '验证码错误！' && a != '请选择验证码！') {
      $('#J-password').val('')
    }
    $('#J-login-error')
      .show()
      .find('span')
      .html(a)
  },
  popup_hide_login_error: function () {
    $('#J-login-error')
      .hide()
      .find('span')
      .html('')
  },
  popup_loginForUam: function () {
    var a = ''
    var c = $('#J-passCodeCoin div')
    for (var b = 0; b < c.length; b++) {
      a += $(c[b]).attr('randcode') + ','
    }
    a = a.substring(0, a.length - 1)
    $.ajax({
      crossDomain: true,
      url: popup_passport_login,
      data: {
        username: $('#J-userName').val(),
        password: $('#J-password').val(),
        appid: popup_passport_appId,
        answer: a
      },
      dataType: popup_uam_dataType,
      type: popup_uam_type,
      timeout: 10000,
      xhrFields: { withCredentials: true },
      success: function (d) {
        if (d.result_code == 0) {
          $.popup_hideCommonLogin()
          popup_loginCallBack()
        } else {
          $.popup_show_login_error(d.result_message)
          $.popup_createPassCode()
          $('#J-passCodeCoin').html('')
        }
      },
      error: function () {
        $.popup_hideCommonLogin()
      }
    })
  },
  popup_loginForLocation_passcode: function () {
    var a = ''
    var c = $('#J-passCodeCoin div')
    for (var b = 0; b < c.length; b++) {
      a += $(c[b]).attr('randcode') + ','
    }
    a = a.substring(0, a.length - 1)
    $('#J-passCodeCoin').html('')
    $.ajax({
      url: popup_url.login,
      data: {
        'loginUserDTO.user_name': $('#J-userName').val(),
        'userDTO.password': $('#J-password').val(),
        randCode: a
      },
      type: 'POST',
      timeout: 10000,
      success: function (d) {
        var e = d.data
        if (e && e.loginCheck == 'Y') {
          $.popup_hideCommonLogin()
          popup_loginCallBack()
        } else {
          if (e && e.message) {
            $.popup_show_login_error(e.message)
            $.popup_createPassCode_location()
            $('#J-passCodeCoin').html('')
          } else {
            if (d.messages) {
              $.popup_show_login_error(d.messages)
              $.popup_createPassCode_location()
              $('#J-passCodeCoin').html('')
            } else {
              $.popup_hideCommonLogin()
            }
          }
        }
      },
      error: function (d) {
        $.popup_hideCommonLogin()
      }
    })
  },
  popup_loginForLocation: function () {
    $.ajax({
      url: popup_url.login,
      data: {
        'loginUserDTO.user_name': $('#J-userName').val(),
        'userDTO.password': $('#J-password').val()
      },
      type: 'POST',
      timeout: 10000,
      success: function (a) {
        var b = a.data
        if (b && b.loginCheck == 'Y') {
          $.popup_hideCommonLogin()
          popup_loginCallBack()
        } else {
          if (b && b.message) {
            $.popup_show_login_error(b.message)
          } else {
            if (a.messages) {
              $.popup_show_login_error(a.messages)
            } else {
              $.popup_hideCommonLogin()
            }
          }
        }
      },
      error: function (a) {
        $.popup_hideCommonLogin()
      }
    })
  },
  popup_hideCommonLogin: function () {
    $('#J-userName').val('')
    $('#J-password').val('')
    $('#J-passCodeCoin').html('')
    $('#J-login-error').hide()
  },
  popup_showLoginType: function (a) {
    $('#J-loginImg').hide()
    $('.lgcode-error').hide()
    $('.lgcode-loading').hide()
    $('.lgcode-loading img').hide()
    $('.lgcode-success').hide()
    if (a == 0) {
      $('#J-loginImg').show()
    } else {
      if (a == 1) {
        $('.lgcode-error').show()
      } else {
        if (a == 2) {
          $('.lgcode-success').show()
        } else {
          if (a == 3) {
            $('.lgcode-loading').show()
            $('.lgcode-loading img').show()
          }
        }
      }
    }
  },
  popup_getClickPos: function (d) {
    var g =
      navigator.appName == 'Netscape'
        ? d.pageX
        : d.clientX +
          (document.documentElement.scrollLeft ||
            window.pageXOffset ||
            document.body.scrollLeft)
    var b =
      navigator.appName == 'Netscape'
        ? d.pageY
        : d.clientY +
          (document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop)
    identifyImage = document.getElementById('J-loginImg')
    img_x = $.popup_locationLeft(identifyImage)
    img_y = $.popup_locationTop(identifyImage)
    var f = g - img_x
    var c = b - img_y - popup_defaultPasscodeHeight
    if (f > 0 && c > 0) {
      var a =
        '<div randCode="' +
        f +
        ',' +
        c +
        '" class="lgcode-active" style="top: ' +
        (c + 16) +
        'px; left: ' +
        (f - 13) +
        'px;"></div>'
      $('#J-passCodeCoin').append(a)
    }
    $('.lgcode-active').click(function (h) {
      $(this).remove()
      h.stopPropagation()
    })
  },
  popup_locationLeft: function (a) {
    offsetTotal = a.offsetLeft
    scrollTotal = 0
    if (a.tagName != 'BODY') {
      if (a.offsetParent != null) {
        return offsetTotal + scrollTotal + $.popup_locationLeft(a.offsetParent)
      }
    }
    return offsetTotal + scrollTotal
  },
  popup_locationTop: function (a) {
    offsetTotal = a.offsetTop
    scrollTotal = 0
    if (a.tagName != 'BODY') {
      if (a.offsetParent != null) {
        return offsetTotal + scrollTotal + $.popup_locationTop(a.offsetParent)
      }
    }
    return offsetTotal + scrollTotal
  },
  popup_initLogin: function (b) {
    var a = false
    if (
      popup_browser == 'Microsoft Internet Explorer' &&
      popup_trim_Version == 'MSIE7.0'
    ) {
      a = true
    } else {
      if (
        popup_browser == 'Microsoft Internet Explorer' &&
        popup_trim_Version == 'MSIE6.0'
      ) {
        a = true
      }
    }
    if (a) {
      location.href = forie
      return
    }
    $.popup_isPop = b
    popup_isPopupLogin = b
    $.popup_hideCommonLogin()
    $.popup_showLoginType(3)
    $.popup_getConf()
    $('#J-userName').focus(function () {
      $.popup_hide_login_error()
    })
    $('#J-password').focus(function () {
      $.popup_hide_login_error()
    })
    $.popup_switchLoginWay()
    $.popup_refreshQrCode()
    $('.lgcode-refresh')
      .unbind('click')
      .click(function () {
        $('.lgcode-refresh').addClass('lgcode-refresh-click')
        if (popup_is_uam_login == 'Y') {
          $.popup_refreshPassCode(false)
        } else {
          $.popup_refreshPassCode_location(false)
        }
        setTimeout(function () {
          $('.lgcode-refresh').removeClass('lgcode-refresh-click')
        }, 100)
      })
    $('#J-loginImgArea')
      .unbind('click')
      .click(function (c) {
        $.popup_getClickPos(c)
      })
  },
  popup_getConf: function () {
    $.ajax({
      url: popup_url.loginConf,
      type: 'POST',
      timeout: 10000,
      success: function (a) {
        var b = a.data
        if (b) {
          popup_is_uam_login = b.is_uam_login
          popup_is_login_passCode = b.is_login_passCode
          popup_is_sweep_login = b.is_sweep_login
          popup_is_login = b.is_login
          $.popup_isLogin()
        }
      },
      error: function (a) {}
    })
  },
  popup_isLogin: function () {
    if (popup_is_uam_login == 'Y') {
      if (popup_isPopupLogin) {
        $.popup_uamIsShowQr()
      } else {
        $.popup_uamIsLogin()
      }
    } else {
      if (popup_is_login == 'Y') {
        popup_loginedCallBack()
      } else {
        $.popup_hideQrCode()
        $('.login-account').show()
        if (popup_is_login_passCode == 'Y') {
          $.popup_showPasscode()
          $.popup_createPassCode_location()
        } else {
          $.popup_hidePasscode()
          $.popup_resetLoginBox()
        }
        $.popup_validate()
      }
    }
  },
  popup_resetLoginBox: function () {
    var a = $('.login-panel .login-box')
    a.css('margin-top', -a.outerHeight() / 2)
  },
  popup_uamIsLogin: function () {
    $.ajax({
      url: popup_passport_apptk_static,
      data: { appid: popup_passport_appId },
      type: 'POST',
      xhrFields: { withCredentials: true },
      timeout: 10000,
      success: function (a) {
        if (a.result_code == '0') {
          popup_loginedCallBack()
        } else {
          $.popup_uamIsShowQr()
        }
      },
      error: function (a) {}
    })
  },
  popup_uamIsShowQr: function () {
    if (popup_is_sweep_login == 'Y') {
      $.popup_showQrCode()
      $('#J-login-code-loading').show()
      $('#J-login-code-con').hide()
      $.popup_hideQrError()
      $.popup_createQr()
    } else {
      $.popup_hideQrCode()
      $('.login-account').show()
      $.popup_createPassCode()
    }
    $.popup_validate()
  },
  popup_createQr: function () {
    $.ajax({
      url: popup_url.qr64,
      data: { appid: popup_qr_appId },
      type: 'POST',
      timeout: 10000,
      success: function (a) {
        if (a && a.result_code === '0' && a.image) {
          $('#J-qrImg').attr('src', 'data:image/jpg;base64,' + a.image)
          $('#J-login-code-loading').hide()
          $('#J-login-code-con').show()
          $('#J-code-error-mask').hide()
          $('#J-code-error').hide()
          popup_t = null
          popup_s = -1
          popup_t = setInterval(function () {
            if (popup_s == '2' || popup_s == '3') {
              clearInterval(popup_t)
            } else {
              $.popup_checkQr(a.uuid)
            }
          }, 1000)
        } else {
        }
      },
      error: function (a) {}
    })
  },
  popup_checkQr: function (a) {
    $.ajax({
      url: popup_url.checkqr,
      data: { uuid: a, appid: popup_qr_appId },
      type: 'POST',
      timeout: 10000,
      success: function (b) {
        if (b) {
          popup_s = b.result_code
          $.popup_tipsQrInfo(parseInt(b.result_code))
        }
      },
      error: function (b) {}
    })
  },
  popup_showQrError: function (a) {
    $('#J-code-error-mask').show()
    $('#J-code-error').show()
    $('#J-code-error')
      .find('p')
      .html(a)
  },
  popup_hideQrError: function () {
    $('#J-code-error-mask').hide()
    $('#J-code-error').hide()
  },
  popup_showQrLoading: function () {
    $('.login-code-loading').show()
    $('.login-code-con').hide()
  },
  popup_hideQrLoading: function () {
    $('.login-code-loading').hide()
    $('.login-code-con').show()
  },
  popup_tipsQrInfo: function (c) {
    var b = $('#J-code-error-mask'),
      d = $('#J-code-error'),
      a = $('#J-login-code-con'),
      e = $('#J-login-code-success')
    if (c == 0) {
      b.hide()
      d.hide()
    } else {
      b.show()
      d.show()
      switch (c) {
        case 1:
          a.hide()
          e.removeClass('hide')
          break
        case 2:
          a.hide()
          e.removeClass('hide')
          popup_loginCallBack()
          break
        case 3:
          a.show()
          d.find('p').html('二维码已失效')
          d.find('a').show()
          e.addClass('hide')
          break
        case 5:
          a.show()
          d.find('p').html('系统异常')
          d.find('a').show()
          e.addClass('hide')
          break
        default:
          d.find('p').html('二维码已失效')
          d.find('a').show()
          e.addClass('hide')
      }
    }
  },
  popup_validate: function () {
    $('#J-login').click(function () {
      var e = $('#J-userName').val()
      var c = $('#J-password').val()
      var b = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/
      var a = /^[A-Za-z]{1}([A-Za-z0-9]|[_]) {0,29}$/
      var d = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
      if (!e) {
        $.popup_show_login_error('请输入用户名！')
        return false
      }
      if (!c) {
        $.popup_show_login_error('请输入密码！')
        return false
      }
      if (c && c.length < 6) {
        $.popup_show_login_error('密码长度不能少于6位！')
        return false
      }
      if (popup_is_login_passCode == 'Y') {
        if ($('#J-passCodeCoin div').length == 0) {
          $.popup_show_login_error('请选择验证码！')
          return false
        }
      } else {
        popup_ifSuccessCode = true
      }
      $.popup_login()
    })
  },
  popup_login: function () {
    if (!popup_ifSuccessCode) {
      if (popup_is_uam_login == 'Y') {
        $.popup_checkPassCode()
      } else {
        $.popup_checkPassCode_location()
      }
    } else {
      if (popup_is_uam_login == 'Y') {
        $.popup_loginForUam()
      } else {
        if (popup_is_login_passCode == 'Y') {
          $.popup_checkPassCode_location()
        } else {
          $.popup_loginForLocation()
        }
      }
    }
  },
  popup_showQrCode: function () {
    $('.login-box').removeClass('login-box-account')
    $('.login-code').show()
  },
  popup_hideQrCode: function () {
    $('.login-box').addClass('login-box-account')
    $('.login-code').hide()
  },
  popup_refreshQrCode: function () {
    $('.code-error .btn')
      .unbind('click')
      .click(function () {
        $('#J-login-code-loading').show()
        $('#J-login-code-con').hide()
        $.popup_hideQrError()
        $.popup_createQr()
      })
  },
  popup_switchLoginWay: function () {
    $('.login-hd-code a')
      .unbind('click')
      .click(function () {
        $('#J-login-code-loading').show()
        $('#J-login-code-con').hide()
        $.popup_hideQrError()
        $('#J-login-code-success').addClass('hide')
        $.popup_hideCommonLogin()
        if (popup_t) {
          clearInterval(popup_t)
          popup_t = null
          popup_s = -1
        }
        $.popup_createQr()
      })
    $('.login-hd-account a')
      .unbind('click')
      .click(function () {
        $('#J-passCodeCoin').html('')
        if (popup_t) {
          clearInterval(popup_t)
          popup_t = null
          popup_s = -1
        }
        $.popup_createPassCode()
      })
  },
  popup_createPassCode: function () {
    var a = new Date().getTime()
    $.ajax({
      url: popup_passport_captcha + a,
      xhrFields: { withCredentials: true },
      type: 'GET',
      timeout: 10000,
      dataType: 'jsonp',
      success: function (b) {
        if (b.image) {
          popup_ifSuccessCode = false
          popup_passCodeImg.attr('src', 'data:image/jpg;base64,' + b.image)
          $.popup_showLoginType(0)
        }
      },
      error: function (b) {}
    })
  },
  popup_createPassCode_location: function () {
    popup_ifSuccessCode = false
    var a = new Date().getTime()
    popup_passCodeImg.attr('src', popup_url.getPassCodeNew + a)
    $.popup_showLoginType(0)
  },
  popup_checkPassCode: function () {
    var a = false
    var b = ''
    var d = $('#J-passCodeCoin div')
    for (var c = 0; c < d.length; c++) {
      b += $(d[c]).attr('randcode') + ','
    }
    b = b.substring(0, b.length - 1)
    $.ajax({
      url: popup_passport_captcha_check,
      xhrFields: { withCredentials: true },
      crossDomain: true,
      data: { answer: b, rand: 'sjrand', login_site: 'E' },
      dataType: 'jsonp',
      type: 'GET',
      timeout: 10000,
      success: function (e) {
        if (e.result_code == 4) {
          popup_ifSuccessCode = true
          $.popup_showLoginType(2)
          $.popup_loginForUam()
        } else {
          $.popup_passCodeError()
        }
      },
      error: function (e) {}
    })
  },
  popup_checkPassCode_location: function () {
    var a = false
    var b = ''
    var d = $('#J-passCodeCoin div')
    for (var c = 0; c < d.length; c++) {
      b += $(d[c]).attr('randcode') + ','
    }
    b = b.substring(0, b.length - 1)
    $.ajax({
      url: popup_url.checkRandCodeAnsyn,
      xhrFields: { withCredentials: true },
      data: { randCode: b, rand: 'sjrand', login_site: 'E' },
      type: 'POST',
      timeout: 10000,
      success: function (e) {
        var f = e.data
        if (f && f.result == 1) {
          popup_ifSuccessCode = true
          $.popup_showLoginType(2)
          $.popup_loginForLocation_passcode()
        } else {
          $.popup_passCodeError_location()
        }
      },
      error: function (e) {}
    })
  },
  popup_passCodeError: function () {
    $.popup_show_login_error('验证码错误！')
    $.popup_refreshPassCode(true)
  },
  popup_passCodeError_location: function () {
    $.popup_show_login_error('验证码错误！')
    $.popup_refreshPassCode_location(true)
  },
  popup_refreshPassCode: function (a) {
    $.popup_hide_login_error()
    $('#J-passCodeCoin').html('')
    if (a) {
      $.popup_showLoginType(1)
      setTimeout('$.popup_createPassCode()', 1000)
    } else {
      $.popup_createPassCode()
    }
  },
  popup_refreshPassCode_location: function (a) {
    $.popup_hide_login_error()
    $('#J-passCodeCoin').html('')
    if (a) {
      $.popup_showLoginType(1)
      setTimeout('$.popup_createPassCode_location()', 1000)
    } else {
      $.popup_createPassCode_location()
    }
  },
  popup_showPasscode: function () {
    $('.login-box').removeClass('login-box-account-nocode')
  },
  popup_hidePasscode: function () {
    $('.login-box').addClass('login-box-account-nocode')
  },
  popup_clearInterval: function () {
    if (popup_t) {
      clearInterval(popup_t)
      popup_t = null
      popup_s = -1
    }
  },
  getBanners: function () {
    $.ajax({
      url: popup_url.getBanners,
      type: 'GET',
      timeout: 10000,
      dataType: 'text',
      success: function (a) {
        if (a) {
          var b = JSON.parse(a)
          $.each(b.data.index_banner_url, function (c, e) {
            var d = e.src
              ? '<a href="' + e.src + '"></a>'
              : "<a style='cursor:auto;' href='javascript:void(0)'></a>"
            $('.loginSlide .bd ul').append(
              '<li style="background: url(' +
                e.url +
                ') center center no-repeat;">' +
                d +
                '</li>'
            )
          })
          $('.loginSlide').slide({
            titCell: '.hd ul',
            mainCell: '.bd ul',
            effect: 'leftLoop',
            vis: 'auto',
            autoPlay: true,
            autoPage: true,
            trigger: 'click',
            interTime: '6000'
          })
        }
      },
      error: function (a) {}
    })
  }
})
