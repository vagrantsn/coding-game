import {
  find,
  pipe,
  prop,
  propEq,
  uncurryN,
} from 'ramda'

const getObjectsFromLayer = uncurryN(2, layerName => pipe(
  prop('objects'),
  find(propEq('name', layerName)),
  prop('objects'),
))

export {
  getObjectsFromLayer,
}
