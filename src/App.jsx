import { useState, useEffect } from 'react'

import { fetchDataFromApi } from './utils/api.js'
import './index.scss'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'

import Detail from './pages/detail/Detail.jsx'
import Explore from './pages/explore/explore.jsx'
import PageNotFound from './pages/pageNotFound/pageNotFound.jsx'
import Home from './pages/home/home.jsx'
import Search from './pages/search/Search.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { getApiConfiguration, getGenres } from './store/homeSlice.js'
function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) =>state.home);
  console.log(url)

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then((res) => {
        console.log(res)
        const url ={
          backdrop: res.images.secure_base_url +
          "original",
          poster: res.images.secure_base_url +
          "original",
          profile: res.images.secure_base_url +
          "original",
        }
        dispatch(getApiConfiguration(url))
      });
  }

  const genresCall = async  () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await  Promise.all(promises);
    console.log(data);
    data?.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
};
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/search/:query' element={<Search />}  />
        <Route path='/explore/:mediaType' element={<Explore />}  />
        <Route path='/:mediaType/:id' element={<Detail />}  />
        <Route path='*' element={<PageNotFound />}  />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
