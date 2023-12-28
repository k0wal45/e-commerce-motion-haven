import React from 'react'

const Loading = () => {
  return (
    <section className="w-screen h-screen grid place-items-center">
      <div className="w-72 grid place-items-center">
        <span className="loading loading-spinner text-primary "></span>
      </div>
    </section>
  )
}

export default Loading
