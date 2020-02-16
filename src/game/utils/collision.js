const overlaps = async (scene, obj1, obj2) => {
  const { physics } = scene

  const promise = () => new Promise((resolve) => {
    physics.overlap(obj1, obj2, () => {
      resolve(true)
    })

    resolve(false)
  })

  return await promise()
}

export {
  overlaps,
}

