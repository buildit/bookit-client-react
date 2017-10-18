import React from 'react'

import BookingForm from 'Containers/BookingForm'

const App = () => {
  const submit = (values) => console.log(values)

  return (
    <div>
      <BookingForm onSubmit={submit} />
    </div>
  )
}

export default App
