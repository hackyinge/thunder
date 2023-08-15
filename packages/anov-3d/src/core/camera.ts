import type { Object3D, Vector3 } from 'three'
import { BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial, PerspectiveCamera as TPerspectiveCamera } from 'three'
import { Direction, moveTo, moveWithLine } from '../utils/move'
import globalObjectManage from './global'

class PerspectiveCamera extends TPerspectiveCamera {
  constructor(fov: number, aspect: number, near: number, far: number) {
    super(fov, aspect, near, far)
  }

  /**
   * 向目标物体推进
   * @param targetObject3D
   * @param distance
   * @param duration
   * @param animationMethod
   */
  public promote(targetObject3D: Object3D, distance: number, duration?: number, animationMethod?: string) {
    return moveTo(this, targetObject3D, distance, Direction.plus, duration, animationMethod)
  }

  /**
   * 向目标物体后退
   * @param targetObject3D
   * @param distance
   * @param duration
   * @param animationMethod
   */
  public demote = (targetObject3D: Object3D, distance: number, duration?: number, animationMethod?: string) => {
    return moveTo(this, targetObject3D, distance, Direction.minus, duration, animationMethod)
  }

  /**
   * 相机漫游
   * @param lookat
   * @param vec
   * @param points
   * @param helpLine
   */
  public surround = (lookat: Vector3, vec: Vector3[], points = 5, helpLine?: boolean) => {
    const curve = new CatmullRomCurve3([
      ...vec,
    ], true)

    const geometry = new BufferGeometry().setFromPoints(curve.getPoints(points))
    const material = new LineBasicMaterial({ color: '#fff' })
    const curveObject = new Line(geometry, material)

    globalObjectManage.scene!.add(curveObject)

    moveWithLine(this, curve, lookat)
  }
}

export { PerspectiveCamera }