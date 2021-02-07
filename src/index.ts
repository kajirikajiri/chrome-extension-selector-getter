let clipboard = ''

const el = document.createElement('div')
el.style.pointerEvents = "none"
el.style.position = "fixed"
el.style.top = "-30px"
el.style.left = "-8px"
el.style.background = "#fff"
el.style.border = "1px solid #000"
el.style.borderRadius = "4px"
el.style.transform = "translate(0, 0)"
el.style.transitionTimingFunction = "ease-out"
el.style.zIndex = "999"

let rpSize = 0
const rp = document.createElement('div')
rp.style.pointerEvents = "none"
rp.style.position = "fixed"
rp.style.top = `-${rpSize}px`
rp.style.left = `-${rpSize}px`
rp.style.height = `${rpSize * 2}px`
rp.style.width = `${rpSize * 2}px`
rp.style.background = "transition"
rp.style.border = "0px solid red"
rp.style.borderRadius = "50%"
rp.style.transform = "translate(0, 0)"
rp.style.transition = "transform 0s, width 0.3s, height 0.3s, top 0.3s, left 0.3s"
rp.style.transitionTimingFunction = "ease-out"
rp.style.zIndex = "1000"

function copyTextToClipboard(text) {
  var copyFrom = document.createElement("textarea")
  copyFrom.textContent = text
  document.body.appendChild(copyFrom)
  copyFrom.select()
  document.execCommand('copy')
  copyFrom.blur()
  document.body.removeChild(copyFrom)
}

window.onload = () => {
  document.body.appendChild(el)
  document.body.appendChild(rp)

  document.addEventListener("mouseover", (e: any) => {
    const re = [...e.target.attributes].some(a => a.name === 'data-test');
    if (re) {
      el.style.display = 'block';
      [...e.target.attributes].map(a => {
        if (a.name === 'data-test') {
          el.innerHTML = a.value
          clipboard = a.value
        }
      })
    } else {
      el.style.display = 'none'
    }
  })

  document.addEventListener('mousemove', function (e) {
    el.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    rp.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
  });

  document.addEventListener("keydown", e => {
    if (e.key === 'Escape') {
      copy()
    }
  })
}

const copy = () => {
  rpSize = 20
  rp.style.border = "1px solid red"
  rp.style.top = `-${rpSize}px`
  rp.style.left = `-${rpSize}px`
  rp.style.height = `${rpSize * 2}px`
  rp.style.width = `${rpSize * 2}px`
  el.style.display = 'block'
  copyTextToClipboard(clipboard)
  setTimeout(() => {
    rpSize = 0
    rp.style.border = "0px solid red"
    rp.style.top = `-${rpSize}px`
    rp.style.left = `-${rpSize}px`
    rp.style.height = `${rpSize * 2}px`
    rp.style.width = `${rpSize * 2}px`
    el.style.display = 'none'
  }, 500)
}