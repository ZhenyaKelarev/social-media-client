const performRequest = async (requestFn, ...args) => {
  try {
    const response = await requestFn(...args)
    return response.data
  } catch (error) {
    console.error("Error occurred:", error)
    throw error
  }
}

export { performRequest }
