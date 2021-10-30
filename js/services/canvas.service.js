'use strict'

const STORAGE_KEY = 'memes'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

const gMeme = {
   selectedImgId: 0,
   selectedLineIdx: -1,
   lines: [
      {
         txt: 'Undefined everywhere!',
         size: window.innerWidth < 768 ? 15 : 40,
         font: 'impact',
         align: 'center',
         color: 'white',
         stroke: 'black',
         rotation: 0,
         posX: window.innerWidth < 768 ? '125' : '300',
         posY: window.innerWidth < 768 ? '30' : '50'
      }
   ]
}

let elCanvas
let gCtx

let isDragging = false


function initCanvas() {
   elCanvas = document.querySelector('#canvas')
   gCtx = elCanvas.getContext('2d')

   loadCanvasListeners()
}

function loadCurrMeme(id) {
   gMeme.selectedImgId = id
}

function resizeCanvas(img) {
   let width = (window.innerWidth < 551) ? 200 : (window.innerWidth < 768) ? 250 : img.width
   let height = (img.height * width) / img.width
   elCanvas.width = width
   elCanvas.height = height
}

function setMemeTxt() {
   gMeme.lines[gMeme.selectedLineIdx] = {
      txt: '',
      size: window.innerWidth < 768 ? 15 : 40,
      font: 'impact',
      align: 'center',
      color: 'white',
      stroke: 'black',
      posX: window.innerWidth < 768 ? '125' : '300',
      posY: window.innerWidth < 768 ? '30' : '50'
   }
}

function memeTxtChange(txt = 'Undefined everywhere!') {
   return {
      txt,
      size: window.innerWidth < 768 ? 15 : 40,
      font: 'impact',
      align: 'center',
      color: 'white',
      stroke: 'black',
      rotation: 0,
      posX: elCanvas.width / 2,
      posY: gMeme.lines.length >= 2 
         ? elCanvas.height / 2 
         : !gMeme.lines.length 
         ? '30'
         : elCanvas.height - 10
   }
}


const getCanvas = () => elCanvas

const getCtx = () => gCtx

const getMeme = () => gMeme


const pressLine = (ev) => {
   selectedLine(ev)
   if (gMeme.selectedLineIdx !== -1) {
      document.body.style.cursor = 'grabbing'
      isDragging = true
   }
}

const releaseLine = () => {
   document.body.style.cursor = 'auto'
   isDragging = false
}

const dragLine = (ev) => {
   if (isDragging) {
      let currPos = getClickedPos(ev)
      gMeme.lines[gMeme.selectedLineIdx].posX = currPos.posX
      gMeme.lines[gMeme.selectedLineIdx].posY = currPos.posY
      renderCanvas()
   }
}

const txtInput = (ev) => {
   let txt = ev.target.value
   if (gMeme.selectedLineIdx !== -1) {
      gMeme.lines[gMeme.selectedLineIdx].txt = txt
      renderCanvas()
   }
}

const addTxt = () => {
   const elTxtInput = document.querySelector('.text-input')
   if (!elTxtInput.value) return
   let newTxt = memeTxtChange(elTxtInput.value)
   gMeme.lines.push(newTxt)
   resetInputs()
   renderCanvas()
}

const removeTxt = () => {
   if (gMeme.selectedLineIdx !== -1) {
      gMeme.lines.splice(gMeme.selectedLineIdx, 1)
      if (!gMeme.lines.length) gMeme.selectedLineIdx = -1
      renderCanvas()
   }
}

const increaseFontSize = () => {
   if (gMeme.selectedLineIdx !== -1) {
      gMeme.lines[gMeme.selectedLineIdx].size++
      renderCanvas()
   }
}

const decreaseFontSize = () => {
   if (gMeme.selectedLineIdx !== -1) {
      gMeme.lines[gMeme.selectedLineIdx].size--
      renderCanvas()
   }
}

const txtAlignLeft = () => {
   if (gMeme.selectedLineIdx !== -1) {
      gMeme.lines[gMeme.selectedLineIdx].align = 'right'
      renderCanvas()
   }
}

const txtAlignCenter = () => {
   if (gMeme.selectedLineIdx !== -1) {
      gMeme.lines[gMeme.selectedLineIdx].align = 'center'
      renderCanvas()
   }
}

const txtAlignRight = () => {
   if (gMeme.selectedLineIdx !== -1) {
      gMeme.lines[gMeme.selectedLineIdx].align = 'left'
      renderCanvas()
   }
}

const fontFamChange = (ev) => {
   if (gMeme.selectedLineIdx !== -1) {
      gMeme.lines[gMeme.selectedLineIdx].font = ev.target.value
      renderCanvas()
   }
}

const strokeChange = (ev) => {
   if (gMeme.selectedLineIdx !== -1) {
      gMeme.lines[gMeme.selectedLineIdx].stroke = ev.target.value
      renderCanvas()
   }
}

const fillChange = (ev) => {
   if (gMeme.selectedLineIdx !== -1) {
      gMeme.lines[gMeme.selectedLineIdx].color = ev.target.value
      renderCanvas()
   }
}

function switchLine() {
   gMeme.selectedLineIdx = (gMeme.selectedLineIdx === gMeme.lines.length - 1) ? 0 : gMeme.selectedLineIdx + 1
   let elTxtInput = document.querySelector('.text-input')
   elTxtInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
   renderCanvas()
}

function moveLineUp(ev) {
   if (gMeme.selectedLineIdx !== -1) {
      ev.preventDefault()
      gMeme.lines[gMeme.selectedLineIdx].posX--
      renderCanvas()
   }
}

function moveLineDown(ev) {
   if (gMeme.selectedLineIdx !== -1) {
      ev.preventDefault()
      gMeme.lines[gMeme.selectedLineIdx].posY++
      renderCanvas()
   }
}

function touchStart(ev) {
   pressLine(ev.touches[0])
}

function touchEnd(ev) {
   releaseLine(ev.changedTouches[0])
}

function selectAllTxt(ev) {
   ev.target.select()
}

function selectedLine(ev) {
   let clicked = getClickedPos(ev)
   let elTxtInput = document.querySelector('.text-input')
   gMeme.selectedLineIdx = gMeme.lines.findIndex(line => {
      let txtLength = gCtx.measureText(line.txt)
      let half = txtLength.width / 2
      let height = txtLength.fontBoundingBoxAscent + txtLength.fontBoundingBoxDescent
      return ( clicked.posY < line.posY
            && clicked.posY > line.posY - height
            && clicked.posX < line.posX + half )
   })
   if (gMeme.selectedLineIdx !== -1) elTxtInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
   renderCanvas()
}

function getClickedPos(ev) {
   let pos = { posX: ev.offsetX, posY: ev.offsetY }
   if (gTouchEvs.includes(ev.type)) {
      ev.preventDefault()
      ev = ev.changedTouches[0]
      pos = {
         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
         y: ev.pageY - ev.target.clientTop
      }
   }
   return pos
}

function getClickedLine() {
   return gMeme.lines[gMeme.selectedLineIdx]
}