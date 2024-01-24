import React from 'react'
import Wrapper from '../../components/wrapper/Wrapper'
import '../../pages/pageNotFound/style.scss'
const pageNotFound = () => {
  return (
    <div className="pageNotFound">
      <Wrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
      </Wrapper>
    </div>
  )
}

export default pageNotFound
