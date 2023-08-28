/* eslint-disable import/export */
import Scene from './core/scene'
import Mesh from './core/mesh'
import Group from './core/group'
import { PerspectiveCamera } from './core/camera'
import ModelLoader from './core/model'
import { ModelType } from './commonEnu'
import { createLabel } from './utils/createLabel'
import { createControlLine } from './core/line'
import { TransformControls, createTransformControls } from './core/control/transformControls'
import { Direction, moveLine, moveTo, moveWithLine, moveWithRound } from './utils/move'
import { appendChildren, create, createElement, setAttributes, setClassList, setEventListeners } from './utils/createElement'
import globalObjectManage from './core/global/global'
import useframe from './core/use/useframe'

const utils = {
  moveTo,
  moveLine,
  moveWithRound,
  moveWithLine,
}

const dom = {
  appendChildren,
  create,
  createElement,
  setAttributes,
  setClassList,
  setEventListeners,
}

const use = {
  useframe,
}

export * from 'three'
export { Scene as TScene } from 'three'
export * from './threeCell'

export {
  Scene,
  Mesh,
  Group,
  PerspectiveCamera,
  ModelLoader,
  TransformControls,
  createControlLine,
  createLabel,
  ModelType,
  Direction,
  createTransformControls,
  utils,
  dom,
  use,
  globalObjectManage,
}
