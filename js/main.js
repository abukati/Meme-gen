'use strict'

document.body.onload = () => {
   renderGrid()
   initCanvas()
}

function renderGrid() {
   let elGrid = document.querySelector('.template-gallery')
   let images = getImages()
   let strHtml = images.map(image => `<img src="${image.url}" alt="meme" 
      class="template-img" onclick="onMemeClick(${image.id})" />`).join('')
   elGrid.innerHTML = strHtml
}

const renderCanvas = () => {
   let ctx = getCtx()
   ctx.beginPath()
   let canvas = getCanvas()
   let img = new Image()
   let meme = getMeme()
   console.log(meme);
   img.src = `/misc/meme-imgs/${meme.selectedImgId}.jpg`
   setMemeTxt()
   img.onload = () => {
      resizeCanvas(img)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      drawTxt()
      if (meme.selectedLineIdx >= 0) drawRect(meme.lines[meme.selectedLineIdx].x, meme.lines[meme.selectedLineIdx].y, meme.lines[meme.selectedLineIdx])
      else resetValues()
   }
   ctx.closePath()
}

function resetValues() {
   document.querySelector('.text-input').value = ''
   document.querySelector('.stroke-input').value = '#000000'
   document.querySelector('.fill-input').value = '#ffffff'
}

function onMemeClick(id) {
   let elFilter = document.querySelector('.meme-filter')
   let elGallery = document.querySelector('.template-gallery')
   elFilter.style.display = 'none'
   elGallery.style.display = 'none'
   loadCurrMeme(id)
   renderCanvas(id)
   let elGenerator = document.querySelector('.meme-generator')
   elGenerator.classList.remove('hidden')
   elGenerator.classList.add('show-editor')
}

function drawTxt() {
   gCtx.beginPath()
   gMeme.lines.forEach(line => {
      gCtx.lineWidth = 1
      gCtx.strokeStyle = line.stroke
      gCtx.fillStyle = line.color
      gCtx.font = `${line.size}px ${line.font}`
      gCtx.textAlign = line.align
      gCtx.fillText(line.txt, line.posX, line.posY)
      gCtx.strokeText(line.txt, line.posX, line.posY)
   })
   gCtx.closePath()
}

function drawRect(posX, posY, txt) {
   let txtLength = gCtx.meesureText(gMeme.lines[gMeme.selectedLineIdx].txt)
   let height = txtLength.fontBoundingBoxAscent + txtLength.fontBoundingBoxDescent
   let width = txtLength.width
   gCtx.beginPath()
}