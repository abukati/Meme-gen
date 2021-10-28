'use strict'

document.body.onload = () => {
   renderGrid()
   initCanvas()
}

function renderGrid() {
   let elGrid = document.querySelector('.template-gallery')
   let images = getImages()
   let strHtml = images.map(image => `<img src="./${image.url}" alt="meme" 
      class="template-img" onclick="onMemeClick(${image.id})" />`).join('')
   elGrid.innerHTML = strHtml
}

const renderCanvas = () => {
   gCtx.beginPath()
   let canvas = getCanvas()
   let img = new Image()
   let meme = getMeme()
   img.src = `../misc/meme-imgs/${meme.selectedImgId}.jpg`
   img.onload = () => {
      resizeCanvas(img)
      gCtx.drawImage(img, 0, 0, canvas.width, canvas.height)
      drawTxt()
      if (meme.selectedLineIdx !== -1) drawRect(meme.lines[meme.selectedLineIdx].posX, meme.lines[meme.selectedLineIdx].posY, meme.lines[meme.selectedLineIdx])
      else resetInputs()
   }
   gCtx.closePath()
}

function resetInputs() {
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
      gCtx.lineWidth = window.innerWidth < 768 ? 1 : 3
      gCtx.strokeStyle = line.stroke
      gCtx.fillStyle = line.color
      gCtx.font = `bold ${line.size}px ${line.font}`
      gCtx.textAlign = line.align
      gCtx.fillText(line.txt, (elCanvas.width / 2), line.posY)
      gCtx.strokeText(line.txt, (elCanvas.width / 2), line.posY)
   })
   gCtx.closePath()
}

function drawRect(posX, posY, txt) {
   let txtLength = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)
   let height = txtLength.fontBoundingBoxAscent + txtLength.fontBoundingBoxDescent
   let width = txtLength.width
   gCtx.beginPath()
   gCtx.setLineDash([5, 5])
   gCtx.strokeStyle = 'black'
   if (window.innerWidth < 768) gCtx.strokeRect(posX - width * 0.7, posY - parseInt(txt.size), width + 15, height)
   else gCtx.strokeRect(posX - width * 0.5 - 70, posY - parseInt(txt.size), width + 35, height)
   gCtx.closePath()
}
