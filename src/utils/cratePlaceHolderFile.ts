const placeholder = (w: number, h: number) => {
  const min = Math.min(w, h)
  const max = Math.max(w, h)
  const minSize = (min / max) * 1000
  const gap = (1000 - minSize) / 2
  const viewBox =
    w === h ? [0, 0, 1000, 1000] : w > h ? [0, gap, 1000, minSize] : [gap, 0, minSize, 1000]

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}"
     viewBox="${viewBox.join(' ')}">
    <defs>
        <style>
            .a{fill:#5e72eb;}.b{clip-path:url(#d);}.c{fill:#ff9190;}.d{clip-path:url(#a);}.e{clip-path:url(#b);}.f{fill:#fff;}
        </style>
        <clipPath id="a">
            <path class="a"
                  d="M314.52,142.184a41.568,41.568,0,0,0,0,57.261,37.069,37.069,0,0,0,27.675,11.763q50.527,0,86.341,36.64,35.848,37.056,35.841,89.27,0,52.175-35.841,89.231T342.195,463.4q-50.487,0-86.34-37.052-35.811-37.037-35.816-89.231A39.168,39.168,0,0,0,208.632,308.9q-11.408-11.775-27.278-11.794A37.222,37.222,0,0,0,153.63,308.9a39.246,39.246,0,0,0-11.38,28.222q0,74.464,46.011,132.173,45.63,56.445,114.828,70.752v44.6a39.637,39.637,0,0,0,11.432,28.647,38.459,38.459,0,0,0,55.375,0A39.72,39.72,0,0,0,381.3,584.647v-44.6q69.206-14.346,114.853-70.752,45.983-57.684,46.015-132.173,0-85.482-58.656-146.1T342.195,130.393a36.993,36.993,0,0,0-27.675,11.792"
                  transform="translate(-142.25 -130.393)"/>
        </clipPath>
        <clipPath id="b">
            <path class="a"
                  d="M342.195,106.712a36.9,36.9,0,0,0-27.675,11.794,39.663,39.663,0,0,0-11.432,28.622v44.616q-69.207,14.287-114.828,70.727-45.977,57.7-46.011,132.185,0,85.482,58.627,146.1t141.318,60.609A37.155,37.155,0,0,0,369.9,589.6a41.651,41.651,0,0,0,0-57.273,37.086,37.086,0,0,0-27.7-11.791q-50.487,0-86.34-36.613-35.811-37.057-35.816-89.27t35.816-89.233q35.866-37.1,86.34-37.077,50.527,0,86.341,37.077,35.848,37.059,35.841,89.233a39.149,39.149,0,0,0,11.383,28.211q11.441,11.792,27.312,11.818a37.067,37.067,0,0,0,27.689-11.818,39.082,39.082,0,0,0,11.408-28.211q0-74.5-46.015-132.185Q450.566,206.042,381.3,191.743V147.128A39.637,39.637,0,0,0,369.9,118.506,36.991,36.991,0,0,0,342.195,106.712Z"
                  transform="translate(-142.25 -106.712)"/>
        </clipPath>
        <clipPath id="d">
            <rect width="1000" height="1000"/>
        </clipPath>
    </defs>
    <g id="c" class="b">
        <rect class="f" width="1000" height="1000"/>
        <rect class="c" width="1000" height="1000"/>
        <g transform="translate(299.94 99.98)">
            <g transform="translate(0 0)">
                <g transform="translate(0 305.172)">
                    <g class="d">
                        <path class="a" d="M10.71,10.71,642.569,0l-10.71,631.859L0,642.569Z"
                              transform="translate(-254.405 247.333) rotate(-45)"/>
                    </g>
                </g>
                <g transform="translate(0 0)">
                    <g class="e" transform="translate(0 0)">
                        <path class="a" d="M10.71,10.71,642.552,0l-10.71,631.842L0,642.552Z"
                              transform="translate(-254.393 247.323) rotate(-45)"/>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
`
}

export async function cratePlaceHolderFile(width: number, height: number) {
  let div = document.createElement('div')
  div.innerHTML = placeholder(width, height)
  let dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(div.firstElementChild!.outerHTML)
  return await fetch(dataUrl).then((res) =>
    res.blob().then(
      (res) =>
        new File([res], 'place_holder.svg', {
          type: 'image/svg',
        })
    )
  )
}

export function cratePlaceHolder(width: number, height: number) {
  let div = document.createElement('div')
  div.innerHTML = placeholder(width, height)
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(div.firstElementChild!.outerHTML)
}
