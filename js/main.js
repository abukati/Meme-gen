'use strict'

document.body.onload = () => {
   renderGrid()
   initCanvas()
   initMobileMenu()
}

function renderGrid() {
   let elGrid = document.querySelector('.template-gallery')
   let images = getImages()
   let strHtml = images.map(image => `<img src="${image.url}" alt="meme" 
      class="template-img" onclick="onMemeClick(${image.id})" />`).join('')
   elGrid.innerHTML = strHtml
}

const renderCanvas = () => {
   gCtx.beginPath()
   let canvas = getCanvas()
   let img = new Image()
   let meme = getMeme()
   img.src = `misc/meme-imgs/${meme.selectedImgId}.jpg`
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
   let elGallery = document.querySelector('.template-gallery')
   elGallery.style.display = 'none'
   loadCurrMeme(id)
   renderCanvas(id)
   let elGenerator = document.querySelector('.meme-generator')
   elGenerator.classList.replace('hidden', 'show-editor')
}

function drawTxt() {
   gCtx.beginPath()
   gMeme.lines.forEach(line => {
      gCtx.lineWidth = window.innerWidth < MEDIUM_BREAKPOINT ? 1 : 3
      gCtx.strokeStyle = line.stroke
      gCtx.fillStyle = line.color
      gCtx.font = `bold ${line.size}px ${line.font}`
      gCtx.textAlign = line.align
      gCtx.fillText(line.txt, line.posX, line.posY)
      gCtx.strokeText(line.txt, line.posX, line.posY)
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
   if (window.innerWidth < MEDIUM_BREAKPOINT) gCtx.strokeRect(posX - width * 0.55, posY - parseInt(txt.size), width + 15, height)
   else gCtx.strokeRect(posX - width * 0.55, posY - parseInt(txt.size), width + 35, height)
   gCtx.closePath()
}

const onSaveMeme = () => {
   let elModal = document.querySelector('.modal-container')
   elModal.classList.remove('hide-modal')
   
   let elDownload = document.querySelector('.btn-download')
   elDownload.addEventListener('click', downloadMeme)

   let elFBShare = document.querySelector('.btn-fb-share')
   elFBShare.addEventListener('click', shareMemeFB)
   
   let elShare = document.querySelector('.btn-share')
   elShare.addEventListener('click', webShare)

   saveMemeToStorage()
}

function initMobileMenu() {
   const hamburger = document.querySelector('.hamburger')
   const navMenu = document.querySelector('.nav-links')
   const navLink = navMenu.querySelectorAll('li')
   const main = document.querySelector('main')

   hamburger.addEventListener('click', openMobileMenu)
   navLink.forEach(link => link.addEventListener('click', closeMobileMenu))
   document.addEventListener('scroll', closeMobileMenu)

   function openMobileMenu() {
      hamburger.classList.toggle('active')
      navMenu.classList.toggle('active')
      if (navMenu.classList.contains('active')) {
         main.style.filter = 'blur(.7em)'
      } else {
         main.style.filter = 'none'
      }
   }

   function closeMobileMenu() {
      hamburger.classList.remove('active')
      navMenu.classList.remove('active')
      main.style.filter = 'none'
   }
}