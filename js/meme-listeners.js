'use strict'

// Event listeners with function pointers for canvas manipulation events

const elTxtInput = document.querySelector('.text-input')
elTxtInput.addEventListener('input', txtInput)
elTxtInput.addEventListener('click', selectAllTxt)

const elAddTxtBtn = document.querySelector('.btn-add-line')
elAddTxtBtn.addEventListener('click', addTxt)

const elRemoveTxtBtn = document.querySelector('.btn-remove-line')
elRemoveTxtBtn.addEventListener('click', removeTxt)

const elSwitchLine = document.querySelector('.btn-switch-line')
elSwitchLine.addEventListener('click', switchLine)

const elMoveLineUp = document.querySelector('.btn-line-up')
elMoveLineUp.addEventListener('click', moveLineUp)

const elMoveLineDown = document.querySelector('.btn-line-down')
elMoveLineDown.addEventListener('click', moveLineDown)

const elIncreaseFontBtn = document.querySelector('.btn-increase-font-size')
elIncreaseFontBtn.addEventListener('click', increaseFontSize)

const elDecreaseFontBtn = document.querySelector('.btn-decrease-font-size')
elDecreaseFontBtn.addEventListener('click', decreaseFontSize)

const elAlignLeftBtn = document.querySelector('.btn-align-left')
elAlignLeftBtn.addEventListener('click', txtAlignLeft)

const elAlignCenterBtn = document.querySelector('.btn-align-center')
elAlignCenterBtn.addEventListener('click', txtAlignCenter)

const elAlignRightBtn = document.querySelector('.btn-align-right')
elAlignRightBtn.addEventListener('click', txtAlignRight)

const elFontFamSelect = document.querySelector('.font-select')
elFontFamSelect.addEventListener('change', fontFamChange)

const elStrokeInput = document.querySelector('.stroke-input')
elStrokeInput.addEventListener('change', strokeChange)

const elFillInput = document.querySelector('.fill-input')
elFillInput.addEventListener('change', fillChange)

const elSaveBtn = document.querySelector('.btn-save')
elSaveBtn.addEventListener('click', onSaveMeme)

function loadCanvasListeners() {
   elCanvas.addEventListener('touchstart', touchStart)
   elCanvas.addEventListener('touchend', touchEnd)
   elCanvas.addEventListener('touchmove', touchMove)
   elCanvas.addEventListener('mousedown', pressLine)
   elCanvas.addEventListener('mouseup', releaseLine)
   elCanvas.addEventListener('mousemove', dragLine)
}